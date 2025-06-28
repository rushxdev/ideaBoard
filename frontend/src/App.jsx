import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import IdeaForm from './components/IdeaForm.jsx';
import IdeaList from './components/IdeaList.jsx';
import Modal from './components/Modal.jsx';
import AddIcon from '@mui/icons-material/Add';
import NotificationSnackbar from './components/NotificationSnackbar.jsx'
import ConfirmDialog from './components/ConfirmDialog.jsx';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIdea, setCurrentIdea] = useState(null); 
  const [idea, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [ideaToDelete, setIdeaToDelete] = useState(null);

  const fetchIdeas = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/ideas`);
      setIdeas(response.data);
    } catch (err) {
      console.error('Error fetching ideas:', err);
      setError('Failed to load ideas. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchIdeas();
  }, [fetchIdeas]);

  const handleAddIdeaClick = () => {
    setCurrentIdea(null); 
    setIsModalOpen(true);
  };

  
  const handleEditIdea = (idea) => {
    setCurrentIdea(idea);
    setIsModalOpen(true);
  };

  const initiateDelete = (id) => {
    setIdeaToDelete(id);
    setIsConfirmOpen(true);
  };

  const handleDeleteIdeaConfirm = async () => {
    setIsConfirmOpen(false)
    if (!ideaToDelete) return;

    try {
        await axios.delete(`${API_BASE_URL}/ideas/${ideaToDelete}`);
        fetchIdeas();
        setNotification({
          open: true,
          message: 'Idea deleted successfully!',
          severity: 'success',
        });
        } catch (err) {
            console.error('Error deleting note:', err);
            let errorMessage = 'Failed to delete the idea. Please try again.';
            if (err.response && err.response.status === 404) {
                errorMessage = 'Idea not found. It might have already been deleted.';
            } else if(err.response) {
                errorMessage = `Error: ${err.response.data.message || err.response.status}`;
            }
            setNotification({
            open: true,
            message: errorMessage,
            severity: 'error',
            });
        }   finally {
            setIdeaToDelete(null)
        }
    };
 
  const handleFormSuccess = (message) => {
    setIsModalOpen(false); 
    setCurrentIdea(null);  
    fetchIdeas();
    setNotification({
      open: true,
      message: message,
      severity: 'success',
    });          
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50"> 
      <div className="container mx-auto p-4 md:p-8 flex-grow">
        <h1 className="text-6xl font-extrabold text-center text-gray-800 mb-2 tracking-tight">
          Smart <span className='text-amber-500'>Idea</span>
        </h1>
        <p  className='text-xl font-bold text-center text-gray-600 mb-7 tracking-tight'>
          One in a Billion Idea to Remember  
        </p>

        <div className="flex justify-start mb-8">
          <button
            onClick={handleAddIdeaClick}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 
            px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75
            flex items-center space-x-2"
            aria-label="New Idea"
          >
            <AddIcon fontSize='small'/>
            <span>New Idea</span>
          </button>
        </div>
        <div><hr></hr></div>
        <br />
        <br />

        {loading && <p className="text-center text-gray-600 text-lg">Loading ideas...</p>}
        {error && <p className="text-center text-red-600 text-lg font-medium">{error}</p>}

        {!loading && !error && (
          <IdeaList
            ideas={idea}
            onEditIdea={handleEditIdea}
            onDeleteIdea={initiateDelete}
          />
        )}

       
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <IdeaForm
            initialData={currentIdea} 
            onClose={() => setIsModalOpen(false)} 
            onSuccess={handleFormSuccess}
          />
        </Modal>

        <ConfirmDialog
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={handleDeleteIdeaConfirm}
          title="Delete Idea"
          message="Are you sure you want to delete this idea? This action cannot be undone."
        />

        <NotificationSnackbar
          open={notification.open}
          message={notification.message}
          severity={notification.severity}
          onClose={handleCloseNotification}
        />
      </div>
    </div>
  );
}

export default App

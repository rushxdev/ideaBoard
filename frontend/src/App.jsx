import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import IdeaForm from './components/IdeaForm.jsx';
import IdeaList from './components/IdeaList.jsx';
import Modal from './components/Modal.jsx';
import AddIcon from '@mui/icons-material/Add';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIdea, setCurrentIdea] = useState(null); 
  const [Idea, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchIdeas = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:8080/api/ideas');
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

  const handleDeleteIdea = async (id) => {

    if (window.confirm('Are you sure you want to delete this idea?')) {
      try {
        await axios.delete(`http://localhost:8080/api/ideas/${id}`);
        fetchIdeas(); 
        alert('Note deleted successfully!'); 
      } catch (err) {
        console.error('Error deleting note:', err);
        
        if (err.response && err.response.status === 404) {
          alert('Idea not found. It might have already been deleted.');
        } else {
          alert('Failed to delete the idea. Please try again.');
        }
      }
    }
  };

  
  const handleFormSuccess = () => {
    setIsModalOpen(false); 
    setCurrentIdea(null);  
    fetchIdeas();          
  };

  return (
    <div className="flex flex-col min-h-screen"> 
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
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
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
            ideas={Idea}
            onEditIdea={handleEditIdea}
            onDeleteIdea={handleDeleteIdea}
          />
        )}

       
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <IdeaForm
            initialData={currentIdea} 
            onClose={() => setIsModalOpen(false)} 
            onSuccess={handleFormSuccess}
          />
        </Modal>
      </div>
    </div>
  );
}

export default App

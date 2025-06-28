import React, { useState, useEffect } from 'react';
import axios from 'axios';

function IdeaForm({ initialData, onClose, onSuccess }) {
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  
  const [errors, setErrors] = useState({});

  const [submissionMessage, setSubmissionMessage] = useState('');
 
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
      });
    } else {
      setFormData({ title: '', description: '' });
    }

    setErrors({});
    setSubmissionMessage('');
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setErrors({}); 
    setSubmissionMessage(''); 
    setIsSubmitting(true); 

    try {
      let response;
      
      if (initialData && initialData.id) {
        response = await axios.put(`http://localhost:8080/api/ideas/${initialData.id}`, formData);
        setSubmissionMessage('Idea updated successfully!');
      } else {
        response = await axios.post('http://localhost:8080/api/ideas', formData);
        setSubmissionMessage('Idea added successfully!');
      }
      console.log('Success:', response.data);
      onSuccess();
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) { 
          setErrors(error.response.data);
          setSubmissionMessage('Title or Description Cannot be Empty.');
          console.error('Validation Errors:', error.response.data);
        } else if (error.response.status === 404) {
          setSubmissionMessage('The idea was not found or has been deleted.');
          console.error('Resource Not Found Error:', error.response.data);
        } else {
          setSubmissionMessage('An error occurred: ' + (error.response.data.message || error.response.statusText || 'Unknown server error'));
          console.error('Server Error:', error.response.data);
        }
      } else if (error.request) {
        setSubmissionMessage('Network error. Please check your connection.');
        console.error('Network Error:', error.request);
      } else {
        setSubmissionMessage('An unexpected error occurred.');
        console.error('Unexpected Error:', error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-xl w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {initialData ? 'Edit Idea' : 'New Idea'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={isSubmitting}
            aria-invalid={errors.title ? "true" : "false"}
            aria-describedby={errors.title ? "title-error" : undefined}
          />
          {errors.title && <p id="title-error" className="mt-1 text-sm text-red-600">{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            rows="5"
            value={formData.description}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={isSubmitting} 
            aria-invalid={errors.description ? "true" : "false"}
            aria-describedby={errors.description ? "description-error" : undefined}
          ></textarea>
          {errors.description && <p id="description-error" className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
            aria-live="polite"
          >
            {isSubmitting ? (initialData ? 'Updating...' : 'Adding...') : (initialData ? 'Update Idea' : 'Add Idea')}
          </button>
        </div>
      </form>

      {submissionMessage && (
        <p className={`mt-4 text-center text-sm font-medium ${
            Object.keys(errors).length > 0 ? 'text-red-600' : 'text-green-600'
        }`}>
          {submissionMessage}
        </p>
      )}
    </div>
  );
}

export default IdeaForm;
function IdeaList({ ideas, onEditIdea, onDeleteIdea }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      {ideas.length === 0 ? (
        <p className="text-center text-gray-600 py-8 text-lg">No Ideas available. Click "New Idea" to create one!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map((ideas) => (
            <div
              key={ideas.id}
              className="bg-gray-50 border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md 
              transition-shadow duration-200 flex flex-col justify-between"
              role="listitem"
              aria-labelledby={`idea-title-${ideas.id}`}
            >
              <div>
                <h3 id={`idea-title-${ideas.id}`} className="text-xl font-semibold text-gray-900 mb-2 truncate" 
                title={ideas.title}>{ideas.title}</h3>
                <p className="text-gray-700 text-base mb-4 line-clamp-3" title={ideas.description}>{ideas.description}</p>
              </div>
              <div className="text-xs text-gray-500 mt-auto pt-3 border-t border-gray-200">
                Created: {new Date(ideas.createdAt).toLocaleString()}
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => onEditIdea(ideas)}
                  className="px-3 py-1 border-2 border-gray-600 text-black rounded-md text-sm 
                  hover:bg-gray-600 hover:text-white transition duration-150 ease-in-out focus:outline-none 
                  focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                  aria-label={`Edit idea ${ideas.title}`}
                >
                  Edit
                </button>
                <button
                  onClick={() => onDeleteIdea(ideas.id)}
                  className="px-3 py-1 border-2 border-red-600 text-red-800 rounded-md text-sm 
                  hover:bg-red-600 hover:text-white transition duration-150 ease-in-out focus:outline-none 
                  focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
                  aria-label={`Delete idea ${ideas.title}`}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default IdeaList;
import React from 'react';

const EventForm = ({ initialData, handleChange, handleSubmit, loading, buttonText }) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-400 mb-2">Event Title</label>
          <input
            type="text"
            name="title"
            required
            value={initialData.title}
            onChange={handleChange}
            placeholder="e.g. AI & Robotics Workshop"
            className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-sans text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
          <select
            name="category"
            value={initialData.category}
            onChange={handleChange}
            className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-sans text-white bg-gray-800"
          >
            <option value="workshop">Workshop</option>
            <option value="hackathon">Hackathon</option>
            <option value="conference">Conference</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Capacity</label>
          <input
            type="number"
            name="capacity"
            required
            value={initialData.capacity}
            onChange={handleChange}
            placeholder="e.g. 100"
            className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-sans text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Date & Time</label>
          <input
            type="datetime-local"
            name="date"
            required
            value={initialData.date}
            onChange={handleChange}
            className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white font-sans"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Location</label>
          <input
            type="text"
            name="location"
            required
            value={initialData.location}
            onChange={handleChange}
            placeholder="e.g. San Francisco, CA"
            className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-sans text-white"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-400 mb-2">Image URL (optional)</label>
          <input
            type="text"
            name="image"
            value={initialData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-sans text-white"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
          <textarea
            name="description"
            required
            rows="5"
            value={initialData.description}
            onChange={handleChange}
            placeholder="Tell us more about the event..."
            className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none font-sans text-white"
          ></textarea>
        </div>
      </div>

      <div className="pt-4 flex gap-4">
        {buttonText.includes('Update') && (
           <button
            type="button"
            onClick={() => window.history.back()}
            className="w-1/3 bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 rounded-xl transition-all font-sans"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className={`${buttonText.includes('Update') ? 'w-2/3' : 'w-full'} bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/10 transition-all disabled:opacity-50 font-sans`}
        >
          {loading ? 'Processing...' : buttonText}
        </button>
      </div>
    </form>
  );
};

export default EventForm;

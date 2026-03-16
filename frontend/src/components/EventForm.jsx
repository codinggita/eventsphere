import React from 'react';

const EventForm = ({ formData, handleChange, handleSubmit, loading, buttonText }) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-400 mb-2">Event Title</label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. AI & Robotics Workshop"
            className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-sans"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-sans"
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
            value={formData.capacity}
            onChange={handleChange}
            placeholder="e.g. 100"
            className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-sans"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Date & Time</label>
          <input
            type="datetime-local"
            name="date"
            required
            value={formData.date}
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
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. San Francisco, CA"
            className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-sans"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-400 mb-2">Image URL (optional)</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-sans"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
          <textarea
            name="description"
            required
            rows="5"
            value={formData.description}
            onChange={handleChange}
            placeholder="Tell us more about the event..."
            className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none font-sans"
          ></textarea>
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/10 transition-all disabled:opacity-50 font-sans"
        >
          {loading ? 'Processing...' : buttonText}
        </button>
      </div>
    </form>
  );
};

export default EventForm;

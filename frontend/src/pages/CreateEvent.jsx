import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import EventForm from '../components/EventForm';
import eventService from '../services/eventService';
import { useAuth } from '../context/AuthContext';

const CreateEvent = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'workshop',
    location: '',
    date: '',
    capacity: '',
    image: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await eventService.createEvent(formData, token);
      setLoading(false);
      navigate(`/events/${response.data._id}`);
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating event');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      
      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-gray-900/40 rounded-3xl border border-gray-800 p-8 md:p-12 backdrop-blur-sm">
          <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Create New Event
          </h1>

          <EventForm 
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            loading={loading}
            buttonText="Create Event"
          />
        </div>
      </main>
    </div>
  );
};

export default CreateEvent;

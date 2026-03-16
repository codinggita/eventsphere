import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import EventForm from '../components/EventForm';
import eventService from '../services/eventService';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../components/ErrorDisplay';

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'workshop',
    location: '',
    date: '',
    capacity: '',
    image: ''
  });

  const fetchEvent = async () => {
    try {
      setLoading(true);
      const res = await eventService.getEventById(id);
      const event = res.data;
      
      // Format date for datetime-local input (YYYY-MM-DDTHH:MM)
      const date = new Date(event.date);
      const formattedDate = date.toISOString().slice(0, 16);

      setFormData({
        title: event.title,
        description: event.description,
        category: event.category,
        location: event.location,
        date: formattedDate,
        capacity: event.capacity,
        image: event.image || ''
      });
      setLoading(false);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching event details');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await eventService.updateEvent(id, formData, token);
      setSaving(false);
      navigate(`/events/${id}`);
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating event');
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white">
        <Navbar />
        <div className="pt-20">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white">
        <Navbar />
        <ErrorDisplay message={error} retryHandler={fetchEvent} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      
      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-gray-900/40 rounded-3xl border border-gray-800 p-8 md:p-12 backdrop-blur-sm shadow-2xl">
          <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent font-sans">
            Edit Event
          </h1>

          <EventForm 
            initialData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            loading={saving}
            buttonText="Update Event"
          />
        </div>
      </main>
    </div>
  );
};

export default EditEvent;

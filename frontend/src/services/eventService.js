import axios from 'axios';

const API_URL = '/api/events';

const createEvent = async (eventData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, eventData, config);
  return response.data;
};

const getEvents = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getEventById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

const updateEvent = async (id, eventData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${API_URL}/${id}`, eventData, config);
  return response.data;
};

const deleteEvent = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_URL}/${id}`, config);
  return response.data;
};

const registerForEvent = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${API_URL}/${id}/register`, {}, config);
  return response.data;
};

const eventService = {
  createEvent,
  getEvents,
  getAllEvents: getEvents, // Added as requested
  getEventById,
  updateEvent,
  deleteEvent,
  registerForEvent,
};

export default eventService;

import axios from 'axios';

const API_URL = '/api/users';

const getMyEvents = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/me/events`, config);
  return response.data;
};

const getMyRegistrations = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/me/registrations`, config);
  return response.data;
};

const userService = {
  getMyEvents,
  getMyRegistrations,
};

export default userService;

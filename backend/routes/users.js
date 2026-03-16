const express = require('express');
const router = express.Router();
const { 
  getMyEvents, 
  getMyRegistrations,
  getSavedEvents,
  saveEvent,
  unsaveEvent,
  connectWithUser
} = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/me/events', auth, getMyEvents);
router.get('/me/registrations', auth, getMyRegistrations);
router.get('/me/saved', auth, getSavedEvents);
router.post('/save/:id', auth, saveEvent);
router.delete('/save/:id', auth, unsaveEvent);
router.post('/connect/:id', auth, connectWithUser);

module.exports = router;

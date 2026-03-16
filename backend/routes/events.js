const express = require('express');
const router = express.Router();
const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  registerForEvent,
  unregisterFromEvent,
} = require('../controllers/eventController');
const auth = require('../middleware/auth');
const checkOrganizer = require('../middleware/checkOrganizer');

router.route('/')
  .get(getEvents)
  .post(auth, createEvent);

router.route('/:id')
  .get(getEventById)
  .put(auth, checkOrganizer, updateEvent)
  .delete(auth, checkOrganizer, deleteEvent);

router.post('/:id/register', auth, registerForEvent);
router.delete('/:id/register', auth, unregisterFromEvent);

module.exports = router;

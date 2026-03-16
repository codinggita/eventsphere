const express = require('express');
const router = express.Router();
const { getMyEvents, getMyRegistrations } = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/me/events', auth, getMyEvents);
router.get('/me/registrations', auth, getMyRegistrations);

module.exports = router;

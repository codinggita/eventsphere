const Event = require('../models/Event');

// @desc    Get events created by logged-in user
// @route   GET /api/users/me/events
// @access  Private
const getMyEvents = async (req, res, next) => {
  try {
    const events = await Event.find({ organizer: req.user.id });
    res.json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get events user has registered for
// @route   GET /api/users/me/registrations
// @access  Private
const getMyRegistrations = async (req, res, next) => {
  try {
    const events = await Event.find({ attendees: req.user.id }).populate('organizer', 'name email');
    res.json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMyEvents,
  getMyRegistrations
};

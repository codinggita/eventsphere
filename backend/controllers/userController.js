const User = require('../models/User');
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

// @desc    Save an event
// @route   POST /api/users/save/:id
// @access  Private
const saveEvent = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const eventId = req.params.id;

    if (user.savedEvents.includes(eventId)) {
      return res.status(400).json({ success: false, message: 'Event already saved' });
    }

    user.savedEvents.push(eventId);
    await user.save();

    res.status(200).json({ success: true, data: user.savedEvents });
  } catch (error) {
    next(error);
  }
};

// @desc    Unsave an event
// @route   DELETE /api/users/save/:id
// @access  Private
const unsaveEvent = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const eventId = req.params.id;

    user.savedEvents = user.savedEvents.filter(
      (id) => id.toString() !== eventId
    );

    await user.save();

    res.status(200).json({ success: true, data: user.savedEvents });
  } catch (error) {
    next(error);
  }
};

// @desc    Get saved events
// @route   GET /api/users/me/saved
// @access  Private
const getSavedEvents = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: 'savedEvents',
      populate: {
        path: 'organizer',
        select: 'name email',
      },
    });

    res.status(200).json({ success: true, data: user.savedEvents });
  } catch (error) {
    next(error);
  }
};

// @desc    Connect with a user (Placeholder)
// @route   POST /api/users/connect/:id
// @access  Private
const connectWithUser = async (req, res, next) => {
  try {
    const userIdToConnect = req.params.id;
    // Implementation placeholder: In a real app, this would create a connection request
    res.status(200).json({ 
      success: true, 
      message: `Connection request sent to user ${userIdToConnect}` 
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMyEvents,
  getMyRegistrations,
  saveEvent,
  unsaveEvent,
  getSavedEvents,
  connectWithUser
};

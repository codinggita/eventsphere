const Event = require('../models/Event');

// @desc    Create new event
// @route   POST /api/events
// @access  Private
exports.createEvent = async (req, res, next) => {
  try {
    req.body.organizer = req.user.id;
    const event = await Event.create(req.body);
    res.status(201).json({ success: true, data: event });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all events
// @route   GET /api/events
// @access  Public
exports.getEvents = async (req, res, next) => {
  try {
    const events = await Event.find().populate('organizer', 'name email');
    res.status(200).json({ success: true, count: events.length, data: events });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
exports.getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('organizer', 'name email')
      .populate('attendees', 'name email');

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    res.status(200).json({ success: true, data: event });
  } catch (error) {
    next(error);
  }
};

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private
exports.updateEvent = async (req, res, next) => {
  try {
    let event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    // Authorization handled by middleware
    event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: event });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private
exports.deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    await event.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

// @desc    Register for event
// @route   POST /api/events/:id/register
// @access  Private
exports.registerForEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    if (event.attendees.includes(req.user.id)) {
      return res.status(400).json({ success: false, message: 'Already registered' });
    }

    if (event.attendees.length >= event.capacity) {
      return res.status(400).json({ success: false, message: 'Event is full' });
    }

    event.attendees.push(req.user.id);
    await event.save();

    // Re-populate and return
    const updatedEvent = await Event.findById(req.params.id)
      .populate('organizer', 'name email')
      .populate('attendees', 'name email');

    res.status(200).json({ success: true, data: updatedEvent });
  } catch (error) {
    next(error);
  }
};

// @desc    Unregister from event
// @route   DELETE /api/events/:id/register
// @access  Private
exports.unregisterFromEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    if (!event.attendees.includes(req.user.id)) {
      return res.status(400).json({ success: false, message: 'Not registered for this event' });
    }

    event.attendees = event.attendees.filter(
      (attendeeId) => attendeeId.toString() !== req.user.id
    );

    await event.save();

    // Re-populate and return
    const updatedEvent = await Event.findById(req.params.id)
      .populate('organizer', 'name email')
      .populate('attendees', 'name email');

    res.status(200).json({ success: true, data: updatedEvent });
  } catch (error) {
    next(error);
  }
};

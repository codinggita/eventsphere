import RegisterButton from '../components/RegisterButton';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [registering, setRegistering] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const fetchEvent = async () => {
    try {
      setLoading(true);
      const res = await eventService.getEventById(id);
      setEvent(res.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching event details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const handleRegister = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      setRegistering(true);
      const res = await eventService.registerForEvent(id, token);
      setEvent(res.data.data); // The updated event object
      alert('Successfully registered for the event!');
    } catch (err) {
      alert(err.response?.data?.message || 'Error registering for event');
    } finally {
      setRegistering(false);
    }
  };

  const handleUnregister = async () => {
    if (!window.confirm('Are you sure you want to unregister from this event?')) return;

    try {
      setRegistering(true);
      const res = await eventService.unregisterFromEvent(id, token);
      setEvent(res.data.data); // The updated event object
      alert('You have successfully unregistered.');
    } catch (err) {
      alert(err.response?.data?.message || 'Error unregistering from event');
    } finally {
      setRegistering(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await eventService.deleteEvent(id, token);
      navigate('/events');
    } catch (err) {
      alert(err.response?.data?.message || 'Error deleting event');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white">
        <Navbar />
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white">
        <Navbar />
        <ErrorDisplay message={error} retryHandler={fetchEvent} />
      </div>
    );
  }

  const isOrganizer = user && event.organizer && (user.id === event.organizer._id || user.id === event.organizer);
  const isRegistered = user && event.attendees.some(attendee => 
    (typeof attendee === 'string' ? attendee === user.id : attendee._id === user.id)
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        <button 
          onClick={() => navigate(-1)}
          className="mb-8 text-gray-400 hover:text-white flex items-center transition-colors font-sans"
        >
          <span className="mr-2">←</span> Back
        </button>

        <div className="bg-gray-900/40 rounded-3xl border border-gray-800 overflow-hidden backdrop-blur-sm shadow-2xl">
          <div className="relative h-96 w-full">
            <img 
              src={event.image || 'https://via.placeholder.com/1200x600?text=Event+Banner'} 
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-6 right-6 bg-blue-600 text-white font-bold px-4 py-2 rounded-full uppercase text-sm tracking-wider shadow-lg">
              {event.category}
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row justify-between items-start mb-10 pb-10 border-b border-gray-800">
              <div className="mb-6 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
                  {event.title}
                </h1>
                <div className="flex flex-wrap gap-6 text-gray-400 font-sans">
                  <div className="flex items-center">
                    <span className="mr-3 text-blue-500">📅</span>
                    {new Date(event.date).toLocaleDateString(undefined, {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                  <div className="flex items-center">
                    <span className="mr-3 text-blue-500">📍</span>
                    {event.location}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center md:items-end w-full md:w-auto">
                {isOrganizer ? (
                  <div className="flex gap-4">
                    <Link 
                      to={`/events/${event._id}/edit`}
                      className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-2xl font-bold transition-all font-sans shadow-lg"
                    >
                      Edit Event
                    </Link>
                    <DeleteButton 
                      onDelete={handleDelete}
                      loading={deleting}
                    />
                  </div>
                ) : (
                  <RegisterButton 
                    isRegistered={isRegistered}
                    onRegister={handleRegister}
                    onUnregister={handleUnregister}
                    loading={registering}
                    capacityReached={event.attendees.length >= event.capacity}
                    isOrganizer={isOrganizer}
                  />
                )}
                <p className="mt-4 text-sm text-gray-500 font-sans bg-gray-900/50 px-4 py-2 rounded-full">
                  {event.capacity - event.attendees.length} spots remaining out of {event.capacity}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-16 pt-10">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold mb-6 text-blue-400">About this event</h2>
                <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-wrap font-sans">
                  {event.description}
                </p>
              </div>
              
              <div className="space-y-10">
                <div className="bg-gray-800/20 rounded-3xl p-6 border border-gray-800">
                  <h3 className="text-sm uppercase tracking-widest text-gray-500 font-bold mb-6 font-sans">Organizer</h3>
                  <div className="flex items-center">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold mr-5 shadow-lg">
                      {event.organizer?.name?.charAt(0) || 'O'}
                    </div>
                    <div>
                      <p className="font-bold text-lg font-sans">{event.organizer?.name || 'Unknown'}</p>
                      <p className="text-sm text-gray-500 font-sans">Event Creator</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/20 rounded-3xl p-6 border border-gray-800">
                  <h3 className="text-sm uppercase tracking-widest text-gray-500 font-bold mb-6 font-sans">Attendees</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/40 rounded-2xl p-4 text-center">
                      <p className="text-3xl font-bold text-blue-500 mb-1">{event.attendees.length}</p>
                      <p className="text-xs text-gray-500 uppercase tracking-tighter">Joined</p>
                    </div>
                    <div className="bg-black/40 rounded-2xl p-4 text-center">
                      <p className="text-3xl font-bold text-gray-400 mb-1">{event.capacity}</p>
                      <p className="text-xs text-gray-500 uppercase tracking-tighter">Capacity</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventDetails;

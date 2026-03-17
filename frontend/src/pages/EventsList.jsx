import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import EventCard from '../components/EventCard';
import eventService from '../services/eventService';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import SortDropdown from '../components/SortDropdown';
import Pagination from '../components/Pagination';
import LoadingSkeleton from '../components/LoadingSkeleton';
import EmptyState from '../components/EmptyState';
import ErrorDisplay from '../components/ErrorDisplay';

const EventsList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    total: 0,
    limit: 6,
    page: 1,
    totalPages: 1
  });

  // Get current filters from URL
  const keyword = searchParams.get('keyword') || '';
  const category = searchParams.get('category') || '';
  const sort = searchParams.get('sort') || '-createdAt';
  const page = parseInt(searchParams.get('page')) || 1;

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const params = {
        keyword,
        category,
        sort,
        page,
        limit: 6
      };
      
      const response = await eventService.getEvents(params);
      setEvents(response.data);
      setPagination(response.pagination);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [keyword, category, sort, page]);

  const updateFilters = (newFilters) => {
    const updatedParams = new URLSearchParams(searchParams);
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        updatedParams.set(key, value);
      } else {
        updatedParams.delete(key);
      }
    });

    // Reset to page 1 on filter change
    if (!newFilters.page) {
      updatedParams.set('page', '1');
    }

    setSearchParams(updatedParams);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white font-sans transition-colors duration-300">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header & Search */}
        <div className="flex flex-col space-y-8 mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
                Discover Events
              </h1>
              <p className="text-gray-500">Find and join the most exciting events near you</p>
            </div>
            <SearchBar 
              onSearch={(val) => updateFilters({ keyword: val })} 
              initialValue={keyword} 
            />
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pt-4 border-t border-gray-200 dark:border-gray-800/50">
            <CategoryFilter 
              activeCategory={category} 
              onCategoryChange={(val) => updateFilters({ category: val })} 
            />
            <SortDropdown 
              activeSort={sort} 
              onSortChange={(val) => updateFilters({ sort: val })} 
            />
          </div>
        </div>

        {loading ? (
          <LoadingSkeleton count={6} />
        ) : error ? (
          <ErrorDisplay message={error} retryHandler={fetchEvents} />
        ) : events.length === 0 ? (
          <EmptyState
            type="search"
            title="No events found"
            description="We couldn't find any events matching your filters. Try adjusting your search or exploring different categories."
            actionLabel="Clear all filters"
            onAction={() => setSearchParams({})}
          />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
              {events.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>

            <Pagination 
              pagination={pagination} 
              onPageChange={(p) => updateFilters({ page: p })} 
            />
          </>
        )}
      </main>
    </div>
  );
};

export default EventsList;

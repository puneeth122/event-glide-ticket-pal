
import React, { useState, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import SearchBar from '@/components/SearchBar';
import EventCard from '@/components/EventCard';
import FeaturedEvent from '@/components/FeaturedEvent';
import { events, Event } from '@/lib/mockData';

const Index = () => {
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [featuredEvent, setFeaturedEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      const featured = events.find(event => event.featured);
      setFeaturedEvent(featured || null);
      setFilteredEvents(events);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = ({ keyword, date, category }: { 
    keyword: string, 
    date: Date | undefined, 
    category: string 
  }) => {
    let filtered = [...events];

    if (keyword) {
      const lowercaseKeyword = keyword.toLowerCase();
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(lowercaseKeyword) ||
        event.venue.toLowerCase().includes(lowercaseKeyword) ||
        event.location.toLowerCase().includes(lowercaseKeyword)
      );
    }

    if (date) {
      const searchDate = date.toISOString().split('T')[0];
      filtered = filtered.filter(event => event.date === searchDate);
    }

    if (category && category !== 'All') {
      filtered = filtered.filter(event => event.category === category);
    }

    setFilteredEvents(filtered);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1 container py-6">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-pulse text-event">Loading events...</div>
          </div>
        ) : (
          <>
            {featuredEvent && <FeaturedEvent event={featuredEvent} />}
            
            <div className="my-8">
              <SearchBar onSearch={handleSearch} />
            </div>
            
            <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
            
            {filteredEvents.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-500">No events found</h3>
                <p className="mt-2 text-gray-400">Try adjusting your search criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                  <div key={event.id} className="animate-scale-in">
                    <EventCard event={event} />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
      
      <footer className="bg-gray-50 py-6 border-t">
        <div className="container text-center text-gray-500">
          <p>&copy; 2025 EventGlide. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

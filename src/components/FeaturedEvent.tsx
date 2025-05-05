
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format, parseISO } from 'date-fns';
import { Event } from '@/lib/mockData';

interface FeaturedEventProps {
  event: Event;
}

const FeaturedEvent = ({ event }: FeaturedEventProps) => {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg h-[400px] md:h-[450px] w-full animate-fade-in">
      <div className="absolute inset-0">
        <img 
          src={event.imageUrl} 
          alt={event.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <div className="mb-4">
          <Badge className="bg-event hover:bg-event-hover mb-3">{event.category}</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">{event.title}</h2>
          
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-sm text-gray-200 mb-4">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{format(parseISO(event.date), 'EEE, MMM d, yyyy')} • {event.time}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{event.venue}, {event.location}</span>
            </div>
          </div>
          
          <p className="text-gray-200 line-clamp-2 mb-4">{event.description}</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <span className="text-xl font-bold">{event.priceRange}</span>
          <Button 
            size="lg" 
            className="bg-event hover:bg-event-hover"
            asChild
          >
            <Link to={`/event/${event.id}`}>
              Get Tickets
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedEvent;


import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { format, parseISO } from 'date-fns';
import { Event } from '@/lib/mockData';

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  return (
    <Card className="overflow-hidden border hover-scale transition-all">
      <Link to={`/event/${event.id}`} className="block">
        <div className="aspect-[16/9] relative">
          <img 
            src={event.imageUrl} 
            alt={event.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2">
            <Badge className="bg-event hover:bg-event-hover">{event.category}</Badge>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="text-lg font-bold line-clamp-2 mb-2">{event.title}</h3>
          <div className="flex items-center text-sm text-gray-500 mb-1">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{format(parseISO(event.date), 'EEE, MMM d, yyyy')} • {event.time}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{event.venue}, {event.location}</span>
          </div>
        </CardContent>
      </Link>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <span className="font-medium">{event.priceRange}</span>
        <Button 
          className="bg-event hover:bg-event-hover"
          asChild
        >
          <Link to={`/event/${event.id}`}>
            View Tickets
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;

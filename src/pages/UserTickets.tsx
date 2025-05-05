
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Ticket as TicketIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { format, parseISO } from 'date-fns';
import NavBar from '@/components/NavBar';
import { events, currentUser } from '@/lib/mockData';

interface TicketDisplay {
  id: string;
  eventId: string;
  eventTitle: string;
  eventImage: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  eventVenue: string;
  ticketType: string;
  quantity: number;
  price: number;
}

const UserTickets = () => {
  const [tickets, setTickets] = useState<TicketDisplay[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      const userTickets = currentUser.tickets.map(ticket => {
        const event = events.find(e => e.id === ticket.eventId);
        const ticketType = event?.ticketTypes.find(t => t.id === ticket.ticketTypeId);
        
        if (!event || !ticketType) return null;
        
        return {
          id: ticket.id,
          eventId: event.id,
          eventTitle: event.title,
          eventImage: event.imageUrl,
          eventDate: event.date,
          eventTime: event.time,
          eventLocation: event.location,
          eventVenue: event.venue,
          ticketType: ticketType.name,
          quantity: ticket.quantity,
          price: ticketType.price
        };
      }).filter(Boolean) as TicketDisplay[];
      
      setTickets(userTickets);
      setIsLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-2">My Tickets</h1>
        <p className="text-muted-foreground mb-8">View all your purchased tickets</p>
        
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-pulse text-event">Loading tickets...</div>
          </div>
        ) : (
          <>
            {tickets.length === 0 ? (
              <div className="text-center py-16">
                <div className="inline-block p-4 rounded-full bg-event/10 mb-4">
                  <TicketIcon className="h-12 w-12 text-event" />
                </div>
                <h2 className="text-2xl font-bold mb-2">No Tickets Yet</h2>
                <p className="text-muted-foreground mb-6">
                  You haven't purchased any tickets yet.
                </p>
                <Button asChild className="bg-event hover:bg-event-hover">
                  <Link to="/">Browse Events</Link>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {tickets.map((ticket) => (
                  <Card key={ticket.id} className="overflow-hidden">
                    <div className="relative h-40">
                      <img 
                        src={ticket.eventImage} 
                        alt={ticket.eventTitle} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30"></div>
                      <div className="absolute top-0 right-0 bg-event text-white font-medium py-1 px-3 rounded-bl-md">
                        {ticket.ticketType}
                      </div>
                    </div>
                    
                    <CardContent className="p-4">
                      <h3 className="text-lg font-bold mb-2">{ticket.eventTitle}</h3>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{format(parseISO(ticket.eventDate), 'EEE, MMM d, yyyy')} • {ticket.eventTime}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{ticket.eventVenue}, {ticket.eventLocation}</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="text-sm">
                          <span className="font-medium">Quantity:</span> {ticket.quantity}
                        </div>
                        <div className="font-bold">
                          ${(ticket.price * ticket.quantity).toFixed(2)}
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="p-4 pt-0 flex justify-between">
                      <Button variant="outline" asChild>
                        <Link to={`/event/${ticket.eventId}`}>
                          Event Details
                        </Link>
                      </Button>
                      <Button className="bg-event hover:bg-event-hover">
                        <TicketIcon className="h-4 w-4 mr-2" />
                        View Ticket
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </main>
      
      <footer className="bg-gray-50 py-6 border-t mt-12">
        <div className="container text-center text-gray-500">
          <p>&copy; 2025 EventGlide. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default UserTickets;

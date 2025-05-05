
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, ArrowLeft, Plus, Minus, ShoppingCart } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import NavBar from '@/components/NavBar';
import { events, TicketType } from '@/lib/mockData';

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState(events.find(e => e.id === id));
  const [selectedTickets, setSelectedTickets] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleTicketChange = (ticketId: string, action: 'increment' | 'decrement') => {
    const currentCount = selectedTickets[ticketId] || 0;
    const newCount = action === 'increment' ? currentCount + 1 : Math.max(0, currentCount - 1);
    
    setSelectedTickets({
      ...selectedTickets,
      [ticketId]: newCount
    });
  };
  
  const getTotalTickets = () => {
    return Object.values(selectedTickets).reduce((sum, count) => sum + count, 0);
  };
  
  const getTotalPrice = () => {
    if (!event) return 0;
    
    return event.ticketTypes.reduce((total, ticket) => {
      const count = selectedTickets[ticket.id] || 0;
      return total + ticket.price * count;
    }, 0);
  };
  
  const handleAddToCart = () => {
    if (getTotalTickets() === 0) {
      toast({
        title: "Please select tickets",
        description: "You need to select at least one ticket to continue.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Added to cart!",
      description: `${getTotalTickets()} tickets added to your cart.`
    });
    
    // In a real app, this would communicate with a cart system
  };
  
  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="container py-12 flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
            <p className="text-muted-foreground mb-6">The event you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-event">Loading event details...</div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1 container py-6">
        <Link to="/" className="flex items-center text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Events
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Badge className="mb-3 bg-event hover:bg-event-hover">{event.category}</Badge>
            <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
            
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex items-center text-muted-foreground">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{format(parseISO(event.date), 'EEEE, MMMM d, yyyy')}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Clock className="h-5 w-5 mr-2" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{event.venue}, {event.location}</span>
              </div>
            </div>
            
            <div className="rounded-lg overflow-hidden mb-6">
              <img 
                src={event.imageUrl} 
                alt={event.title} 
                className="w-full h-auto max-h-[400px] object-cover"
              />
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-4">About This Event</h2>
              <p className="text-muted-foreground whitespace-pre-line">{event.description}</p>
            </div>
          </div>
          
          <div>
            <div className="sticky top-24 bg-white rounded-lg border p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Select Tickets</h2>
              
              <div className="space-y-4">
                {event.ticketTypes.map((ticket) => (
                  <div key={ticket.id} className="p-4 border rounded-md">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">{ticket.name}</h3>
                        <p className="text-sm text-muted-foreground">{ticket.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">${ticket.price}</div>
                        <div className="text-xs text-muted-foreground">
                          {ticket.available} available
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => handleTicketChange(ticket.id, 'decrement')}
                          disabled={!selectedTickets[ticket.id]}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="mx-4 min-w-[1.5rem] text-center">
                          {selectedTickets[ticket.id] || 0}
                        </span>
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => handleTicketChange(ticket.id, 'increment')}
                          disabled={selectedTickets[ticket.id] === ticket.available}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="font-bold">
                        ${((selectedTickets[ticket.id] || 0) * ticket.price).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium">Total tickets:</span>
                  <span>{getTotalTickets()}</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total price:</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                
                <Button 
                  className="w-full bg-event hover:bg-event-hover" 
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={getTotalTickets() === 0}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" /> 
                  Add to Cart
                </Button>
                
                <p className="text-xs text-center text-muted-foreground">
                  Tickets are held for 10 minutes once added to cart
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-50 py-6 border-t mt-12">
        <div className="container text-center text-gray-500">
          <p>&copy; 2025 EventGlide. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default EventDetail;

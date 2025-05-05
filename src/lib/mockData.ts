
export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  venue: string;
  description: string;
  imageUrl: string;
  category: string;
  featured?: boolean;
  priceRange: string;
  ticketTypes: TicketType[];
}

export interface TicketType {
  id: string;
  name: string;
  price: number;
  description?: string;
  available: number;
}

export const events: Event[] = [
  {
    id: "1",
    title: "Summer Music Festival",
    date: "2025-07-15",
    time: "12:00 PM",
    location: "Central Park",
    venue: "Main Stage",
    description: "Join us for the biggest music festival of the summer featuring top artists and bands from around the world. Experience amazing performances, delicious food, and unforgettable memories.",
    imageUrl: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    category: "Music",
    featured: true,
    priceRange: "$59 - $199",
    ticketTypes: [
      {
        id: "1-1",
        name: "General Admission",
        price: 59,
        description: "Access to all general areas and performances",
        available: 1000
      },
      {
        id: "1-2",
        name: "VIP",
        price: 199,
        description: "Priority entry, exclusive viewing areas, and complimentary drinks",
        available: 200
      }
    ]
  },
  {
    id: "2",
    title: "Tech Conference 2025",
    date: "2025-09-25",
    time: "9:00 AM",
    location: "Convention Center",
    venue: "Main Hall",
    description: "The premier tech event of the year featuring keynote speakers, workshops, and networking opportunities with industry leaders.",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    category: "Conference",
    featured: true,
    priceRange: "$149 - $349",
    ticketTypes: [
      {
        id: "2-1",
        name: "Standard",
        price: 149,
        description: "Access to all talks and expo area",
        available: 500
      },
      {
        id: "2-2",
        name: "Premium",
        price: 349,
        description: "Standard access plus workshops and exclusive networking events",
        available: 100
      }
    ]
  },
  {
    id: "3",
    title: "Comedy Night Special",
    date: "2025-06-10",
    time: "8:00 PM",
    location: "Laugh Factory",
    venue: "Main Stage",
    description: "A night of laughs with top comedians from around the country. Prepare for an evening of hilarious stand-up performances.",
    imageUrl: "https://images.unsplash.com/photo-1527224857830-43a7acc85260?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    category: "Comedy",
    priceRange: "$25 - $45",
    ticketTypes: [
      {
        id: "3-1",
        name: "Standard Seating",
        price: 25,
        available: 150
      },
      {
        id: "3-2",
        name: "Premium Seating",
        price: 45,
        description: "Front section seating",
        available: 50
      }
    ]
  },
  {
    id: "4",
    title: "Basketball Championship",
    date: "2025-08-05",
    time: "7:30 PM",
    location: "Sports Arena",
    venue: "Center Court",
    description: "The final showdown between the top two teams battling for the championship title. Don't miss this thrilling sports event!",
    imageUrl: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    category: "Sports",
    priceRange: "$35 - $120",
    ticketTypes: [
      {
        id: "4-1",
        name: "Upper Level",
        price: 35,
        available: 500
      },
      {
        id: "4-2",
        name: "Lower Level",
        price: 85,
        available: 300
      },
      {
        id: "4-3",
        name: "Courtside",
        price: 120,
        available: 50
      }
    ]
  },
  {
    id: "5",
    title: "Broadway Show: Hamilton",
    date: "2025-07-22",
    time: "7:00 PM",
    location: "Theater District",
    venue: "Broadway Theater",
    description: "The award-winning musical that has captivated audiences worldwide. Experience the story of America's founding father Alexander Hamilton.",
    imageUrl: "https://images.unsplash.com/photo-1503095396549-807759245b35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    category: "Theater",
    priceRange: "$75 - $250",
    ticketTypes: [
      {
        id: "5-1",
        name: "Balcony",
        price: 75,
        available: 200
      },
      {
        id: "5-2",
        name: "Mezzanine",
        price: 150,
        available: 150
      },
      {
        id: "5-3",
        name: "Orchestra",
        price: 250,
        available: 100
      }
    ]
  },
  {
    id: "6",
    title: "Food & Wine Festival",
    date: "2025-06-18",
    time: "11:00 AM",
    location: "Riverside Park",
    venue: "Festival Grounds",
    description: "A celebration of culinary delights featuring top chefs, wine tastings, and gourmet food from around the world.",
    imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    category: "Food",
    priceRange: "$45 - $120",
    ticketTypes: [
      {
        id: "6-1",
        name: "General Entry",
        price: 45,
        description: "Access to festival grounds and demonstrations",
        available: 1000
      },
      {
        id: "6-2",
        name: "Premium Package",
        price: 120,
        description: "General entry plus wine tasting sessions and exclusive chef demos",
        available: 200
      }
    ]
  },
  {
    id: "7",
    title: "Art Exhibition: Modern Masters",
    date: "2025-08-15",
    time: "10:00 AM",
    location: "Metropolitan Museum",
    venue: "Special Exhibitions Wing",
    description: "A rare collection of modern masterpieces from renowned artists, showcasing the evolution of contemporary art.",
    imageUrl: "https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    category: "Art",
    priceRange: "$22 - $30",
    ticketTypes: [
      {
        id: "7-1",
        name: "Standard Entry",
        price: 22,
        available: 500
      },
      {
        id: "7-2",
        name: "Guided Tour",
        price: 30,
        description: "Entry with expert-led tour",
        available: 100
      }
    ]
  },
  {
    id: "8",
    title: "Electronic Dance Music Night",
    date: "2025-07-05",
    time: "9:00 PM",
    location: "Neon Club",
    venue: "Main Hall",
    description: "A night of pulsating beats and electric atmosphere with top DJs spinning the latest tracks.",
    imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    category: "Music",
    priceRange: "$40 - $75",
    ticketTypes: [
      {
        id: "8-1",
        name: "General Admission",
        price: 40,
        available: 300
      },
      {
        id: "8-2",
        name: "VIP",
        price: 75,
        description: "Express entry and access to VIP lounge",
        available: 50
      }
    ]
  }
];

export const categories = [
  "All",
  "Music", 
  "Conference", 
  "Comedy", 
  "Sports", 
  "Theater", 
  "Food", 
  "Art"
];

export interface User {
  id: string;
  name: string;
  email: string;
  tickets: UserTicket[];
}

export interface UserTicket {
  id: string;
  eventId: string;
  ticketTypeId: string;
  quantity: number;
  purchaseDate: string;
}

export const currentUser: User = {
  id: "user1",
  name: "John Doe",
  email: "john.doe@example.com",
  tickets: [
    {
      id: "ticket1",
      eventId: "1",
      ticketTypeId: "1-1",
      quantity: 2,
      purchaseDate: "2025-05-01"
    }
  ]
};

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TicketCard } from '@/components/TicketCard';
import { useRecentTickets, useTickets } from '@/hooks/use-tickets';

// Mock data for featured tickets (aligned with Prisma schema)
export const mockTickets = [
  {
    id: '1',
    venue: 'Madison Square Garden',
    city: 'New York',
    eventDate: '2025-08-15T19:00:00Z',
    eventTime: '7:00 PM',
    category: 'Concert',
    eventName: 'The Weeknd: After Hours Tour',
    numberOfTickets: 2,
    pricePerTicket: 250.0,
    section: 'A',
    row: '12',
    seats: '101, 102',
    ticketType: 'VIP',
    description: 'Floor seats with VIP lounge access',
    imageUrl:
      'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

    createdAt: '2025-05-01T10:30:00Z',
    updatedAt: '2025-05-01T10:30:00Z',
    featured: true,
    seller: {
      id: 'user1',
      email: 'seller1@example.com',
      name: 'John Doe',
      phone: '+1234567890',
      createdAt: '2025-04-15T08:00:00Z',
      updatedAt: '2025-04-15T08:00:00Z',
    },
  },
  {
    id: '2',
    venue: 'Staples Center',
    city: 'Los Angeles',
    eventDate: '2025-07-23T20:30:00Z',
    eventTime: '8:30 PM',
    category: 'Sports',
    eventName: 'LA Lakers vs Brooklyn Nets',
    numberOfTickets: 4,
    pricePerTicket: 180.5,
    section: '210',
    row: 'B',
    seats: '1-4',
    ticketType: 'Standard',
    description: 'Great view from upper level',
    imageUrl:
      'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    createdAt: '2025-04-25T14:15:00Z',
    updatedAt: '2025-04-25T14:15:00Z',
    featured: true,
    seller: {
      id: 'user2',
      email: 'seller2@example.com',
      name: 'Jane Smith',
      phone: '+1987654321',
      createdAt: '2025-03-10T11:20:00Z',
      updatedAt: '2025-03-10T11:20:00Z',
    },
  },
  {
    id: '3',
    venue: 'MetLife Stadium',
    city: 'New York',
    eventDate: '2025-06-10T20:00:00Z',
    eventTime: '8:00 PM',
    category: 'Concert',
    eventName: 'Taylor Swift - The Eras Tour',
    numberOfTickets: 1,
    pricePerTicket: 450.0,
    section: 'Floor',
    row: '5',
    seats: '23',
    ticketType: 'Platinum',
    description: 'Front row floor seats',
    imageUrl:
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    createdAt: '2025-04-10T09:45:00Z',
    updatedAt: '2025-04-10T09:45:00Z',
    featured: true,
    seller: {
      id: 'user3',
      email: 'seller3@example.com',
      name: 'Mike Johnson',
      phone: '+1555123456',
      createdAt: '2025-02-20T07:30:00Z',
      updatedAt: '2025-02-20T07:30:00Z',
    },
  },
];

const FeaturedTickets = () => {
  const { data: tickets = [], isLoading, error } = useRecentTickets(5);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading tickets.</div>;

  return (
    <section className='py-12 md:py-16'>
      <div className='container mx-auto px-4'>
        <div className='flex justify-between items-center mb-8'>
          <h2 className='text-2xl md:text-3xl font-bold'>Featured Tickets</h2>
          <Link to='/tickets'>
            <Button
              variant='ghost'
              className='text-purple-600 hover:text-purple-700 hover:bg-purple-50'
            >
              View all
              <ArrowRight className='ml-2 h-4 w-4' />
            </Button>
          </Link>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {tickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTickets;

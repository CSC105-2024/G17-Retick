import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import exp from 'constants';

// Mock data structure matching your Prisma schema
// const mockTickets = [
//   {
//     id: '1',
//     venue: 'Madison Square Garden',
//     city: 'New York',
//     eventDate: '2023-12-15T19:00:00Z',
//     eventTime: '7:00 PM',
//     category: 'Concert',
//     eventName: 'The Weeknd: After Hours Tour',
//     numberOfTickets: 2,
//     pricePerTicket: 250.0,
//     section: 'A',
//     row: '12',
//     seats: '101, 102',
//     ticketType: 'VIP',
//     description: 'Floor seats with VIP lounge access',
//     imageUrl: 'https://source.unsplash.com/random/300x200/?concert',
//     createdAt: '2023-11-01T10:30:00Z',
//     updatedAt: '2023-11-01T10:30:00Z',
//     seller: {
//       id: 'user1',
//       email: 'seller1@example.com',
//       name: 'John Doe',
//       phone: '+1234567890',
//       createdAt: '2023-10-15T08:00:00Z',
//       updatedAt: '2023-10-15T08:00:00Z',
//     },
//   },
//   {
//     id: '2',
//     venue: 'Staples Center',
//     city: 'Los Angeles',
//     eventDate: '2023-11-20T20:30:00Z',
//     eventTime: '8:30 PM',
//     category: 'Sports',
//     eventName: 'LA Lakers vs Brooklyn Nets',
//     numberOfTickets: 4,
//     pricePerTicket: 180.5,
//     section: '210',
//     row: 'B',
//     seats: '1-4',
//     ticketType: 'Standard',
//     description: 'Great view from upper level',
//     imageUrl: 'https://source.unsplash.com/random/300x200/?basketball',
//     createdAt: '2023-10-25T14:15:00Z',
//     updatedAt: '2023-10-25T14:15:00Z',
//     seller: {
//       id: 'user2',
//       email: 'seller2@example.com',
//       name: 'Jane Smith',
//       phone: '+1987654321',
//       createdAt: '2023-09-10T11:20:00Z',
//       updatedAt: '2023-09-10T11:20:00Z',
//     },
//   },
// ];

interface Ticket {
  id: string;
  venue: string;
  city: string;
  eventDate: string;
  eventTime: string;
  category: string;
  eventName: string;
  numberOfTickets: number;
  pricePerTicket: number;
  section?: string;
  row?: string;
  seats?: string;
  ticketType: string;
  description?: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  seller: {
    id: string;
    email: string;
    name?: string;
    phone?: string;
    createdAt: string;
    updatedAt: string;
  };
}

interface TicketCardProps {
  ticket: Ticket;
}

const getTicketTypeStyle = (ticketType: string) => {
  switch (ticketType.toLowerCase()) {
    case 'vip':
      return 'bg-orange-100 text-orange-800';
    case 'standard':
      return 'bg-blue-100 text-blue-800';
    case 'premium':
      return 'bg-yellow-100 text-yellow-800';
    case 'general admission':
      return 'bg-green-100 text-green-800';
    case 'backstage':
      return 'bg-pink-100 text-pink-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
  const ticketTypeStyle = getTicketTypeStyle(ticket.ticketType);

  return (
    <Link to={`/tickets/${ticket.id}`} className='block'>
      <div className='max-w-sm rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300'>
        {/* Ticket Image */}
        <div className='h-48 bg-gray-200 overflow-hidden'>
          {ticket.imageUrl ? (
            <img
              src={ticket.imageUrl}
              alt={ticket.eventName}
              className='w-full h-full object-cover'
            />
          ) : (
            <div className='w-full h-full flex items-center justify-center text-gray-500'>
              No Image Available
            </div>
          )}
        </div>

        {/* Ticket Details */}
        <div className='p-4'>
          <div className='flex justify-between items-start mb-2'>
            <h3 className='text-xl font-bold text-gray-800 truncate'>
              {ticket.eventName}
            </h3>
            <span
              className={`${ticketTypeStyle} text-xs font-semibold px-2.5 py-0.5 rounded`}
            >
              {ticket.ticketType}
            </span>
          </div>

          <div className='flex items-center text-gray-600 mb-2'>
            <svg
              className='w-4 h-4 mr-1'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
              />
            </svg>
            <span>
              {ticket.venue}, {ticket.city}
            </span>
          </div>

          <div className='flex items-center text-gray-600 mb-2'>
            <svg
              className='w-4 h-4 mr-1'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
              />
            </svg>
            <span className='mr-5'>
              {format(new Date(ticket.eventDate), 'MMM dd, yyyy')}
            </span>
            <svg
              className='w-4 h-4 mr-1'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            <span>{ticket.eventTime}</span>
          </div>

          <div className='flex justify-between items-center mt-4'>
            <div>
              <p className='text-sm text-gray-500'>
                Posted by: {ticket.seller.name || ticket.seller.email}
              </p>
              <p className='text-xs text-gray-400'>
                {format(new Date(ticket.createdAt), 'MMM dd, yyyy')}
              </p>
            </div>
            <div className='text-right'>
              <p className='text-lg font-bold text-gray-900'>
                ${ticket.pricePerTicket.toFixed(2)}
              </p>
              <p className='text-xs text-gray-500'>
                {ticket.numberOfTickets} ticket
                {ticket.numberOfTickets !== 1 ? 's' : ''} available
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

// Example usage with mock data
// const TicketList = () => {
//   return (
//     <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4'>
//       {mockTickets.map((ticket) => (
//         <TicketCard key={ticket.id} ticket={ticket} />
//       ))}
//     </div>
//   );
// };

// export { TicketCard, TicketList, mockTickets };
export { TicketCard };

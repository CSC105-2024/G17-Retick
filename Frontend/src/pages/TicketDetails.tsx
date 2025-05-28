import { useParams } from 'react-router-dom';
import { mockTickets } from '@/components/FeaturedTickets';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useQuery } from '@tanstack/react-query';
import { useTicketById } from '@/hooks/use-tickets';
import { useNavigate } from 'react-router-dom';

const TicketDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: ticket, isLoading, error } = useTicketById(id);
  const navigate = useNavigate();
  // const ticket = mockTickets.find((ticket) => ticket.id === id);

  if (isLoading) {
    return <div className='container mx-auto px-4 py-8'>Loading ticket...</div>;
  }
  if (error) {
    return (
      <div className='container mx-auto px-4 py-8'>Error loading ticket.</div>
    );
  }
  if (!ticket) {
    return <div className='container mx-auto px-4 py-8'>Ticket not found</div>;
  }

  const DEFAULT_IMAGE_URL =
    'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  return (
    <div className='min-h-screen flex flex-col bg-gray-50 justify-between'>
      <Navbar />
      <div className='container mx-auto px-4 py-8'>
        <button
          className='mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded transition'
          onClick={() => navigate('/tickets')}
        >
          &larr; Back to Tickets
        </button>
        <div className='max-w-4xl mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {/* Ticket Image */}
            <div className='bg-gray-100 rounded-lg overflow-hidden'>
              {ticket.imageUrl ? (
                <img
                  src={ticket.imageUrl || DEFAULT_IMAGE_URL}
                  alt={ticket.eventName}
                  className='w-full h-full object-cover'
                  onError={(e) => (e.currentTarget.src = DEFAULT_IMAGE_URL)}
                />
              ) : (
                <div className='w-full h-64 flex items-center justify-center text-gray-500'>
                  No Image Available
                </div>
              )}
            </div>

            {/* Ticket Details */}
            <div>
              <h1 className='text-3xl font-bold mb-2'>{ticket.eventName}</h1>
              <div className='flex items-center text-gray-600 mb-4'>
                <svg
                  className='w-5 h-5 mr-2'
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

              <div className='bg-gray-50 p-4 rounded-lg mb-6'>
                <div className='grid grid-cols-2 gap-4 mb-4'>
                  <div>
                    <p className='text-sm text-gray-500'>Date</p>
                    <p className='font-medium'>
                      {new Date(ticket.eventDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-500'>Time</p>
                    <p className='font-medium'>{ticket.eventTime}</p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-500'>Type</p>
                    <p className='font-medium'>{ticket.ticketType}</p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-500'>Available</p>
                    <p className='font-medium'>
                      {ticket.numberOfTickets} ticket
                      {ticket.numberOfTickets !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                {ticket.section && ticket.row && ticket.seats && (
                  <div className='mb-4'>
                    <p className='text-sm text-gray-500'>Seat Details</p>
                    <p className='font-medium'>
                      Section {ticket.section}, Row {ticket.row}, Seats{' '}
                      {ticket.seats}
                    </p>
                  </div>
                )}

                <div className='flex justify-between items-center'>
                  <div>
                    <p className='text-sm text-gray-500'>Price per ticket</p>
                    <p className='text-2xl font-bold'>
                      ${ticket.pricePerTicket.toFixed(2)}
                    </p>
                  </div>
                  {/* <button className='bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg'>
                    Buy Now
                  </button> */}
                </div>
              </div>

              {ticket.description && (
                <div className='mb-6'>
                  <h3 className='text-lg font-semibold mb-2'>Description</h3>
                  <p className='text-gray-700'>{ticket.description}</p>
                </div>
              )}

              <div className='border-t pt-4'>
                <h3 className='text-lg font-semibold mb-2'>
                  Seller Information
                </h3>
                <div className='flex items-center'>
                  <div className='bg-purple-100 text-purple-800 rounded-full w-10 h-10 flex items-center justify-center mr-3'>
                    {ticket.seller.name?.charAt(0) ||
                      ticket.seller.email.charAt(0)}
                  </div>
                  <div>
                    <p className='font-medium'>
                      {ticket.seller.name || ticket.seller.email}
                    </p>
                    <p className='text-sm text-gray-500'>
                      Member since{' '}
                      {new Date(ticket.seller.createdAt).toLocaleDateString()}
                    </p>
                    <p className=''>
                      Phone: {ticket.seller.phone || 'Unknown'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TicketDetails;

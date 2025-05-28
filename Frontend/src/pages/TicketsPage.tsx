import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { TicketCard } from '@/components/TicketCard';
import SearchBar from '@/components/SearchBar';
import { Button } from '@/components/ui/button';
import { useTickets } from '../hooks/use-tickets';

const categories = [
  'All',
  'Pop',
  'Rock',
  'Hip-Hop',
  'R&B',
  'Country',
  'Electronic',
  'Classical',
  'Jazz',
  'Other',
];

const TicketsPage = () => {
  const { data: tickets = [], isLoading, error } = useTickets();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const [filteredTickets, setFilteredTickets] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    // Filter tickets based on search query and category
    let result = [...tickets];

    if (query) {
      const lowerQuery = query.toLowerCase();
      result = result.filter(
        (ticket) =>
          ticket.eventName.toLowerCase().includes(lowerQuery) ||
          ticket.venue.toLowerCase().includes(lowerQuery) ||
          ticket.city.toLowerCase().includes(lowerQuery)
      );
    }

    if (selectedCategory !== 'All') {
      result = result.filter((ticket) => ticket.category === selectedCategory);
    }

    setFilteredTickets(result);
  }, [tickets, query, selectedCategory]);

  if (isLoading) return <div>Loading tickets...</div>;
  if (error) return <div>Error loading tickets.</div>;

  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />

      <main className='flex-grow'>
        <div className='bg-ticket-dark py-10'>
          <div className='container mx-auto px-4'>
            <h1 className='text-3xl md:text-4xl font-bold text-white mb-6'>
              {query ? `Results for "${query}"` : 'Browse Tickets'}
            </h1>
            <div className='max-w-2xl'>
              <SearchBar />
            </div>
          </div>
        </div>

        <div className='container mx-auto px-4 py-8'>
          <div className='mb-8 overflow-x-auto pb-2'>
            <div className='flex space-x-2'>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? 'default' : 'outline'
                  }
                  className={
                    selectedCategory === category
                      ? 'bg-purple-600 hover:bg-purple-700'
                      : ''
                  }
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {filteredTickets.length === 0 ? (
            <div className='text-center py-12'>
              <h3 className='text-xl font-semibold mb-2'>No tickets found</h3>
              <p className='text-gray-600'>
                Try adjusting your search or filters to find what you're looking
                for.
              </p>
            </div>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {filteredTickets.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TicketsPage;

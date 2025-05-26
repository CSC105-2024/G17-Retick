import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Edit } from 'lucide-react';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProfile } from '@/api/user';
import { useTickets } from '../hooks/use-tickets';

// Mock user data
// const user = {
//   id: '123',
//   name: 'John Doe',
//   email: 'john@example.com',
//   avatarUrl: '',
//   joinedDate: 'March 2023',
// };

// Mock purchase history
// const purchaseHistory = [
//   {
//     id: 'purchase1',
//     eventName: 'Taylor Swift - The Eras Tour',
//     venue: 'SoFi Stadium, Los Angeles',
//     date: 'August 15, 2025',
//     price: 150,
//     quantity: 2,
//     status: 'Confirmed',
//     ticketType: 'General Admission',
//   },
//   {
//     id: 'purchase2',
//     eventName: 'Coldplay - Music Of The Spheres Tour',
//     venue: 'MetLife Stadium, New York',
//     date: 'July 23, 2025',
//     price: 120,
//     quantity: 1,
//     status: 'Confirmed',
//     ticketType: 'Section A, Row 15',
//   },
// ];

// // Mock listing history
// const listingHistory = [
//   {
//     id: 'listing1',
//     eventName: 'Bruno Mars - 24K Magic World Tour',
//     venue: 'Allegiant Stadium, Las Vegas',
//     date: 'October 15, 2025',
//     price: 200,
//     quantity: 2,
//     status: 'Active',
//     ticketType: 'Section B, Row 8, Seats 5-6',
//   },
// ];

const Profile = () => {
  const [openPurchaseId, setOpenPurchaseId] = useState<string | null>(null);
  const { data: res = [], isTicketLoading, ticketError } = useTickets();
  // console.log('Tickets data:', res);
  const {
    data: response,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  });

  const user = response?.user;
  const tickets = res || [];

  const listingHistory = tickets
    .map((ticket) => (ticket.sellerId === user?.id ? ticket : null))
    .filter(Boolean)
    .map((ticket) => ({
      id: ticket.id,
      eventName: ticket.eventName,
      venue: ticket.venue,
      date: new Date(ticket.eventDate).toLocaleDateString(),
      price: ticket.pricePerTicket,
      quantity: ticket.numberOfTickets,
      status: ticket.status,
      ticketType: ticket.ticketType,
    }));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading profile</div>;
  if (!user) return <div>No user data</div>;
  if (isTicketLoading) return <div>Loading tickets...</div>;
  if (ticketError) return <div>Error loading tickets.</div>;
  console.log('User data:', user);
  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />

      <main className='flex-grow bg-gray-50'>
        <div className='container mx-auto px-4 py-8'>
          <div className='flex flex-col md:flex-row gap-8'>
            {/* Profile Sidebar */}
            <div className='w-full md:w-1/3 lg:w-1/4'>
              <Card className='mb-6'>
                <CardContent className='p-6'>
                  <div className='flex flex-col items-center text-center'>
                    <Avatar className='h-24 w-24 mb-4'>
                      <AvatarImage src={user.avatarUrl} alt={user.name} />
                      <AvatarFallback className='text-2xl bg-purple-100 text-purple-600'>
                        {user.name?.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <h2 className='text-xl font-bold mb-1'>{user.name}</h2>
                    {/* <p className='text-sm text-gray-500'>
                      Member since {user.joinedDate}
                    </p> */}

                    <Button className='mt-4 w-full bg-purple-600 hover:bg-purple-700'>
                      <Edit className='h-4 w-4 mr-2' />
                      Edit Profile
                    </Button>
                    <Button
                      className='mt-2 w-full bg-red-500 hover:bg-red-800'
                      onClick={() =>
                        alert('Logout functionality not implemented')
                      }
                    >
                      Logout
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className='flex-1'>
              <Card className='mb-6'>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your personal details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className='space-y-4'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      {/* <div className='space-y-2'>
                        <Label htmlFor='first-name'>First name</Label>
                        <Input id='first-name' defaultValue='John' />
                      </div> */}
                      <div className='space-y-2'>
                        <Label htmlFor='name'>Name</Label>
                        <Input id='name' defaultValue={user?.name || ''} />
                      </div>
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='email'>Email address</Label>
                      <Input
                        id='email'
                        type='email'
                        defaultValue={user.email || ' '}
                      />
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='phone'>Phone number</Label>
                      <Input
                        id='phone'
                        type='tel'
                        placeholder={user.phone || 'Enter your phone number'}
                      />
                    </div>

                    <Button
                      type='submit'
                      className='bg-purple-600 hover:bg-purple-700'
                    >
                      Save Changes
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Ticket Activity</CardTitle>
                  <CardDescription>
                    Manage your ticket purchases and listings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue='purchases'>
                    <TabsList className='mb-4'>
                      <TabsTrigger value='listings'>My Listings</TabsTrigger>
                    </TabsList>

                    {/* Listings Tab */}
                    <TabsContent value='listings'>
                      {listingHistory.length > 0 ? (
                        <div className='space-y-4'>
                          {listingHistory.map((listing) => (
                            <div
                              key={listing.id}
                              className='border rounded-md p-4'
                            >
                              <div className='flex justify-between mb-2'>
                                <h3 className='font-semibold text-lg'>
                                  {listing.eventName}
                                </h3>
                                <span
                                  className={`px-2 py-1 text-xs font-bold rounded-full ${
                                    listing.status === 'Active'
                                      ? 'bg-blue-100 text-blue-700'
                                      : listing.status === 'Sold'
                                      ? 'bg-green-100 text-green-700'
                                      : 'bg-gray-100 text-gray-700'
                                  }`}
                                >
                                  {listing.status}
                                </span>
                              </div>
                              <p className='text-gray-600 mb-1'>
                                {listing.venue}
                              </p>
                              <p className='text-gray-600 mb-1'>
                                {listing.date}
                              </p>
                              <div className='flex justify-between mt-3'>
                                <span className='text-gray-600'>
                                  {listing.quantity} x {listing.ticketType}
                                </span>
                                <span className='font-semibold'>
                                  $
                                  {(listing.price * listing.quantity).toFixed(
                                    2
                                  )}
                                </span>
                              </div>
                              <div className='mt-4 flex justify-end gap-2'>
                                <Button variant='outline' size='sm'>
                                  Edit Listing
                                </Button>
                                <Button
                                  variant='outline'
                                  size='sm'
                                  className='text-red-600 hover:bg-red-50'
                                >
                                  Cancel Listing
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className='text-center py-8'>
                          <p className='text-gray-500'>
                            You haven't listed any tickets for sale yet.
                          </p>
                          <Button className='mt-4 bg-purple-600 hover:bg-purple-700'>
                            Sell Tickets
                          </Button>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;

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
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProfile, logoutUser } from '@/api/user';
import {
  useDeleteTicket,
  useTickets,
  useUpdateTicket,
} from '../hooks/use-tickets';
import { useNavigate } from 'react-router-dom';
import { useUpdateProfile } from '@/hooks/use-users';

const Profile = () => {
  const navigate = useNavigate();
  const [editProfile, setEditProfile] = useState(false);
  const [profileError, setProfileError] = useState('');
  const [openPurchaseId, setOpenPurchaseId] = useState<string | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editTicket, setEditTicket] = useState<any>(null);
  const { data: res = [], isTicketLoading, ticketError } = useTickets();
  const { mutate: updateTicket, isLoading: isUpdating } = useUpdateTicket();
  const { mutate: deleteTicket, isLoading: isDeleting } = useDeleteTicket();
  const { mutate: updateProfileMutate, isLoading: isProfileUpdating } =
    useUpdateProfile();

  const {
    data: response,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    // retry: 3,
    onError: (err) => {
      console.error('Error fetching profile:', err);
      navigate('login');
    },
  });

  const user = response?.user;
  const tickets = res || [];

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setPhone(user.phone || '');
      setEmail(user.email || '');
    }
  }, [user]);

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
      section: ticket.section,
      row: ticket.row,
      seats: ticket.seats,
      description: ticket.description,
      imageUrl: ticket.imageUrl,
      eventDate: ticket.eventDate,
      eventTime: ticket.eventTime,
      category: ticket.category,
    }));

  // Edit Modal handlers
  const openEditModal = (ticket: any) => {
    setEditTicket(ticket);
    setEditModalOpen(true);
  };
  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditTicket(null);
  };
  const handleEditSave = () => {
    if (!editTicket) return;
    updateTicket(
      { id: editTicket.id, data: editTicket },
      {
        onSuccess: () => {
          closeEditModal();
        },
      }
    );
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateProfile()) return;
    updateProfileMutate(
      { name, phone },
      {
        onSuccess: () => {
          setEditProfile(false);
          setProfileError('');
        },
        onError: () => {
          setProfileError('Failed to update profile');
        },
      }
    );
  };

  const validateProfile = () => {
    if (!name.trim() || name.length < 2) {
      setProfileError('Name must be at least 2 characters.');
      return false;
    }
    if (!phone.trim() || !/^\d{10}$/.test(phone)) {
      setProfileError('Phone number must be 10 digits.');
      return false;
    }
    setProfileError('');
    return true;
  };

  const handleLogout = async () => {
    try {
      const res = await logoutUser();
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Failed to logout. Please try again.');
    } finally {
      localStorage.clear();
      sessionStorage.clear();
      navigate('/login');
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading profile</div>;
  if (!user) return <div>No user data</div>;
  if (isTicketLoading) return <div>Loading tickets...</div>;
  if (ticketError) return <div>Error loading tickets.</div>;

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
                    <Button
                      className='mt-4 w-full bg-purple-600 hover:bg-purple-700'
                      onClick={() => setEditProfile(!editProfile)}
                    >
                      <Edit className='h-4 w-4 mr-2' />
                      Edit Profile
                    </Button>
                    <Button
                      className='mt-2 w-full bg-red-500 hover:bg-red-800'
                      onClick={handleLogout}
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
                  <form className='space-y-4' onSubmit={handleProfileSubmit}>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div className='space-y-2'>
                        <Label htmlFor='name'>Name</Label>
                        <Input
                          id='name'
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          // defaultValue={user?.name || ''}
                          disabled={!editProfile}
                        />
                      </div>
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='email'>Email address</Label>
                      <Input
                        id='email'
                        type='email'
                        value={user.email}
                        disabled
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='phone'>Phone number</Label>
                      <Input
                        id='phone'
                        type='tel'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        disabled={!editProfile}
                      />
                    </div>
                    {profileError && (
                      <div className='text-red-600 text-sm mb-2'>
                        {profileError}
                      </div>
                    )}
                    {editProfile && (
                      <Button
                        type='submit'
                        className='bg-purple-600 hover:bg-purple-700'
                        disabled={isProfileUpdating}
                      >
                        {isProfileUpdating ? 'Saving...' : 'Save Changes'}
                      </Button>
                    )}
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
                  <Tabs defaultValue='listings'>
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
                                <Button
                                  variant='outline'
                                  size='sm'
                                  onClick={() => openEditModal(listing)}
                                >
                                  Edit Listing
                                </Button>
                                <Button
                                  variant='outline'
                                  size='sm'
                                  className='text-red-600 hover:bg-red-500'
                                  onClick={() => deleteTicket(listing.id)}
                                  disabled={isDeleting}
                                >
                                  {isDeleting
                                    ? 'Cancelling...'
                                    : 'Cancel Listing'}
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
                          <Button
                            className='mt-4 bg-purple-600 hover:bg-purple-700'
                            onClick={() => navigate('/sell')}
                          >
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

      {/* Edit Listing Modal */}
      {editModalOpen && editTicket && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40'>
          <div className='bg-white rounded-lg p-6 w-full max-w-lg shadow-lg'>
            <h2 className='text-xl font-bold mb-4'>Edit Listing</h2>
            <div className='space-y-2'>
              <Label>Event Name</Label>
              <Input
                value={editTicket.eventName}
                onChange={(e) =>
                  setEditTicket({ ...editTicket, eventName: e.target.value })
                }
              />
              <Label>Venue</Label>
              <Input
                value={editTicket.venue}
                onChange={(e) =>
                  setEditTicket({ ...editTicket, venue: e.target.value })
                }
              />
              <Label>Price Per Ticket</Label>
              <Input
                type='number'
                value={editTicket.price}
                onChange={(e) =>
                  setEditTicket({
                    ...editTicket,
                    pricePerTicket: Number(e.target.value),
                  })
                }
              />
              {/* Add more fields as needed */}
            </div>
            <div className='flex justify-end gap-2 mt-4'>
              <Button variant='outline' onClick={closeEditModal}>
                Cancel
              </Button>
              <Button
                className='bg-purple-600 hover:bg-purple-700'
                onClick={handleEditSave}
                disabled={isUpdating}
              >
                {isUpdating ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Profile;

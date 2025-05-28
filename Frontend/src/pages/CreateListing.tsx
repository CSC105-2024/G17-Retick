import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTicket } from '@/api/ticket';

const initialForm = {
  eventName: '',
  venue: '',
  city: '',
  eventDate: '',
  eventTime: '',
  category: '',
  numberOfTickets: 1,
  pricePerTicket: 0.0,
  section: '',
  row: '',
  seats: '',
  ticketType: '',
  description: '',
  imageUrl: '', // Accept image URL only
};

const CreateListing = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialForm);

  const queryClient = useQueryClient();
  const { mutate, isLoading: isSubmitting } = useMutation({
    mutationFn: createTicket,
    onSuccess: () => {
      queryClient.invalidateQueries(['tickets']);
      setStep(1);
      setForm(initialForm);
      alert('Listing published!');
    },
    onError: () => {
      alert('Failed to publish listing.');
    },
  });

  const nextStep = () => {
    setStep(step + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />

      <main className='flex-grow bg-gray-50 py-10'>
        <div className='container mx-auto px-4'>
          <div className='max-w-3xl mx-auto'>
            <h1 className='text-3xl font-bold mb-2'>Sell Your Tickets</h1>
            <p className='text-gray-600 mb-8'>
              List your tickets on ReTick and connect with fans looking for
              exactly what you have.
            </p>

            {/* Step Indicator */}
            <div className='flex items-center mb-8'>
              <div
                className={`flex items-center justify-center h-8 w-8 rounded-full ${
                  step >= 1 ? 'bg-purple-600 text-white' : 'bg-gray-200'
                }`}
              >
                1
              </div>
              <div
                className={`h-1 flex-1 mx-1 ${
                  step >= 2 ? 'bg-purple-600' : 'bg-gray-200'
                }`}
              ></div>
              <div
                className={`flex items-center justify-center h-8 w-8 rounded-full ${
                  step >= 2 ? 'bg-purple-600 text-white' : 'bg-gray-200'
                }`}
              >
                2
              </div>
              <div
                className={`h-1 flex-1 mx-1 ${
                  step >= 3 ? 'bg-purple-600' : 'bg-gray-200'
                }`}
              ></div>
              <div
                className={`flex items-center justify-center h-8 w-8 rounded-full ${
                  step >= 3 ? 'bg-purple-600 text-white' : 'bg-gray-200'
                }`}
              >
                3
              </div>
            </div>

            {/* Step 1 */}
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Step 1: Choose the Event</CardTitle>
                  <CardDescription>
                    Select the event for which you're selling tickets
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-6'>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='event-name'>Event Name</Label>
                      <Input
                        id='event-name'
                        placeholder='e.g., Taylor Swift - The Eras Tour'
                        value={form.eventName}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, eventName: e.target.value }))
                        }
                        required
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='event-venue'>Venue</Label>
                      <Input
                        id='event-venue'
                        placeholder='e.g., Madison Square Garden'
                        value={form.venue}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, venue: e.target.value }))
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='event-city'>City</Label>
                      <Input
                        id='event-city'
                        placeholder='e.g., New York'
                        value={form.city}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, city: e.target.value }))
                        }
                        required
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='event-date'>Date</Label>
                      <Input
                        id='event-date'
                        type='date'
                        value={form.eventDate}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, eventDate: e.target.value }))
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='event-time'>Time</Label>
                      <Input
                        id='event-time'
                        type='time'
                        value={form.eventTime}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, eventTime: e.target.value }))
                        }
                        required
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='event-category'>Category</Label>
                      <Select
                        value={form.category}
                        onValueChange={(val) =>
                          setForm((f) => ({ ...f, category: val }))
                        }
                      >
                        <SelectTrigger id='event-category'>
                          <SelectValue placeholder='Select category' />
                        </SelectTrigger>
                        <SelectContent>
                          {[
                            'Pop',
                            'Rock',
                            'Hip-Hop',
                            'R&B',
                            'Country',
                            'Electronic',
                            'Classical',
                            'Jazz',
                            'Other',
                          ].map((genre) => (
                            <SelectItem key={genre} value={genre}>
                              {genre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className='flex justify-end'>
                    <Button
                      onClick={nextStep}
                      className='bg-purple-600 hover:bg-purple-700'
                    >
                      Continue
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Step 2: Ticket Details</CardTitle>
                  <CardDescription>Tell us about your tickets</CardDescription>
                </CardHeader>
                <CardContent className='space-y-6'>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='ticket-quantity'>Number of tickets</Label>
                      <Input
                        id='ticket-quantity'
                        type='number'
                        min='1'
                        value={form.numberOfTickets}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            numberOfTickets: Number(e.target.value),
                          }))
                        }
                        required
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='ticket-price'>Price per ticket ($)</Label>
                      <Input
                        id='ticket-price'
                        type='number'
                        min='0'
                        step='0.01'
                        value={form.pricePerTicket}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            pricePerTicket: e.target.value,
                          }))
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='ticket-section'>Section</Label>
                    <Input
                      id='ticket-section'
                      placeholder='e.g., 101, VIP, General Admission'
                      value={form.section}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, section: e.target.value }))
                      }
                    />
                  </div>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='ticket-row'>Row</Label>
                      <Input
                        id='ticket-row'
                        placeholder='e.g., A, 10'
                        value={form.row}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, row: e.target.value }))
                        }
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='ticket-seat'>Seat(s)</Label>
                      <Input
                        id='ticket-seat'
                        placeholder='e.g., 1-2 or 15, 16'
                        value={form.seats}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, seats: e.target.value }))
                        }
                      />
                    </div>
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='ticket-type'>Ticket Type</Label>
                    <Select
                      value={form.ticketType}
                      onValueChange={(val) =>
                        setForm((f) => ({ ...f, ticketType: val }))
                      }
                    >
                      <SelectTrigger id='ticket-type'>
                        <SelectValue placeholder='Select ticket type' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='VIP'>VIP</SelectItem>
                        <SelectItem value='Standard'>Standard</SelectItem>
                        <SelectItem value='General Admission'>
                          General Admission
                        </SelectItem>
                        <SelectItem value='Premium'>Premium</SelectItem>
                        <SelectItem value='Backstage'>Backstage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='ticket-description'>
                      Additional information (optional)
                    </Label>
                    <Textarea
                      id='ticket-description'
                      placeholder='Add any details about your tickets that might be helpful for buyers.'
                      className='min-h-[100px]'
                      value={form.description}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, description: e.target.value }))
                      }
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='ticket-image-url'>
                      Ticket Image URL (optional)
                    </Label>
                    <Input
                      id='ticket-image-url'
                      placeholder='Paste image URL here'
                      value={form.imageUrl}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, imageUrl: e.target.value }))
                      }
                    />
                  </div>
                  <div className='flex justify-between'>
                    <Button variant='outline' onClick={prevStep}>
                      Back
                    </Button>
                    <Button
                      onClick={nextStep}
                      className='bg-purple-600 hover:bg-purple-700'
                    >
                      Continue
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>Step 3: Review & Confirm</CardTitle>
                  <CardDescription>
                    Review your listing details before publishing
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-6'>
                  {/* Event Summary */}
                  <div className='border rounded-md p-4'>
                    <h3 className='font-semibold text-lg mb-4'>
                      Event Details
                    </h3>
                    <div className='grid grid-cols-3 gap-y-2'>
                      <div className='text-gray-600'>Event:</div>
                      <div className='col-span-2 font-medium'>
                        {form.eventName}
                      </div>
                      <div className='text-gray-600'>Venue:</div>
                      <div className='col-span-2 font-medium'>{form.venue}</div>
                      <div className='text-gray-600'>Location:</div>
                      <div className='col-span-2 font-medium'>{form.city}</div>
                      <div className='text-gray-600'>Date & Time:</div>
                      <div className='col-span-2 font-medium'>
                        {form.eventDate} at {form.eventTime}
                      </div>
                      <div className='text-gray-600'>Category:</div>
                      <div className='col-span-2 font-medium'>
                        {form.category}
                      </div>
                    </div>
                  </div>
                  {/* Ticket Summary */}
                  <div className='border rounded-md p-4'>
                    <h3 className='font-semibold text-lg mb-4'>
                      Ticket Details
                    </h3>
                    <div className='grid grid-cols-3 gap-y-2'>
                      <div className='text-gray-600'>Quantity:</div>
                      <div className='col-span-2 font-medium'>
                        {form.numberOfTickets} ticket
                        {form.numberOfTickets > 1 ? 's' : ''}
                      </div>
                      <div className='text-gray-600'>Price per ticket:</div>
                      <div className='col-span-2 font-medium'>
                        ${form.pricePerTicket}
                      </div>
                      <div className='text-gray-600'>Section:</div>
                      <div className='col-span-2 font-medium'>
                        {form.section}
                      </div>
                      <div className='text-gray-600'>Row:</div>
                      <div className='col-span-2 font-medium'>{form.row}</div>
                      <div className='text-gray-600'>Seats:</div>
                      <div className='col-span-2 font-medium'>{form.seats}</div>
                      <div className='text-gray-600'>Ticket Type:</div>
                      <div className='col-span-2 font-medium'>
                        {form.ticketType}
                      </div>
                      <div className='text-gray-600'>Description:</div>
                      <div className='col-span-2 font-medium'>
                        {form.description}
                      </div>
                      <div className='text-gray-600'>Image URL:</div>
                      <div className='col-span-2 font-medium'>
                        {form.imageUrl ? (
                          <img
                            src={form.imageUrl}
                            alt='Ticket'
                            className='max-h-32 rounded'
                          />
                        ) : (
                          <span className='text-gray-400'>No image</span>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Pricing Summary */}
                  <div className='border rounded-md p-4'>
                    <h3 className='font-semibold text-lg mb-4'>
                      Pricing Summary
                    </h3>
                    <div className='space-y-2'>
                      <div className='flex justify-between'>
                        <span className='text-gray-600'>
                          Ticket Price ({form.numberOfTickets} x $
                          {form.pricePerTicket})
                        </span>
                        <span className='font-medium'>
                          $
                          {(
                            Number(form.numberOfTickets) *
                            Number(form.pricePerTicket || 0)
                          ).toFixed(2)}
                        </span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-gray-600'>ReTick Fee (5%)</span>
                        <span className='font-medium'>
                          $
                          {(
                            Number(form.numberOfTickets) *
                            Number(form.pricePerTicket || 0) *
                            0.05
                          ).toFixed(2)}
                        </span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-gray-600'>
                          Payment Processing Fee (3%)
                        </span>
                        <span className='font-medium'>
                          $
                          {(
                            Number(form.numberOfTickets) *
                            Number(form.pricePerTicket || 0) *
                            0.03
                          ).toFixed(2)}
                        </span>
                      </div>
                      <div className='border-t border-gray-200 pt-2 mt-2 flex justify-between'>
                        <span className='font-semibold'>You'll Receive</span>
                        <span className='font-bold text-lg'>
                          $
                          {(
                            Number(form.numberOfTickets) *
                            Number(form.pricePerTicket || 0) *
                            0.92
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className='flex justify-between'>
                    <Button variant='outline' onClick={prevStep}>
                      Back
                    </Button>
                    <Button
                      className='bg-purple-600 hover:bg-purple-700'
                      onClick={() => mutate(form)}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Publishing...' : 'Publish Listing'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CreateListing;

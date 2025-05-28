import { Axios } from '../../axiosInstance';
// const userId = '5bd6c2f7-fe48-436a-a455-f7c96b969678';

export const getAllTickets = async () => {
  const response = await Axios.get('/tickets');
  return response.data.data;
};

export const getTicketById = async (id: string) => {
  const response = await Axios.get(`/tickets/${id}`);
  return response.data.data;
};

export const getRecentTickets = async (limit = 5, category?: string) => {
  const params: any = { limit };
  if (category) params.category = category;
  const response = await Axios.get('/tickets', { params });
  return response.data.data;
};

export const createTicket = async (data: any) => {
  const { eventDate, eventTime, pricePerTicket, ...rest } = data;
  const combinedDateTime = new Date(`${eventDate}T${eventTime}:00`);
  const newData = {
    ...rest,
    eventDate: combinedDateTime.toISOString(),
    eventTime: eventTime, // optional: keep this if backend uses it
    pricePerTicket: Number(pricePerTicket), // convert to number
    imageUrl: data.imageUrl || null, // ensure null if empty
    // sellerId: userId,
  };
  console.log('Creating ticket with data:', newData);
  const response = await Axios.post('/tickets', newData);
  return response.data;
};

export const updateTicket = async (id: string, data: any) => {
  const response = await Axios.put(`/tickets/${id}`, data);
  return response.data;
};

export const deleteTicket = async (id: string) => {
  const response = await Axios.delete(`/tickets/${id}`);
  return response.data;
};

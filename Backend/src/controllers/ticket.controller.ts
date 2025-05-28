import type { Context } from 'hono';
import {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
} from '../models/ticket.model.ts';

export const createTicketController = async (c: Context) => {
  try {
    const body = await c.req.json();
    const sellerId = c.user?.id;
    const newTicket = await createTicket({ ...body, sellerId });
    return c.json({ success: true, data: newTicket });
  } catch (error) {
    console.error(error);
    return c.json({ success: false, message: 'Failed to create ticket' }, 500);
  }
};

export const getAllTicketsController = async (c: Context) => {
  const limitParam = c.req.query('limit');
  const limit = limitParam !== undefined ? Number(limitParam) : undefined;
  const category = c.req.query('category');
  const tickets = await getAllTickets(limit, category);
  return c.json({ success: true, data: tickets });
};

export const getTicketByIdController = async (c: Context) => {
  const id = c.req.param('id');
  const ticket = await getTicketById(id);
  if (!ticket) {
    return c.json({ success: false, message: 'Ticket not found' }, 404);
  }
  return c.json({ success: true, data: ticket });
};

export const updateTicketController = async (c: Context) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  const userId = c.user?.id;

  const ticket = await getTicketById(id);
  if (!ticket) {
    return c.json({ success: false, message: 'Ticket not found' }, 404);
  }
  if (ticket.sellerId !== userId) {
    return c.json({ success: false, message: 'Unauthorized' }, 403);
  }

  try {
    const data = {
      venue: body.venue,
      city: body.city,
      eventDate: new Date(body.eventDate),
      eventTime: body.eventTime,
      category: body.category,
      eventName: body.eventName,
      numberOfTickets: body.numberOfTickets,
      pricePerTicket: body.pricePerTicket,
      section: body.section,
      row: body.row,
      seats: body.seats,
      ticketType: body.ticketType,
      description: body.description,
      imageUrl: body.imageUrl,
    };

    const updated = await updateTicket(id, data);
    return c.json({ success: true, data: updated });
  } catch (error) {
    console.error('Update error:', error);
    return c.json({ success: false, message: 'Update failed' }, 400);
  }
};

export const deleteTicketController = async (c: Context) => {
  const id = c.req.param('id');
  const userId = c.user?.id;

  const ticket = await getTicketById(id);
  if (!ticket) {
    return c.json({ success: false, message: 'Ticket not found' }, 404);
  }
  if (ticket.sellerId !== userId) {
    return c.json({ success: false, message: 'Unauthorized' }, 403);
  }

  try {
    await deleteTicket(id);
    return c.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    return c.json({ success: false, message: 'Delete failed' }, 400);
  }
};

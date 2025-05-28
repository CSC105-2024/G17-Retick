import { db } from '../index.ts';

const DEFAULT_IMAGE_URL =
  'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export const createTicket = async (data: any) => {
  const ticket = await db.ticket.create({
    data: {
      ...data,
      imageUrl: data.imageUrl?.trim() ? data.imageUrl : DEFAULT_IMAGE_URL,
    },
  });
  return ticket;
};

export const getAllTickets = async (limit?: number, category?: string) => {
  const take = typeof limit === 'number' && !isNaN(limit) ? limit : undefined;
  return await db.ticket.findMany({
    ...(take !== undefined ? { take } : {}),
    where: category ? { category } : undefined,
    orderBy: { createdAt: 'desc' },
    include: { seller: true },
  });
};

export const getTicketById = async (id: string) => {
  return await db.ticket.findUnique({
    where: { id },
    include: { seller: true },
  });
};

export const updateTicket = async (id: string, data: any) => {
  return await db.ticket.update({
    where: { id },
    data,
  });
};

export const deleteTicket = async (id: string) => {
  return await db.ticket.delete({
    where: { id },
  });
};

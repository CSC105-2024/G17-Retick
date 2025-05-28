import { Hono } from 'hono';
import * as ticketController from '../controllers/ticket.controller.ts';
import { authMiddleware } from '../middleware/auth.ts';

const ticketRouter = new Hono();

ticketRouter.post('/', authMiddleware, ticketController.createTicketController);
ticketRouter.get('/', ticketController.getAllTicketsController);
ticketRouter.get('/:id', ticketController.getTicketByIdController);
ticketRouter.put(
  '/:id',
  authMiddleware,
  ticketController.updateTicketController
);
ticketRouter.delete('/:id', authMiddleware, ticketController.deleteTicketController);

export { ticketRouter };

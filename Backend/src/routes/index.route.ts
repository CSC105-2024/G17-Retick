import { Hono } from "hono";
import { userRouter } from "./user.route.ts";
import { ticketRouter } from "./ticket.route.ts";
const mainRouter = new Hono();

mainRouter.route("/users", userRouter);
mainRouter.route("/tickets", ticketRouter);
export { mainRouter };

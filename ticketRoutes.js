import express from "express";
import { CreateTicket, getAllTickets,getTicketById, updateTicketStatus, deleteTicket } from "../controllers/ticketController.js";

const router = express.Router();
router.route("/").get(getAllTickets).post(CreateTicket);
router.route("/:id").get(getTicketById).delete(deleteTicket);

router.patch("/:id/status", updateTicketStatus);

export default router;
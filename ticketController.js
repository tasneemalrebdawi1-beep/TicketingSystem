import Ticket from "../models/tickets.js";
/////////////////// PoST :

export const CreateTicket = async (req, res) => {
    try {
        const {Title, Description , CustomerEmail , Priority} = req.body;
        if (!Title || !Description || !CustomerEmail || !Priority) {
            return res.status(400).json ({
                success : false,
                message : "All Field are require"
            });
        }
        if (Title.length > 100) {
            return res.status(400).json({
                success : false,
                message : "Title must be less than 100 Charaters"
            })
        }
        if (!CustomerEmail.includes("@") || !CustomerEmail.includes(".")) {
            return res.status(400).json({
                success : false,
                message : "Invalid Email"
            })
        }
        const newTicket = await Ticket.create({
            Title , Description , CustomerEmail , Priority
        });
        res.status(201).json({
            success : true,
            message : "Ticket Created Successfully .. ",
            data : newTicket     
        });

    } catch(error) {
        res.status(404).json({
            success : false,
            message : error.message
        });
    }
};

////////////// Get :

export const getAllTickets = async (req , res) => {
    try { 
        const ticket = await Ticket.find();
        res.status(200).json({
            success : true,
            count : ticket.length,
            data : ticket
        });
    } 
    catch(error) {
        res.status(500).json({
            success : false,
            message : error.message
        });
     }
}

///////// get by id :
export const getTicketById = async (req , res) => {
    try { 
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) {
            return res.status(404).json({
                success : false,
                message : "ticket is not found"
            });
        }
        res.status(200).json({
            success : true,
            data : ticket
        });
    } 
    catch(error) {
        res.status(400).json({
            success : false,
            message : error.message
        });
     }
}


///////////// Patch : update status
export const updateTicketStatus = async (req, res) => {
    try {
        const {Status } = req.body;
        if ( Status !== "Open" && Status !== "In Progress" && Status !=="Resolved") {
            return res.status(400).json({
                success : false,
                message : "Status must be open , In Progress or Resolved"
            });
        }

        const ticket = await Ticket.findByIdAndUpdate(req.params.id);
        if (!ticket) {
            return res.status(404).json({
                success : false,
                message : "Ticket is nor found"
            });
        }
        if (ticket.Status == "Resolved" && (Status == "Open" || Status == "In Progress")) {
                return res.status(400).json({
                    success : false,
                    message : "Resolved ticket cannot be changed to another"
                });
        }

        ticket.Status = Status;
        await ticket.save();
        res.status(200).json({
            success : true,
            message : "Ticket Status Updated Successfully",
            data : ticket
        });



    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        });
    }
}


////////////// Delete : 
export const deleteTicket = async (req , res) => {
    try { 
        const ticket = await Ticket.findByIdAndDelete(req.params.id);
        if (!ticket) {
            return res.status(404).json({
                success : false,
                message : "Ticket is nor found"
            });
        }
        res.status(200).json({
            success : true,
            message : "Ticket Deleted Successfully",
            data : Ticket,
        });

    } 
    catch(error){
            return res.status(400).json({
                success : false,
                message : error.message
            });
    }
}






import mongoose from "mongoose";
const ticketSchema = new mongoose.Schema(
    {
        Title : {
            type    : String,
            require : true,
            max     : 100 

        },
        Discription : {
            type : Number,
            require : true
        },
        CustomerEmail : {
            type : String,
            require: true
        },
        Priority : {
            type : String,
            enum : ["Low" , "Medium" , "High"],
            require: true 
        },
        Status : {
            type : String,
            enum : ["Open" , "In Progress" , "Resolved"],
            default : "Open"
        },
        createdAt : {
            type : Date,
            default : Date.now
        }
    },
    {
        timestamps : true,
    }
);

const Ticket = mongoose.model("Ticket", ticketSchema);
export default Ticket;
import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import ticketRoutes from "./src/routes/ticketRoutes.js"

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/v1/tickets", ticketRoutes);

const startserver = async () => {
    try {
        await connectDB ();
        app.listen (PORT , () =>{
            console.log(`Server is Running on port ${PORT}`);
        });
    } catch (error) {
        console.log("Error to start the server : ", error.message);
    }
};

startserver()
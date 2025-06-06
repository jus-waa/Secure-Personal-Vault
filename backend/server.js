import express from "express";
const app = express(); 

import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./db/connectDB.js";

import authRoutes from "./routes/auth.route.js";
import noteRoutes from "./routes/notes.route.js"

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json()); //allow parsing incoming requests :req.body
app.use(cookieParser()); //allow parsing incoming cookies
app.use(cors({origin: "http://localhost:5173", credentials: true}));
app.use(helmet());
app.use(morgan("dev"));

//Routes
//auth
app.use("/api/v1/auth", authRoutes);
//notes
app.use("/api/v1/notes", noteRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
});
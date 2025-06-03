import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./db/connectDB.js";

import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express(); 
const PORT = process.env.PORT || 5000;

app.use(express.json()); //allow parsing incoming requests :req.body
app.use(cookieParser()); //allow parsing incoming cookies
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

//Routes
app.use("/api/v1/auth", authRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
});
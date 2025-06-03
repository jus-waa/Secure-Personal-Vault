import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db/connectDB.js";

import authRoutes from "./routes/auth.route.js";

import noteRoutes from "./routes/notes.route.js"

//cookie-parser
import express from "express";
import cookieParser from "cookie-parser";


dotenv.config();

const app = express(); //allow parsing incoming requests :req.body
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use(cookieParser()); // for parsing cookies

//Routes
app.use("/api/v1/auth", authRoutes);

//notes
app.use("/api/v1/notes", noteRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
});
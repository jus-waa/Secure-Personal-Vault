import express from "express";
// middleware packages
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

// import routes here

// load envicornment variables (env)
dotenv.config();

const app = express();

// setup middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(cors());

// routes


// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
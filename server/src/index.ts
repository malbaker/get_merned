import express, {Request, Response}  from 'express';
import mongoose from 'mongoose'
import cors from 'cors';
import { getBooksController } from './controllers/getBooksController';
import { createBookController } from './controllers/createBookController';
import { deleteBooksController } from './controllers/deleteBooksController';
require("dotenv").config();

// Initialize express
const app = express();
app.use(cors({origin: '*'}));
app.use(express.json());
const port = 5000


// API routes
app.get("/books", getBooksController)
app.post("/books", createBookController)
app.delete("/books/:bookId", deleteBooksController)


// Connect to database
mongoose
    .set('strictQuery', false)
    .connect(process.env.MONGO_URL ?? 'mongodb://localhost:9000')
    .then(() => {
        console.log('Connected to database');
        // Start express server
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        })
    })

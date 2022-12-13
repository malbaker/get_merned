import express, {Request, Response}  from 'express';
import mongoose from 'mongoose'
import cors from 'cors';
import Book from './models/Book';
require("dotenv").config();

// Initialize express
const app = express();
app.use(cors({origin: '*'}));
app.use(express.json());
const port = 5000



app.get("/books", async (req: Request, res: Response) => {
    const books = await Book.find();
    console.log(books)
    res.json(books);
})

app.post("/books", async (req: Request, res: Response) => {
    const newBook = new Book({
        title: req.body.title,
        author: req.body.author
        })
    const createdBook = await newBook.save();
    res.json(createdBook);
    console.log(createdBook)
})

app.delete("/books/:bookId", async (req: Request, res: Response) => {
    const bookId = req.params.bookId;
    const deletedBook = await Book.findByIdAndDelete(bookId);
    res.json(deletedBook);
})


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

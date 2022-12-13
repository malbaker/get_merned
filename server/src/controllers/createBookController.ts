import { Request, Response } from 'express';
import Book from '../models/Book';

export async function createBookController(req:Request, res:Response) {
    const newBook = new Book({
        title: req.body.title,
        author: req.body.author
        })
    const createdBook = await newBook.save();
    res.json(createdBook);
}
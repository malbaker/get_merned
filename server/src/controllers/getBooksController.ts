import { Request, Response } from 'express';
import Book from '../models/Book';

export async function getBooksController(req: Request, res: Response) {
    const books = await Book.find();
    res.json(books);
}
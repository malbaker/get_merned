import { Request, Response } from 'express';
import Book from '../models/Book';

export async function deleteBooksController(req:Request, res:Response) {
    const bookId = req.params.bookId;
    const deletedBook = await Book.findByIdAndDelete(bookId);
    res.json(deletedBook);
}
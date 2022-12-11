import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: String,
    author: String,
})

const BookModel = mongoose.model('Book', BookSchema);

export default BookModel;


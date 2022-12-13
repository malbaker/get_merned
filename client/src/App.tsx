import React, { useEffect, useState } from 'react'
import { deleteBook } from './api/deleteBook'
import { getBooks, TBook } from './api/getBooks'
import { createBook } from './api/createBook'
import './App.css'

function App() {
  const [books, setBooks] = useState <TBook[]>([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  


  async function handleCreateBook(e: React.FormEvent) {
    e.preventDefault()    
    const newBook = await createBook( title, author )
    setBooks([...books, newBook])
    setAuthor('')
    setTitle('')
  }

  async function handleDeleteBook(bookId:String) {
    await deleteBook(bookId)
    setBooks(books.filter((book) => book._id !== bookId));
  }

  useEffect(() => {
    async function fetchBooks() {
      const newBooks = await getBooks()
      setBooks(newBooks)
    }
    fetchBooks()
  }, [])

  return (
    <div className="App bg-slate-300 w-full mx-auto my-0 p-8 text-center max-w-7xl ">

      <form className='flex flex-col justify-between gap-3 pb-4 items-center' onSubmit={handleCreateBook}>
        <label > New Book</label>
        <div>
        <input type="text" placeholder='Book title' value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value)
          }} />
        <input type="text" placeholder='Book author' value={author}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setAuthor(e.target.value)
          }} />
        </div>
        <button className='bg-gray-600 text-white rounded-md w-1/2'
        >Add Book</button>
      </form>

      <ul id='books' 
          className='bg-gray-600 grid gap-2 my-0 mx-auto grid-cols-1 md:grid-cols-3 p-2'>
          {books.map((book,idx) => (
          <li className='block h-20 border-white border rounded-md'
          key={idx}>
            <button onClick={() => {handleDeleteBook(book._id)}} className=' text-white'>x</button>
            <div className='text-center'>
              <p>{book.title}</p>
            </div>
            <div>{book.author}</div>
          </li>
        ))}
      </ul>


    </div>
  )
}

export default App;

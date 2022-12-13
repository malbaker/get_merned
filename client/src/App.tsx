import React, { useEffect, useState } from 'react'
import getBooks from './api/getBooks'
import './App.css'

function App() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [books, setBooks] = useState([])


  async function handleCreateBook(e: React.FormEvent) {
    e.preventDefault()

    // sends a POST request to the server
    await fetch('http://localhost:5000/books', {
      method: 'POST',
      body: JSON.stringify({ title, author }),
      headers: { 'Content-Type': 'application/json' }, // tells the server that the data is in JSON format
    })
    console.log('Book created')
    // refresh the page
    setAuthor('')
    setTitle('')
  }

  async function handleDeleteDeck(deckId:String) {
    await fetch(`http://localhost:5000/books/${deckId}`, {
      method: 'DELETE',
    })
    setBooks(books.filter((book: { _id: String }) => book._id !== deckId))
  }

  useEffect(() => {
    async function fetchBooks() {
      const newBooks = await getBooks()
      await setBooks(newBooks)
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
        {books.map((book: { title: String, author: String }, idx) => (
          <li className='block h-20 border-white border rounded-md'
          key={idx}>
            <button className=' text-white'>x</button>
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

export default App

import React, { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [books , setBooks] = useState([])
  const [title , setTitle] = useState('')
  const [author, setAuthor] = useState('')
  

  async function handleCreateBook(e: React.FormEvent) {
    e.preventDefault()

    // sends a POST request to the server
    await fetch('http://localhost:5000/books', {
      method: 'POST',
      body: JSON.stringify({ title, author }),
      headers: {'Content-Type': 'application/json'}, // tells the server that the data is in JSON format
    })
    console.log('Book created')
    // refresh the page
    window.location.reload()
    setAuthor('')
    setTitle('')
  }

  useEffect(() => {
    async function fetchBooks () {
      const response = await fetch('http://localhost:5000/books')
      const newBooks = await response.json()
      await setBooks(newBooks)
    }
    fetchBooks()
  }, [])

  return (
    <div className="App mx-auto text-center">
      <form className='flex justify-between gap-3 pb-2 mt-20' onSubmit={handleCreateBook}>
        <label > New Book</label>
        <input type="text" placeholder='Book title' value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setTitle(e.target.value)
        }}/>
        <input type="text" placeholder='Book author' value={author}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setAuthor(e.target.value)
        }}/>
        <button>Add Book</button>
      </form>
      
      <ul className='bg-gray-600 py-3 flex flex-col justify-center mx-auto' id='books'>
        {books.reverse().map((book:{title:String, author:String},idx) => (
          <li className='bg-gray-400 py-2 border-2 border-gray-900 rounded-md my-4'
          key={idx}>
            <div>{book.title}</div>
            <div>{book.author}</div>
          </li>
        ))}
      </ul>
      
      
    </div>
  )
}

export default App

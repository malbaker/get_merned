import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Route
} from 'react-router-dom'
import App from './App'
import Book from './components/Book'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/books/:bookId',
    element: <Book/>
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={appRouter}/>
  </React.StrictMode>
)

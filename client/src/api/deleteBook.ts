import { API_URL } from "./config"

export async function deleteBook(bookId: String) {
    const response = await fetch(`${API_URL}/books/${bookId}`, {
        method: 'DELETE',
    })
    return response.json()
}
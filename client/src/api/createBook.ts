import { API_URL } from "./config";
import { TBook } from "./getBooks";

export async function createBook(title: String, author: String): Promise<TBook> {
    const response = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({title, author})
    });
    return await response.json();
}
export default async function deleteBook(bookId: string) {
    const response = await fetch(`http://localhost:5000/books/${bookId}`, {
        method: 'DELETE',
    })
}
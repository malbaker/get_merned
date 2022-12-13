export default async function createBooks(title: String, author: String) {
    const response = await fetch('http://localhost:5000/books', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({title, author})
    });
    return await response.json();
}
export default async function getBooks() {
    const response = await fetch('http://localhost:5000/books');
    return await response.json();
}
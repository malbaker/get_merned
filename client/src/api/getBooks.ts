import { API_URL } from "./config";

export type TBook =  {
    _id: String;
    title: String;
    author: String;
}

export async function getBooks(): Promise<TBook[]> {
    const response = await fetch(`${API_URL}/books`);
    return await response.json();
}
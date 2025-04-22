import { useEffect, useState } from "react";
import { deleteRequest, getRequest } from "../../services/axiosInstance";
import { Link, Outlet } from "react-router-dom";

const BookList = () => {
    const [books, setBooks] = useState([]);
    async function getBooks() {
        const books = await getRequest("/books");
        console.log(books);
        setBooks(books);
    }
    useEffect(() => {
        getBooks();
    }, []);

    const deleteBook = async (book) => {
        const x = confirm(`Want to delete "${book.title}"`);
        if (x) {
            const books = await deleteRequest(`/books/${book.book_id}`);
            console.log(books);
            getBooks();
        };
    }
    return (
        <>
            <h4>Books</h4>
            <header>
                <Link to="add">Add New Book</Link>
            </header>
            <Outlet />
            <ol>
                {books.map(book => (
                    <li key={book.book_id}>
                        <b>Name: </b> {book?.title} <br />
                        <b>Author: </b> {book?.author} <br />
                        <b>Department: </b> {book?.department_name} <br />
                        <b>Lnaguage: </b> {book?.language} <br />

                        <Link to={`update/${book.book_id}`}>Update</Link> <br />
                        <button onClick={() => deleteBook(book)}>Delete</button>
                        <hr />
                    </li>
                ))}

            </ol>
        </>
    )
}

export default BookList;
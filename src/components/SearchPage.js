import React, {useState } from "react";
import { search } from "../BooksAPI";
import Book from "./Book";
import Link from "./Link";

const SearchPage = (props) => {
  const [term, setTerm] = useState("");
  const [books, setBooks] = useState([])
  const showBooks = () => {
    //console.log("inside showbooks")
    //Creating two separate arrays of IDs and shelves of the books in the shelves (in order)
    const myBooksIDs = props.myBooks.map(book => {
      return book.id;
    });
    //console.log(myBooksIDs)
    const myBooksShelves = props.myBooks.map(book => {
      return book.shelf;
    });
    //console.log(myBooksShelves)
    /*Checking if the books in the results are aleady present in the shelves or not.
    If they are, I update their shelves accordingly, otherwise set it to none.*/
    const updatedBooks = books.map(book => {
      if (myBooksIDs.indexOf(book.id) !== -1) {
        book.shelf = myBooksShelves[myBooksIDs.indexOf(book.id)];
      } else {
        book.shelf = "none";
      }
      //console.log(book)
      return book;
    });
    //console.log(updatedBooks)
    if (books.length > 0) {
      const keptBooks = updatedBooks.map(book => {
        //In case both the authors and image URL is available.
        if (book.authors && book.imageLinks) {
          return (
            <li key={book.id}>
              <Book
                author={book.authors[0]}
                title={book.title}
                link={`url(${book.imageLinks.thumbnail})`}
                onBookShelfUpdate={props.onBookShelfUpdate}
                status={book.shelf}
                id={book.id}
              />
            </li>
          );
          //In case the authors are unknown
        } else if (book.imageLinks && !book.authors) {
          return (
            <li key={book.id}>
              <Book
                author={"N/A"}
                title={book.title}
                link={`url(${book.imageLinks.thumbnail})`}
                onBookShelfUpdate={props.onBookShelfUpdate}
                status={book.shelf}
                id={book.id}
              />
            </li>
          );
          //In case the image link is broken. 
        } else {
          return (
            <li key={book.id}>
              <Book
                author={"N/A"}
                title={book.title}
                link={`url({book.imageLinks.thumbnail})`}
                onBookShelfUpdate={props.onBookShelfUpdate}
                status={book.shelf}
                id={book.id}
              />
            </li>
          );
        }
      });
      //console.log(keptBooks)
      return keptBooks;
    }
  }
  const onInputChange = async (e) => {
    const query = e.target.value;
    setTerm(query);
    if (query.length > 0) {
      const response = await search(query.trim());
      //console.log(response)
      if (response.length > 0) {
        setBooks(response);
      } else {
        setBooks([]);
      }
    } else {
      setBooks([]);
    }
  };
  return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            className="close-search"
            href="/"
          >
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={term}
              onChange={(e) => onInputChange(e)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">{showBooks()}</ol>
        </div>
      </div>
    );
}

export default SearchPage;

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import books from "../data/books";
import "./BookDetails.css"; // Optional for styling

const BookDetails = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const book = books[bookId];

  if (!book) {
    return <h2>Book not found</h2>;
  }

  return (
    <div className="book-details-container">
      <h1>{book.title}</h1>
      <p><strong>Author:</strong> {book.author}</p>
      <p>{book.description}</p>

      <h3>Chapters:</h3>
      <ul className="chapter-list">
        {book.chapters.map((chapter, index) => (
          <li
            key={index}
            onClick={() => navigate(`/book/${bookId}/read/${index + 1}`)}
            className="chapter-item"
          >
            {chapter}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookDetails;

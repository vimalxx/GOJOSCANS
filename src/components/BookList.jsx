import React from "react";
import {useNavigate } from "react-router-dom";
import books from "../data/books";
import "./BookList.css";

const BookList = () => {
    const navigate = useNavigate();

    return (
        <div className="book-list-container">
      <h1 className="title">📚 E-World Library</h1>
      <div className="book-grid">
        {Object.entries(books).map(([bookId, book]) => (
          <div
            key={bookId}
            className="book-card"
            onClick={() => navigate(`/book/${bookId}`)}
          >
            <img
              src={`/assets/${bookId}.jpg`}
              alt={book.title}
              className="book-cover"
            />
            <h3>{book.title}</h3>
          </div>
        ))}
      </div>
    </div>
    );
};

export default BookList;
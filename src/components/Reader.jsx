import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import books from "../data/books";
import "./Reader.css"; // Optional styling

const Reader = () => {
  const { bookId, chapterIndex } = useParams();
  const chapterNum = parseInt(chapterIndex) - 1;
  const book = books[bookId];
  const navigate = useNavigate();

  if (!book || !book.chapters[chapterNum]) {
    return <h2>Chapter not found</h2>;
  }

  const chapterTitle = book.chapters[chapterNum];

  const handleNavigation = (direction) => {
    const newIndex = chapterNum + direction;
    if (newIndex >= 0 && newIndex < book.chapters.length) {
      navigate(`/book/${bookId}/read/${newIndex + 1}`);
    }
  };

  return (
    <div className="reader-container">
      <h1>{book.title}</h1>
      <h2>{chapterTitle}</h2>

      <div className="chapter-content">
        <p>This is the content of {chapterTitle}. Replace this with actual text, images, or PDF embedding.</p>
      </div>

      <div className="reader-nav">
        <button onClick={() => handleNavigation(-1)} disabled={chapterNum === 0}>
          ⬅ Previous
        </button>
        <button onClick={() => handleNavigation(1)} disabled={chapterNum === book.chapters.length - 1}>
          Next ➡
        </button>
      </div>
    </div>
  );
};

export default Reader;

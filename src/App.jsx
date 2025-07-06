import { Routes, Route } from "react-router-dom";
import BookList from "./components/BookList";
import BookDetails from "./components/BookDetails";
import Reader from "./components/Reader";

function App() {
  return (
    <Routes>
      <Route path="/" element={<BookList />} />
      <Route path="/book/:bookId" element={<BookDetails />} />
      <Route path="/book/:bookId/read/:chapterIndex" element={<Reader />} />
    </Routes>
  );
}

export default App;

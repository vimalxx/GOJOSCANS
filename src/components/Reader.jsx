import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Button,
  ButtonGroup,
  Divider
} from "@mui/material";

const Reader = () => {
  const { bookId, chapterIndex } = useParams();
  const [book, setBook] = useState(null);
  const navigate = useNavigate();
  const currentChapter = parseInt(chapterIndex, 10);

  useEffect(() => {
    fetch("/books.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load book");
        return res.json();
      })
      .then((data) => {
        const found = data.find((b) => b.id === bookId);
        if (found) setBook(found);
        else throw new Error("Book not found");
      })
      .catch((err) => console.error(err));
  }, [bookId]);

  if (!book) return <Typography>📖 Loading chapter...</Typography>;

  const chapterContent = book.chapters[currentChapter];

  const goToChapter = (index) => {
    navigate(`/book/${book.id}/read/${index}`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">
          {book.title} - Chapter {currentChapter + 1}
        </Typography>
        <Button
          variant="outlined"
          component={Link}
          to="/"
          size="small"
        >
          ⬅ Home
        </Button>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      <Typography variant="body1" sx={{ mb: 5, lineHeight: 1.8 }}>
        {chapterContent ? (
          <>
            <strong>📚 "{chapterContent}"</strong> content goes here. <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec
            justo a nisi tincidunt consequat. Integer vel leo quis nulla
            lobortis faucibus. Sed nec urna sit amet elit egestas mattis.
          </>
        ) : (
          "❌ Chapter not found."
        )}
      </Typography>

      <ButtonGroup variant="contained">
        <Button
          onClick={() => goToChapter(currentChapter - 1)}
          disabled={currentChapter === 0}
        >
          ⬅ Previous
        </Button>
        <Button
          onClick={() => goToChapter(currentChapter + 1)}
          disabled={currentChapter >= book.chapters.length - 1}
        >
          Next ➡
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default Reader;

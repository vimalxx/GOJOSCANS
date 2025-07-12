import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  LinearProgress,
  Stack
} from "@mui/material";

const BookDetails = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/books.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load book details.");
        return res.json();
      })
      .then((data) => {
        const selectedBook = data.find((b) => b.id === bookId);
        if (!selectedBook) throw new Error("Book not found.");
        setBook(selectedBook);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [bookId]);

  if (loading) return <Typography>📖 Loading book...</Typography>;
  if (error) return <Typography color="error">❌ {error}</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {book.title}
          </Typography>

          <Typography variant="body1" paragraph>
            {book.description}
          </Typography>

          <Typography variant="subtitle1">
            Total Chapters: {book.chapters.length}
          </Typography>

          <LinearProgress
            variant="determinate"
            value={(book.readChapters / book.chapters.length) * 100}
            sx={{ mt: 2, mb: 3 }}
          />

          <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
            <Button
              variant="contained"
              component={Link}
              to={`/book/${book.id}/read/${book.readChapters}`}
            >
              📘 Continue Reading
            </Button>

            <Button
              variant="outlined"
              color="secondary"
              component={Link}
              to="/"
            >
              ⬅ Back to Home
            </Button>
          </Stack>

          {/* Chapter List */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
              📚 Chapter List
            </Typography>
            <Stack spacing={1}>
              {book.chapters.map((chapter, index) => (
                <Button
                  key={index}
                  component={Link}
                  to={`/book/${book.id}/read/${index}`}
                  variant="outlined"
                  sx={{
                    justifyContent: "flex-start",
                    textTransform: "none",
                    fontWeight: "normal",
                    pl: 2
                  }}
                >
                  Chapter {index + 1}: {chapter.title}
                </Button>
              ))}
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BookDetails;

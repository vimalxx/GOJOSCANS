import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Container,
  LinearProgress,
  Stack
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Reader = () => {
  const theme = useTheme();
  const { bookId, chapterIndex } = useParams();
  const navigate = useNavigate();
  const [chapter, setChapter] = useState(null);
  const [bookTitle, setBookTitle] = useState("");
  const [totalChapters, setTotalChapters] = useState(0);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const index = parseInt(chapterIndex);

  // Scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setProgress(Math.min(100, Math.floor(scrolled)));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetch("/books.json")
      .then((res) => res.json())
      .then((data) => {
        const book = data.find((b) => b.id === bookId);
        if (!book) throw new Error("Book not found");

        const chapterData = book.chapters[index];
        if (!chapterData) throw new Error("Chapter not found");

        setBookTitle(book.title);
        setTotalChapters(book.chapters.length);
        setChapter(chapterData);
        setLoading(false);
        window.scrollTo(0, 0);
      })
      .catch((err) => {
        setChapter({ title: "Error", content: err.message });
        setLoading(false);
      });
  }, [bookId, index]);

  const goToChapter = (newIndex) => {
    navigate(`/book/${bookId}/read/${newIndex}`);
  };

  if (loading) return <CircularProgress sx={{ m: 4 }} />;

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        minHeight: "100vh"
      }}
    >
      {/* Scroll Progress */}
      <LinearProgress variant="determinate" value={progress} sx={{ height: 4 }} />

      <Container maxWidth="md" sx={{ py: 5 }}>
        <Typography variant="h4" gutterBottom>
          {bookTitle}
        </Typography>
        <Typography variant="h5" gutterBottom>
          {chapter.title}
        </Typography>
        <Typography variant="body1" sx={{ whiteSpace: "pre-line", mt: 2 }}>
          {chapter.content}
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="center"  sx={{ mt: 4 }}>
          <Button
            variant="outlined"
            disabled={index === 0}
            onClick={() => goToChapter(index - 1)}
          >
            ← Previous
          </Button>

          <Button
            variant="outlined"
            disabled={index === totalChapters - 1}
            onClick={() => goToChapter(index + 1)}
          >
            Next →
          </Button>

          <Button variant="contained" component={Link} to={`/book/${bookId}`}>
            📚 Chapter List
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default Reader;

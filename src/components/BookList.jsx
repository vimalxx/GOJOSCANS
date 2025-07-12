import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActionArea
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    fetch("/books.json")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setFilteredBooks(data);
      })
      .catch((err) => console.error("Failed to load books.json", err));
  }, []);

  useEffect(() => {
    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredBooks(filtered);
  }, [search, books]);

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: "1100px", mx: "auto" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}
      >
        <span style={{ color: "#1976d2" }}>NOVASCANS</span>
      </Typography>

      <TextField
        label="Search by title..."
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{
          mb: 4,
          borderRadius: "12px",
          backgroundColor: "background.paper"
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          )
        }}
      />

      {filteredBooks.length === 0 ? (
        <Typography align="center" color="text.secondary">
          ❌ No books matched your search.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredBooks.map((book) => (
            <Grid item xs={12} sm={6} md={4} key={book.id}>
              <Card
                elevation={5}
                sx={{
                  borderRadius: "14px",
                  width: 150,
                  display: "flex",
                  flexDirection: "row",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.15)"
                  }
                }}
              >
                <CardActionArea component={Link} to={`/book/${book.id}`}>
                  <CardMedia
                    component="img"
                    height="180"
                    image={book.cover || "/placeholder.jpg"}
                    alt={book.title}
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom noWrap>
                      {book.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontStyle: "italic" }}
                    >
                      by {book.author || "Unknown Author"}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default BookList;

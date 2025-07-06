import { useMemo, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider, CssBaseline, IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import ScrollToTop from "./components/ScrollToTop";
import BookList from "./components/BookList";
import BookDetails from "./components/BookDetails";
import Reader from "./components/Reader";

function App() {
  const storedTheme = localStorage.getItem("mui-theme") || "light";
  const [mode, setMode] = useState(storedTheme);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          background: {
            default: mode === "dark" ? "#121212" : "#f5f5f5"
          }
        }
      }),
    [mode]
  );

  const toggleTheme = () => {
    const next = mode === "light" ? "dark" : "light";
    setMode(next);
    localStorage.setItem("mui-theme", next);
  };

  useEffect(() => {
    document.title = "NOVASCANS";
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ScrollToTop />

      <div style={{ padding: "1rem", position: "relative" }}>
        {/* Toggle Button */}
        <IconButton
          onClick={toggleTheme}
          color="inherit"
          sx={{ position: "fixed", top: 10, right: 10, zIndex: 1000 }}
        >
          {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
        </IconButton>

        {/* Routing */}
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/book/:bookId" element={<BookDetails />} />
          <Route path="/book/:bookId/read/:chapterIndex" element={<Reader />} />
          <Route path="*" element={<h2>404 - Page Not Found</h2>} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;

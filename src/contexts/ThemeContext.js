import { createContext, useMemo, useState, useContext } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const ThemeContext = createContext();

export const useThemeMode = () => useContext(ThemeContext);

export const CustomThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "dark"
            ? {
                background: {
                  default: "#121212",
                  paper: "#1d1d1d"
                }
              }
            : {})
        },
        typography: {
          fontFamily: `"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`
        }
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

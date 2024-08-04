import "@fontsource/roboto/400.css";
import { Header } from "./components/Header";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Main } from "./components/Main";

function App() {
  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#5bc7d2",
      },
      secondary: {
        main: "#c5d4d8",
      },
      warning: {
        main: "#f05435",
      },
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Main />
      </ThemeProvider>
    </>
  );
}

export default App;

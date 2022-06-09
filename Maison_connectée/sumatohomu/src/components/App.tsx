import { Outlet } from "react-router-dom";
import "../styles/App.css";
import Drawer from "./Drawer";
import ThemeProvider from "../themes/ThemeProvider";
import { Container } from "@mui/material";

function App() {
  return (
    <ThemeProvider>
      <div
        style={{
          display: "flex",
        }}
      >
        <Drawer />
        <Container
          sx={{
            paddingTop: "0.5em",
            paddingBottom: "0.5em",
          }}
        >
          <Outlet />
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;

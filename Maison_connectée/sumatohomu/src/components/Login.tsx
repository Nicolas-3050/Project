import {
  Button,
  Collapse,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { FunctionComponent, useContext, useState } from "react";
import { Location, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../themes/ThemeProvider";
import { AlertContext } from "./utils/AlertProvider";
import { useAuth } from "./utils/AuthProvider";

const Login: FunctionComponent = () => {
  const { palette, shape, shadows } = useTheme();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { signin, signup } = useAuth();
  const { showAlert } = useContext(AlertContext);

  const toggle = () => {
    setEmail("");
    setPassword("");
    setUsername("");
    setIsSignup(!isSignup);
  };

  const handleClick = () => {
    if (isSignup) {
      signup(email, username, password, (err?: any) => {
        if (!err) {
          setIsSignup(false);
        } else {
          showAlert("warning", "Impossible de s'enregister");
        }
      });
    } else {
      signin(email, password, (err?) => {
        if (!err) {
          navigate(
            location.state && (location.state as any).from
              ? ((location.state as any).from as Location).pathname
              : "/"
          );
        } else {
          showAlert("warning", "Impossible de s'identifier");
        }
      });
    }
  };

  return (
    <Box
      sx={{ height: "100vh", width: "100%", margin: 0, padding: 0 }}
      bgcolor={palette.grey[200]}
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Paper
        sx={{
          width: 600,
          height: 400,
          borderRadius: shape.borderRadius,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          margin: 2,
        }}
        elevation={5}
      >
        <Box padding={1} bgcolor={palette.primary.light} boxShadow={shadows[2]}>
          <Typography
            variant="h5"
            fontWeight="light"
            textAlign="center"
            color={palette.primary.contrastText}
          >
            SumatoHomu
          </Typography>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          flexGrow={1}
          padding={3}
          alignItems="center"
        >
          <Stack spacing={2} sx={{ width: "100%" }}>
            <TextField
              fullWidth
              label="E-Mail"
              placeholder="guy.tarsesh@lol.com"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></TextField>
            <Collapse in={isSignup}>
              <TextField
                fullWidth
                label="Nom d'utilisateur"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></TextField>
            </Collapse>
            <TextField
              fullWidth
              label="Mot de passe"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></TextField>
          </Stack>
          <Button
            onClick={handleClick}
            variant="contained"
            sx={{
              marginTop: "auto",
              borderRadius: shape.borderRadius,
              backgroundColor: palette.primary.light,
            }}
          >
            {isSignup ? "M'inscrire" : "M'identifier"}
          </Button>
        </Box>
      </Paper>
      <Button onClick={toggle}>
        {isSignup ? "Je suis déjà inscrit" : "M'enregistrer plutôt"}
      </Button>
    </Box>
  );
};

export default Login;

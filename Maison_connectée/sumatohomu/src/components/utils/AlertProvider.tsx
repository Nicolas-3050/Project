import { Alert, AlertColor, Slide, Snackbar } from "@mui/material";
import { createContext, FunctionComponent, useContext, useState } from "react";

interface AlertContextType {
  color: AlertColor;
  message: string;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  showAlert: (color: AlertColor, message: string) => void;
}

export const AlertContext = createContext<AlertContextType>(
  {} as AlertContextType
);

export const AlertProvider: FunctionComponent = ({ children }) => {
  const [color, setColor] = useState("warning" as AlertColor);
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const showAlert = (color: AlertColor, message: string) => {
    setColor(color);
    setMessage(message);
    setShow(true);
  };

  return (
    <AlertContext.Provider value={{ color, message, show, setShow, showAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const AlertSnack: FunctionComponent = () => {
  const { color, message, show, setShow } = useContext(AlertContext);
  return (
    <Snackbar
      TransitionComponent={Slide}
      open={show}
      autoHideDuration={5000}
      onClose={() => setShow(false)}
      sx={{ maxWidth: 400 }}
    >
      <Alert severity={color}>
        {typeof message === "object" ? JSON.stringify(message) : message}
      </Alert>
    </Snackbar>
  );
};

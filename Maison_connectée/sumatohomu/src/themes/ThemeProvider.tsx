import { createTheme } from "@mui/material/styles";
import { createContext, FunctionComponent, useContext } from "react";

const theme = createTheme({
  shape: {
    borderRadius: 4
  }
});
const ThemeContext = createContext(theme);

export const useTheme = () => {
  return useContext(ThemeContext);
};

const ThemeProvider: FunctionComponent = ({ children }) => {
  const theme = useTheme();

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;

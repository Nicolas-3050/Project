import {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import requester from "../../modules/requester";

interface AuthContextType {
  token: string | null;
  signin: (
    email: string,
    password: string,
    callback?: (err?: any) => void
  ) => Promise<void>;
  signup: (
    email: string,
    username: string,
    password: string,
    callback?: (err?: any) => void
  ) => Promise<void>;
  signout: (callback?: VoidFunction) => void;
}

const AuthContext = createContext<AuthContextType>(null!);

const AuthProvider: FunctionComponent = ({ children }) => {
  // Signin etc...
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("sumatohomu_token")
  );
  if (token) {
    requester.defaults.headers.common = {
      ...requester.defaults.headers.common,
      Authorization: `Bearer ${token}`,
    };
  }
  const signin = async (
    email: string,
    password: string,
    callback?: (err?: any) => void
  ) => {
    try {
      const response = await requester.post("user/login", { email, password });
      setToken(response.data.data.token);
      if (response.data.data.token) {
        requester.defaults.headers.common = {
          ...requester.defaults.headers.common,
          Authorization: `Bearer ${response.data.data.token}`,
        };
        localStorage.setItem("sumatohomu_token", response.data.data.token);
      }
      if (callback) {
        callback();
      }
    } catch (error) {
      if (callback) {
        callback(error);
        return;
      }
      throw new Error(error as string);
    }
  };
  const signup = async (
    email: string,
    username: string,
    password: string,
    callback?: (err?: any) => void
  ) => {
    try {
      await requester.post("user", { email, password, username });
      if (callback) {
        callback();
      }
    } catch (error) {
      if (callback) {
        callback(error);
        return;
      }
      throw new Error(error as string);
    }
  };
  const signout = (callback?: VoidFunction) => {
    localStorage.removeItem("sumatohomu_token");
    setToken(null);
    if (callback) {
      callback();
    }
  };

  // Try to get the token at mount
  useEffect(() => {
    if (!token) {
      const value = localStorage.getItem("sumatohomu_token");
      if (value) {
        requester.defaults.headers.common = {
          ...requester.defaults.headers.common,
          Authorization: `Bearer ${value}`,
        };
        setToken(value);
      } else {
        requester.defaults.headers.common = {
          ...requester.defaults.headers.common,
          Authorization: false,
        };
      }
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, signin, signup, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;

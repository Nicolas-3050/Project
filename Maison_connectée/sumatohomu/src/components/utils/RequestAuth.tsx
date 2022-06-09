import { Fragment, FunctionComponent } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const RequestAuth: FunctionComponent = ({ children }) => {
  const { token } = useAuth();
  const location = useLocation();
  if (!token) {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }
  return <Fragment>{children}</Fragment>;
};

export default RequestAuth;

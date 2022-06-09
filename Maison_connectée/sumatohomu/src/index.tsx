import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/index.css";
import App from "./components/App";
import Dashboard from "./components/Dashboard";
import Actuators from "./components/Actuators";
import Sensors from "./components/Sensors";
import Users from "./components/Users";
import Login from "./components/Login";
import RequestAuth from "./components/utils/RequestAuth";
import AuthProvider from "./components/utils/AuthProvider";
import { AlertProvider, AlertSnack } from "./components/utils/AlertProvider";
ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <AlertProvider>
        <React.StrictMode>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <RequestAuth>
                  <App />
                </RequestAuth>
              }
            >
              <Route path="actuators" element={<Actuators />}></Route>
              <Route path="sensors" element={<Sensors />}></Route>
              <Route path="users" element={<Users />}></Route>
              <Route index element={<Dashboard />} />
            </Route>
          </Routes>
        </React.StrictMode>
        <AlertSnack />
      </AlertProvider>
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

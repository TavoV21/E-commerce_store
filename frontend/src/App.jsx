import { useState, useEffect } from "react";
import useLocalStorage from "use-local-storage";
import "./App.css";
import { MenuSide } from "./components/MenuSide";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ListUsers from "./pages/ListUsers";
import ListProducts from "./pages/ListProducts";
import { receiveToken } from "./components/auth-helper.js";
import FormProducts from "./pages/FormProducts";
import ProtectedRoute from "./components/protectedRoute";
import Cart from "./pages/Cart";
import FormSendEmail from "./pages/FormSendEmail";
import ChangePassword from "./pages/ChangePassword.jsx";

function App() {
  const [token, setToken] = useLocalStorage("token", null);

  receiveToken(token);

  if (token === null) {
    return (
      <div className="mainContainer min-vh-100 d-flex justify-content-center align-items-center">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login setToken={setToken} />} />
            <Route
              path="/registerUser"
              element={<Register setToken={setToken} />}
            />
            <Route path="/frmSendEmail" element={<FormSendEmail />} />
            <Route path="/changePassword/:email" element={<ChangePassword />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  } else {
    return (
      <div className="bg-dark min-vh-100">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MenuSide setToken={setToken} />}>
              <Route
                path="/listUsers"
                index
                element={
                  <ProtectedRoute>
                    <ListUsers />
                  </ProtectedRoute>
                }
              />
              <Route path="/listProducts" element={<ListProducts />} />
              <Route
                path="/createProduct"
                element={
                  <ProtectedRoute>
                    <FormProducts />
                  </ProtectedRoute>
                }
              />
              <Route path="/cart" element={<Cart />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

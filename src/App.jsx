import React from "react"
import ProtectedRoute from "./components/ProtectedRoute"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import HomePage from "./pages/Home"
import LoginPage from "./pages/Login"
import RegisterPage from "./pages/Register"
import NotFoundPage from "./pages/NotFound"
import "./styles/forms.css";
import "./styles/tailwind.css";

function Logout() {
  localStorage.clear ()
  return <Navigate to="/login" />
}

function RegisterAndLogout(){

  localStorage.clear ()
  return <RegisterPage />
}


function App() {

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App


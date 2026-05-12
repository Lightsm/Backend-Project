import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import About from "./pages/About";
import Artifacts from "./pages/Artifacts";
import Symbols from "./pages/Symbols";
import SymbolDetail from "./pages/SymbolDetail";
import Pins from "./pages/Pins";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />

        <Route
          path="/artifacts"
          element={
            <ProtectedRoute>
              <Artifacts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/symbols"
          element={
            <ProtectedRoute>
              <Symbols />
            </ProtectedRoute>
          }
        />

        <Route
          path="/symbols/:id"
          element={
            <ProtectedRoute>
              <SymbolDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pins"
          element={
            <ProtectedRoute>
              <Pins />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
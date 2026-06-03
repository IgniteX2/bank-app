import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Transfer from "./pages/Transfer";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TransactionHistory from "./pages/TransactionHistory";
import ResetPassword from "./pages/ResetPassword";
import Settings from "./pages/Settings";

// import Sidebar from "./components/layout/Sidebar";

function App() {
  return (
    <>
      {/* <BrowserRouter> */}
      {/* <Sidebar /> */}
      <BrowserRouter>
        <ToastContainer position="top-right" />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/resetPassword" element={<ResetPassword />} />

          <Route
            path="/transfer"
            element={
              <ProtectedRoute>
                <Transfer />
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />

          <Route path="/transactions" element={<TransactionHistory />} />
        </Routes>
      </BrowserRouter>
      {/* <Register /> */}
    </>
  );
}

export default App;

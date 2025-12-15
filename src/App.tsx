import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./components/Layout/MainLayout";
import LoginPage from "./features/auth/pages/LoginPage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import ProtectedRoute from "./components/Layout/ProtectedRoute";
import AdminLayout from "./components/Layout/AdminLayout";
import AdminRoute from "./components/Layout/AdminRoute";
import OTPPage from "./features/auth/pages/OtpPage";
import BlogWriter from "./features/blog/pages/Blog-Writer";

function App() {
  return (
    <Routes>
      {/*  PUBLIC AUTH PAGES  */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/otp" element={<OTPPage />} />

      {/*  PUBLIC + USER ROUTES */}
      <Route element={<MainLayout />}>
        <Route path="/" />
        <Route path="/blog/:id" />

        {/*  USER PROTECTED ROUTES  */}
        <Route element={<ProtectedRoute />}>
          <Route path="/create" element={<BlogWriter />} />
          <Route path="/edit/:id" />
          <Route path="/profile" />
        </Route>
      </Route>

      {/*  ADMIN PROTECTED ROUTES  */}
      <Route element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" />
          <Route path="/admin/users" />
          <Route path="/admin/blogs" />
          <Route path="/admin/tags" />
          <Route path="/admin/reports" />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { LogOut, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../UI/Button";
import { logout } from "../../features/auth/authSlice";
import toast from "react-hot-toast";
import { authAPI } from "../../api/authApi";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  
  const handleLogout = async () => {
    try {
      const data = await authAPI.logout();
      console.log(data);
      dispatch(logout());
    } catch (error) {
      if(error instanceof Error) {
        toast.error(error.message)
      }
    }

  }
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="shrink-0">
            <Link to="/" className="text-xl font-bold text-gray-900">
              BlogSite
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/blogs"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Blogs
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              About
            </Link>
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-gray-700">Welcome, {user.userName}</span>
                <Button
                  className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-medium"
                  onClick={handleLogout}
                >
                  {" "}
                  <LogOut />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/signin"
                  className="text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-gray-900"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-4 pt-2 pb-4 space-y-3">
            <Link
              to="/"
              className="block py-2 text-gray-700 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/blogs"
              className="block py-2 text-gray-700 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blogs
            </Link>
            <Link
              to="/about"
              className="block py-2 text-gray-700 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>

            <div className="pt-3 border-t border-gray-200">
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-medium">
                    {user.userName.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-gray-700">
                    Welcome, {user.userName}
                  </span>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/signin"
                    className="block w-full text-center py-2 text-gray-700 hover:text-gray-900"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="block w-full text-center bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-gray-800"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

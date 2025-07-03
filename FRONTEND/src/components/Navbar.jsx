import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, X, Leaf, LogOut, LogIn } from "lucide-react";
import AdminApprovalPage from "../pages/AdminApprovalPage";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-green-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center space-x-2 text-white hover:text-green-100 transition-colors"
              onClick={closeMobileMenu}
            >
              <Leaf className="h-8 w-8" />
              <span className="font-bold text-xl">EcoWaste</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-white hover:text-green-100 transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              to="/stats"
              className="text-white hover:text-green-100 transition-colors font-medium"
            >
              Public Stats
            </Link>
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className="text-white hover:text-green-100 transition-colors font-medium"
              >
                Dashboard
              </Link>
            )}
            {isAuthenticated && user?.role === "admin" && (
              <Link
                to="/admin/approvals"
                className="text-white hover:text-green-100 transition-colors font-medium"
              >
                Approvals
              </Link>
            )}

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center space-x-1 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center space-x-1 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-white hover:text-green-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-green-700">
              <Link
                to="/"
                className="block px-3 py-2 text-white hover:text-green-100 transition-colors"
                onClick={closeMobileMenu}
              >
                Home
              </Link>
              <Link
                to="/stats"
                className="block px-3 py-2 text-white hover:text-green-100 transition-colors"
                onClick={closeMobileMenu}
              >
                Public Stats
              </Link>
              {isAuthenticated && (
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 text-white hover:text-green-100 transition-colors"
                  onClick={closeMobileMenu}
                >
                  Dashboard
                </Link>
              )}
              {isAuthenticated && user?.role === "admin" && (
                <Link
                  to="/admin/approvals"
                  className="block px-3 py-2 text-white hover:text-green-100 transition-colors"
                  onClick={closeMobileMenu}
                >
                  Approvals
                </Link>
              )}

              {isAuthenticated ? (
                <div className="px-3 py-2">
                  <p className="text-green-100 mb-2">
                    Welcome, {user?.username}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 bg-green-800 hover:bg-green-900 text-white px-4 py-2 rounded-lg transition-colors w-full"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="block px-3 py-2"
                  onClick={closeMobileMenu}
                >
                  <div className="flex items-center space-x-1 bg-green-800 hover:bg-green-900 text-white px-4 py-2 rounded-lg transition-colors">
                    <LogIn className="h-4 w-4" />
                    <span>Login</span>
                  </div>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

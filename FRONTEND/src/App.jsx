import React from "react";
import { Toaster } from "sonner"; // Prebuilt toast
import * as Tooltip from "@radix-ui/react-tooltip"; // Prebuilt tooltip
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import PublicStats from "./pages/PublicStats";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Tooltip.Provider>
      <AuthProvider>
        <Toaster richColors position="top-center" /> {/* toast from sonner */}
        <BrowserRouter>
          <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/stats" element={<PublicStats />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                 <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </Tooltip.Provider>
  </QueryClientProvider>
);

export default App;

import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import WasteForm from "../components/WasteForm";
import WasteTable from "../components/WasteTable";
import { BarChart3, TrendingUp, Package, MapPin } from "lucide-react";
import axios from "axios";

const Dashboard = () => {
  const { user } = useAuth();
  const [entries, setEntries] = useState([]);

  // Fetch waste entries
  const fetchEntries = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/waste`,
        config
      );
      setEntries(data);
    } catch (error) {
      console.error("Error fetching waste entries:", error);
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchEntries();
    }
  }, [user]);

  // Save to localStorage whenever entries change
  useEffect(() => {
    if (entries.length > 0) {
      localStorage.setItem("wasteEntries", JSON.stringify(entries));
    } else {
      localStorage.removeItem("wasteEntries");
    }
  }, [entries]);

  const handleAddEntry = async (newEntry) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/waste`,
        newEntry,
        config
      );
      setEntries((prev) => [data, ...prev]);
    } catch (error) {
      console.error("Error adding entry:", error);
    }
  };

  const handleDeleteEntry = async (id) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      await axios.delete(`${import.meta.env.VITE_API_URL}/waste/${id}`, config);
      setEntries((prev) => prev.filter((entry) => entry._id !== id));
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  // Stats Calculations
  const totalWeight = entries.reduce((sum, entry) => sum + entry.weight, 0);
  const today = new Date().toLocaleDateString("en-GB");
  const todayEntries = entries.filter((entry) => entry.date === today);
  const uniqueLocations = new Set(entries.map((entry) => entry.location)).size;

  const categoryStats = entries.reduce((acc, entry) => {
    acc[entry.category] = (acc[entry.category] || 0) + entry.weight;
    return acc;
  }, {});

  const topCategory = Object.entries(categoryStats).reduce(
    (top, [category, weight]) =>
      weight > top.weight ? { category, weight } : top,
    { category: "None", weight: 0 }
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user?.username}!
              </h1>
              <p className="text-gray-600 mt-1">
                Manage waste collections and track environmental impact
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <div className="text-sm text-gray-500">
                Role:{" "}
                <span className="font-medium text-green-600 capitalize">
                  {user?.role}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Weight"
            value={`${totalWeight.toFixed(1)} kg`}
            icon={<BarChart3 className="h-8 w-8 text-green-500" />}
            note="All time"
          />
          <StatCard
            title="Today's Entries"
            value={todayEntries.length}
            icon={<TrendingUp className="h-8 w-8 text-blue-500" />}
            note={`${todayEntries
              .reduce((sum, e) => sum + e.weight, 0)
              .toFixed(1)} kg total`}
          />
          <StatCard
            title="Locations"
            value={uniqueLocations}
            icon={<MapPin className="h-8 w-8 text-purple-500" />}
            note="Collection points"
          />
          <StatCard
            title="Top Category"
            value={topCategory.category}
            icon={<Package className="h-8 w-8 text-orange-500" />}
            note={`${topCategory.weight.toFixed(1)} kg`}
          />
        </div>
        {/* Form + Table */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Show form for volunteer, admin, manager */}
          {["volunteer", "admin", "manager"].includes(user?.role) && (
            <div className="xl:col-span-1">
              <WasteForm onAddEntry={handleAddEntry} />
            </div>
          )}

          {/* Waste Table */}
          <div
            className={`${
              user?.role === "user"
                ? "xl:col-span-3 mx-auto max-w-7xl w-full" // Span all 3 columns and center
                : "xl:col-span-2" // Span 2 columns when form is present
            }`}
          >
            <WasteTable
              entries={entries}
              onDeleteEntry={handleDeleteEntry}
              fetchEntries={fetchEntries}
              allowDelete={["admin", "manager"].includes(user?.role)}
            />
          </div>
        </div>
        {/* Tips Section */}
        <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            💡 Quick Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <p>
                <strong>Accurate Weight:</strong> Use calibrated scales for
                precise measurements
              </p>
              <p>
                <strong>Location Details:</strong> Include specific landmarks
                for easy identification
              </p>
            </div>
            <div>
              <p>
                <strong>Category Guidelines:</strong> When unsure, choose the
                other material type
              </p>
              <p>
                <strong>Regular Updates:</strong> Log entries immediately after
                collection for accuracy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable stat card component
const StatCard = ({ title, value, icon, note }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center">
      <div className="flex-shrink-0">{icon}</div>
      <div className="ml-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        <p className="text-sm text-gray-600">{note}</p>
      </div>
    </div>
  </div>
);

export default Dashboard;

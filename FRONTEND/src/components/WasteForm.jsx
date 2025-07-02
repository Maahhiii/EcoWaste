import React, { useState, useEffect } from "react";
import { Plus, MapPin, Scale, Tag } from "lucide-react";
import { toast } from "sonner";

const WasteForm = ({ onAddEntry }) => {
  const [location, setLocation] = useState("");
  const [weight, setWeight] = useState("");
  const [category, setCategory] = useState("Plastic");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    if (navigator.onLine) {
      syncPendingData();
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleOnline = () => {
    setIsOnline(true);
    toast.success("Back online. Syncing pending data...");
    syncPendingData();
  };

  const handleOffline = () => {
    setIsOnline(false);
    toast.warning("You are offline. Data will be saved locally.");
  };

  const syncPendingData = () => {
    const pending = JSON.parse(localStorage.getItem("pendingWasteData")) || [];

    if (pending.length === 0) return;

    pending.forEach((entry) => {
      onAddEntry(entry);
    });

    localStorage.removeItem("pendingWasteData");
    toast.success(`Synced ${pending.length} pending entries.`);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!location.trim()) {
      newErrors.location = "Location is required";
    } else if (location.trim().length < 3) {
      newErrors.location = "Location must be at least 3 characters";
    }

    if (!weight) {
      newErrors.weight = "Weight is required";
    } else if (parseFloat(weight) <= 0) {
      newErrors.weight = "Weight must be greater than 0";
    } else if (parseFloat(weight) > 10000) {
      newErrors.weight = "Weight seems too large (max 10,000 kg)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const entry = {
        location: location.trim(),
        weight: parseFloat(weight),
        category,
      };

      if (isOnline) {
        onAddEntry(entry);
        toast.success("Waste entry added successfully!");
      } else {
        saveLocally(entry);
        toast.success(
          "You are offline. Entry saved locally and will sync later."
        );
      }

      setLocation("");
      setWeight("");
      setCategory("Plastic");
      setErrors({});
    } catch (error) {
      toast.error("Failed to add waste entry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const saveLocally = (entry) => {
    const pending = JSON.parse(localStorage.getItem("pendingWasteData")) || [];
    pending.push(entry);
    localStorage.setItem("pendingWasteData", JSON.stringify(pending));
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    if (errors.location) {
      setErrors((prev) => ({ ...prev, location: undefined }));
    }
  };

  const handleWeightChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setWeight(value);
      if (errors.weight) {
        setErrors((prev) => ({ ...prev, weight: undefined }));
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-6">
        <Plus className="h-6 w-6 text-green-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">
          Add New Waste Entry
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Location Field */}
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            <MapPin className="h-4 w-4 inline mr-1" />
            Location
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={handleLocationChange}
            placeholder="Enter collection location (e.g., Main Street)"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
              errors.location ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          {errors.location && (
            <p className="mt-1 text-sm text-red-600">{errors.location}</p>
          )}
        </div>

        {/* Weight Field */}
        <div>
          <label
            htmlFor="weight"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            <Scale className="h-4 w-4 inline mr-1" />
            Weight (kg)
          </label>
          <input
            type="text"
            id="weight"
            value={weight}
            onChange={handleWeightChange}
            placeholder="Enter weight in kilograms"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
              errors.weight ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          {errors.weight && (
            <p className="mt-1 text-sm text-red-600">{errors.weight}</p>
          )}
        </div>

        {/* Category Field */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            <Tag className="h-4 w-4 inline mr-1" />
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          >
            <option value="Plastic">Plastic</option>
            <option value="Organic">Organic</option>
            <option value="Metal">Metal</option>
            <option value="Paper">Paper</option>
            <option value="Glass">Glass</option>
            <option value="Ewaste">Ewaste</option>
            <option value="Textile">Textile</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
              Adding Entry...
            </div>
          ) : (
            <>
              <Plus className="h-4 w-4 inline mr-2" />
              Add Waste Entry
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default WasteForm;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";

const EditModal = ({ entry, onClose, fetchEntries }) => {
  const { user } = useAuth();
  const [editLocation, setEditLocation] = useState("");
  const [editWeight, setEditWeight] = useState("");
  const [editCategory, setEditCategory] = useState("");

  useEffect(() => {
    if (entry) {
      setEditLocation(entry.location);
      setEditWeight(entry.weight);
      setEditCategory(entry.category);
    }
  }, [entry]);

  const handleSave = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      await axios.put(
        `${import.meta.env.VITE_API_URL}/waste/${entry._id}`,
        {
          location: editLocation,
          weight: editWeight,
          category: editCategory,
        },
        config
      );

      toast.success("Entry updated successfully");
      fetchEntries();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update entry");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg space-y-4 w-full max-w-sm">
        <h2 className="text-xl font-bold">Edit Waste Entry</h2>

        <input
          type="text"
          value={editLocation}
          onChange={(e) => setEditLocation(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          placeholder="Location"
        />

        <input
          type="number"
          value={editWeight}
          onChange={(e) => setEditWeight(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          placeholder="Weight (kg)"
        />

        <select
          value={editCategory}
          onChange={(e) => setEditCategory(e.target.value)}
          className="w-full px-3 py-2 border rounded"
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

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;

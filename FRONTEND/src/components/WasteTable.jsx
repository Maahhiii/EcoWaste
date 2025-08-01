import React, { useState } from "react";
import {
  ChevronUp,
  ChevronDown,
  Trash2,
  Edit,
  Calendar,
  MapPin,
  Scale,
  Tag,
} from "lucide-react";
import { toast } from "sonner";
import EditModal from "./Edit";

const WasteTable = ({
  entries,
  onDeleteEntry,
  fetchEntries,
  allowDelete,
  allowEdit,
}) => {
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterMinWeight, setFilterMinWeight] = useState("");
  const [filterMaxWeight, setFilterMaxWeight] = useState("");
  const [editingEntry, setEditingEntry] = useState(null);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedEntries = [...entries].sort((a, b) => {
    let aValue, bValue;

    switch (sortField) {
      case "date":
        aValue = new Date(`${a.date} ${a.time}`).getTime();
        bValue = new Date(`${b.date} ${b.time}`).getTime();
        break;
      case "location":
        aValue = a.location.toLowerCase();
        bValue = b.location.toLowerCase();
        break;
      case "weight":
        aValue = a.weight;
        bValue = b.weight;
        break;
      case "category":
        aValue = a.category.toLowerCase();
        bValue = b.category.toLowerCase();
        break;
      default:
        aValue = a.date;
        bValue = b.date;
    }

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const filteredEntries = sortedEntries.filter((entry) => {
    const locationMatch = entry.location
      .toLowerCase()
      .includes(filterLocation.toLowerCase());
    const categoryMatch = filterCategory
      ? entry.category === filterCategory
      : true;
    const minWeightMatch = filterMinWeight
      ? entry.weight >= parseFloat(filterMinWeight)
      : true;
    const maxWeightMatch = filterMaxWeight
      ? entry.weight <= parseFloat(filterMaxWeight)
      : true;

    return locationMatch && categoryMatch && minWeightMatch && maxWeightMatch;
  });

  const handleDelete = (id, location) => {
    if (
      window.confirm(
        `Are you sure you want to delete the entry for ${location}?`
      )
    ) {
      onDeleteEntry(id);
      toast.success("Waste entry deleted successfully");
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Plastic":
        return "bg-red-100 text-red-800";
      case "Organic":
        return "bg-green-100 text-green-800";
      case "Metal":
        return "bg-blue-100 text-blue-800";
      case "Paper":
        return "bg-yellow-100 text-yellow-800";
      case "Glass":
        return "bg-purple-100 text-purple-800";
      case "Ewaste":
        return "bg-pink-100 text-pink-800";
      case "Textile":
        return "bg-indigo-100 text-indigo-800";
      case "Other":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) {
      return <ChevronUp className="h-4 w-4 text-gray-400" />;
    }
    return sortDirection === "asc" ? (
      <ChevronUp className="h-4 w-4 text-green-600" />
    ) : (
      <ChevronDown className="h-4 w-4 text-green-600" />
    );
  };

  if (entries.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <div className="text-gray-400 mb-4">
          <Scale className="h-12 w-12 mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No Waste Entries Yet
        </h3>
        <p className="text-gray-600">
          Start by adding your first waste collection entry above.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">
          Waste Collection Records
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Total entries: {entries.length} | Total weight:{" "}
          {entries.reduce((sum, entry) => sum + entry.weight, 0).toFixed(1)} kg
        </p>
      </div>

      {/* Filters */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search by Location"
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">All Categories</option>
            <option value="Plastic">Plastic</option>
            <option value="Organic">Organic</option>
            <option value="Metal">Metal</option>
            <option value="Paper">Paper</option>
            <option value="Glass">Glass</option>
            <option value="Ewaste">Ewaste</option>
            <option value="Textile">Textile</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="number"
            placeholder="Min Weight (kg)"
            value={filterMinWeight}
            onChange={(e) => setFilterMinWeight(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="number"
            placeholder="Max Weight (kg)"
            value={filterMaxWeight}
            onChange={(e) => setFilterMaxWeight(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Desktop Table */}
      <div className="overflow-x-auto max-h-[500px]">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("date")}
              >
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Date & Time</span>
                  <SortIcon field="date" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>Location</span>
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("weight")}
              >
                <div className="flex items-center space-x-1">
                  <Scale className="h-4 w-4" />
                  <span>Weight (kg)</span>
                  <SortIcon field="weight" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center space-x-1">
                  <Tag className="h-4 w-4" />
                  <span>Category</span>
                </div>
              </th>
              {allowEdit && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {filteredEntries.map((entry) => (
              <tr key={entry._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">
                  <div className="font-medium">{entry.date}</div>
                  <div className="text-gray-500">{entry.time}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {entry.location}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                  {entry.weight}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(
                      entry.category
                    )}`}
                  >
                    {entry.category}
                  </span>
                </td>
                {allowEdit && (
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex space-x-2">
                      {allowEdit && (
                        <button
                          onClick={() => setEditingEntry(entry)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                          title="Edit entry"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                      )}
                      {allowDelete && (
                        <button
                          onClick={() =>
                            handleDelete(entry._id, entry.location)
                          }
                          className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                          title="Delete entry"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {editingEntry && (
          <EditModal
            entry={editingEntry}
            onClose={() => setEditingEntry(null)}
            fetchEntries={fetchEntries}
          />
        )}
      </div>
    </div>
  );
};

export default WasteTable;

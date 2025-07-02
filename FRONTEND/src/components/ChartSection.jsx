import React from 'react';
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const COLORS = ['#ef4444', '#22c55e', '#3b82f6', '#f59e0b', '#f472b6'];

const ChartSection = ({ totalWaste, locationCount, categoryDistribution, dateWiseCollection }) => {
  // Prepare Pie Chart Data
  const pieData = Object.keys(categoryDistribution).map((key, index) => ({
    name: key,
    value: categoryDistribution[key],
    color: COLORS[index % COLORS.length]
  }));

  // Prepare Bar Chart Data
  const barData = Object.keys(dateWiseCollection).map(date => ({
    name: date,
    waste: dateWiseCollection[date]
  }));

  return (
    <div className="space-y-8">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Waste Collected</h3>
          <p className="text-3xl font-bold text-green-600">{totalWaste} kg</p>
          <p className="text-sm text-gray-600 mt-1">Across all locations</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Recycling Rate</h3>
          <p className="text-3xl font-bold text-blue-600">75%</p>
          <p className="text-sm text-gray-600 mt-1">Average this month</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Locations</h3>
          <p className="text-3xl font-bold text-purple-600">{locationCount}</p>
          <p className="text-sm text-gray-600 mt-1">Collection points</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Waste Distribution by Type</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Daily Waste Collection</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="waste" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Environmental Impact (Static) */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Environmental Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-3xl font-bold">15.2 tons</p>
              <p className="text-green-100">CO₂ Saved</p>
            </div>
            <div>
              <p className="text-3xl font-bold">892</p>
              <p className="text-green-100">Trees Equivalent</p>
            </div>
            <div>
              <p className="text-3xl font-bold">1,200+</p>
              <p className="text-green-100">Community Members</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartSection;

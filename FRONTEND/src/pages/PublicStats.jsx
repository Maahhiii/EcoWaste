import React, { useEffect, useState } from 'react';
import ChartSection from '../components/ChartSection';
import { BarChart3, PieChart, TrendingUp, Users } from 'lucide-react';
import axios from 'axios';
import Loader from '../components/Loader';

const PublicStats = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/stats/dynamic`);
        setStats(res.data);
      } catch (err) {
        console.error('Failed to fetch stats', err);
      }
    };

    fetchStats();
  }, []);

  if (!stats) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Waste Management Statistics</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transparent data showing our environmental impact and community engagement.
            Together, we're building a cleaner, more sustainable future.
          </p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">

          <StatCard
            icon={<TrendingUp className="h-8 w-8 text-green-500" />}
            title="Monthly Growth"
            value="+23%"
            description="Waste collection increase"
            color="green"
          />

          <StatCard
            icon={<BarChart3 className="h-8 w-8 text-blue-500" />}
            title="Efficiency Rate"
            value="94%"
            description="Collection efficiency"
            color="blue"
          />

          <StatCard
            icon={<PieChart className="h-8 w-8 text-purple-500" />}
            title="Diversion Rate"
            value="85%"
            description="From landfills"
            color="purple"
          />

          <StatCard
            icon={<Users className="h-8 w-8 text-orange-500" />}
            title="Community Impact"
            value="1,250"
            description="Families served"
            color="orange"
          />

        </div>

        {/* Charts & Stats Section */}
        <ChartSection
          totalWaste={stats.totalWaste}
          locationCount={stats.locationCount}
          categoryDistribution={stats.categoryDistribution}
          dateWiseCollection={stats.dateWiseCollection}
        />

        {/* Additional Info */}
        <div className="mt-12 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">About Our Data</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">Data Collection Methods</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Real-time weight measurements at collection points</li>
                <li>• GPS tracking of collection vehicles</li>
                <li>• Community reporting through mobile app</li>
                <li>• Partnership with local recycling facilities</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Impact Goals</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Reduce landfill waste by 90% by 2025</li>
                <li>• Achieve 95% recycling rate across all categories</li>
                <li>• Expand to 500+ collection points</li>
                <li>• Engage 10,000+ community members</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, description, color }) => (
  <div className={`bg-white p-6 rounded-lg shadow-md border-l-4 border-${color}-500`}>
    <div className="flex items-center">
      <div className="flex-shrink-0">{icon}</div>
      <div className="ml-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className={`text-2xl font-bold text-${color}-600`}>{value}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  </div>
);

export default PublicStats;

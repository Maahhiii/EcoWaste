import React, { useEffect, useState } from 'react';

const StatCard = ({ label, target }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 10; 
    const stepTime = Math.max(Math.floor(duration / target), 20000);

    const counter = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === target) clearInterval(counter);
    }, stepTime);

    return () => clearInterval(counter);
  }, [target]);

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 text-center w-full sm:w-1/2 lg:w-1/4 transition-all">
      <p className="text-4xl font-bold text-blue-600">{count}</p>
      <p className="mt-2 text-gray-700 text-lg font-medium">{label}</p>
    </div>
  );
};

const StatsCounter = () => {
  const stats = [
    { label: 'Users', target: 1200 },
    { label: 'Employees', target: 85 },
    { label: 'Donations', target: 450 },
    { label: 'Treated Patients', target: 1090 },
  ];

  return (
    <section className="flex flex-wrap justify-center items-center gap-6 p-10 bg-gray-50 min-h-screen">
      {stats.map((stat, index) => (
        <StatCard key={index} label={stat.label} target={stat.target} />
      ))}
    </section>
  );
};

export default StatsCounter;

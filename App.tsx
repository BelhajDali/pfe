import * as React from 'react';
import { Dashboard } from './src/components/Dashboard';
import { StatCard } from './src/components/StatCard';

export const App = () => {
  return (
    <Dashboard>
      <StatCard
        title="Total Users"
        value="1,234"
        subtitle="12% increase from last month"
      />
      <StatCard
        title="Revenue"
        value="$50,234"
        subtitle="8% increase from last month"
      />
      <StatCard
        title="Active Sessions"
        value="123"
        subtitle="Current active users"
      />
    </Dashboard>
  );
}; 
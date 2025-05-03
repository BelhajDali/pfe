import React from 'react';
import WorkerTable from './WorkerTable';
import CameraGrid from './CameraGrid';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      {/* Header */}
      <header className="bg-[#1E2A3B] p-4 border-b border-[#2A3A4F]">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Factory Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-400">Last updated: {new Date().toLocaleTimeString()}</span>
            <button className="bg-[#2A3A4F] px-4 py-2 rounded-lg hover:bg-[#3A4A5F] transition-colors">
              Refresh
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-[#1E2A3B] p-4 border-r border-[#2A3A4F]">
          <nav>
            <ul className="space-y-2">
              <li>
                <a href="#" className="block p-2 rounded-lg bg-[#2A3A4F] text-white">
                  Overview
                </a>
              </li>
              <li>
                <a href="#" className="block p-2 rounded-lg text-gray-400 hover:bg-[#2A3A4F] hover:text-white">
                  Workers
                </a>
              </li>
              <li>
                <a href="#" className="block p-2 rounded-lg text-gray-400 hover:bg-[#2A3A4F] hover:text-white">
                  Cameras
                </a>
              </li>
              <li>
                <a href="#" className="block p-2 rounded-lg text-gray-400 hover:bg-[#2A3A4F] hover:text-white">
                  Reports
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="container mx-auto space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="lg:col-span-2">
                <CameraGrid />
              </div>
              <div className="lg:col-span-2">
                <WorkerTable />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard; 
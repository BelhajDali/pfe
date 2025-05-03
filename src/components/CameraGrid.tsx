import React from 'react';
import { useTranslation } from 'react-i18next';

const CameraGrid = () => {
  const { t } = useTranslation();

  const cameraFeeds = [
    {
      name: 'mainEntrance',
      location: 'Building A',
      status: 'online'
    },
    {
      name: 'assemblyLine',
      location: 'Floor 1',
      status: 'online'
    },
    {
      name: 'warehouse',
      location: 'Building B',
      status: 'offline'
    },
    {
      name: 'loadingDock',
      location: 'Building A',
      status: 'online'
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {cameraFeeds.map((feed, idx) => (
        <div key={idx} className="bg-[#1E2A3B] dark:bg-gray-100 rounded-xl p-4 transition-colors">
          <div className={`mb-2 flex items-center gap-2 ${feed.status === 'offline' ? 'text-red-400' : 'text-green-400'}`}>
            <div className="w-2 h-2 rounded-full bg-current"></div>
            <span className="text-white dark:text-gray-900 text-sm font-medium transition-colors">
              {t(`dashboard.camera.status.${feed.status}`)}
            </span>
          </div>
          <h3 className="text-white dark:text-gray-900 font-semibold mb-1 transition-colors">
            {t(`dashboard.camera.feeds.${feed.name}`)}
          </h3>
          <p className="text-gray-400 dark:text-gray-500 text-sm transition-colors">
            {t(`dashboard.location.${feed.location}`)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CameraGrid; 
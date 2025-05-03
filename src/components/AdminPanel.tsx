import React from 'react';
import { useTranslation } from 'react-i18next';

const users = [
  { email: 'john.doe@example.com' },
  { email: 'jane.smith@example.com' },
  { email: 'alice.jones@example.com' },
  { email: 'bob.brown@example.com' },
];

const AdminPanel = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-[#202940] dark:bg-white rounded-2xl p-6 shadow-lg transition-colors">
      <h2 className="text-lg font-semibold mb-4 text-white dark:text-gray-900 transition-colors">{t('adminPanel')}</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-400 dark:text-gray-500">
            <th className="pb-2 text-left font-semibold">{t('user')}</th>
            <th className="pb-2 text-left font-semibold">{t('actions')}</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr 
              key={idx} 
              className={`border-t border-[#232C47] dark:border-gray-200 ${
                idx % 2 === 0 ? 'bg-[#232C47]/40 dark:bg-gray-50' : ''
              } hover:bg-[#232C47]/80 dark:hover:bg-gray-100 transition-colors`}
            >
              <td className="py-2 text-white dark:text-gray-900 font-medium transition-colors">{user.email}</td>
              <td className="py-2">
                <button className="px-3 py-1 rounded bg-[#232C47] dark:bg-gray-100 text-white dark:text-gray-700 font-medium hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 transition-all">
                  {t('edit')}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel; 
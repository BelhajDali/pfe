import { Link, useLocation } from 'react-router-dom'
import { RiDashboardLine, RiUserLine, RiSettings4Line, RiLogoutBoxLine, RiBellLine, RiFileList2Line } from 'react-icons/ri'
import { MdOutlineVideocam } from 'react-icons/md'
import { useAuth } from '../contexts/AuthContext'
import { useTranslation } from 'react-i18next'

const navLinks = [
  { to: '/', label: 'Dashboard', icon: <RiDashboardLine size={20} /> },
  { to: '/cameras', label: 'Cameras', icon: <MdOutlineVideocam size={20} /> },
  { to: '/operators', label: 'Operators', icon: <RiUserLine size={20} /> },
  { to: '/reports', label: 'Reports', icon: <RiFileList2Line size={20} /> },
  { to: '/notifications', label: 'Notifications', icon: <RiBellLine size={20} /> },
  { to: '/settings', label: 'Settings', icon: <RiSettings4Line size={20} /> },
  { to: '/profile', label: 'Profile', icon: <RiUserLine size={20} /> },
]

const Sidebar = () => {
  const { logout } = useAuth()
  const location = useLocation()
  const { t } = useTranslation()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Failed to log out', error)
    }
  }

  return (
    <aside className="w-64 bg-[#1A2236] dark:bg-gray-200 flex flex-col p-4 min-h-screen transition-colors">
      <div className="mb-8">
        <div className="h-10 w-full bg-[#232C47] dark:bg-gray-300 rounded flex items-center justify-center font-bold text-lg tracking-wide text-white dark:text-[#151C2C]">
          LeoLAD
        </div>
      </div>
      <nav className="flex flex-col gap-2 flex-1">
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`flex items-center gap-3 px-3 py-2 rounded transition-colors text-white dark:text-[#151C2C] ${location.pathname === link.to ? 'bg-[#232C47] dark:bg-gray-300' : 'hover:bg-[#232C47] dark:hover:bg-gray-300'}`}
          >
            <span>{link.icon}</span>
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
      <div className="mt-8 flex flex-col gap-2 border-t border-[#232C47] dark:border-gray-300 pt-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 rounded bg-[#232C47] dark:bg-gray-300 hover:bg-[#2D3652] dark:hover:bg-gray-400 text-white dark:text-[#151C2C] text-sm font-medium mt-2 transition-colors"
        >
          <RiLogoutBoxLine size={18} />
          {t('sidebar.logout')}
        </button>
      </div>
    </aside>
  )
}

export default Sidebar 
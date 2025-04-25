import { Link } from 'react-router-dom'
import { RiDashboardLine, RiUserLine, RiSettings4Line, RiSunLine, RiMoonLine, RiLogoutBoxLine, RiArrowDownSLine, RiUser3Line } from 'react-icons/ri'
import { MdOutlineVideocam } from 'react-icons/md'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from './ThemeProvider'
import { useState } from 'react'

const Sidebar = () => {
  const { t, i18n } = useTranslation()
  const { theme, setTheme } = useTheme()
  const { logout, userData } = useAuth()
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'fr' : 'en')
  }

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Failed to log out', error)
    }
  }

  return (
    <div className="w-64 bg-[#1e2a3b] text-white p-6 flex flex-col">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
          <RiDashboardLine size={24} />
        </div>
        <h1 className="text-xl font-semibold">Dashboard</h1>
      </div>

      <nav className="space-y-2 flex-1">
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-3 text-white rounded-lg hover:bg-white/10"
        >
          <RiDashboardLine size={20} />
          <span>Tableau de bord</span>
        </Link>

        <Link
          to="/cameras"
          className="flex items-center gap-3 px-4 py-3 text-white rounded-lg hover:bg-white/10"
        >
          <MdOutlineVideocam size={20} />
          <span>Caméras</span>
        </Link>

        <Link
          to="/operators"
          className="flex items-center gap-3 px-4 py-3 text-white rounded-lg hover:bg-white/10"
        >
          <RiUserLine size={20} />
          <span>Opérateurs</span>
        </Link>

        <div className="relative">
          <Link
            to="/settings"
            onClick={(e) => {
              e.preventDefault();
              setShowProfileMenu(!showProfileMenu);
            }}
            className={`flex items-center justify-between w-full gap-3 px-4 py-3 text-white rounded-lg hover:bg-white/10 ${
              showProfileMenu ? 'bg-white/10' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <RiSettings4Line size={20} />
              <span>Paramètres</span>
            </div>
            <RiArrowDownSLine
              size={20}
              className={`transform transition-transform duration-200 ${
                showProfileMenu ? 'rotate-180' : ''
              }`}
            />
          </Link>

          {showProfileMenu && (
            <div className="absolute top-full left-0 w-full bg-[#1e2a3b] rounded-lg shadow-xl mt-2">
              <Link
                to="/profile"
                className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10"
              >
                <div className="w-10 h-10 rounded-full bg-[#2A3A4F] overflow-hidden">
                  {userData?.photoURL ? (
                    <img 
                      src={userData.photoURL} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <RiUser3Line className="text-gray-400" size={20} />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-sm">{userData?.displayName || 'Profil utilisateur'}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{userData?.email}</div>
                </div>
              </Link>

              <div className="px-4 py-2 border-t border-white/10">
                <div className="text-xs text-gray-400">Rôle</div>
                <div className="text-sm text-white">
                  {userData?.role === 'admin' ? 'Administrateur' : 'Utilisateur'}
                </div>
              </div>

              <div className="px-4 py-2 border-t border-white/10">
                <div className="text-xs text-gray-400">Statut</div>
                <div className="text-sm text-white">
                  {userData?.status === 'approved' ? 'Approuvé' : 
                   userData?.status === 'pending' ? 'En attente' : 'Rejeté'}
                </div>
              </div>

              <Link
                to="/profile/edit"
                className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 border-t border-white/10"
              >
                <span>Modifier le profil</span>
              </Link>
            </div>
          )}
        </div>
      </nav>

      <div className="border-t border-white/10 pt-4 mt-4 space-y-2">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-white rounded-lg hover:bg-white/10 w-full bg-[#1e2a3b]"
        >
          <RiLogoutBoxLine size={20} />
          <span>Déconnexion</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-3 px-4 py-3 text-white rounded-lg hover:bg-white/10 flex-1 bg-[#1e2a3b]"
          >
            <span>{i18n.language === 'en' ? 'FR' : 'EN'}</span>
          </button>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex items-center gap-3 px-4 py-3 text-white rounded-lg hover:bg-white/10 flex-1 bg-[#1e2a3b]"
          >
            {theme === 'dark' ? <RiSunLine size={20} /> : <RiMoonLine size={20} />}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar 
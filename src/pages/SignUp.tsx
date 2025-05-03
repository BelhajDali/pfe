import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useTranslation } from 'react-i18next'
import { RiLockLine, RiMailLine, RiUserLine, RiEyeLine, RiEyeOffLine } from 'react-icons/ri'
import { isValidEmail } from '../utils/validation'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isValidEmail(email)) {
      setError(t('auth.invalidEmail'))
      return
    }

    if (password !== confirmPassword) {
      return setError(t('auth.passwordMismatch'))
    }

    try {
      setError('')
      setLoading(true)
      await signUp(email, password)
      navigate('/')
    } catch (err) {
      setError(t('auth.signUpFailed'))
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-8">
          <div>
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl mx-auto flex items-center justify-center transform -rotate-6 hover:rotate-0 transition-transform duration-300">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="mt-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
              {t('auth.signUp')}
            </h2>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <RiMailLine className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('auth.email')}
                  className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm transition-all duration-200"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <RiLockLine className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('auth.password')}
                  className="appearance-none block w-full pl-10 pr-10 py-3 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                >
                  {showPassword ? <RiEyeOffLine className="h-5 w-5" /> : <RiEyeLine className="h-5 w-5" />}
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <RiLockLine className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={t('auth.confirmPassword')}
                  className="appearance-none block w-full pl-10 pr-10 py-3 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                >
                  {showConfirmPassword ? <RiEyeOffLine className="h-5 w-5" /> : <RiEyeLine className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 transition-all duration-200 transform hover:-translate-y-0.5"
              >
                {loading ? t('auth.signingUp') : t('auth.signUp')}
              </button>
            </div>

            <div className="text-sm text-center">
              <Link
                to="/signin"
                className="font-medium text-orange-500 hover:text-orange-400 transition-colors duration-200"
              >
                {t('auth.alreadyAccount')}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
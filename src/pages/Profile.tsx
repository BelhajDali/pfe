import { useState, useRef } from 'react';
import { RiUser3Line, RiMailLine, RiPhoneLine, RiGlobalLine, RiTeamLine, RiLockPasswordLine } from 'react-icons/ri';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface UserProfile {
  avatar: string;
  username: string;
  email: string;
  phone: string;
  language: string;
  role: string;
  status: string;
}

const Profile = () => {
  const { userData, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [profile, setProfile] = useState<UserProfile>({
    avatar: userData?.photoURL || '',
    username: userData?.displayName || '',
    email: userData?.email || '',
    phone: userData?.phoneNumber || '',
    language: 'Français',
    role: userData?.role || 'Utilisateur',
    status: userData?.status || 'Actif'
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({
          ...prev,
          avatar: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field: keyof UserProfile) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProfile(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    // Réinitialiser les messages
    setError('');
    setSuccessMessage('');
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      setError('');
      setSuccessMessage('');

      // Mettre à jour le profil utilisateur
      await updateUserProfile({
        displayName: profile.username,
        photoURL: profile.avatar,
        phoneNumber: profile.phone,
        email: profile.email
      });

      setSuccessMessage('Profil mis à jour avec succès !');
      
      // Rediriger vers le dashboard après 2 secondes
      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (err) {
      setError('Erreur lors de la mise à jour du profil. Veuillez réessayer.');
      console.error('Error updating profile:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-[#1E2A3B] dark:bg-white rounded-lg p-8">
        <h1 className="text-2xl font-bold text-white dark:text-gray-900 mb-8">Profil Utilisateur</h1>
        
        {/* Messages d'erreur et de succès */}
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-lg mb-6">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="bg-green-500/10 border border-green-500 text-green-500 px-4 py-2 rounded-lg mb-6">
            {successMessage}
          </div>
        )}
        
        {/* Avatar Section */}
        <div className="flex flex-col items-center mb-8">
          <div 
            className="w-32 h-32 rounded-full bg-[#2A3A4F] dark:bg-gray-100 mb-4 cursor-pointer overflow-hidden"
            onClick={handleAvatarClick}
          >
            {profile.avatar ? (
              <img 
                src={profile.avatar} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <RiUser3Line size={48} className="text-gray-400" />
              </div>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
          <button 
            className="text-blue-400 dark:text-blue-600 hover:text-blue-300 dark:hover:text-blue-500 text-sm"
            onClick={handleAvatarClick}
          >
            Changer la photo
          </button>
        </div>

        {/* Profile Form */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Username */}
            <div className="space-y-2">
              <label className="text-gray-400 dark:text-gray-600 text-sm">Pseudo</label>
              <div className="relative">
                <input
                  type="text"
                  value={profile.username}
                  onChange={handleInputChange('username')}
                  className="w-full bg-[#2A3A4F] dark:bg-gray-50 text-white dark:text-gray-900 rounded-lg py-2 px-4 pl-10"
                />
                <RiUser3Line className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-gray-400 dark:text-gray-600 text-sm">Email</label>
              <div className="relative">
                <input
                  type="email"
                  value={profile.email}
                  onChange={handleInputChange('email')}
                  className="w-full bg-[#2A3A4F] dark:bg-gray-50 text-white dark:text-gray-900 rounded-lg py-2 px-4 pl-10"
                />
                <RiMailLine className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="text-gray-400 dark:text-gray-600 text-sm">Téléphone</label>
              <div className="relative">
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={handleInputChange('phone')}
                  className="w-full bg-[#2A3A4F] dark:bg-gray-50 text-white dark:text-gray-900 rounded-lg py-2 px-4 pl-10"
                />
                <RiPhoneLine className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>

            {/* Language */}
            <div className="space-y-2">
              <label className="text-gray-400 dark:text-gray-600 text-sm">Langue</label>
              <div className="relative">
                <input
                  type="text"
                  value={profile.language}
                  onChange={handleInputChange('language')}
                  className="w-full bg-[#2A3A4F] dark:bg-gray-50 text-white dark:text-gray-900 rounded-lg py-2 px-4 pl-10"
                />
                <RiGlobalLine className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>

            {/* Role */}
            <div className="space-y-2">
              <label className="text-gray-400 dark:text-gray-600 text-sm">Rôle</label>
              <div className="relative">
                <input
                  type="text"
                  value={profile.role}
                  readOnly
                  className="w-full bg-[#2A3A4F] dark:bg-gray-50 text-white dark:text-gray-900 rounded-lg py-2 px-4 pl-10 cursor-not-allowed"
                />
                <RiTeamLine className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>

            {/* Password Change Button */}
            <div className="space-y-2">
              <label className="text-gray-400 dark:text-gray-600 text-sm">Mot de passe</label>
              <button
                className="w-full bg-[#2A3A4F] dark:bg-gray-50 text-white dark:text-gray-900 rounded-lg py-2 px-4 flex items-center gap-2 hover:bg-[#3A4A5F] dark:hover:bg-gray-100"
              >
                <RiLockPasswordLine className="text-gray-400" />
                Changer le mot de passe
              </button>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-6">
            <button
              onClick={handleSave}
              disabled={isLoading}
              className={`bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2
                ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Enregistrement...
                </>
              ) : (
                'Enregistrer les modifications'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 
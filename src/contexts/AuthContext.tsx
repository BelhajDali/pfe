import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  sendPasswordResetEmail,
  updateProfile,
  updateEmail,
  updatePassword,
  Auth
} from 'firebase/auth'
import { doc, setDoc, getDoc, Firestore, updateDoc } from 'firebase/firestore'
import { auth, db } from '../lib/firebase'

type UserStatus = 'pending' | 'approved' | 'rejected'

export interface UserData {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  phoneNumber: string | null;
  role: string;
  status: string;
}

interface AuthContextType {
  user: User | null
  userData: UserData | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  updateUserProfile: (profile: {
    displayName?: string;
    photoURL?: string;
    phoneNumber?: string;
    email?: string;
  }) => Promise<void>
  updateUserEmail: (email: string) => Promise<void>
  updateUserPassword: (password: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('AuthProvider: Setting up auth state listener')
    try {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        console.log('AuthProvider: Auth state changed', user)
        setUser(user)
        if (user) {
          try {
            const userDoc = await getDoc(doc(db, 'users', user.uid))
            if (userDoc.exists()) {
              setUserData(userDoc.data() as UserData)
            }
          } catch (error) {
            console.error('AuthProvider: Error fetching user data', error)
          }
        } else {
          setUserData(null)
        }
        setLoading(false)
      })

      return unsubscribe
    } catch (error) {
      console.error('AuthProvider: Error setting up auth state listener', error)
      setLoading(false)
    }
  }, [])

  const signUp = async (email: string, password: string) => {
    console.log('AuthProvider: Attempting signup')
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password)
      await setDoc(doc(db, 'users', user.uid), {
        email,
        status: 'pending',
        role: 'user',
        displayName: user.displayName || '',
        photoURL: user.photoURL || '',
        phoneNumber: user.phoneNumber || null
      })
      console.log('AuthProvider: Signup successful')
    } catch (error: any) {
      console.error('AuthProvider: Signup error', error)
      throw new Error(getAuthErrorMessage(error.code))
    }
  }

  const signIn = async (email: string, password: string) => {
    console.log('Tentative de connexion avec:', email);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log('Connexion réussie, utilisateur:', result.user);
      
      // Vérifier les données utilisateur dans Firestore
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));
      console.log('Document utilisateur:', userDoc.exists() ? userDoc.data() : 'Non trouvé');
      
      if (!userDoc.exists()) {
        console.log('Création du document utilisateur dans Firestore...');
        // Créer le document utilisateur s'il n'existe pas
        await setDoc(doc(db, 'users', result.user.uid), {
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName || '',
          photoURL: result.user.photoURL || '',
          phoneNumber: result.user.phoneNumber || '',
          role: 'user',
          status: 'approved'
        });
      }

      // Mettre à jour les données utilisateur
      if (userDoc.exists()) {
        const userData = userDoc.data() as UserData;
        setUserData(userData);
      }

    } catch (error: any) {
      console.error('Erreur de connexion détaillée:', {
        code: error.code,
        message: error.message,
        fullError: error
      });
      
      let errorMessage = 'Erreur de connexion. Vérifiez vos identifiants.';
      
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'Adresse email invalide';
          break;
        case 'auth/user-disabled':
          errorMessage = 'Ce compte a été désactivé';
          break;
        case 'auth/user-not-found':
          errorMessage = 'Aucun compte trouvé avec cet email';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Mot de passe incorrect';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Trop de tentatives. Veuillez réessayer plus tard';
          break;
      }
      
      throw new Error(errorMessage);
    }
  };

  const logout = async () => {
    console.log('AuthProvider: Attempting logout')
    try {
      await signOut(auth)
      console.log('AuthProvider: Logout successful')
    } catch (error: any) {
      console.error('AuthProvider: Logout error', error)
      throw new Error(getAuthErrorMessage(error.code))
    }
  }

  const resetPassword = async (email: string) => {
    console.log('AuthProvider: Attempting password reset')
    try {
      await sendPasswordResetEmail(auth, email)
      console.log('AuthProvider: Password reset email sent')
    } catch (error: any) {
      console.error('AuthProvider: Password reset error', error)
      throw new Error(getAuthErrorMessage(error.code))
    }
  }

  const updateUserProfile = async (profile: {
    displayName?: string;
    photoURL?: string;
    phoneNumber?: string;
    email?: string;
  }) => {
    if (!auth.currentUser) throw new Error('No user logged in');

    try {
      console.log('Début de la mise à jour du profil:', profile);

      // Mettre à jour le profil Firebase
      console.log('Mise à jour du profil Firebase...');
      await updateProfile(auth.currentUser, {
        displayName: profile.displayName,
        photoURL: profile.photoURL
      });
      console.log('Profil Firebase mis à jour avec succès');

      // Mettre à jour l'email si fourni
      if (profile.email && profile.email !== auth.currentUser.email) {
        console.log('Mise à jour de l\'email...');
        await updateEmail(auth.currentUser, profile.email);
        console.log('Email mis à jour avec succès');
      }

      // Mettre à jour les données utilisateur dans Firestore
      console.log('Mise à jour des données dans Firestore...');
      const userRef = doc(db, 'users', auth.currentUser.uid);
      const updateData = {
        ...(profile.displayName && { displayName: profile.displayName }),
        ...(profile.photoURL && { photoURL: profile.photoURL }),
        ...(profile.phoneNumber && { phoneNumber: profile.phoneNumber }),
        ...(profile.email && { email: profile.email })
      };
      console.log('Données à mettre à jour dans Firestore:', updateData);
      
      await updateDoc(userRef, updateData);
      console.log('Données Firestore mises à jour avec succès');

      // Mettre à jour l'état local
      if (userData) {
        console.log('Mise à jour de l\'état local...');
        const updatedUserData = {
          ...userData,
          displayName: profile.displayName || userData.displayName,
          photoURL: profile.photoURL || userData.photoURL,
          phoneNumber: profile.phoneNumber || userData.phoneNumber,
          email: profile.email || userData.email
        };
        setUserData(updatedUserData);
        console.log('État local mis à jour avec succès:', updatedUserData);
      }
    } catch (error) {
      console.error('Erreur détaillée lors de la mise à jour du profil:', {
        error,
        errorMessage: error instanceof Error ? error.message : 'Unknown error',
        errorStack: error instanceof Error ? error.stack : undefined,
        profile
      });
      throw new Error(
        error instanceof Error 
          ? `Erreur: ${error.message}` 
          : 'Une erreur inattendue s\'est produite lors de la mise à jour du profil'
      );
    }
  };

  const updateUserEmail = async (email: string) => {
    if (!user) throw new Error('No user is currently signed in')
    try {
      await updateEmail(user, email)
      await setDoc(doc(db, 'users', user.uid), {
        ...userData,
        email
      }, { merge: true })
    } catch (error: any) {
      throw new Error(getAuthErrorMessage(error.code))
    }
  }

  const updateUserPassword = async (password: string) => {
    if (!user) throw new Error('No user is currently signed in')
    try {
      await updatePassword(user, password)
    } catch (error: any) {
      throw new Error(getAuthErrorMessage(error.code))
    }
  }

  const value = {
    user,
    userData,
    loading,
    signIn,
    signUp,
    logout,
    resetPassword,
    updateUserProfile,
    updateUserEmail,
    updateUserPassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

function getAuthErrorMessage(code: string): string {
  switch (code) {
    case 'auth/invalid-email':
      return 'Invalid email address'
    case 'auth/user-disabled':
      return 'This account has been disabled'
    case 'auth/user-not-found':
      return 'No account found with this email'
    case 'auth/wrong-password':
      return 'Incorrect password'
    case 'auth/email-already-in-use':
      return 'This email is already in use'
    case 'auth/weak-password':
      return 'Password is too weak'
    case 'auth/operation-not-allowed':
      return 'This operation is not allowed'
    case 'auth/too-many-requests':
      return 'Too many requests. Please try again later'
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection'
    default:
      return 'An error occurred. Please try again'
  }
} 
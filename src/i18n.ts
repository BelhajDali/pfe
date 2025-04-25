import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      dashboard: {
        title: 'Dashboard',
        stats: {
          production: 'Production',
          errors: 'Errors',
          yield: 'Yield'
        },
        realTime: 'Real time',
        productionOverTime: 'Production over time',
        predicted: 'Predicted',
        actual: 'Actual',
        aiCamera: 'AI Camera View',
        detectionResults: 'Detection Results',
        badlyPositioned: 'Product badly positioned',
        analyzeAgain: 'Analyze again',
        recentAlerts: 'Recent Alerts',
        defectDetected: 'Defect detected on line 3',
        timeAgo: '2 hours ago',
        nav: {
          dashboard: 'Dashboard',
          cameras: 'Cameras',
          operators: 'Operators',
          settings: 'Settings'
        }
      },
      auth: {
        signIn: 'Sign in to your account',
        signUp: 'Create an account',
        email: 'Email address',
        password: 'Password',
        confirmPassword: 'Confirm password',
        signingIn: 'Signing in...',
        signingUp: 'Signing up...',
        needAccount: 'Need an account? Sign up',
        alreadyHaveAccount: 'Already have an account? Sign in',
        registrationSuccess: 'Registration Successful',
        waitForApproval: 'Please wait for an administrator to approve your account.',
        backToSignIn: 'Back to sign in',
        passwordsDoNotMatch: 'Passwords do not match',
        forgotPassword: 'Forgot your password?',
        resetPassword: 'Reset Password',
        resetInstructions: 'Enter your email address and we\'ll send you a link to reset your password.',
        resetEmailSent: 'Password reset email sent! Please check your inbox.',
        resetFailed: 'Failed to send reset email. Please try again.',
        sending: 'Sending...',
        invalidEmail: 'Invalid email address',
        signInFailed: 'Failed to sign in',
        signUpFailed: 'Failed to sign up'
      }
    }
  },
  fr: {
    translation: {
      dashboard: {
        title: 'Tableau de bord',
        stats: {
          production: 'Production',
          errors: 'Erreurs',
          yield: 'Rendement'
        },
        realTime: 'En temps réel',
        productionOverTime: 'Production au fil du temps',
        predicted: 'Prévue',
        actual: 'Réelle',
        aiCamera: 'Vue de la caméra IA',
        detectionResults: 'Résultats de détection',
        badlyPositioned: 'Produit mal positionné',
        analyzeAgain: 'Analyser à nouveau',
        recentAlerts: 'Alértes récentes',
        defectDetected: 'Défaut détecté sur la ligne 3',
        timeAgo: 'il y a 2 heures',
        nav: {
          dashboard: 'Tableau de bord',
          cameras: 'Caméras',
          operators: 'Opérateurs',
          settings: 'Paramètres'
        }
      },
      auth: {
        signIn: 'Connectez-vous à votre compte',
        signUp: 'Créer un compte',
        email: 'Adresse e-mail',
        password: 'Mot de passe',
        confirmPassword: 'Confirmer le mot de passe',
        signingIn: 'Connexion en cours...',
        signingUp: 'Inscription en cours...',
        needAccount: 'Besoin d\'un compte ? Inscrivez-vous',
        alreadyHaveAccount: 'Vous avez déjà un compte ? Connectez-vous',
        registrationSuccess: 'Inscription réussie',
        waitForApproval: 'Veuillez attendre qu\'un administrateur approuve votre compte.',
        backToSignIn: 'Retour à la connexion',
        passwordsDoNotMatch: 'Les mots de passe ne correspondent pas',
        forgotPassword: 'Mot de passe oublié ?',
        resetPassword: 'Réinitialiser le mot de passe',
        resetInstructions: 'Entrez votre adresse e-mail et nous vous enverrons un lien pour réinitialiser votre mot de passe.',
        resetEmailSent: 'Email de réinitialisation envoyé ! Veuillez vérifier votre boîte de réception.',
        resetFailed: 'Échec de l\'envoi de l\'email de réinitialisation. Veuillez réessayer.',
        sending: 'Envoi en cours...',
        invalidEmail: 'Adresse e-mail invalide',
        signInFailed: 'Échec de la connexion',
        signUpFailed: 'Échec de l\'inscription'
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 
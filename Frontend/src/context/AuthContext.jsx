/**
 * AuthContext.jsx
 * Global authentication state connected to Firebase Google OAuth, Email/Password & MongoDB Atlas.
 */
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import apiClient from '../api/axios.client';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

const DEFAULT_TRAINER = {
  id: null,
  googleId: null,
  username: null,
  displayName: null,
  email: null,
  avatar: null,
  profession: 'Pokémon Trainer',
  region: 'Kalos',
  age: 18,
  badge: 'Explorer',
  adoptions: 0,
  joinedAt: null,
  token: null,
};

export function AuthProvider({ children }) {
  const [trainer, setTrainer] = useState(DEFAULT_TRAINER);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Listen for active Firebase sessions and sync with MongoDB Atlas
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const idToken = await firebaseUser.getIdToken();
          localStorage.setItem('token', idToken);

          // Sync profile with Express Backend -> MongoDB Atlas
          let dbUser = null;
          try {
            // Using a generic sync route that handles both Google and Email/Password users
            const res = await apiClient.post('/auth/sync', {
              uid: firebaseUser.uid,
              displayName: firebaseUser.displayName || 'Pokémon Trainer',
              email: firebaseUser.email,
              avatar: firebaseUser.photoURL || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${firebaseUser.uid}`,
            });
            dbUser = res?.data;
          } catch (syncErr) {
            console.warn('[AuthSync] DB sync notice:', syncErr?.message || syncErr);
          }

          setTrainer({
            id: dbUser?.id || firebaseUser.uid,
            googleId: firebaseUser.uid, // We'll keep this named googleId for backward compatibility, or rename to uid
            username: firebaseUser.email ? firebaseUser.email.split('@')[0] : 'Trainer',
            displayName: dbUser?.displayName || firebaseUser.displayName || 'Pokémon Trainer',
            email: firebaseUser.email,
            avatar: dbUser?.avatar || firebaseUser.photoURL || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${firebaseUser.uid}`,
            profession: dbUser?.profession || 'Pokémon Trainer',
            region: dbUser?.region || 'Kalos',
            age: dbUser?.age || 18,
            badge: dbUser?.badge || (dbUser?.role === 'admin' ? 'Champion' : 'Elite'),
            adoptions: dbUser?.adoptions || 0,
            joinedAt: dbUser?.createdAt || new Date().toISOString(),
            token: idToken,
          });
        } catch (err) {
          console.error('[AuthContext] Session initialization error:', err);
        }
      } else {
        localStorage.removeItem('token');
        setTrainer(DEFAULT_TRAINER);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  /** Trigger Google OAuth Popup */
  const loginWithGoogle = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const toastId = toast.loading('Connecting to Google Sign-In...');
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      toast.success(`Welcome back, ${user.displayName || 'Trainer'}!`, { id: toastId });
    } catch (err) {
      handleAuthError(err, toastId);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /** Email & Password Sign Up */
  const signupWithEmail = useCallback(async (email, password) => {
    setIsLoading(true);
    setError(null);
    const toastId = toast.loading('Registering Trainer Card...');
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      toast.success(`Registration successful!`, { id: toastId });
      return result.user;
    } catch (err) {
      handleAuthError(err, toastId);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /** Email & Password Log In */
  const loginWithEmail = useCallback(async (email, password) => {
    setIsLoading(true);
    setError(null);
    const toastId = toast.loading('Verifying Trainer Credentials...');
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      toast.success(`Welcome back!`, { id: toastId });
      return result.user;
    } catch (err) {
      handleAuthError(err, toastId);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);


  /** Helper to format Auth Errors */
  const handleAuthError = (err, toastId) => {
    console.error('[AuthContext] Auth error:', err);
    let errorMsg = 'Authentication failed';

    switch (err.code) {
      case 'auth/popup-closed-by-user':
        errorMsg = 'Sign-in popup was closed before completing.';
        break;
      case 'auth/cancelled-popup-request':
        errorMsg = 'Sign-in request cancelled.';
        break;
      case 'auth/popup-blocked':
        errorMsg = 'Pop-up blocked by browser. Please allow pop-ups for this site.';
        break;
      case 'auth/email-already-in-use':
        errorMsg = 'That email is already registered.';
        break;
      case 'auth/invalid-email':
        errorMsg = 'Invalid email address format.';
        break;
      case 'auth/weak-password':
        errorMsg = 'Password should be at least 6 characters.';
        break;
      case 'auth/invalid-credential':
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        errorMsg = 'Invalid email or password.';
        break;
      default:
        errorMsg = err.message || 'Authentication failed';
    }

    setError(errorMsg);
    if (toastId) toast.error(errorMsg, { id: toastId });
  };


  /** Update Trainer Profile in MongoDB Atlas */
  const updateTrainerProfile = useCallback(async (updatedData) => {
    if (!trainer.googleId) return;
    const toastId = toast.loading('Saving Trainer Card...');
    try {
      const res = await apiClient.put('/auth/profile', {
        uid: trainer.googleId, // Updated to generic uid if needed backend-side
        ...updatedData
      });
      const dbUser = res?.data;
      setTrainer(prev => ({
        ...prev,
        displayName: dbUser?.displayName || prev.displayName,
        profession: dbUser?.profession || prev.profession,
        region: dbUser?.region || prev.region,
        age: dbUser?.age || prev.age,
        badge: dbUser?.badge || prev.badge,
        adoptions: dbUser?.adoptions ?? prev.adoptions
      }));
      toast.success('Trainer Card updated successfully!', { id: toastId });
      return true;
    } catch (err) {
      console.error('[AuthContext] Update profile error:', err);
      toast.error(err.message || 'Failed to update Trainer Card', { id: toastId });
      return false;
    }
  }, [trainer.googleId]);

  /** Clear session */
  const logout = useCallback(async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('token');
      setTrainer(DEFAULT_TRAINER);
      toast.success('Signed out successfully');
    } catch (err) {
      toast.error('Error signing out');
    }
  }, []);

  const isAuthenticated = Boolean(trainer.token);

  return (
    <AuthContext.Provider value={{
      trainer,
      isAuthenticated,
      isLoading,
      error,
      loginWithGoogle, // Renamed from 'login' for clarity
      loginWithEmail,
      signupWithEmail,
      logout,
      updateTrainerProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
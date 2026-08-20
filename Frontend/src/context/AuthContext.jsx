/**
 * AuthContext.jsx
 * Dedicated authentication state powered directly by Express REST API & MongoDB Atlas.
 */
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import apiClient from '../api/axios.client';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

const DEFAULT_TRAINER = {
  id:          null,
  username:    null,
  displayName: null,
  email:       null,
  avatar:      null,
  profession:  'Pokémon Trainer',
  region:      'Kalos',
  age:         18,
  badge:       'Explorer',
  adoptions:   0,
  joinedAt:    null,
  token:       null,
};

export function AuthProvider({ children }) {
  const [trainer, setTrainer] = useState(DEFAULT_TRAINER);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize session from saved JWT token on launch
  useEffect(() => {
    const initializeAuth = async () => {
      const savedToken = localStorage.getItem('token');
      if (savedToken) {
        try {
          const res = await apiClient.get('/auth/me', {
            headers: { Authorization: `Bearer ${savedToken}` }
          });
          if (res?.data) {
            setTrainer({
              ...res.data,
              token: savedToken
            });
          } else {
            localStorage.removeItem('token');
            setTrainer(DEFAULT_TRAINER);
          }
        } catch (err) {
          console.warn('[AuthContext] Saved token verification failed:', err);
          localStorage.removeItem('token');
          setTrainer(DEFAULT_TRAINER);
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  /** Sign In with Username/Email & Password */
  const loginWithEmail = useCallback(async (emailOrUsername, password) => {
    setIsLoading(true);
    setError(null);
    const toastId = toast.loading('Authenticating Trainer Pass...');
    try {
      const res = await apiClient.post('/auth/login', {
        emailOrUsername,
        password
      });

      const { token, data: user } = res;
      localStorage.setItem('token', token);

      setTrainer({
        ...user,
        token
      });

      toast.success(`Welcome back, ${user.displayName}!`, { id: toastId });
      return user;
    } catch (err) {
      console.error('[AuthContext] Login error:', err);
      const msg = err.message || 'Invalid username/email or password';
      setError(msg);
      toast.error(msg, { id: toastId });
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /** Register New Trainer */
  const signupWithEmail = useCallback(async (formData) => {
    setIsLoading(true);
    setError(null);
    const toastId = toast.loading('Registering Trainer Pass...');
    try {
      const payload = typeof formData === 'object' ? formData : { email: formData };
      const res = await apiClient.post('/auth/register', payload);

      const { token, data: user } = res;
      localStorage.setItem('token', token);

      setTrainer({
        ...user,
        token
      });

      toast.success(`Trainer Pass registered! Welcome, ${user.displayName}.`, { id: toastId });
      return user;
    } catch (err) {
      console.error('[AuthContext] Signup error:', err);
      const msg = err.message || 'Registration failed';
      setError(msg);
      toast.error(msg, { id: toastId });
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /** Reset / Update Trainer Password */
  const resetPassword = useCallback(async (identifier, newPassword) => {
    setIsLoading(true);
    setError(null);
    const toastId = toast.loading('Updating Trainer Password...');
    try {
      const res = await apiClient.post('/auth/reset-password', {
        identifier,
        newPassword
      });

      toast.success(res.message || 'Password updated successfully! Please sign in.', { id: toastId });
      return true;
    } catch (err) {
      console.error('[AuthContext] Reset password error:', err);
      const msg = err.message || 'Password reset failed';
      setError(msg);
      toast.error(msg, { id: toastId });
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /** Update Trainer Card Profile */
  const updateTrainerProfile = useCallback(async (updatedData) => {
    if (!trainer.id) return false;
    const toastId = toast.loading('Saving Trainer Card...');
    try {
      const res = await apiClient.put('/auth/profile', {
        id: trainer.id,
        ...updatedData
      });
      const user = res?.data;
      setTrainer(prev => ({
        ...prev,
        displayName: user?.displayName || prev.displayName,
        profession:  user?.profession  || prev.profession,
        region:      user?.region      || prev.region,
        age:         user?.age         || prev.age,
        badge:       user?.badge       || prev.badge,
        adoptions:   user?.adoptions   ?? prev.adoptions
      }));
      toast.success('Trainer Card updated successfully!', { id: toastId });
      return true;
    } catch (err) {
      console.error('[AuthContext] Update profile error:', err);
      toast.error(err.message || 'Failed to update Trainer Card', { id: toastId });
      return false;
    }
  }, [trainer.id]);

  /** Adopt Pokémon Companions */
  const adoptPokemons = useCallback(async (items) => {
    const savedToken = localStorage.getItem('token') || trainer.token;
    if (!savedToken) return false;
    const toastId = toast.loading('Finalizing Pokémon adoption with Lumiose Sanctuary...');
    try {
      const res = await apiClient.post('/auth/adopt', { items });
      const user = res?.data;
      if (user) {
        setTrainer(prev => ({
          ...prev,
          ...user,
          adoptions: user.adoptions ?? prev.adoptions,
          adoptedPokemons: user.adoptedPokemons || prev.adoptedPokemons || []
        }));
      }
      toast.success(res.message || 'Adoption finalized! Companions added to Trainer Pass.', { id: toastId });
      return true;
    } catch (err) {
      console.error('[AuthContext] Adopt error:', err);
      toast.error(err.message || 'Failed to save adoption to Trainer Pass', { id: toastId });
      return false;
    }
  }, [trainer.token]);

  /** Clear Session */
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setTrainer(DEFAULT_TRAINER);
    toast.success('Signed out successfully');
  }, []);

  const isAuthenticated = Boolean(trainer.token);

  return (
    <AuthContext.Provider value={{
      trainer,
      isAuthenticated,
      isLoading,
      error,
      login: loginWithEmail,
      loginWithEmail,
      loginWithGoogle: loginWithEmail,
      signupWithEmail,
      resetPassword,
      logout,
      updateTrainerProfile,
      adoptPokemons
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
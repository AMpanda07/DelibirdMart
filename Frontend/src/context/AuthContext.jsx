/**
 * AuthContext.jsx
 * Provides global authentication state: the logged-in trainer's profile,
 * login/logout actions, and a Trainer Card badge level.
 *
 * Future integration: swap the mock login with a real JWT call to
 *   POST /api/v1/auth/login (Express backend).
 */
import React, { createContext, useContext, useState, useCallback } from 'react';

/* ── Shape ─────────────────────────────────────────────────────── */
const AuthContext = createContext(null);

/* ── Mock trainer template ─────────────────────────────────────── */
const DEFAULT_TRAINER = {
  id:          null,
  username:    null,
  displayName: null,
  avatar:      null,
  badge:       'Explorer',   // Explorer | Elite | Champion
  region:      'Kalos',
  adoptions:   0,
  joinedAt:    null,
  token:       null,
};

/* ── Provider ──────────────────────────────────────────────────── */
export function AuthProvider({ children }) {
  const [trainer, setTrainer] = useState(DEFAULT_TRAINER);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]     = useState(null);

  /** Simulated login — replace with real API call in Phase 2 */
  const login = useCallback(async (username, _password) => {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: const res = await apiClient.post('/auth/login', { username, password });
      await new Promise(r => setTimeout(r, 600)); // simulate network
      setTrainer({
        id:          'trainer-001',
        username,
        displayName: username,
        avatar:      `https://api.dicebear.com/7.x/pixel-art/svg?seed=${username}`,
        badge:       'Elite',
        region:      'Kalos',
        adoptions:   3,
        joinedAt:    new Date().toISOString(),
        token:       'mock-jwt-token',
      });
    } catch (err) {
      setError(err.message ?? 'Login failed');
    } finally {
      setIsLoading(false);
    }
  }, []);

  /** Clear session */
  const logout = useCallback(() => {
    setTrainer(DEFAULT_TRAINER);
  }, []);

  /** Passive session hydration from localStorage — Phase 2 */
  // useEffect(() => { /* check localStorage / refresh token */ }, []);

  const isAuthenticated = Boolean(trainer.token);

  return (
    <AuthContext.Provider value={{ trainer, isAuthenticated, isLoading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/* ── Hook ──────────────────────────────────────────────────────── */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}

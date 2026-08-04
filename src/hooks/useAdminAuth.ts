import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AdminAuthHook {
  isAuthenticated: boolean;
  loading: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  checkAuth: () => boolean;
}

const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'cojo2026',
};

export const useAdminAuth = (): AdminAuthHook => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth');
    setIsAuthenticated(auth === 'true');
    setLoading(false);
  }, []);

  const login = (username: string, password: string): boolean => {
    if (
      username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      setIsAuthenticated(true);
      localStorage.setItem('admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_auth');
    navigate('/admin/login');
  };

  const checkAuth = (): boolean => {
    const auth = localStorage.getItem('admin_auth');
    const isAuth = auth === 'true';
    setIsAuthenticated(isAuth);
    return isAuth;
  };

  return {
    isAuthenticated,
    loading,
    login,
    logout,
    checkAuth,
  };
};
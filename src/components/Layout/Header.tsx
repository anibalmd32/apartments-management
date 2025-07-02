import React from 'react';
import { Moon, Sun, Globe, User, LogOut, Home, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import { t } from '../../utils/translations';

interface HeaderProps {
  showAuth?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showAuth = true }) => {
  const { theme, toggleTheme, language, toggleLanguage, isAdmin, setIsAdmin } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAdmin(false);
    navigate('/');
  };

  const handleAdminToggle = () => {
    if (isAdmin) {
      handleLogout();
    } else {
      navigate('/admin/login');
    }
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => navigate(isAdmin ? '/admin/dashboard' : '/')}
          >
            <div className="bg-blue-600 p-2 rounded-lg">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                ApartmentHub
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {isAdmin ? 'Admin Portal' : 'Find Your Home'}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <Globe className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {language === 'en' ? 'EN' : 'ES'}
              </span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>

            {/* Admin Toggle */}
            {showAuth && (
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleAdminToggle}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    isAdmin
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {isAdmin ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Home className="h-4 w-4" />
                  )}
                  <span className="text-sm font-medium">
                    {isAdmin ? 'Admin' : 'Login'}
                  </span>
                </button>

                {isAdmin && (
                  <button 
                    onClick={handleLogout}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    title="Logout"
                  >
                    <LogOut className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
import React from 'react';
import { 
  Home, 
  Building2, 
  Users, 
  CreditCard, 
  BarChart3,
  Settings,
  PlusCircle
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import { t } from '../../utils/translations';

const Sidebar: React.FC = () => {
  const { language } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'dashboard', icon: Home, label: t('dashboard', language), path: '/admin/dashboard' },
    { id: 'apartments', icon: Building2, label: t('apartments', language), path: '/admin/apartments' },
    { id: 'tenants', icon: Users, label: t('tenants', language), path: '/admin/tenants' },
    { id: 'payments', icon: CreditCard, label: t('payments', language), path: '/admin/payments' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
    { id: 'settings', icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  const isActiveRoute = (path: string) => {
    return location.pathname === path || (path === '/admin/dashboard' && location.pathname === '/admin');
  };

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 shadow-sm border-r border-gray-200 dark:border-gray-700 h-screen sticky top-16">
      <div className="p-6">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActiveRoute(item.path);
            
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-8">
          <button 
            onClick={() => navigate('/admin/apartments')}
            className="w-full flex items-center space-x-3 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <PlusCircle className="h-5 w-5" />
            <span className="font-medium">{t('addApartment', language)}</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
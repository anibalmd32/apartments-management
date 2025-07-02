import React from 'react';
import { Building2, Users, DollarSign, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { t } from '../../utils/translations';
import StatsCard from './StatsCard';

const AdminDashboard: React.FC = () => {
  const { language } = useApp();

  const recentActivity = [
    {
      id: 1,
      type: 'payment',
      message: 'New payment received from John Doe',
      amount: '$1,200',
      time: '2 hours ago',
      status: 'completed'
    },
    {
      id: 2,
      type: 'viewing',
      message: 'Right to view payment for Apt 2B',
      amount: '$50',
      time: '4 hours ago',
      status: 'completed'
    },
    {
      id: 3,
      type: 'tenant',
      message: 'New tenant application submitted',
      time: '6 hours ago',
      status: 'pending'
    },
    {
      id: 4,
      type: 'maintenance',
      message: 'Maintenance request for Apt 1A',
      time: '1 day ago',
      status: 'in-progress'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title={t('availableApartments', language)}
          value={12}
          change="+2 this month"
          changeType="positive"
          icon={Building2}
          color="blue"
        />
        <StatsCard
          title={t('totalTenants', language)}
          value={28}
          change="+5 this month"
          changeType="positive"
          icon={Users}
          color="green"
        />
        <StatsCard
          title={t('pendingPayments', language)}
          value={3}
          change="-2 from last week"
          changeType="positive"
          icon={Clock}
          color="orange"
        />
        <StatsCard
          title={t('monthlyRevenue', language)}
          value="$28,400"
          change="+12% from last month"
          changeType="positive"
          icon={DollarSign}
          color="purple"
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('recentActivity', language)}
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-full ${
                    activity.status === 'completed' ? 'bg-emerald-100 dark:bg-emerald-900' :
                    activity.status === 'pending' ? 'bg-orange-100 dark:bg-orange-900' :
                    'bg-blue-100 dark:bg-blue-900'
                  }`}>
                    {activity.status === 'completed' ? (
                      <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    ) : activity.status === 'pending' ? (
                      <Clock className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                    ) : (
                      <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {activity.message}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {activity.time}
                    </p>
                  </div>
                </div>
                {activity.amount && (
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    {activity.amount}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <h4 className="text-lg font-semibold mb-2">Add New Apartment</h4>
          <p className="text-blue-100 mb-4">List a new property for rent</p>
          <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
            Get Started
          </button>
        </div>
        
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl p-6 text-white">
          <h4 className="text-lg font-semibold mb-2">Payment Overview</h4>
          <p className="text-emerald-100 mb-4">Track and manage payments</p>
          <button className="bg-white text-emerald-600 px-4 py-2 rounded-lg font-medium hover:bg-emerald-50 transition-colors">
            View Details
          </button>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <h4 className="text-lg font-semibold mb-2">Tenant Management</h4>
          <p className="text-purple-100 mb-4">Manage tenant information</p>
          <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-purple-50 transition-colors">
            Manage
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
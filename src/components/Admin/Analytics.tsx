import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Users, Building2, Calendar } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

const Analytics: React.FC = () => {
  const { language } = useApp();

  // Mock analytics data
  const monthlyRevenue = [
    { month: 'Jan', revenue: 18500, occupancy: 85 },
    { month: 'Feb', revenue: 22300, occupancy: 92 },
    { month: 'Mar', revenue: 25100, occupancy: 88 },
    { month: 'Apr', revenue: 28400, occupancy: 95 },
    { month: 'May', revenue: 31200, occupancy: 90 },
    { month: 'Jun', revenue: 29800, occupancy: 87 }
  ];

  const currentMonth = monthlyRevenue[monthlyRevenue.length - 1];
  const previousMonth = monthlyRevenue[monthlyRevenue.length - 2];
  const revenueChange = ((currentMonth.revenue - previousMonth.revenue) / previousMonth.revenue) * 100;
  const occupancyChange = currentMonth.occupancy - previousMonth.occupancy;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Analytics
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          Track your property performance and revenue trends
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Monthly Revenue</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                ${currentMonth.revenue.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="mt-2 flex items-center">
            {revenueChange > 0 ? (
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
            )}
            <span className={`text-sm font-medium ${revenueChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {Math.abs(revenueChange).toFixed(1)}%
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">vs last month</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Occupancy Rate</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {currentMonth.occupancy}%
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="mt-2 flex items-center">
            {occupancyChange > 0 ? (
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
            )}
            <span className={`text-sm font-medium ${occupancyChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {Math.abs(occupancyChange)}%
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">vs last month</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Active Tenants</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">28</p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm font-medium text-green-600">5</span>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">new this month</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Avg. Days to Rent</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">12</p>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
              <Calendar className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm font-medium text-green-600">3 days</span>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">faster</span>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Revenue Trend (Last 6 Months)
        </h3>
        <div className="h-80 flex items-end justify-between space-x-4">
          {monthlyRevenue.map((data, index) => {
            const height = (data.revenue / Math.max(...monthlyRevenue.map(d => d.revenue))) * 100;
            return (
              <div key={data.month} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-t-lg relative overflow-hidden">
                  <div
                    className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-1000 ease-out"
                    style={{ height: `${height * 2.5}px` }}
                  />
                </div>
                <div className="mt-3 text-center">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    ${(data.revenue / 1000).toFixed(0)}k
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {data.month}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Properties */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Top Performing Properties
          </h3>
          <div className="space-y-4">
            {[
              { name: 'Luxury Penthouse Suite', revenue: 4200, occupancy: 100 },
              { name: 'Modern Downtown Loft', revenue: 2500, occupancy: 95 },
              { name: 'Cozy Studio Apartment', revenue: 1800, occupancy: 90 }
            ].map((property, index) => (
              <div key={property.name} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                    index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {property.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {property.occupancy}% occupancy
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900 dark:text-white">
                    ${property.revenue}/mo
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {[
              { action: 'New tenant signed lease', time: '2 hours ago', type: 'success' },
              { action: 'Viewing payment received', time: '4 hours ago', type: 'info' },
              { action: 'Maintenance request completed', time: '1 day ago', type: 'success' },
              { action: 'Rent payment overdue', time: '2 days ago', type: 'warning' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'success' ? 'bg-green-500' :
                  activity.type === 'info' ? 'bg-blue-500' :
                  activity.type === 'warning' ? 'bg-yellow-500' : 'bg-gray-500'
                }`} />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.action}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {activity.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
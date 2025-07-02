import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye, MapPin, Square, Bed, Bath, Building2, Users, CreditCard } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { t } from '../../utils/translations';

const ApartmentManagement: React.FC = () => {
  const { language } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock apartment data
  const apartments = [
    {
      id: '1',
      title: 'Modern Downtown Loft',
      price: 2500,
      viewingFee: 75,
      address: '123 Main St, Downtown',
      sqft: 1200,
      bedrooms: 2,
      bathrooms: 2,
      status: 'available',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400',
      featured: true,
      dateAdded: '2024-01-15'
    },
    {
      id: '2',
      title: 'Cozy Studio Apartment',
      price: 1800,
      viewingFee: 50,
      address: '456 Oak Ave, Midtown',
      sqft: 600,
      bedrooms: 1,
      bathrooms: 1,
      status: 'occupied',
      image: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=400',
      featured: false,
      dateAdded: '2024-01-10'
    },
    {
      id: '3',
      title: 'Luxury Penthouse Suite',
      price: 4200,
      viewingFee: 100,
      address: '789 Park Blvd, Uptown',
      sqft: 2400,
      bedrooms: 3,
      bathrooms: 3,
      status: 'available',
      image: 'https://images.pexels.com/photos/1571467/pexels-photo-1571467.jpeg?auto=compress&cs=tinysrgb&w=400',
      featured: true,
      dateAdded: '2024-01-20'
    }
  ];

  const filteredApartments = apartments.filter(apartment => {
    const matchesSearch = apartment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         apartment.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || apartment.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'occupied':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('apartments', language)}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Manage your property listings and availability
          </p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>{t('addApartment', language)}</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search apartments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Units</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{apartments.length}</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Available</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {apartments.filter(apt => apt.status === 'available').length}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <Eye className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Occupied</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {apartments.filter(apt => apt.status === 'occupied').length}
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Avg. Rent</p>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                ${Math.round(apartments.reduce((sum, apt) => sum + apt.price, 0) / apartments.length).toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <CreditCard className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Apartments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredApartments.map((apartment) => (
          <div key={apartment.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow">
            {/* Image */}
            <div className="relative h-48">
              <img
                src={apartment.image}
                alt={apartment.title}
                className="w-full h-full object-cover"
              />
              {apartment.featured && (
                <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                  Featured
                </div>
              )}
              <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(apartment.status)}`}>
                {apartment.status.charAt(0).toUpperCase() + apartment.status.slice(1)}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {apartment.title}
                </h3>
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    ${apartment.price.toLocaleString()}/mo
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    ${apartment.viewingFee} to view
                  </p>
                </div>
              </div>

              <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-4">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="truncate">{apartment.address}</span>
              </div>

              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300 mb-4">
                <div className="flex items-center">
                  <Square className="h-4 w-4 mr-1" />
                  <span>{apartment.sqft} sqft</span>
                </div>
                <div className="flex items-center">
                  <Bed className="h-4 w-4 mr-1" />
                  <span>{apartment.bedrooms} bed</span>
                </div>
                <div className="flex items-center">
                  <Bath className="h-4 w-4 mr-1" />
                  <span>{apartment.bathrooms} bath</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </button>
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <Eye className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                </button>
                <button className="px-4 py-2 border border-red-300 dark:border-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                  <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredApartments.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No apartments found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Try adjusting your search criteria or add a new apartment.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            {t('addApartment', language)}
          </button>
        </div>
      )}
    </div>
  );
};

export default ApartmentManagement;
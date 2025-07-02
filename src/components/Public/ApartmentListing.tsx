import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { t } from '../../utils/translations';
import SearchFilters from '../Apartments/SearchFilters';
import ApartmentCard from '../Apartments/ApartmentCard';
import ApartmentDetails from '../Apartments/ApartmentDetails';
import PaymentView from '../Payment/PaymentView';
import PaymentSuccess from '../Payment/PaymentSuccess';
import RentalApplication from '../Rental/RentalApplication';

type ViewState = 'listing' | 'details' | 'payment' | 'success' | 'rental';

const ApartmentListing: React.FC = () => {
  const { language, setUserLocation } = useApp();
  const [locationMessage, setLocationMessage] = useState<string>('');
  const [currentView, setCurrentView] = useState<ViewState>('listing');
  const [selectedApartmentId, setSelectedApartmentId] = useState<string | null>(null);
  const [paymentType, setPaymentType] = useState<'viewing' | 'rental'>('viewing');
  const [paymentData, setPaymentData] = useState<{ paymentId: string; amount: number } | null>(null);

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
      images: [
        'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1648768/pexels-photo-1648768.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      featured: true
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
      images: [
        'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800'
      ]
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
      images: [
        'https://images.pexels.com/photos/1571467/pexels-photo-1571467.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      featured: true
    },
    {
      id: '4',
      title: 'Family-Friendly Townhouse',
      price: 3200,
      viewingFee: 80,
      address: '321 Elm St, Suburbs',
      sqft: 1800,
      bedrooms: 3,
      bathrooms: 2,
      images: [
        'https://images.pexels.com/photos/1571470/pexels-photo-1571470.jpeg?auto=compress&cs=tinysrgb&w=800'
      ]
    }
  ];

  const handleSearch = (filters: any) => {
    console.log('Search filters:', filters);
    // Implement search logic here
  };

  const handleNearMe = () => {
    setLocationMessage('');
    
    if (!navigator.geolocation) {
      setLocationMessage(t('geolocationNotSupported', language));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setLocationMessage(t('locationFound', language));
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationMessage(t('geolocationDenied', language));
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationMessage(t('geolocationUnavailable', language));
            break;
          case error.TIMEOUT:
            setLocationMessage(t('geolocationTimeout', language));
            break;
          default:
            setLocationMessage(t('geolocationError', language));
            break;
        }
      }
    );
  };

  const handleViewDetails = (id: string) => {
    setSelectedApartmentId(id);
    setCurrentView('details');
  };

  const handlePayViewing = (id: string) => {
    setSelectedApartmentId(id);
    setPaymentType('viewing');
    setCurrentView('payment');
  };

  const handleRentApartment = (id: string) => {
    setSelectedApartmentId(id);
    setCurrentView('rental');
  };

  const handlePaymentFromDetails = (id: string, type: 'viewing' | 'rental') => {
    setSelectedApartmentId(id);
    setPaymentType(type);
    setCurrentView('payment');
  };

  const handlePaymentComplete = (paymentId: string) => {
    const apartment = apartments.find(apt => apt.id === selectedApartmentId);
    const amount = paymentType === 'viewing' ? apartment?.viewingFee || 0 : apartment?.price || 0;
    
    setPaymentData({ paymentId, amount });
    setCurrentView('success');
  };

  const handleRentalApplicationSubmit = (applicationData: any) => {
    console.log('Rental application submitted:', applicationData);
    // Process rental application
    setPaymentType('rental');
    setCurrentView('payment');
  };

  const handleBackToListing = () => {
    setCurrentView('listing');
    setSelectedApartmentId(null);
    setPaymentData(null);
  };

  const handleBackToDetails = () => {
    setCurrentView('details');
  };

  const handleContinueFromSuccess = () => {
    setCurrentView('listing');
    setSelectedApartmentId(null);
    setPaymentData(null);
  };

  // Render different views based on current state
  switch (currentView) {
    case 'details':
      return (
        <ApartmentDetails
          apartmentId={selectedApartmentId!}
          onBack={handleBackToListing}
          onPayViewing={(id) => handlePaymentFromDetails(id, 'viewing')}
          onRentApartment={(id) => handlePaymentFromDetails(id, 'rental')}
        />
      );

    case 'payment':
      return (
        <PaymentView
          apartmentId={selectedApartmentId!}
          paymentType={paymentType}
          onBack={handleBackToDetails}
          onPaymentComplete={handlePaymentComplete}
        />
      );

    case 'success':
      return (
        <PaymentSuccess
          paymentId={paymentData!.paymentId}
          paymentType={paymentType}
          apartmentId={selectedApartmentId!}
          amount={paymentData!.amount}
          onContinue={handleContinueFromSuccess}
        />
      );

    case 'rental':
      return (
        <RentalApplication
          apartmentId={selectedApartmentId!}
          onBack={handleBackToDetails}
          onSubmit={handleRentalApplicationSubmit}
        />
      );

    default:
      return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Find Your Perfect Home
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Discover amazing apartments in prime locations with our easy-to-use search and virtual viewing options.
              </p>
            </div>

            {/* Search Filters */}
            <div className="mb-8">
              <SearchFilters onSearch={handleSearch} onNearMe={handleNearMe} />
            </div>

            {/* Location Message */}
            {locationMessage && (
              <div className={`mb-6 p-4 rounded-lg ${
                locationMessage.includes(t('locationFound', language)) 
                  ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-700'
                  : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-700'
              }`}>
                <p className="text-sm font-medium">{locationMessage}</p>
              </div>
            )}

            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Available Apartments ({apartments.length})
              </h2>
              <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option>Sort by: Price (Low to High)</option>
                <option>Sort by: Price (High to Low)</option>
                <option>Sort by: Newest</option>
                <option>Sort by: Square Footage</option>
              </select>
            </div>

            {/* Apartment Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {apartments.map((apartment) => (
                <ApartmentCard
                  key={apartment.id}
                  apartment={apartment}
                  onViewDetails={handleViewDetails}
                  onPayViewing={handlePayViewing}
                />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                Load More Apartments
              </button>
            </div>
          </div>
        </div>
      );
  }
};

export default ApartmentListing;
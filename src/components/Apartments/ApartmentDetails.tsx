import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Square, 
  Bed, 
  Bath, 
  Heart, 
  Share2, 
  Calendar,
  ChevronLeft,
  ChevronRight,
  X,
  Star,
  Wifi,
  Car,
  Dumbbell,
  Shield,
  Coffee,
  Waves
} from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { t } from '../../utils/translations';

interface ApartmentDetailsProps {
  apartmentId: string;
  onBack: () => void;
  onPayViewing: (id: string) => void;
  onRentApartment: (id: string) => void;
}

const ApartmentDetails: React.FC<ApartmentDetailsProps> = ({
  apartmentId,
  onBack,
  onPayViewing,
  onRentApartment
}) => {
  const { language } = useApp();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Mock apartment data - in production, this would be fetched based on apartmentId
  const apartment = {
    id: apartmentId,
    title: 'Modern Downtown Loft',
    price: 2500,
    viewingFee: 75,
    address: '123 Main St, Downtown, New York, NY 10001',
    sqft: 1200,
    bedrooms: 2,
    bathrooms: 2,
    description: 'Experience luxury living in this stunning modern loft featuring floor-to-ceiling windows, hardwood floors, and breathtaking city views. This beautifully designed space offers an open-concept layout perfect for both relaxation and entertaining.',
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1648768/pexels-photo-1648768.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1571467/pexels-photo-1571467.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1571470/pexels-photo-1571470.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    amenities: [
      { icon: Wifi, name: 'High-Speed WiFi' },
      { icon: Car, name: 'Parking Included' },
      { icon: Dumbbell, name: 'Fitness Center' },
      { icon: Shield, name: '24/7 Security' },
      { icon: Coffee, name: 'Coffee Bar' },
      { icon: Waves, name: 'Swimming Pool' }
    ],
    features: [
      'Floor-to-ceiling windows',
      'Hardwood floors throughout',
      'Stainless steel appliances',
      'In-unit washer/dryer',
      'Central air conditioning',
      'Walk-in closets',
      'Granite countertops',
      'Private balcony'
    ],
    rating: 4.8,
    reviews: 24,
    availableFrom: '2024-02-01',
    landlord: {
      name: 'Sarah Johnson',
      rating: 4.9,
      properties: 12,
      responseTime: '< 1 hour'
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === apartment.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? apartment.images.length - 1 : prev - 1
    );
  };

  const openGallery = (index: number) => {
    setCurrentImageIndex(index);
    setIsGalleryOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to listings</span>
            </button>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-300'}`} />
              </button>
              <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                <Share2 className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="relative">
              <div className="relative h-96 rounded-2xl overflow-hidden group cursor-pointer" onClick={() => openGallery(currentImageIndex)}>
                <img
                  src={apartment.images[currentImageIndex]}
                  alt={apartment.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Navigation Arrows */}
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full transition-colors"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-800" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full transition-colors"
                >
                  <ChevronRight className="h-5 w-5 text-gray-800" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {apartment.images.length}
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div className="flex space-x-3 mt-4 overflow-x-auto pb-2">
                {apartment.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentImageIndex
                        ? 'border-blue-500 ring-2 ring-blue-200'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Apartment Info */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {apartment.title}
                  </h1>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 mb-4">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{apartment.address}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="ml-1 font-medium text-gray-900 dark:text-white">
                        {apartment.rating}
                      </span>
                      <span className="ml-1 text-gray-500 dark:text-gray-400">
                        ({apartment.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    ${apartment.price.toLocaleString()}/mo
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    ${apartment.viewingFee} to view
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 py-6 border-y border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <Square className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {apartment.sqft}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Square Feet</p>
                </div>
                <div className="text-center">
                  <Bed className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {apartment.bedrooms}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Bedrooms</p>
                </div>
                <div className="text-center">
                  <Bath className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {apartment.bathrooms}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Bathrooms</p>
                </div>
              </div>

              {/* Description */}
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  About This Property
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {apartment.description}
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Features & Amenities
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-4">Property Features</h4>
                  <ul className="space-y-3">
                    {apartment.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-4">Building Amenities</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {apartment.amenities.map((amenity, index) => {
                      const Icon = amenity.icon;
                      return (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <Icon className="h-5 w-5 text-blue-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {amenity.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Landlord Info */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Property Manager
              </h3>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">
                    {apartment.landlord.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {apartment.landlord.name}
                  </h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span>{apartment.landlord.rating} rating</span>
                    </div>
                    <span>•</span>
                    <span>{apartment.landlord.properties} properties</span>
                    <span>•</span>
                    <span>Responds in {apartment.landlord.responseTime}</span>
                  </div>
                </div>
                <button className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  Contact
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Booking Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="text-center mb-6">
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    ${apartment.price.toLocaleString()}/mo
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    Available from {new Date(apartment.availableFrom).toLocaleDateString()}
                  </p>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={() => onRentApartment(apartment.id)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    <Calendar className="h-5 w-5" />
                    <span>Rent This Apartment</span>
                  </button>

                  <button
                    onClick={() => onPayViewing(apartment.id)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-6 rounded-xl font-medium transition-colors"
                  >
                    Pay ${apartment.viewingFee} to View
                  </button>

                  <div className="text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Secure payment • No hidden fees
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Info */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Quick Information
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Property Type</span>
                    <span className="text-gray-900 dark:text-white font-medium">Apartment</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Lease Term</span>
                    <span className="text-gray-900 dark:text-white font-medium">12 months</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Pet Policy</span>
                    <span className="text-gray-900 dark:text-white font-medium">Cats allowed</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Parking</span>
                    <span className="text-gray-900 dark:text-white font-medium">1 space included</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Screen Gallery Modal */}
      {isGalleryOpen && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <button
            onClick={() => setIsGalleryOpen(false)}
            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors z-10"
          >
            <X className="h-6 w-6 text-white" />
          </button>
          
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors z-10"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
          
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors z-10"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>

          <img
            src={apartment.images[currentImageIndex]}
            alt={apartment.title}
            className="max-w-full max-h-full object-contain"
          />

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full">
            {currentImageIndex + 1} / {apartment.images.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default ApartmentDetails;
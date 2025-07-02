import React from 'react';
import { MapPin, Square, Bed, Bath, Heart, Eye } from 'lucide-react';

interface ApartmentCardProps {
  apartment: {
    id: string;
    title: string;
    price: number;
    viewingFee: number;
    address: string;
    sqft: number;
    bedrooms: number;
    bathrooms: number;
    images: string[];
    featured?: boolean;
  };
  isAdmin?: boolean;
  onViewDetails?: (id: string) => void;
  onPayViewing?: (id: string) => void;
}

const ApartmentCard: React.FC<ApartmentCardProps> = ({
  apartment,
  isAdmin = false,
  onViewDetails,
  onPayViewing
}) => {
  const [isLiked, setIsLiked] = React.useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden group">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={apartment.images[0]}
          alt={apartment.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {apartment.featured && (
          <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
            Featured
          </div>
        )}
        {!isAdmin && (
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white rounded-full transition-colors"
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          </button>
        )}
        <div className="absolute bottom-3 left-3 bg-black/50 text-white px-2 py-1 rounded text-sm">
          {apartment.images.length} photos
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">
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
          <span className="line-clamp-1">{apartment.address}</span>
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
        {isAdmin ? (
          <div className="flex space-x-2">
            <button
              onClick={() => onViewDetails?.(apartment.id)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
            >
              Edit Details
            </button>
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Eye className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={() => onViewDetails?.(apartment.id)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
            >
              View Details
            </button>
            <button
              onClick={() => onPayViewing?.(apartment.id)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
            >
              ${apartment.viewingFee}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApartmentCard;
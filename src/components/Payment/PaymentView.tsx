import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CreditCard, 
  Shield, 
  Lock,
  CheckCircle,
  AlertCircle,
  Calendar,
  MapPin,
  Square,
  Bed,
  Bath
} from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { t } from '../../utils/translations';

interface PaymentViewProps {
  apartmentId: string;
  paymentType: 'viewing' | 'rental';
  onBack: () => void;
  onPaymentComplete: (paymentId: string) => void;
}

const PaymentView: React.FC<PaymentViewProps> = ({
  apartmentId,
  paymentType,
  onBack,
  onPaymentComplete
}) => {
  const { language } = useApp();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
    email: '',
    phone: ''
  });

  // Mock apartment data
  const apartment = {
    id: apartmentId,
    title: 'Modern Downtown Loft',
    price: 2500,
    viewingFee: 75,
    address: '123 Main St, Downtown',
    sqft: 1200,
    bedrooms: 2,
    bathrooms: 2,
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400'
  };

  const amount = paymentType === 'viewing' ? apartment.viewingFee : apartment.price;
  const title = paymentType === 'viewing' ? 'Pay to View Apartment' : 'Rent This Apartment';
  const description = paymentType === 'viewing' 
    ? 'Secure your viewing appointment with a one-time payment'
    : 'Complete your rental application and first month\'s payment';

  const handleCardInputChange = (field: string, value: string) => {
    if (field === 'number') {
      // Format card number with spaces
      value = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (value.length > 19) return;
    } else if (field === 'expiry') {
      // Format expiry as MM/YY
      value = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
      if (value.length > 5) return;
    } else if (field === 'cvv') {
      // Only allow numbers, max 4 digits
      value = value.replace(/\D/g, '');
      if (value.length > 4) return;
    }
    
    setCardDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentComplete('payment_' + Date.now());
    }, 3000);
  };

  const handlePayPalPayment = () => {
    setIsProcessing(true);
    // Simulate PayPal payment
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentComplete('paypal_' + Date.now());
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back</span>
            </button>
            
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Secure Payment
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {title}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {description}
              </p>
            </div>

            {/* Payment Method Selection */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Payment Method
              </h3>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === 'card'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                  }`}
                >
                  <CreditCard className={`h-6 w-6 mx-auto mb-2 ${
                    paymentMethod === 'card' ? 'text-blue-500' : 'text-gray-400'
                  }`} />
                  <span className={`text-sm font-medium ${
                    paymentMethod === 'card' ? 'text-blue-700 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300'
                  }`}>
                    Credit Card
                  </span>
                </button>

                <button
                  onClick={() => setPaymentMethod('paypal')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === 'paypal'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-6 h-6 mx-auto mb-2 rounded ${
                    paymentMethod === 'paypal' ? 'bg-blue-500' : 'bg-gray-400'
                  }`} />
                  <span className={`text-sm font-medium ${
                    paymentMethod === 'paypal' ? 'text-blue-700 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300'
                  }`}>
                    PayPal
                  </span>
                </button>
              </div>

              {/* Credit Card Form */}
              {paymentMethod === 'card' && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={cardDetails.number}
                        onChange={(e) => handleCardInputChange('number', e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        className="w-full pl-4 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                        required
                      />
                      <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={cardDetails.expiry}
                        onChange={(e) => handleCardInputChange('expiry', e.target.value)}
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        value={cardDetails.cvv}
                        onChange={(e) => handleCardInputChange('cvv', e.target.value)}
                        placeholder="123"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      value={cardDetails.name}
                      onChange={(e) => handleCardInputChange('name', e.target.value)}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={cardDetails.email}
                      onChange={(e) => handleCardInputChange('email', e.target.value)}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={cardDetails.phone}
                      onChange={(e) => handleCardInputChange('phone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="h-5 w-5" />
                        <span>Pay ${amount}</span>
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* PayPal Payment */}
              {paymentMethod === 'paypal' && (
                <div className="space-y-4">
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-white font-bold text-xl">PP</span>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Pay with PayPal
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      You'll be redirected to PayPal to complete your payment securely.
                    </p>
                  </div>

                  <button
                    onClick={handlePayPalPayment}
                    disabled={isProcessing}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-400 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                        <span>Redirecting...</span>
                      </>
                    ) : (
                      <>
                        <span>Continue with PayPal</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Security Notice */}
              <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <span className="text-sm font-medium text-green-800 dark:text-green-200">
                    Your payment is secured with 256-bit SSL encryption
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Apartment Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {paymentType === 'viewing' ? 'Viewing Details' : 'Rental Summary'}
              </h3>
              
              <div className="flex space-x-4 mb-4">
                <img
                  src={apartment.image}
                  alt={apartment.title}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {apartment.title}
                  </h4>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{apartment.address}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300 mt-2">
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
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 dark:text-gray-300">
                    {paymentType === 'viewing' ? 'Viewing Fee' : 'First Month Rent'}
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    ${amount}
                  </span>
                </div>
                
                {paymentType === 'rental' && (
                  <>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600 dark:text-gray-300">Security Deposit</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        ${apartment.price}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600 dark:text-gray-300">Application Fee</span>
                      <span className="font-semibold text-gray-900 dark:text-white">$50</span>
                    </div>
                  </>
                )}

                <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      ${paymentType === 'viewing' ? amount : amount + apartment.price + 50}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* What's Included */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {paymentType === 'viewing' ? 'What\'s Included' : 'Next Steps'}
              </h3>
              
              <div className="space-y-3">
                {paymentType === 'viewing' ? (
                  <>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-gray-600 dark:text-gray-300">
                        Virtual or in-person viewing
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-gray-600 dark:text-gray-300">
                        Detailed property information
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-gray-600 dark:text-gray-300">
                        Direct contact with landlord
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-gray-600 dark:text-gray-300">
                        Priority booking for rental
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-blue-500" />
                      <span className="text-gray-600 dark:text-gray-300">
                        Digital lease signing
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-gray-600 dark:text-gray-300">
                        Background check processing
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-gray-600 dark:text-gray-300">
                        Move-in coordination
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-gray-600 dark:text-gray-300">
                        Keys and access codes
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Support */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
              <div className="flex items-center space-x-3 mb-3">
                <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h4 className="font-semibold text-blue-900 dark:text-blue-100">
                  Need Help?
                </h4>
              </div>
              <p className="text-blue-800 dark:text-blue-200 text-sm mb-3">
                Our support team is available 24/7 to assist you with your payment or booking.
              </p>
              <button className="text-blue-600 dark:text-blue-400 font-medium text-sm hover:underline">
                Contact Support →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentView;
import React from 'react';
import { CheckCircle, Download, Calendar, Home, ArrowRight } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

interface PaymentSuccessProps {
  paymentId: string;
  paymentType: 'viewing' | 'rental';
  apartmentId: string;
  amount: number;
  onContinue: () => void;
}

const PaymentSuccess: React.FC<PaymentSuccessProps> = ({
  paymentId,
  paymentType,
  apartmentId,
  amount,
  onContinue
}) => {
  const { language } = useApp();

  // Mock apartment data
  const apartment = {
    id: apartmentId,
    title: 'Modern Downtown Loft',
    address: '123 Main St, Downtown',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400'
  };

  const handleDownloadReceipt = () => {
    // In a real app, this would generate and download a PDF receipt
    console.log('Downloading receipt for payment:', paymentId);
  };

  const handleScheduleViewing = () => {
    // Navigate to viewing scheduler
    console.log('Schedule viewing for apartment:', apartmentId);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
          </div>

          {/* Success Message */}
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {paymentType === 'viewing' 
              ? 'Your viewing payment has been processed successfully.'
              : 'Your rental application and payment have been submitted successfully.'
            }
          </p>

          {/* Payment Details */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 mb-6">
            <div className="flex items-center space-x-3 mb-3">
              <img
                src={apartment.image}
                alt={apartment.title}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                  {apartment.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs">
                  {apartment.address}
                </p>
              </div>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-600 pt-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-300">Payment ID</span>
                <span className="font-mono text-gray-900 dark:text-white">{paymentId}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-300">Amount Paid</span>
                <span className="font-semibold text-gray-900 dark:text-white">${amount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-300">Date</span>
                <span className="text-gray-900 dark:text-white">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {paymentType === 'viewing' ? (
              <button
                onClick={handleScheduleViewing}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <Calendar className="h-5 w-5" />
                <span>Schedule Your Viewing</span>
              </button>
            ) : (
              <button
                onClick={onContinue}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <Home className="h-5 w-5" />
                <span>View Rental Dashboard</span>
              </button>
            )}

            <button
              onClick={handleDownloadReceipt}
              className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white py-3 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center space-x-2"
            >
              <Download className="h-5 w-5" />
              <span>Download Receipt</span>
            </button>

            <button
              onClick={onContinue}
              className="w-full text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white py-2 font-medium transition-colors flex items-center justify-center space-x-2"
            >
              <span>Continue Browsing</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Next Steps */}
          {paymentType === 'viewing' && (
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                What's Next?
              </h4>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1 text-left">
                <li>• You'll receive a confirmation email shortly</li>
                <li>• The landlord will contact you within 24 hours</li>
                <li>• Schedule your viewing at your convenience</li>
                <li>• Get priority access if you decide to rent</li>
              </ul>
            </div>
          )}

          {paymentType === 'rental' && (
            <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
              <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                Application Submitted
              </h4>
              <ul className="text-sm text-green-800 dark:text-green-200 space-y-1 text-left">
                <li>• Background check will begin within 24 hours</li>
                <li>• You'll receive updates via email and SMS</li>
                <li>• Lease signing will be scheduled upon approval</li>
                <li>• Move-in date will be confirmed soon</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
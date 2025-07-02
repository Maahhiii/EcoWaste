
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Leaf } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        {/* Illustration */}
        <div className="mb-8">
          <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Leaf className="h-12 w-12 text-green-600" />
          </div>
          <div className="text-6xl font-bold text-gray-300 mb-2">404</div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Page Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            Oops! The page you're looking for seems to have been recycled. 
            Let's get you back to where you need to be.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            to="/"
            className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 transition-colors"
          >
            <Home className="h-5 w-5 mr-2" />
            Go to Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="w-full inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Go Back
          </button>
        </div>

        {/* Additional Help */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">
            Need help? Try these popular pages:
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link to="/stats" className="text-green-600 hover:text-green-500">
              Public Stats
            </Link>
            <Link to="/login" className="text-green-600 hover:text-green-500">
              Worker Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

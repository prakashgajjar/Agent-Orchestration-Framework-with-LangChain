import React from 'react';

const CircularLoader = ({ size = 'md', color = 'blue' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32'
  };

  const colorClasses = {
    blue: 'border-blue-500',
    purple: 'border-purple-500',
    green: 'border-green-500',
    red: 'border-red-500',
    pink: 'border-pink-500'
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="relative">
        {/* Spinning circle loader */}
        <div className={`${sizeClasses[size]} ${colorClasses[color]} border-4 border-t-transparent rounded-full animate-spin`}></div>
        
        {/* Optional: Add a pulsing dot in the center */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className={`w-3 h-3 ${colorClasses[color].replace('border-', 'bg-')} rounded-full animate-pulse`}></div>
        </div>
      </div>

      {/* Demo Controls */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 rounded-lg p-6 shadow-xl">
        <h3 className="text-white text-lg font-semibold mb-4">Loader Options</h3>
        
        <div className="space-y-4">
          <div>
            <label className="text-gray-300 text-sm mb-2 block">Size</label>
            <div className="flex gap-2">
              {['sm', 'md', 'lg', 'xl'].map(s => (
                <button
                  key={s}
                  onClick={() => {}}
                  className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 text-sm uppercase"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="text-gray-300 text-sm mb-2 block">Color</label>
            <div className="flex gap-2">
              {['blue', 'purple', 'green', 'red', 'pink'].map(c => (
                <button
                  key={c}
                  onClick={() => {}}
                  className={`w-8 h-8 rounded-full bg-${c}-500 hover:ring-2 hover:ring-white`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Alternative loader styles component
const LoaderVariants = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Variant 1: Classic Spinner */}
        {/* <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-300 text-sm">Classic Spinner</p>
        </div> */}

        {/* Variant 2: Dots Rotating */}
        {/* <div className="flex flex-col items-center gap-4">
          <div className="relative w-16 h-16">
            <div className="absolute top-0 left-1/2 w-3 h-3 bg-purple-500 rounded-full animate-spin" style={{transformOrigin: '0 32px'}}></div>
            <div className="absolute top-0 left-1/2 w-3 h-3 bg-purple-400 rounded-full animate-spin" style={{transformOrigin: '0 32px', animationDelay: '0.2s'}}></div>
            <div className="absolute top-0 left-1/2 w-3 h-3 bg-purple-300 rounded-full animate-spin" style={{transformOrigin: '0 32px', animationDelay: '0.4s'}}></div>
          </div>
          <p className="text-gray-300 text-sm">Rotating Dots</p>
        </div> */}

        {/* Variant 3: Double Ring */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-16 h-16">
            <div className="absolute w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute w-12 h-12 top-2 left-2 border-4 border-green-300 border-b-transparent rounded-full animate-spin" style={{animationDirection: 'reverse'}}></div>
          </div>
          <p className="text-gray-300 text-sm">Double Ring</p>
        </div>

      </div>
    </div>
  );
};

export default LoaderVariants;
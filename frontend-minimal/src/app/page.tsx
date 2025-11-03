export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full text-center space-y-8">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">
          🇦🇪 NOOR Platform
        </h1>
        <p className="text-2xl text-gray-600 mb-8">
          National Opportunities Optimization & Realization
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {/* Federal Interface */}
          <a
            href="/federal"
            className="bg-gradient-to-br from-yellow-500 to-blue-900 text-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105"
          >
            <div className="text-5xl mb-4">🏛️</div>
            <h2 className="text-2xl font-bold mb-2">Federal Government</h2>
            <p className="text-sm opacity-90">
              National workforce analytics and insights
            </p>
          </a>

          {/* Individual Interface */}
          <a
            href="/individual"
            className="bg-gradient-to-br from-red-600 to-amber-200 text-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105"
          >
            <div className="text-5xl mb-4">👤</div>
            <h2 className="text-2xl font-bold mb-2">Individual/Citizens</h2>
            <p className="text-sm opacity-90">
              Skills passport and career development
            </p>
          </a>

          {/* Institutional Interface */}
          <a
            href="/institutional"
            className="bg-gradient-to-br from-blue-700 to-gray-400 text-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105"
          >
            <div className="text-5xl mb-4">🏢</div>
            <h2 className="text-2xl font-bold mb-2">Institutional/Employers</h2>
            <p className="text-sm opacity-90">
              HCM dashboard and talent management
            </p>
          </a>
        </div>

        <div className="mt-12 p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">✅ System Status</h3>
          <div className="space-y-2 text-left max-w-md mx-auto">
            <div className="flex justify-between">
              <span>Backend API:</span>
              <span className="text-green-600 font-semibold">✅ Live</span>
            </div>
            <div className="flex justify-between">
              <span>Database:</span>
              <span className="text-green-600 font-semibold">✅ Connected</span>
            </div>
            <div className="flex justify-between">
              <span>Payment System:</span>
              <span className="text-green-600 font-semibold">✅ Active</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-8">
          Powered by UAE Vision 2071 | Eight-Faculty Model
        </p>
      </div>
    </div>
  );
}


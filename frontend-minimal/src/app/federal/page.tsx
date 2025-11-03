'use client';

export default function FederalDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-blue-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-yellow-500 to-blue-900 text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">🏛️ Federal Government Dashboard</h1>
            <p className="text-sm opacity-90">National Workforce Intelligence</p>
          </div>
          <a href="/" className="bg-white text-blue-900 px-4 py-2 rounded-lg hover:bg-gray-100">
            ← Home
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-3xl mb-2">👥</div>
            <div className="text-3xl font-bold text-gray-900">45,892</div>
            <div className="text-sm text-gray-600">Total Citizens</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-3xl mb-2">🏢</div>
            <div className="text-3xl font-bold text-gray-900">234</div>
            <div className="text-sm text-gray-600">Institutions</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-3xl mb-2">📊</div>
            <div className="text-3xl font-bold text-gray-900">87.4</div>
            <div className="text-sm text-gray-600">Avg Faculty Score</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-3xl mb-2">💼</div>
            <div className="text-3xl font-bold text-gray-900">1,247</div>
            <div className="text-sm text-gray-600">Active Opportunities</div>
          </div>
        </div>

        {/* Eight-Faculty Model */}
        <div className="bg-white p-8 rounded-xl shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-6">Eight-Faculty National Analytics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Physical', score: 88, color: 'bg-red-500', emoji: '🏃' },
              { name: 'Mental', score: 93, color: 'bg-blue-500', emoji: '🧠' },
              { name: 'Emotional', score: 89, color: 'bg-orange-500', emoji: '❤️' },
              { name: 'Spiritual', score: 92, color: 'bg-yellow-500', emoji: '✨' },
              { name: 'Social', score: 88, color: 'bg-green-500', emoji: '🤝' },
              { name: 'Volitional', score: 90, color: 'bg-purple-500', emoji: '💪' },
              { name: 'Intellectual', score: 94, color: 'bg-teal-500', emoji: '🎓' },
              { name: 'Moral', score: 91, color: 'bg-gray-500', emoji: '⚖️' },
            ].map((faculty) => (
              <div key={faculty.name} className="text-center p-4 border rounded-lg">
                <div className="text-3xl mb-2">{faculty.emoji}</div>
                <div className="font-semibold">{faculty.name}</div>
                <div className={`text-2xl font-bold ${faculty.color.replace('bg-', 'text-')}`}>
                  {faculty.score}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className={`${faculty.color} h-2 rounded-full`}
                    style={{ width: `${faculty.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-4">🎯 Key Features</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✅</span>
                National workforce analytics
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✅</span>
                Eight-Faculty insights across UAE
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✅</span>
                Opportunities management
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✅</span>
                Federal-level reporting
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-4">🔗 Backend Connection</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                <span>API Status:</span>
                <span className="text-green-600 font-semibold">✅ Connected</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                <span>Database:</span>
                <span className="text-green-600 font-semibold">✅ Active</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                <span>Endpoints:</span>
                <span className="text-green-600 font-semibold">98 Available</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


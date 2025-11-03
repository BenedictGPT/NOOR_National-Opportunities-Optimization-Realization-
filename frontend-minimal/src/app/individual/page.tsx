'use client';

export default function IndividualDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-amber-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-amber-200 text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">👤 Individual Dashboard</h1>
            <p className="text-sm opacity-90">Your Skills Passport & Career Development</p>
          </div>
          <a href="/" className="bg-white text-red-600 px-4 py-2 rounded-lg hover:bg-gray-100">
            ← Home
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-8">
        {/* User Profile */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-amber-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              F
            </div>
            <div>
              <h2 className="text-2xl font-bold">Fatima Al-Mazrouei</h2>
              <p className="text-gray-600">Skills Passport ID: #UAE-2024-001</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                  Overall Score: 91/100
                </span>
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                  🪙 850 Tokens
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Eight-Faculty Scores */}
        <div className="bg-white p-8 rounded-xl shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-6">Your Eight-Faculty Scores</h2>
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
              <div key={faculty.name} className="text-center p-4 border rounded-lg hover:shadow-md transition">
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

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-xl font-bold mb-2">Take Assessments</h3>
            <p className="text-gray-600 mb-4">Complete assessments to earn tokens and improve your scores</p>
            <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700">
              Start Assessment
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-bold mb-2">Learning Center</h3>
            <p className="text-gray-600 mb-4">Unlock courses using tokens to develop new skills</p>
            <button className="w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700">
              Browse Courses
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-bold mb-2">Find Jobs</h3>
            <p className="text-gray-600 mb-4">Discover opportunities matched to your faculty scores</p>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              Search Jobs
            </button>
          </div>
        </div>

        {/* Token Packages */}
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-6">💳 Purchase Tokens</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border-2 border-gray-200 p-6 rounded-xl hover:border-red-500 transition">
              <div className="text-center">
                <div className="text-3xl mb-2">🥉</div>
                <h3 className="text-xl font-bold">Starter</h3>
                <div className="text-3xl font-bold my-4">$10</div>
                <div className="text-gray-600 mb-4">100 Tokens</div>
                <button className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300">
                  Purchase
                </button>
              </div>
            </div>

            <div className="border-2 border-red-500 p-6 rounded-xl bg-red-50">
              <div className="text-center">
                <div className="text-3xl mb-2">🥈</div>
                <h3 className="text-xl font-bold">Professional</h3>
                <div className="text-3xl font-bold my-4">$45</div>
                <div className="text-gray-600 mb-4">500 Tokens <span className="text-green-600">(+10%)</span></div>
                <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700">
                  Purchase
                </button>
              </div>
            </div>

            <div className="border-2 border-gray-200 p-6 rounded-xl hover:border-red-500 transition">
              <div className="text-center">
                <div className="text-3xl mb-2">🥇</div>
                <h3 className="text-xl font-bold">Enterprise</h3>
                <div className="text-3xl font-bold my-4">$80</div>
                <div className="text-gray-600 mb-4">1000 Tokens <span className="text-green-600">(+20%)</span></div>
                <button className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300">
                  Purchase
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


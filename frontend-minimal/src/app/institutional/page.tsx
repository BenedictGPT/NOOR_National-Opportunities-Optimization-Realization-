'use client';

export default function InstitutionalDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-700 to-gray-400 text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">🏢 Institutional Dashboard</h1>
            <p className="text-sm opacity-90">Ministry of Artificial Intelligence - HCM</p>
          </div>
          <a href="/" className="bg-white text-blue-700 px-4 py-2 rounded-lg hover:bg-gray-100">
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
            <div className="text-3xl font-bold text-gray-900">245</div>
            <div className="text-sm text-gray-600">Total Employees</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-3xl mb-2">📊</div>
            <div className="text-3xl font-bold text-gray-900">89.2</div>
            <div className="text-sm text-gray-600">Avg Faculty Score</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-3xl mb-2">💼</div>
            <div className="text-3xl font-bold text-gray-900">12</div>
            <div className="text-sm text-gray-600">Open Positions</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-3xl mb-2">📝</div>
            <div className="text-3xl font-bold text-gray-900">87</div>
            <div className="text-sm text-gray-600">Applications</div>
          </div>
        </div>

        {/* Eight-Faculty Team Analytics */}
        <div className="bg-white p-8 rounded-xl shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-6">Team Eight-Faculty Analytics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Physical', score: 87, color: 'bg-red-500', emoji: '🏃' },
              { name: 'Mental', score: 92, color: 'bg-blue-500', emoji: '🧠' },
              { name: 'Emotional', score: 88, color: 'bg-orange-500', emoji: '❤️' },
              { name: 'Spiritual', score: 90, color: 'bg-yellow-500', emoji: '✨' },
              { name: 'Social', score: 89, color: 'bg-green-500', emoji: '🤝' },
              { name: 'Volitional', score: 91, color: 'bg-purple-500', emoji: '💪' },
              { name: 'Intellectual', score: 93, color: 'bg-teal-500', emoji: '🎓' },
              { name: 'Moral', score: 90, color: 'bg-gray-500', emoji: '⚖️' },
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

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-4">🎯 HCM Features</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✅</span>
                Employee Eight-Faculty analytics
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✅</span>
                Job posting management
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✅</span>
                Candidate evaluation
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✅</span>
                Team analytics & insights
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-4">📈 Department Performance</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">AI Research</span>
                  <span className="text-sm font-semibold">94%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Data Science</span>
                  <span className="text-sm font-semibold">91%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '91%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Operations</span>
                  <span className="text-sm font-semibold">86%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '86%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Applications */}
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-6">Recent Applications</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Candidate</th>
                  <th className="text-left p-3">Position</th>
                  <th className="text-left p-3">Overall Score</th>
                  <th className="text-left p-3">Match</th>
                  <th className="text-left p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-3">Ahmed Al-Mansoori</td>
                  <td className="p-3">AI Researcher</td>
                  <td className="p-3"><span className="font-semibold">92</span></td>
                  <td className="p-3"><span className="text-green-600 font-semibold">95%</span></td>
                  <td className="p-3"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">Under Review</span></td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-3">Sara Al-Hashimi</td>
                  <td className="p-3">Data Scientist</td>
                  <td className="p-3"><span className="font-semibold">89</span></td>
                  <td className="p-3"><span className="text-green-600 font-semibold">88%</span></td>
                  <td className="p-3"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Shortlisted</span></td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-3">Mohammed Al-Zaabi</td>
                  <td className="p-3">ML Engineer</td>
                  <td className="p-3"><span className="font-semibold">91</span></td>
                  <td className="p-3"><span className="text-green-600 font-semibold">92%</span></td>
                  <td className="p-3"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">Interview Scheduled</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}


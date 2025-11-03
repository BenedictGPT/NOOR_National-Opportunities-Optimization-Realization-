import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            NOOR Platform
          </h1>
          <p className="text-2xl text-gray-600 mb-2">
            National Opportunities Optimization & Realization
          </p>
          <p className="text-lg text-gray-500">
            Illuminating Human Potential for UAE Vision 2071
          </p>
        </div>

        {/* Three Interface Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Federal Government */}
          <Link href="/federal/dashboard">
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow cursor-pointer border-t-4 border-[#D4AF37]">
              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-[#D4AF37] to-[#1E3A5F] rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Federal Government
                </h2>
                <p className="text-gray-600 mb-4">
                  National workforce intelligence and strategic insights
                </p>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Eight-Faculty National Analytics
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Opportunity Management
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Policy Insights
                </li>
              </ul>
              <div className="mt-6 text-center">
                <span className="text-[#D4AF37] font-semibold">Enter Dashboard →</span>
              </div>
            </div>
          </Link>

          {/* Individual Citizens */}
          <Link href="/individual/dashboard">
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow cursor-pointer border-t-4 border-[#CC0000]">
              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-[#CC0000] to-[#D4A574] rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Individual Citizens
                </h2>
                <p className="text-gray-600 mb-4">
                  Personal development and career opportunities
                </p>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-[#CC0000]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Skills Passport (Eight Faculties)
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-[#CC0000]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Gamified Assessments
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-[#CC0000]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Token-Based Learning
                </li>
              </ul>
              <div className="mt-6 text-center">
                <span className="text-[#CC0000] font-semibold">Enter Dashboard →</span>
              </div>
            </div>
          </Link>

          {/* Institutional Employers */}
          <Link href="/institutional/dashboard">
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow cursor-pointer border-t-4 border-[#2E5984]">
              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-[#2E5984] to-[#8AA0B0] rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Institutional Employers
                </h2>
                <p className="text-gray-600 mb-4">
                  Human capital management and talent acquisition
                </p>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-[#2E5984]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  HCM Dashboard
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-[#2E5984]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Employee Eight-Faculty Analytics
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-[#2E5984]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Talent Matching
                </li>
              </ul>
              <div className="mt-6 text-center">
                <span className="text-[#2E5984] font-semibold">Enter Dashboard →</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-500">
          <p className="mb-2">Powered by the Eight-Faculty Model</p>
          <p className="text-sm">🏃 Physical • 🧠 Mental • ❤️ Emotional • ✨ Spiritual • 🤝 Social • 💪 Volitional • 🎓 Intellectual • ⚖️ Moral</p>
        </div>
      </div>
    </div>
  );
}


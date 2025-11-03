import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>
      </div>

      {/* Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20 pt-12">
          <div className="mb-6">
            <h1 className="text-8xl font-black tracking-tighter text-white mb-2" style={{ fontStretch: 'condensed', letterSpacing: '-0.05em' }}>
              NOOR
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-amber-500 via-red-500 to-blue-500 mx-auto rounded-full" />
          </div>
          <p className="text-xl font-bold tracking-wider text-gray-400 uppercase mb-4">
            National Human Capital Intelligence System
          </p>
          <p className="text-sm text-gray-500 tracking-widest uppercase">
            Illuminating Human Potential • UAE Vision 2071
          </p>
        </div>

        {/* Three Interface Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {/* Federal Government - White & Gold */}
          <Link href="/federal/dashboard">
            <div className="group relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 hover:border-amber-500 transition-all duration-500 cursor-pointer overflow-hidden">
              {/* Glow Effect on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/10 group-hover:to-transparent transition-all duration-500" />

              <div className="relative z-10">
                {/* Icon */}
                <div className="w-16 h-16 mb-6 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/50 group-hover:shadow-amber-500/70 transition-shadow duration-500">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-white mb-3 tracking-tight">
                  Federal Government
                </h2>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  National workforce intelligence and strategic policy insights
                </p>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-xs text-gray-500 group-hover:text-amber-500 transition-colors">
                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2" />
                    Eight-Faculty National Analytics
                  </div>
                  <div className="flex items-center text-xs text-gray-500 group-hover:text-amber-500 transition-colors">
                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2" />
                    Workforce Intelligence Dashboard
                  </div>
                  <div className="flex items-center text-xs text-gray-500 group-hover:text-amber-500 transition-colors">
                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2" />
                    Strategic Policy Planning
                  </div>
                </div>

                {/* CTA */}
                <div className="flex items-center text-amber-500 font-semibold text-sm group-hover:text-amber-400 transition-colors">
                  Access Portal
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          {/* Individual Citizens - Red & Black */}
          <Link href="/individual/dashboard">
            <div className="group relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 hover:border-red-500 transition-all duration-500 cursor-pointer overflow-hidden">
              {/* Glow Effect on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-red-500/0 group-hover:from-red-500/10 group-hover:to-transparent transition-all duration-500" />

              <div className="relative z-10">
                {/* Icon */}
                <div className="w-16 h-16 mb-6 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/50 group-hover:shadow-red-500/70 transition-shadow duration-500">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-white mb-3 tracking-tight">
                  Individual Citizens
                </h2>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  Personal development, skills growth, and career advancement
                </p>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-xs text-gray-500 group-hover:text-red-500 transition-colors">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2" />
                    Skills Passport & Eight Faculties
                  </div>
                  <div className="flex items-center text-xs text-gray-500 group-hover:text-red-500 transition-colors">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2" />
                    AI-Powered Job Matching
                  </div>
                  <div className="flex items-center text-xs text-gray-500 group-hover:text-red-500 transition-colors">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2" />
                    Gamified Learning Experience
                  </div>
                </div>

                {/* CTA */}
                <div className="flex items-center text-red-500 font-semibold text-sm group-hover:text-red-400 transition-colors">
                  Access Portal
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          {/* Institutional Employers - Blue & Silver */}
          <Link href="/institutional/dashboard">
            <div className="group relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 hover:border-blue-500 transition-all duration-500 cursor-pointer overflow-hidden">
              {/* Glow Effect on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:to-transparent transition-all duration-500" />

              <div className="relative z-10">
                {/* Icon */}
                <div className="w-16 h-16 mb-6 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/50 group-hover:shadow-blue-500/70 transition-shadow duration-500">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-white mb-3 tracking-tight">
                  Institutional Employers
                </h2>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  Human capital management and strategic talent acquisition
                </p>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-xs text-gray-500 group-hover:text-blue-500 transition-colors">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                    Advanced HCM Dashboard
                  </div>
                  <div className="flex items-center text-xs text-gray-500 group-hover:text-blue-500 transition-colors">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                    Employee Analytics & Insights
                  </div>
                  <div className="flex items-center text-xs text-gray-500 group-hover:text-blue-500 transition-colors">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                    Intelligent Talent Matching
                  </div>
                </div>

                {/* CTA */}
                <div className="flex items-center text-blue-500 font-semibold text-sm group-hover:text-blue-400 transition-colors">
                  Access Portal
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center mt-20 text-gray-600 space-y-2">
          <p className="text-xs tracking-widest uppercase">Powered by the Eight-Faculty Model</p>
          <div className="flex items-center justify-center space-x-4 text-xs">
            <span className="text-gray-700">Cognitive</span>
            <span className="w-1 h-1 bg-gray-700 rounded-full" />
            <span className="text-gray-700">Emotional</span>
            <span className="w-1 h-1 bg-gray-700 rounded-full" />
            <span className="text-gray-700">Social</span>
            <span className="w-1 h-1 bg-gray-700 rounded-full" />
            <span className="text-gray-700">Physical</span>
            <span className="w-1 h-1 bg-gray-700 rounded-full" />
            <span className="text-gray-700">Creative</span>
            <span className="w-1 h-1 bg-gray-700 rounded-full" />
            <span className="text-gray-700">Practical</span>
            <span className="w-1 h-1 bg-gray-700 rounded-full" />
            <span className="text-gray-700">Moral</span>
            <span className="w-1 h-1 bg-gray-700 rounded-full" />
            <span className="text-gray-700">Spiritual</span>
          </div>
        </div>
      </div>
    </div>
  );
}


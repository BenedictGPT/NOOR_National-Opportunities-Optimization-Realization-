'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/federal/layout';

export default function RegionalTalentMapping() {
  const [selectedEmirate, setSelectedEmirate] = useState('all');
  const [selectedLayer, setSelectedLayer] = useState('density');

  const user = {
    name: 'Ahmed Al Mansoori',
    email: 'ahmed.almansoori@uae.gov.ae',
    role: 'Federal Administrator',
  };

  // F3B: Emirate Details
  const emirates = [
    {
      id: 'abudhabi',
      name: 'Abu Dhabi',
      population: 1520000,
      workforce: 1145000,
      employmentRate: 96.8,
      topSectors: ['Oil & Gas', 'Government', 'Finance'],
      color: 'bg-amber-600',
      borderColor: 'border-amber-600',
    },
    {
      id: 'dubai',
      name: 'Dubai',
      population: 3456000,
      workforce: 2542000,
      employmentRate: 97.2,
      topSectors: ['Tourism', 'Trade', 'Real Estate'],
      color: 'bg-red-600',
      borderColor: 'border-red-600',
    },
    {
      id: 'sharjah',
      name: 'Sharjah',
      population: 1678000,
      workforce: 1203000,
      employmentRate: 95.4,
      topSectors: ['Manufacturing', 'Trade', 'Education'],
      color: 'bg-green-600',
      borderColor: 'border-green-600',
    },
    {
      id: 'ajman',
      name: 'Ajman',
      population: 504000,
      workforce: 342000,
      employmentRate: 94.8,
      topSectors: ['Manufacturing', 'Trade', 'Services'],
      color: 'bg-blue-600',
      borderColor: 'border-blue-600',
    },
    {
      id: 'uaq',
      name: 'Umm Al Quwain',
      population: 72000,
      workforce: 48000,
      employmentRate: 93.9,
      topSectors: ['Agriculture', 'Tourism', 'Small Business'],
      color: 'bg-purple-600',
      borderColor: 'border-purple-600',
    },
    {
      id: 'rak',
      name: 'Ras Al Khaimah',
      population: 384000,
      workforce: 267000,
      employmentRate: 95.1,
      topSectors: ['Manufacturing', 'Tourism', 'Logistics'],
      color: 'bg-indigo-600',
      borderColor: 'border-indigo-600',
    },
    {
      id: 'fujairah',
      name: 'Fujairah',
      population: 256000,
      workforce: 178000,
      employmentRate: 94.5,
      topSectors: ['Shipping', 'Tourism', 'Agriculture'],
      color: 'bg-cyan-600',
      borderColor: 'border-cyan-600',
    },
  ];

  // F3C: Layer Data
  const layerTypes = [
    { id: 'density', label: 'Talent Density', icon: '👥' },
    { id: 'employers', label: 'Major Employers', icon: '🏢' },
    { id: 'education', label: 'Education Centers', icon: '🎓' },
    { id: 'industrial', label: 'Industrial Zones', icon: '🏭' },
  ];

  // F3D: Flow Visualization Data
  const talentFlows = [
    { from: 'Sharjah', to: 'Dubai', count: 125000, color: 'bg-red-500' },
    { from: 'Ajman', to: 'Dubai', count: 45000, color: 'bg-red-400' },
    { from: 'RAK', to: 'Dubai', count: 32000, color: 'bg-red-300' },
    { from: 'Sharjah', to: 'Abu Dhabi', count: 28000, color: 'bg-amber-500' },
    { from: 'Dubai', to: 'Abu Dhabi', count: 52000, color: 'bg-amber-400' },
  ];

  const getEmirateData = (emirateId: string) => {
    return emirates.find(e => e.id === emirateId) || emirates[0];
  };

  const selectedEmirateData = selectedEmirate === 'all' ? null : getEmirateData(selectedEmirate);

  return (
    <DashboardLayout user={user} notificationCount={5}>
      <div className="space-y-6 bg-gradient-to-br from-amber-50 to-white min-h-screen p-6">
        {/* F3: Regional Talent Mapping Header */}
        <div className="relative bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl p-8 text-white shadow-2xl overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }} />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-3xl">🗺️</span>
              <span className="text-amber-100 font-semibold text-sm uppercase tracking-wider">Geographic Intelligence</span>
            </div>
            <h1 className="text-5xl font-black tracking-tight mb-2">
              Regional Talent Mapping
            </h1>
            <p className="text-amber-100 text-lg">
              Interactive visualization of talent distribution across the 7 Emirates
            </p>
          </div>
        </div>

        {/* F3C: Layer Controls */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Map Layers & Filters</h2>
            <button className="px-4 py-2 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-colors">
              Reset View
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {layerTypes.map((layer) => (
              <button
                key={layer.id}
                onClick={() => setSelectedLayer(layer.id)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedLayer === layer.id
                    ? 'bg-amber-50 border-amber-600 shadow-lg'
                    : 'bg-white border-gray-200 hover:border-amber-300'
                }`}
              >
                <div className="text-3xl mb-2">{layer.icon}</div>
                <div className="text-sm font-bold text-gray-900">{layer.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* F3A & F3B: Interactive Map & Emirate Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Map Visualization */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6">UAE Talent Distribution Map</h3>

            {/* Simplified Map Representation */}
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 min-h-[500px]">
              <div className="grid grid-cols-3 gap-4">
                {emirates.map((emirate, index) => (
                  <button
                    key={emirate.id}
                    onClick={() => setSelectedEmirate(emirate.id)}
                    className={`group relative p-6 rounded-xl border-4 transition-all duration-300 hover:scale-105 ${
                      selectedEmirate === emirate.id
                        ? `${emirate.color} ${emirate.borderColor} shadow-2xl`
                        : 'bg-white border-gray-300 hover:border-amber-400'
                    }`}
                  >
                    <div className={`text-center ${selectedEmirate === emirate.id ? 'text-white' : 'text-gray-900'}`}>
                      <div className="text-4xl mb-2">🏙️</div>
                      <div className="font-black text-lg mb-1">{emirate.name}</div>
                      <div className={`text-sm font-semibold ${selectedEmirate === emirate.id ? 'text-white/90' : 'text-gray-600'}`}>
                        {(emirate.workforce / 1000).toFixed(0)}K workers
                      </div>
                      <div className={`text-xs mt-2 font-bold ${selectedEmirate === emirate.id ? 'text-white/80' : 'text-gray-500'}`}>
                        {emirate.employmentRate}% employed
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Talent Density Heatmap Legend */}
              <div className="absolute bottom-4 left-4 bg-white rounded-lg p-4 shadow-lg">
                <div className="text-xs font-bold text-gray-600 mb-2">Talent Density</div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Low</span>
                  <div className="flex gap-1">
                    <div className="w-6 h-4 bg-green-200 rounded" />
                    <div className="w-6 h-4 bg-yellow-300 rounded" />
                    <div className="w-6 h-4 bg-orange-400 rounded" />
                    <div className="w-6 h-4 bg-red-500 rounded" />
                  </div>
                  <span className="text-xs text-gray-500">High</span>
                </div>
              </div>
            </div>
          </div>

          {/* Emirate Details Panel */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {selectedEmirateData ? selectedEmirateData.name : 'All Emirates'}
            </h3>

            {selectedEmirateData ? (
              <div className="space-y-6">
                {/* Quick Stats */}
                <div className="space-y-4">
                  <div className={`p-4 rounded-xl ${selectedEmirateData.color} bg-opacity-10 border-2 ${selectedEmirateData.borderColor}`}>
                    <div className="text-sm font-bold text-gray-600 mb-1">Total Population</div>
                    <div className="text-3xl font-black text-gray-900">
                      {(selectedEmirateData.population / 1000000).toFixed(2)}M
                    </div>
                  </div>

                  <div className={`p-4 rounded-xl ${selectedEmirateData.color} bg-opacity-10 border-2 ${selectedEmirateData.borderColor}`}>
                    <div className="text-sm font-bold text-gray-600 mb-1">Workforce</div>
                    <div className="text-3xl font-black text-gray-900">
                      {(selectedEmirateData.workforce / 1000000).toFixed(2)}M
                    </div>
                  </div>

                  <div className={`p-4 rounded-xl ${selectedEmirateData.color} bg-opacity-10 border-2 ${selectedEmirateData.borderColor}`}>
                    <div className="text-sm font-bold text-gray-600 mb-1">Employment Rate</div>
                    <div className="text-3xl font-black text-gray-900">
                      {selectedEmirateData.employmentRate}%
                    </div>
                  </div>
                </div>

                {/* Top Sectors */}
                <div>
                  <div className="text-sm font-bold text-gray-600 mb-3">Top Sectors</div>
                  <div className="space-y-2">
                    {selectedEmirateData.topSectors.map((sector, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <div className={`w-2 h-2 rounded-full ${selectedEmirateData.color}`} />
                        <span className="text-sm font-semibold text-gray-700">{sector}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button className={`w-full py-3 ${selectedEmirateData.color} text-white rounded-lg font-bold hover:opacity-90 transition-opacity`}>
                  View Detailed Report
                </button>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🗺️</div>
                <p className="text-gray-600">Select an Emirate to view details</p>
              </div>
            )}
          </div>
        </div>

        {/* F3D: Talent Flow Visualization */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Inter-Emirate Talent Flow</h3>
          <div className="space-y-4">
            {talentFlows.map((flow, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-gray-700">{flow.from}</span>
                      <span className="text-gray-400">→</span>
                      <span className="text-sm font-bold text-gray-700">{flow.to}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">{(flow.count / 1000).toFixed(0)}K workers</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div className={`${flow.color} h-4 rounded-full transition-all duration-500`} style={{ width: `${(flow.count / 125000) * 100}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-gray-600">Total Inter-Emirate Movement</div>
                <div className="text-3xl font-black text-gray-900 mt-1">282K workers/day</div>
              </div>
              <div className="text-5xl">🚗</div>
            </div>
          </div>
        </div>

        {/* Quick Statistics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200">
            <div className="text-4xl mb-3">🎓</div>
            <div className="text-sm font-bold text-gray-600">Education Centers</div>
            <div className="text-3xl font-black text-gray-900 mt-2">248</div>
            <div className="text-xs text-gray-500 mt-1">Across all emirates</div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200">
            <div className="text-4xl mb-3">🏭</div>
            <div className="text-sm font-bold text-gray-600">Industrial Zones</div>
            <div className="text-3xl font-black text-gray-900 mt-2">89</div>
            <div className="text-xs text-gray-500 mt-1">Major industrial clusters</div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
            <div className="text-4xl mb-3">🏢</div>
            <div className="text-sm font-bold text-gray-600">Major Employers</div>
            <div className="text-3xl font-black text-gray-900 mt-2">1,542</div>
            <div className="text-xs text-gray-500 mt-1">Companies with 500+ employees</div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

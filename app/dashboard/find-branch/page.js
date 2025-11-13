'use client';

import BranchAtmResults from '@/components/find-branch/BranchAtmResults';
import BranchAtmSearch from '@/components/find-branch/BranchAtmSearch';
import HeaderTop from '@/components/global/HeaderTop';
import { MapPin } from 'lucide-react';
import { useState } from 'react';

// --- MOCK DATA ---
const MOCK_LOCATIONS = [
  {
    id: 1,
    name: 'Branch 1',
    address: '11180 Lee Hwy, Fairfax, VA-22030',
    lat: 38.85,
    lng: -77.38,
    type: 'Branch',
    time: '09:00 AM - 04:00 PM',
    phone: '7035532497',
  },
  {
    id: 2,
    name: 'Branch 2',
    address: '9200 Centreville Rd, Manassas, VA',
    lat: 38.78,
    lng: -77.46,
    type: 'Branch',
    time: '09:00 AM - 05:00 PM',
    phone: '7035532497',
  },
  {
    id: 3,
    name: 'Finxact ATM 1',
    address: '252 A1A N Suite 300, Ponte Vedra Beach, FL',
    lat: 30.22,
    lng: -81.39,
    type: 'ATM',
    time: '24 Hours',
    phone: 'N/A',
  },
  {
    id: 4,
    name: 'Branch 4',
    address: 'Jacksonville Main St',
    lat: 30.32,
    lng: -81.65,
    type: 'Branch',
    time: '09:00 AM - 04:00 PM',
    phone: '7035532497',
  },
  {
    id: 5,
    name: 'ATM Downtown',
    address: 'Riverplace Blvd',
    lat: 30.34,
    lng: -81.66,
    type: 'ATM',
    time: '24 Hours',
    phone: 'N/A',
  },
];
// --- MOCK DATA END ---

// --- Placeholder for Google Map (Reusable from Contact Us page) ---
const GoogleMapPlaceholder = ({ branches, selectedBranch }) => {
  const center = selectedBranch
    ? { lat: selectedBranch.lat, lng: selectedBranch.lng }
    : { lat: 30.33, lng: -81.65 };

  return (
    <div className="w-full h-full min-h-[400px] bg-gray-200 rounded-lg overflow-hidden relative">
      <div className="absolute inset-0 bg-map-pattern opacity-5"></div>

      {/* Map Content (Mock) */}
      <div className="text-center p-4">
        <h4 className="text-xl font-bold text-gray-700 z-10">
          Map Visualization
        </h4>
        <p className="text-sm text-orange-600 z-10 mt-1">
          Center: {center.lat.toFixed(2)}, {center.lng.toFixed(2)}
        </p>
      </div>

      {/* Mock Pins */}
      {branches.map((branch, index) => (
        <div
          key={branch.id}
          className={`absolute flex flex-col items-center`}
          // Simplified positioning based on index for visual diversity
          style={{ top: `${20 + index * 10}%`, left: `${20 + index * 15}%` }}
        >
          <MapPin
            className={`w-8 h-8 ${
              branch === selectedBranch ? 'text-red-600' : 'text-blue-600/70'
            } fill-current`}
          />
        </div>
      ))}
    </div>
  );
};

export default function FindBranchAtmPage() {
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState(MOCK_LOCATIONS);
  const [filters, setFilters] = useState({ branches: true, atms: true }); // Both checked by default
  const [selectedBranch, setSelectedBranch] = useState(null);

  const handleSearch = (query) => {
    if (!query) return;
    setLoading(true);
    // 🌟 API Call Simulation 🌟
    setTimeout(() => {
      // Mock filter logic based on query matching 'Jacksonville' or 'Fairfax' areas
      const filtered = MOCK_LOCATIONS.filter(
        (loc) =>
          loc.address.toLowerCase().includes(query.toLowerCase()) ||
          loc.name.toLowerCase().includes(query.toLowerCase())
      );

      setLocations(filtered.length > 0 ? filtered : MOCK_LOCATIONS); // If no match, show all
      setSelectedBranch(filtered[0] || null); // Select first result to center map
      setLoading(false);
    }, 1500);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setSelectedBranch(null); // Clear selection when filter changes
  };

  const filteredLocations = locations.filter(
    (loc) =>
      (filters.branches && loc.type === 'Branch') ||
      (filters.atms && loc.type === 'ATM')
  );

  return (
    <div className="p-6">
      <HeaderTop
        title="Find a Branch or ATM"
        text="Locate our branches and ATMs near you"
        link="/dashboard"
        linkText="Back to Dashboard"
      />

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8 max-w-7xl mx-auto space-y-6">
        {/* Search and Filter Component */}
        <BranchAtmSearch
          onSearch={handleSearch}
          loading={loading}
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Left Column: Results List */}
          <div className="lg:col-span-1">
            <BranchAtmResults
              locations={filteredLocations}
              loading={loading}
              onSelectBranch={setSelectedBranch}
              selectedBranch={selectedBranch}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

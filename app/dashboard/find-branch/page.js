'use client';

import BranchAtmResults from '@/components/find-branch/BranchAtmResults';
import BranchAtmSearch from '@/components/find-branch/BranchAtmSearch';
import HeaderTop from '@/components/global/HeaderTop';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useState } from 'react';

// Mock data
const MOCK_LOCATIONS = [
  {
    id: 1,
    name: 'Branch 1',
    address: '11180 Lee Hwy, Fairfax, VA-22030',
    lat: 38.85,
    lng: -77.38,
    type: 'Branch',
    time: '09:00 am - 04:00 pm',
    phone: '7035532497',
    fax: '7035524987',
    distance: '1 mi',
    duration: '1 min',
  },
  {
    id: 2,
    name: 'Branch 2',
    address: '9200 Centreville Rd, Manassas, VA',
    lat: 38.78,
    lng: -77.46,
    type: 'Branch',
    time: '09:00 am - 05:00 pm',
    phone: '70336870',
    fax: '70336870',
    distance: '21.6 km',
    duration: '25 mins',
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
    fax: 'N/A',
  },
  {
    id: 4,
    name: 'Branch 4',
    address: 'Jacksonville Main St',
    lat: 30.32,
    lng: -81.65,
    type: 'Branch',
    time: '09:00 am - 04:00 pm',
    phone: '7035532497',
    fax: '7035532497',
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
    fax: 'N/A',
  },
];

const GoogleMapComponent = ({ branches, selectedBranch, onSelectBranch }) => {
  const center = selectedBranch
    ? { lat: selectedBranch.lat, lng: selectedBranch.lng }
    : branches.length > 0
    ? { lat: branches[0].lat, lng: branches[0].lng }
    : { lat: 30.33, lng: -81.65 };

  const mapOptions = {
    disableDefaultUI: false,
    zoomControl: true,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: true,
  };

  return (
    <div className="w-full h-full rounded-lg overflow-hidden bg-gray-100">
      <LoadScript
        googleMapsApiKey="AIzaSyBLsfAvQX6j_mF_ElU3oelgLFokalRnUxM"
        loadingElement={
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm text-gray-600">Loading map...</p>
            </div>
          </div>
        }
      >
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={center}
          zoom={selectedBranch ? 15 : 11}
          options={mapOptions}
        >
          {branches.map((branch) => (
            <Marker
              key={branch.id}
              position={{ lat: branch.lat, lng: branch.lng }}
              onClick={() => onSelectBranch(branch)}
              icon={{
                path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
                fillColor:
                  selectedBranch?.id === branch.id
                    ? '#dc2626'
                    : branch.type === 'Branch'
                    ? '#3b82f6'
                    : '#f97316',
                fillOpacity: 1,
                strokeWeight: 2,
                strokeColor: '#fff',
                scale: selectedBranch?.id === branch.id ? 2.5 : 2,
                anchor: { x: 12, y: 22 },
              }}
              animation={
                selectedBranch?.id === branch.id
                  ? window.google?.maps?.Animation?.BOUNCE
                  : null
              }
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default function FindBranchAtmPage() {
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState(MOCK_LOCATIONS);
  const [filters, setFilters] = useState({ branches: true, atms: true });
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (query) => {
    if (!query) return;
    setLoading(true);
    setHasSearched(true);

    setTimeout(() => {
      const filtered = MOCK_LOCATIONS.filter(
        (loc) =>
          loc.address.toLowerCase().includes(query.toLowerCase()) ||
          loc.name.toLowerCase().includes(query.toLowerCase())
      );

      setLocations(filtered.length > 0 ? filtered : []);
      setSelectedBranch(filtered[0] || null);
      setLoading(false);
    }, 1000);
  };

  const handleClear = () => {
    setLocations(MOCK_LOCATIONS);
    setSelectedBranch(null);
    setHasSearched(false);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    if (!hasSearched) {
      setSelectedBranch(null);
    }
  };

  const filteredLocations = locations.filter(
    (loc) =>
      (filters.branches && loc.type === 'Branch') ||
      (filters.atms && loc.type === 'ATM')
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-4 lg:space-y-6">
        {/* Header */}
        <HeaderTop
          title="Find a Branch or ATM"
          text="Locate our branches and ATMs near you"
          link="/dashboard"
          linkText="Back to Dashboard"
        />

        {/* Main Content Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
          {/* Search */}
          <BranchAtmSearch
            onSearch={handleSearch}
            onClear={handleClear}
            loading={loading}
            filters={filters}
            onFilterChange={handleFilterChange}
            hasSearched={hasSearched}
          />

          {/* Results Grid - Responsive */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Map - Shows first on mobile */}
            <div className="order-1 lg:order-2 h-[50vh] lg:h-[600px] lg:sticky lg:top-8">
              <GoogleMapComponent
                branches={filteredLocations}
                selectedBranch={selectedBranch}
                onSelectBranch={setSelectedBranch}
              />
            </div>

            {/* Results - Shows second on mobile */}
            <div className="order-2 lg:order-1">
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
    </div>
  );
}

import { Loader2 } from 'lucide-react';
import { useState } from 'react';
// import BranchList from './BranchList';
import BranchList from './BranchList';
import MapSearch from './MapSearch';

// --- MOCK DATA (Replace with your actual API fetch logic) ---
const MOCK_BRANCHES = [
  {
    id: 1,
    name: 'Branch 1 (HQ)',
    address: '11180 Lee Hwy, Fairfax, VA-22030',
    lat: 38.85,
    lng: -77.38,
    distance: '2.5 mi',
  },
  {
    id: 2,
    name: 'Branch 2 (Downtown)',
    address: '9200 Centreville Rd, Manassas, VA',
    lat: 38.78,
    lng: -77.46,
    distance: '5.1 mi',
  },
  {
    id: 3,
    name: 'Branch 3 (North)',
    address: '232 A1A N Suite 300, Ponte Vedra Beach, FL',
    lat: 30.22,
    lng: -81.39,
    distance: '10.0 mi',
  },
];

// --- Placeholder for Google Map ---
// Real integration uses libraries like @react-google-maps/api
const MapPlaceholder = ({ branches, center }) => {
  return (
    <div className="w-full h-full min-h-[400px] bg-gray-100 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-300 relative overflow-hidden">
      <div className="absolute inset-0 bg-map-pattern opacity-5"></div>

      {/* Dynamic Map Visualization (Mock) */}
      <h4 className="text-xl font-bold text-gray-700 z-10">
        Google Map Placeholder
      </h4>
      <p className="text-sm text-orange-600 z-10 mt-1">
        Your Map Component will be rendered here.
      </p>

      {/* Mock Pins */}
      {branches.slice(0, 3).map((branch, index) => (
        <div
          key={branch.id}
          className={`absolute flex flex-col items-center animate-bounce`}
          style={{ top: `${20 + index * 15}%`, left: `${40 + index * 10}%` }}
        >
          <MapPin className="w-8 h-8 text-red-600 fill-red-600" />
          <span className="text-xs font-semibold text-gray-800 mt-1 bg-white px-2 rounded shadow">
            {branch.name}
          </span>
        </div>
      ))}
    </div>
  );
};

const BranchLocator = () => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [center, setCenter] = useState({ lat: 38.85, lng: -77.38 }); // Default map center

  // Functionality to simulate API call (Future API Integration)
  const handleSearch = (locationQuery) => {
    setLoading(true);
    console.log('Searching for location:', locationQuery);

    // 🌟 FUTURE API INTEGRATION POINT: 🌟
    // 1. Call your Geocoding API to get Lat/Lng of the locationQuery.
    // 2. Use the coordinates to call your "Find Nearby Branches" API.

    setTimeout(() => {
      // Mock data based on the screenshot list style
      setBranches(MOCK_BRANCHES);
      setCenter({ lat: 38.85, lng: -77.38 }); // Set map center based on search result
      setLoading(false);
    }, 1500);
  };

  // Handle selecting a branch from the list to center the map
  const handleSelectBranch = (branch) => {
    console.log('Branch selected:', branch.name);
    // In a real map, you would update the map's center and zoom level here.
    setCenter({ lat: branch.lat, lng: branch.lng });
    // You could also highlight the marker on the map here.
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* Page Title - Matching your theme's header style */}
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Branch/ATM Locator
        </h1>
        <p className="text-gray-500 mt-1">
          Find the nearest banking centers and ATMs near you.
        </p>
        <div className="w-16 h-1 bg-orange-500 mx-auto mt-3 rounded"></div>
      </div>

      {/* Main Content Card (White Background) */}
      <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8">
        {/* Search Component */}
        <MapSearch onSearch={handleSearch} />

        <div className="mt-8">
          {loading ? (
            <div className="text-center p-10">
              <Loader2 className="w-8 h-8 animate-spin text-orange-500 mx-auto" />
              <p className="text-sm text-gray-600 mt-3">
                Searching for locations...
              </p>
            </div>
          ) : (
            // --- Map and List Layout (Responsive) ---
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Map Column (2/3 width on large screens) */}
              <div className="lg:col-span-2">
                <div className="w-full h-full min-h-[400px]">
                  {/* 🌟 REPLACE MapPlaceholder WITH YOUR GOOGLE MAP COMPONENT 🌟 */}
                  <MapPlaceholder branches={branches} center={center} />
                  {/* Example of how a real map component might look:
                          <GoogleMapComponent branches={branches} center={center} />
                      */}
                </div>
              </div>

              {/* Branch List Column (1/3 width on large screens) */}
              <div className="lg:col-span-1">
                <h4 className="font-semibold text-gray-700 mb-3">
                  Available Locations ({branches.length})
                </h4>
                <BranchList
                  branches={branches}
                  onSelectBranch={handleSelectBranch}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BranchLocator;

'use client';

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { motion } from 'framer-motion';
import { CornerRightUp, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

// 🌟 FIX: mapContainerStyle uses 100% height
const mapContainerStyle = {
  width: '100%',
  height: '100%',
  minHeight: '400px',
  borderRadius: '0.5rem',
};

const GoogleMapComponent = ({ locationData }) => {
  const [mapLoaded, setMapLoaded] = useState(false);

  // Center coordinates
  const center = {
    lat: locationData.lat || 30.332, // Assuming Jacksonville default
    lng: locationData.lng || -81.655,
  };

  const mapOptions = {
    disableDefaultUI: false,
    zoomControl: true,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: true,
    styles: [
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }],
      },
    ],
  };

  return (
    // 🌟 FIX: Ensure this container has h-full (if parent provides height) or a fixed min-height
    <div className="w-full h-full min-h-[400px] bg-gray-200 rounded-lg overflow-hidden relative">
      <LoadScript
        googleMapsApiKey="AIzaSyBLsfAvQX6j_mF_ElU3oelgLFokalRnUxM"
        onLoad={() => setMapLoaded(true)}
        // 🌟 FIX: Apply h-full to LoadScript's wrapper
        loadingElement={
          <div className="w-full h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        }
      >
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={15}
          options={mapOptions}
        >
          {/* Custom Marker */}
          <Marker
            position={center}
            icon={{
              path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
              fillColor: '#f97316',
              fillOpacity: 1,
              strokeWeight: 2,
              strokeColor: '#fff',
              scale: 2,
              anchor: { x: 12, y: 22 },
            }}
            // You must check if window.google exists before accessing it
            animation={
              typeof window !== 'undefined' &&
              window.google?.maps?.Animation?.BOUNCE
            }
          />
        </GoogleMap>
      </LoadScript>

      {/* Address Card Overlay */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="absolute top-4 left-4 bg-white p-4 rounded-xl shadow-2xl max-w-[320px] z-20 border-2 border-orange-100"
      >
        {/* ... (Address Card Content) ... */}
        <div className="flex items-start gap-3 mb-3">
          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center">
            <MapPin className="w-5 h-5 text-orange-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-gray-900 text-sm mb-1">
              {locationData.name}
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              {locationData.address1}
            </p>
            {locationData.address2 && (
              <p className="text-xs text-gray-600 leading-relaxed">
                {locationData.address2}
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <Link
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              `${locationData.lat},${locationData.lng}`
            )}`}
            target="_blank"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            View larger map
          </Link>
          <Link
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
              `${locationData.lat},${locationData.lng}`
            )}`}
            target="_blank"
            className="flex items-center gap-1 text-xs font-semibold text-orange-600 hover:text-orange-700 transition-colors"
          >
            <CornerRightUp className="w-4 h-4" />
            <span>Directions</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default GoogleMapComponent;

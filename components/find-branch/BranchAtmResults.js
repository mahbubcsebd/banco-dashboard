import { motion } from 'framer-motion';
import { Clock, Link, MapPin, Phone } from 'lucide-react'; // Used Link to mock Fax

const BranchAtmResults = ({
  locations,
  loading,
  onSelectBranch,
  selectedBranch,
}) => {
  if (loading) {
    return (
      <div className="text-center p-10">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500 mx-auto" />
      </div>
    );
  }

  if (locations.length === 0) {
    return (
      <div className="text-center p-10 text-gray-500 bg-white rounded-lg border border-dashed border-gray-300">
        Showing 0 locations
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800">
        Branches{' '}
        <span className="text-sm font-normal text-gray-600">
          Showing {locations.length} locations
        </span>
      </h3>

      <div className="divide-y divide-gray-100 border border-gray-200 rounded-lg max-h-[600px] overflow-y-auto">
        {locations.map((branch, index) => (
          <motion.div
            key={branch.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            onClick={() => onSelectBranch(branch)}
            className={`p-4 transition-colors cursor-pointer ${
              selectedBranch?.id === branch.id
                ? 'bg-blue-50 border-blue-600 border-l-4'
                : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-2 mb-2">
              <MapPin
                className={`w-5 h-5 ${
                  branch.type === 'Branch' ? 'text-blue-600' : 'text-orange-600'
                }`}
              />
              <p className="font-semibold text-gray-900">{branch.name}</p>
            </div>

            <div className="space-y-1 text-sm text-gray-700 ml-7">
              <p className="text-gray-600">{branch.address}</p>

              {/* Distance */}
              {branch.distance && (
                <p className="text-xs text-gray-500">
                  {branch.distance} (1 min)
                </p>
              )}

              {/* Hours */}
              <p className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>{branch.time}</span>
              </p>

              {/* Phone */}
              {branch.phone !== 'N/A' && (
                <p className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>Phone Number: {branch.phone}</span>
                </p>
              )}

              {/* Fax (Mocking for the look) */}
              {branch.phone !== 'N/A' && (
                <p className="flex items-center space-x-2">
                  <Link className="w-4 h-4 text-gray-400" />
                  <span>Fax Number: {branch.phone}</span>
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BranchAtmResults;

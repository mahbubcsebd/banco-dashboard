import { MapPin } from 'lucide-react';

const BranchList = ({ branches, onSelectBranch }) => {
  if (!branches || branches.length === 0) {
    return (
      <div className="text-center p-10 text-gray-500 bg-white rounded-lg border border-dashed border-gray-300">
        No locations found. Please try a different search term.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-100 divide-y divide-gray-100 max-h-96 overflow-y-auto">
      {branches.map((branch) => (
        <div
          key={branch.id}
          className="p-4 hover:bg-orange-50 cursor-pointer transition duration-150"
          onClick={() => onSelectBranch(branch)}
        >
          <div className="flex items-start space-x-3">
            <MapPin className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
            <div>
              <p className="font-semibold text-gray-900 text-sm">
                {branch.name}
              </p>
              <p className="text-gray-600 text-xs">{branch.address}</p>
              {branch.distance && (
                <p className="text-xs text-gray-500 mt-1">
                  Distance: {branch.distance}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BranchList;

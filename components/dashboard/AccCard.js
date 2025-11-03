const AccCard = ({
  icon: Icon,
  title = 'OPTION 01',
  description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacus orci, luctus et ultricies eget.',
  accentColor = 'bg-linear-to-br from-yellow-400 to-orange-500',
}) => {
  return (
    <div className="relative w-[calc(100%-100px)] pr-24 mb-8">
      <div className="relative bg-white h-[180px] overflow-visible">
        {/* Left colored accent bar with 3D effect */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-2 ${accentColor} shadow-md rounded-l-lg`}
        />
        <div className="absolute left-full top-0 h-1/2 bg-white w-[100px] rounded-tr-full z-20" />
        <div className="absolute left-full bottom-0 h-1/2 bg-white w-[100px] rounded-br-full z-80" />
        <div className="absolute left-full top-1/2 -translate-y-1/2 w-[180px] h-[180px] z-30">
          <div
            className={`absolute left-0 top-1/2 -translate-y-1/2 w-[180px] h-[180px] rounded-full ${accentColor} z-50`}
          >
            <div className="absolute inset-0 rounded-full bg-linear-to-br from-white/30 via-transparent to-black/20" />
            <div className="absolute top-4 left-4 w-16 h-16 rounded-full bg-white/20 blur-xl" />
          </div>

          {/* Bottom white curve with shadow */}
          <div className="absolute left-0 bottom-0 h-1/2 bg-linear-to-t from-white to-gray-50 w-[90px] rounded-br-full shadow-inner z-20" />
        </div>
      </div>
    </div>
  );
};

// Example usage component
const InfographicTemplate = () => {
  const options = [
    {
      title: 'OPTION 01',
      description:
        'Financial planning and investment strategies for sustainable growth and prosperity.',
      accentColor: 'bg-linear-to-br from-yellow-400 to-orange-500',
    },
    {
      title: 'OPTION 02',
      description:
        'Schedule management and calendar organization for optimal productivity.',
      accentColor: 'bg-linear-to-br from-lime-400 to-green-500',
    },
    {
      title: 'OPTION 03',
      description:
        'Team collaboration and human resources management solutions.',
      accentColor: 'bg-linear-to-br from-slate-500 to-blue-800',
    },
    {
      title: 'OPTION 04',
      description:
        'Partnership development and strategic business relationships.',
      accentColor: 'bg-linear-to-br from-orange-400 to-orange-600',
    },
    {
      title: 'OPTION 05',
      description:
        'Marketing campaigns and promotional strategies for brand awareness.',
      accentColor: 'bg-linear-to-br from-pink-400 to-pink-600',
    },
    {
      title: 'OPTION 06',
      description:
        'Analytics and data-driven insights for informed decision making.',
      accentColor: 'bg-linear-to-br from-cyan-400 to-blue-500',
    },
    {
      title: 'OPTION 07',
      description:
        'Performance tracking and business intelligence reporting systems.',
      accentColor: 'bg-linear-to-br from-yellow-700 to-yellow-900',
    },
    {
      title: 'OPTION 08',
      description:
        'Mobile solutions and responsive design for modern applications.',
      accentColor: 'bg-linear-to-br from-red-500 to-red-600',
    },
    {
      title: 'OPTION 09',
      description:
        'Financial security and savings optimization for future planning.',
      accentColor: 'bg-linear-to-br from-purple-500 to-purple-700',
    },
    {
      title: 'OPTION 10',
      description:
        'Global expansion and international market development strategies.',
      accentColor: 'bg-linear-to-br from-slate-600 to-slate-800',
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16">
      {options.map((option, index) => (
        <AccCard
          key={index}
          title={option.title}
          description={option.description}
          accentColor={option.accentColor}
        />
      ))}
    </div>
  );
};

export default InfographicTemplate;

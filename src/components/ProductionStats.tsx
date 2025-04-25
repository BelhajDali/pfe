interface ProductionStatsProps {
  plannedUnits: number;
  actualUnits: number;
  delays: string;
  topWorker: string;
  avgTaskTime: string;
}

const ProductionStats = ({ plannedUnits, actualUnits, delays, topWorker, avgTaskTime }: ProductionStatsProps) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Production Stats</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Planned Units</span>
          <div className="flex items-center gap-2">
            <div className="w-24 bg-blue-100 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '100%' }}></div>
            </div>
            <span className="font-medium">{plannedUnits}</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Actual Units</span>
          <div className="flex items-center gap-2">
            <div className="w-24 bg-blue-100 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${(actualUnits / plannedUnits) * 100}%` }}
              ></div>
            </div>
            <span className="font-medium">{actualUnits}</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Delays</span>
          <span className="font-medium">{delays}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Top Worker</span>
          <span className="font-medium">{topWorker}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Avg. Task Time</span>
          <span className="font-medium">{avgTaskTime}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductionStats; 
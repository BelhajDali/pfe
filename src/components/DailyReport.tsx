interface DailyReportProps {
  date: string;
  timeSpent: string;
  helpRequests: number;
  completionRate: string;
}

const DailyReport = ({ date, timeSpent, helpRequests, completionRate }: DailyReportProps) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Daily Report</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Date</span>
          <span className="font-medium">{date}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Time Spent</span>
          <span className="font-medium">{timeSpent}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Help Requests</span>
          <span className="font-medium">{helpRequests}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Completion Rate</span>
          <span className="font-medium">{completionRate}</span>
        </div>
      </div>
    </div>
  );
};

export default DailyReport; 
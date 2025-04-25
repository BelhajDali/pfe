import { RiCheckboxCircleLine, RiQuestionLine, RiBarChartBoxLine, RiAlertLine, RiTimeLine, RiAlertFill } from 'react-icons/ri';
import StatCard from '../components/StatCard';
import DailyReport from '../components/DailyReport';
import ProductionStats from '../components/ProductionStats';
import AdminPanel from '../components/AdminPanel';
import ProductionHistory from '../components/ProductionHistory';

const Dashboard = () => {
  // Sample data - replace with real data from your backend
  const stats = {
    tasksDone: 120,
    helpRequests: 5,
    plannedVsActual: '300 / 275',
    bottleneck: '10%'
  };

  const dailyReport = {
    date: 'April 25, 2024',
    timeSpent: '4h 10m',
    helpRequests: 2,
    completionRate: '90%'
  };

  const productionStats = {
    plannedUnits: 300,
    actualUnits: 275,
    delays: '15m',
    topWorker: 'Amir',
    avgTaskTime: '4m 33s'
  };

  const users = [
    { email: 'john.doe@example.com' },
    { email: 'jane.smith@example.com' },
    { email: 'alice.jones@example.com' },
    { email: 'bob.brown@example.com' }
  ];

  const productionHistory = {
    labels: ['1', '2', '3', '4', '5', '6', '7'],
    values: [2500, 1500, 10000, 5000, 5000, 4000, 5000]
  };

  const alerts = [
    {
      title: "Défaut détecté sur la ligne 3",
      time: "Il y a 2 heures",
      type: "error"
    }
  ];

  const handleEditUser = (email: string) => {
    console.log('Edit user:', email);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<RiCheckboxCircleLine size={24} />}
          value={stats.tasksDone}
          label="Tasks Done"
          bgColor="bg-blue-600"
        />
        <StatCard
          icon={<RiQuestionLine size={24} />}
          value={stats.helpRequests}
          label="Help Requests"
          bgColor="bg-orange-500"
        />
        <StatCard
          icon={<RiBarChartBoxLine size={24} />}
          value={stats.plannedVsActual}
          label="Planned vs Actual"
          bgColor="bg-blue-600"
        />
        <StatCard
          icon={<RiAlertLine size={24} />}
          value={stats.bottleneck}
          label="Bottleneck Prediction"
          bgColor="bg-orange-500"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Report */}
        <div className="bg-[#1E2A3B] rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6 text-white">Rapport journalier</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#2A3A4F] p-4 rounded-lg">
              <div className="flex items-center gap-3 text-gray-400 mb-2">
                <RiTimeLine className="text-blue-500" size={20} />
                <span>Temps de production</span>
              </div>
              <div className="text-2xl font-bold text-white">4h 10m</div>
            </div>
            <div className="bg-[#2A3A4F] p-4 rounded-lg">
              <div className="flex items-center gap-3 text-gray-400 mb-2">
                <RiCheckboxCircleLine className="text-green-500" size={20} />
                <span>Taux de complétion</span>
              </div>
              <div className="text-2xl font-bold text-white">90%</div>
            </div>
            <div className="bg-[#2A3A4F] p-4 rounded-lg">
              <div className="flex items-center gap-3 text-gray-400 mb-2">
                <RiQuestionLine className="text-orange-500" size={20} />
                <span>Demandes d'aide</span>
              </div>
              <div className="text-2xl font-bold text-white">2</div>
            </div>
            <div className="bg-[#2A3A4F] p-4 rounded-lg">
              <div className="flex items-center gap-3 text-gray-400 mb-2">
                <RiAlertFill className="text-red-500" size={20} />
                <span>Défauts détectés</span>
              </div>
              <div className="text-2xl font-bold text-white">1</div>
            </div>
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="bg-[#1E2A3B] rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6 text-white">Alertes récentes</h2>
          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <div key={index} className="bg-[#2A3A4F] p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span className="text-white font-medium">{alert.title}</span>
                </div>
                <div className="text-gray-400 text-sm">{alert.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DailyReport {...dailyReport} />
        <ProductionStats {...productionStats} />
        <AdminPanel users={users} onEdit={handleEditUser} />
      </div>

      {/* Production History Chart */}
      <div className="w-full">
        <ProductionHistory data={productionHistory} />
      </div>
    </div>
  );
};

export default Dashboard; 
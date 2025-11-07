import { Users, Calendar, DollarSign, FileText, Phone, Sparkles } from 'lucide-react';
import { BRAND } from '../../constants/brand';

export default function AdminDashboard() {
  const stats = [
    {
      label: 'Total Clients',
      value: '142',
      change: '+23 this week',
      icon: Users,
      color: 'text-blue-400'
    },
    {
      label: 'Pending Quotes',
      value: '8',
      change: 'Awaiting response',
      icon: FileText,
      color: 'text-amber-400'
    },
    {
      label: 'Scheduled Today',
      value: '5',
      change: '3 completed',
      icon: Calendar,
      color: 'text-green-400'
    },
    {
      label: 'This Month Revenue',
      value: '$12,840',
      change: '+28%',
      icon: DollarSign,
      color: 'text-emerald-400'
    }
  ];

  const recentClients = [
    { name: 'ABC Office Complex', email: 'manager@abcoffice.com', service: 'Commercial Cleaning', status: 'quoted', date: '2 hours ago', value: '$2,400/mo' },
    { name: 'Sarah Johnson', email: 'sarah@example.com', service: 'Residential Cleaning', status: 'scheduled', date: 'Tomorrow 9 AM', value: '$180' },
    { name: 'Mike Davis', email: 'mike@example.com', service: 'Pressure Washing', status: 'new', date: '1 day ago', value: '$450' }
  ];

  const urgentActions = [
    { text: 'Send quote to ABC Office Complex - $2,400/mo contract', priority: 'high' },
    { text: 'Confirm tomorrow\'s appointments (5 scheduled)', priority: 'high' },
    { text: 'Follow up with Mike Davis on pressure washing quote', priority: 'medium' }
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          <Sparkles className="inline mr-3 text-blue-500" size={32} />
          {BRAND.name} Dashboard
        </h1>
        <p className="text-zinc-400">Client management and scheduling for {BRAND.location.city}, {BRAND.location.stateAbbr}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-zinc-900 border border-zinc-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-zinc-500">{stat.label}</span>
              <stat.icon size={20} className={stat.color} />
            </div>
            <div className="text-3xl font-light mb-2">{stat.value}</div>
            <div className="text-sm">{stat.change}</div>
          </div>
        ))}
      </div>

      {/* Recent Clients */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-zinc-400 text-sm border-b border-zinc-800">
              <th className="pb-3 font-medium">Client</th>
              <th className="pb-3 font-medium">Email</th>
              <th className="pb-3 font-medium">Service</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Value</th>
              <th className="pb-3 font-medium">Date/Time</th>
            </tr>
          </thead>
          <tbody>
            {recentClients.map((client, idx) => (
              <tr key={idx} className="border-b border-zinc-800 hover:bg-zinc-800/50">
                <td className="py-4 text-white">{client.name}</td>
                <td className="py-4 text-zinc-400">{client.email}</td>
                <td className="py-4 text-zinc-300">{client.service}</td>
                <td className="py-4">
                  <span className={`px-2 py-1 text-xs rounded ${
                    client.status === 'scheduled' ? 'bg-green-500/20 text-green-400' :
                    client.status === 'quoted' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {client.status.toUpperCase()}
                  </span>
                </td>
                <td className="py-4 text-emerald-400 font-semibold">{client.value}</td>
                <td className="py-4 text-zinc-500">{client.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 pt-4 border-t border-zinc-800 flex gap-4">
        <button className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium">
          View All Clients →
        </button>
        <button className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium">
          Create Quote →
        </button>
        <button className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium">
          Schedule Appointment →
        </button>
      </div>

      {/* Quick Actions */}
      <div className="bg-zinc-900 border border-zinc-800 p-6 mt-8">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Phone size={20} className="text-blue-400" />
          Quick Actions
        </h2>
        <div className="space-y-3">
          {urgentActions.map((action, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-zinc-800/50 hover:bg-zinc-800 cursor-pointer transition-colors">
              <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                action.priority === 'high' ? 'bg-red-400' :
                action.priority === 'medium' ? 'bg-yellow-400' :
                'bg-blue-400'
              }`} />
              <div className="flex-1">
                <p className="text-white">{action.text}</p>
                <span className={`inline-block mt-1 px-2 py-0.5 text-xs rounded ${
                  action.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                  action.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                  {action.priority.toUpperCase()} PRIORITY
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

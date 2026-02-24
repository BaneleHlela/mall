import { FaInstagram, FaGoogle, FaGlobe, FaLink } from "react-icons/fa";

interface TrafficSource {
  label: string;
  value: number;
  color: string;
  gradient: string;
  icon: React.ComponentType<{ className?: string }>;
}

const trafficSources: TrafficSource[] = [
  { label: "Social Media", value: 45, color: "bg-pink-500", gradient: "from-pink-500 to-rose-500", icon: FaInstagram },
  { label: "Search Engines", value: 30, color: "bg-blue-500", gradient: "from-blue-500 to-cyan-500", icon: FaGoogle },
  { label: "Direct Visits", value: 15, color: "bg-purple-500", gradient: "from-purple-500 to-violet-500", icon: FaGlobe },
  { label: "Referrals", value: 10, color: "bg-amber-500", gradient: "from-amber-500 to-orange-500", icon: FaLink },
];

export default function TrafficSourcesCard() {
  return (
    <div className="w-full h-full bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-100">
        <h2 className="text-lg font-semibold text-slate-800">Traffic Sources</h2>
        <p className="text-sm text-slate-500 mt-1">
          Where your visitors come from
        </p>
      </div>

      {/* Content */}
      <div className="p-6 space-y-5">
        {trafficSources.map((source) => {
          const Icon = source.icon;
          return (
            <div key={source.label} className="group">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${source.gradient} flex items-center justify-center`}>
                    <Icon className="text-white text-sm" />
                  </div>
                  <span className="text-sm font-medium text-slate-700">{source.label}</span>
                </div>
                <span className="text-sm font-semibold text-slate-800">{source.value}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className={`bg-gradient-to-r ${source.gradient} h-2 rounded-full transition-all duration-500 group-hover:opacity-80`}
                  style={{ width: `${source.value}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-6 py-3 bg-slate-50 border-t border-slate-100">
        <button className="text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors">
          View detailed analytics →
        </button>
      </div>
    </div>
  );
}
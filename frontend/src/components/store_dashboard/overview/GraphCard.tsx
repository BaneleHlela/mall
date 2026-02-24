import { GrNext, GrPrevious } from "react-icons/gr";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  CartesianGrid,
  AreaChart
} from "recharts"

interface GraphCardProps {
  title: string
  data: { name: string; value: number }[]
  color?: string
  amount?: string | number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-4 py-3 rounded-xl shadow-lg border border-slate-100">
        <p className="text-sm font-medium text-slate-600">{label}</p>
        <p className="text-lg font-bold text-slate-800">{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

const GraphCard: React.FC<GraphCardProps> = ({
  title,
  data,
  color = "#8b5cf6",
  amount = "1.2k",
}) => {
  const gradientId = `gradient-${color.replace("#", "")}`;

  return (
    <div className="w-full h-full bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-sm font-medium text-slate-500 mb-1">{title}</h2>
            <p className="text-3xl font-bold text-slate-800">{amount}</p>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-green-500 text-sm font-medium">↑ 12%</span>
              <span className="text-slate-400 text-xs">vs last week</span>
            </div>
          </div>
          
          {/* Navigation buttons */}
          <div className="flex gap-2">
            <button className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
              <GrPrevious className="text-slate-600" size={14}/>
            </button>
            <button className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
              <GrNext className="text-slate-600" size={14}/>
            </button>
          </div>
        </div>
        
        {/* Chart */}
        <div className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis 
                dataKey="name" 
                stroke="#94a3b8" 
                fontSize={12} 
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#94a3b8" 
                fontSize={12} 
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="none"
                fill={`url(#${gradientId})`}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6, fill: color, stroke: 'white', strokeWidth: 3 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default GraphCard

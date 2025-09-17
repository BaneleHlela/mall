import { MdNavigateNext } from "react-icons/md";
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
  color?: string // line color
  amount?: string | number;
}

const GraphCard: React.FC<GraphCardProps> = ({
  title,
  data,
  color = "#4f46e5",
  amount = "1.2k",
}) => {
  const gradientId = `gradient-${color.replace("#", "")}`

  return (
    <div className="w-full h-full bg-white rounded-[1.2vh] shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.1)] py-[3vh] pr-[4vh]">
      <div className="w-full flex flex-row justify-between">
        {/*  */}
        <div className="mb-3 pl-[4vh]">
          <h2 className="text-[1.7vh] font-semibold text-gray-600">{title}</h2>
          <h1 className="text-[3vh] font-bold">{amount}</h1>
        </div>
        {/* Toggle buttons */}
        <div className="h-fit flex flex-row space-x-[.5vh]">
          <div className="px-[.5vh] py-[.6vh] border-[.1vh] border-gray-300 rounded-[.6vh] hover:scale-105">
            <GrPrevious className="text-[2vh]" color={color}/>
          </div>
          <div className="p-[.5vh] border-[.1vh] border-gray-300 rounded-[.6vh] hover:scale-105">
            <GrNext className="text-[2vh]" color={color}/>
          </div>
          
        </div>
      </div>
      <div className="h-[85%] flex justify-start">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            {/* Define gradient */}
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.4} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis dataKey="name" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
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
              strokeWidth={2}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default GraphCard

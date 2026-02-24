import { FaLightbulb, FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

interface Insight {
  id: number
  text: string
  type?: 'positive' | 'negative' | 'neutral'
}

interface AIQuickInsightsProps {
  insights: Insight[]
}

const AIQuickInsights: React.FC<AIQuickInsightsProps> = ({ insights }) => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-purple-50 via-white to-pink-50 rounded-2xl shadow-sm border border-purple-100 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-purple-100/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <FaLightbulb className="text-white text-lg" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-800">AI Quick Insights</h2>
            <p className="text-xs text-slate-500">Powered by AI</p>
          </div>
        </div>
      </div>

      {/* Insights List */}
      <div className="p-6">
        <ul className="space-y-4">
          {insights.map((insight, index) => {
            const type = insight.type || (index === 0 ? 'positive' : index === 1 ? 'positive' : 'neutral');
            return (
              <li 
                key={insight.id} 
                className="flex items-start gap-3 group"
              >
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  type === 'positive' 
                    ? 'bg-green-100 text-green-600' 
                    : type === 'negative'
                    ? 'bg-red-100 text-red-600'
                    : 'bg-purple-100 text-purple-600'
                }`}>
                  {type === 'positive' ? (
                    <FaArrowTrendUp className="text-xs" />
                  ) : type === 'negative' ? (
                    <FaArrowTrendDown className="text-xs" />
                  ) : (
                    <span className="text-xs font-bold">{index + 1}</span>
                  )}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed group-hover:text-slate-800 transition-colors">
                  {insight.text}
                </p>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Footer */}
      <div className="px-6 py-3 bg-purple-50/50 border-t border-purple-100/50">
        <button className="text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors">
          Get more insights →
        </button>
      </div>
    </div>
  )
}

export default AIQuickInsights
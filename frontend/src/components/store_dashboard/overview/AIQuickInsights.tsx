interface Insight {
    id: number
    text: string
  }
  
  interface AIQuickInsightsProps {
    insights: Insight[]
  }
  
  const AIQuickInsights: React.FC<AIQuickInsightsProps> = ({ insights }) => {
    return (
      <div className="blur w-full h-full bg-white rounded-[1.2vh] shadow-[0px_14px_13px_-19px_rgba(0,_0,_0,_0.1)] p-6">
        <h2 className="text-lg font-semibold mb-2">AI Quick Insights</h2>
        <ul className="space-y-2">
          {insights.map((insight) => (
            <li key={insight.id} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="w-2 h-2 mt-1 rounded-full bg-blue-500"></span>
              {insight.text}
            </li>
          ))}
        </ul>
      </div>
    )
  }
  
  export default AIQuickInsights
  
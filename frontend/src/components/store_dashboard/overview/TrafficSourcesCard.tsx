interface TrafficSource {
    label: string;
    value: number; // percentage
    color: string;
  }
  
  const trafficSources: TrafficSource[] = [
    { label: "Social Media", value: 45, color: "bg-blue-500" },
    { label: "Search Engines", value: 30, color: "bg-green-500" },
    { label: "Direct Visits", value: 15, color: "bg-purple-500" },
    { label: "Referrals", value: 10, color: "bg-pink-500" },
  ];
  
  export default function TrafficSourcesCard() {
    const blur = true;

    return (
      <div className="w-full h-full border-2 border-white rounded-[1.5vh]">
        <div className={`w-full h-full bg-white shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.1)] p-6
          ${blur && "bg-white/20 ring-1 ring-black/5 shadow blur"}`}>
          <h2 className="text-lg font-semibold">Traffic Sources</h2>
          <p className="text-sm text-gray-500 mb-4">
            Breakdown of where your visitors come from
          </p>
    
          <div className="space-y-4">
            {trafficSources.map((source) => (
              <div key={source.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{source.label}</span>
                  <span>{source.value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className={`${source.color} h-2 rounded-full`}
                    style={{ width: `${source.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
import React from 'react'

const ParentComponent = () => {
    const [timeframe, setTimeframe] = useState<"today" | "week" | "month">("today");
    
    return (
        <div>ParentComponent</div>
    )
    }

export default ParentComponent
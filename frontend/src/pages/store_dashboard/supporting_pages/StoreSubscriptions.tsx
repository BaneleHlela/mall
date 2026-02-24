import React from 'react'
import ComingSoon from '../../../components/the_mall/ComingSoon';
import { LuCrown } from 'react-icons/lu';

const StoreSubscriptions = () => {
    const ready = false;

    if (!ready) {
        return (
            <div className="h-full w-full p-[.3vh] rounded-[2vh] overflow-hidden">
                <div className="w-full h-full lg:px-[2vh] rounded overflow-hidden">
                    <ComingSoon
                        title="Available on Launch"
                        targetDate={new Date("2026-03-15")} 
                        icon={<LuCrown className="text-white text-[3vh]"/>}
                        message="Subscription management will be ready before launch! The Mall team is working to bring smooth subscription tracking and fulfillment to your dashboard." 
                    />
                </div>
            </div>
        )
    }
    
    return (
        <div>StoreSubscriptions</div>
    )
}

export default StoreSubscriptions
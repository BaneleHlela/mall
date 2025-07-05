
const StoreServiceCard = () => {
    
    const type = "first"

    if (type === "first") {
    
    return (
        <></>
    )}
}

export default StoreServiceCard;

export const formatDuration = (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes} min`; // Less than an hour
    }
    const hours = Math.floor(minutes / 60); // Calculate hours
    const remainingMinutes = minutes % 60; // Calculate remaining minutes
    return remainingMinutes > 0 ? `${hours} hr ${remainingMinutes} min` : `${hours} hr`; // Format output
};
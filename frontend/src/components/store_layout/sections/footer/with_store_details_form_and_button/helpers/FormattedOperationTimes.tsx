import type { OperationTimes } from "../../../../../../types/storeTypes";
import { getTextStyles } from "../../../../../../utils/stylingFunctions";

export function formatOperationTimes(operationTimes: OperationTimes, style: any): JSX.Element[] {
  if (operationTimes.alwaysOpen === true) {
    return [
      <div 
        style={{
          ...getTextStyles(style)
        }}
        key="always-open"
      >
        <p>Open 24 hours a day</p>
        <p className="">7 days a week</p>
      </div>
    ];
  }

  const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const openTimes: JSX.Element[] = [];
  const closedTimes: JSX.Element[] = [];
  let currentRange: string | null = null;
  let currentDays: string[] = [];

  const addTimeRange = () => {
    if (currentDays.length > 0) {
      openTimes.push(
        <div 
          style={{
            ...getTextStyles(style),
            
          }}
          key={currentDays.join('-')}
          className="my-1"
        >
          <p className="font-semibold m-0 p-0">{formatDayRange(currentDays)}:</p>
          <p className="m-0 p-0">{currentRange}</p>
        </div>
      );
    }
  };

  for (const day of daysOfWeek) {
    const { start, end, closed } = operationTimes[day as keyof OperationTimes];

    if (closed) {
      addTimeRange();
      closedTimes.push(
        <div 
          style={{
            ...getTextStyles(style)
          }}
          key={`closed-${day}`}
        >
          <p className="font-semibold">{capitalizeFirstLetter(day)}:</p>
          <p>Closed</p>
        </div>
      );
      currentRange = null;
      currentDays = [];
    } else {
      const timeRange = `${start}-${end}`;
      if (currentRange === timeRange && areConsecutive(currentDays[currentDays.length - 1], day)) {
        currentDays.push(capitalizeFirstLetter(day));
      } else {
        addTimeRange();
        currentRange = timeRange;
        currentDays = [capitalizeFirstLetter(day)];
      }
    }
  }

  addTimeRange(); // Add the last range

  // Combine openTimes and closedTimes, putting closedTimes last
  return [...openTimes, ...closedTimes];
}


function areConsecutive(day1: string, day2: string): boolean {
  const order = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return (order.indexOf(day1.toLowerCase()) + 1) % 7 === order.indexOf(day2.toLowerCase());
} 

// Helper function to format the day range (e.g., 'Mon-Fri' or 'Monday-Thursday')
function formatDayRange(days: string[]): string {
  if (days.length === 1) return days[0];
  return `${days[0]}-${days[days.length - 1]}`;
}

// Helper function to capitalize the first letter of a string
function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


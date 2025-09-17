import type { OperationTimes } from '../../../../../types/storeTypes';

export interface StoreStatusResult {
  status: 'open' | 'closed' | 'opening_soon' | 'closing_soon';
  message: string;
  color: 'green' | 'red' | 'orange';
  isOpen: boolean;
}

/**
 * Get the current day of the week in lowercase
 */
function getCurrentDay(): keyof Omit<OperationTimes, 'alwaysOpen'> {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const;
  const today = new Date().getDay();
  return days[today];
}

/**
 * Convert time string (HH:MM) to minutes since midnight
 */
function timeToMinutes(timeStr: string): number {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
}

/**
 * Convert minutes since midnight to time string (HH:MM)
 */
function minutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}

/**
 * Format time difference into human readable format
 */
function formatTimeDifference(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}min${minutes !== 1 ? 's' : ''}`;
  } else {
    const hours = Math.floor(minutes / 60);
    const remainingMins = minutes % 60;
    if (remainingMins === 0) {
      return `${hours}hr${hours !== 1 ? 's' : ''}`;
    } else {
      return `${hours}hr${hours !== 1 ? 's' : ''} ${remainingMins}min${remainingMins !== 1 ? 's' : ''}`;
    }
  }
}

/**
 * Get the next opening time for a closed store
 */
function getNextOpeningTime(operationTimes: OperationTimes, currentDay: string, currentMinutes: number): { day: string; time: string; minutesUntil: number } | null {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const currentDayIndex = days.indexOf(currentDay);
  
  // Check remaining days of the week starting from today
  for (let i = 0; i < 7; i++) {
    const dayIndex = (currentDayIndex + i) % 7;
    const day = days[dayIndex] as keyof Omit<OperationTimes, 'alwaysOpen'>;
    const daySchedule = operationTimes[day];
    
    if (!daySchedule.closed) {
      const openTime = timeToMinutes(daySchedule.start);
      
      if (i === 0 && openTime > currentMinutes) {
        // Same day, later time
        return {
          day: 'today',
          time: daySchedule.start,
          minutesUntil: openTime - currentMinutes
        };
      } else if (i > 0) {
        // Different day
        const minutesUntil = (i * 24 * 60) + openTime - currentMinutes;
        const dayName = i === 1 ? 'tomorrow' : day;
        return {
          day: dayName,
          time: daySchedule.start,
          minutesUntil
        };
      }
    }
  }
  
  return null;
}

/**
 * Calculate store status based on operation times and current time
 */
export function getStoreStatus(operationTimes?: OperationTimes): StoreStatusResult {
  // Default closed status if no operation times provided
  if (!operationTimes) {
    return {
      status: 'closed',
      message: 'Closed',
      color: 'red',
      isOpen: false
    };
  }

  // Always open stores
  if (operationTimes.alwaysOpen) {
    return {
      status: 'open',
      message: 'Open 24/7',
      color: 'green',
      isOpen: true
    };
  }

  const now = new Date();
  const currentDay = getCurrentDay();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  
  const todaySchedule = operationTimes[currentDay];
  
  // Store is closed today
  if (todaySchedule.closed) {
    const nextOpening = getNextOpeningTime(operationTimes, currentDay, currentMinutes);
    
    if (nextOpening && nextOpening.minutesUntil <= 120) { // Less than 2 hours
      return {
        status: 'opening_soon',
        message: `Opens in ${formatTimeDifference(nextOpening.minutesUntil)}`,
        color: 'orange',
        isOpen: false
      };
    }
    
    return {
      status: 'closed',
      message: 'Closed',
      color: 'red',
      isOpen: false
    };
  }

  const openTime = timeToMinutes(todaySchedule.start);
  const closeTime = timeToMinutes(todaySchedule.end);
  
  // Handle overnight stores (close time is next day)
  const isOvernightStore = closeTime < openTime;
  
  let isCurrentlyOpen: boolean;
  let minutesUntilClose: number;
  let minutesUntilOpen: number;
  
  if (isOvernightStore) {
    // Store is open from start time today until end time tomorrow
    isCurrentlyOpen = currentMinutes >= openTime || currentMinutes < closeTime;
    
    if (currentMinutes >= openTime) {
      // Currently after opening time today, closes tomorrow
      minutesUntilClose = (24 * 60) - currentMinutes + closeTime;
    } else {
      // Currently before closing time (early morning)
      minutesUntilClose = closeTime - currentMinutes;
    }
    
    minutesUntilOpen = currentMinutes < openTime ? openTime - currentMinutes : (24 * 60) - currentMinutes + openTime;
  } else {
    // Normal store hours (same day)
    isCurrentlyOpen = currentMinutes >= openTime && currentMinutes < closeTime;
    minutesUntilClose = closeTime - currentMinutes;
    minutesUntilOpen = openTime - currentMinutes;
  }
  
  if (isCurrentlyOpen) {
    // Store is currently open
    if (minutesUntilClose <= 120) { // Less than 2 hours until closing
      return {
        status: 'closing_soon',
        message: `Closes in ${formatTimeDifference(minutesUntilClose)}`,
        color: 'orange',
        isOpen: true
      };
    }
    
    return {
      status: 'open',
      message: `Closes ${minutesToTime(closeTime)}`,
      color: 'green',
      isOpen: true
    };
  } else {
    // Store is currently closed
    if (!isOvernightStore && minutesUntilOpen <= 120 && minutesUntilOpen > 0) { // Less than 2 hours until opening
      return {
        status: 'opening_soon',
        message: `Opens in ${formatTimeDifference(minutesUntilOpen)}`,
        color: 'orange',
        isOpen: false
      };
    }
    
    // Check if opens later today
    if (!isOvernightStore && currentMinutes < openTime) {
      return {
        status: 'closed',
        message: `Opens ${minutesToTime(openTime)}`,
        color: 'red',
        isOpen: false
      };
    }
    
    // Find next opening time
    const nextOpening = getNextOpeningTime(operationTimes, currentDay, currentMinutes);
    
    if (nextOpening && nextOpening.minutesUntil <= 120) {
      return {
        status: 'opening_soon',
        message: `Opens in ${formatTimeDifference(nextOpening.minutesUntil)}`,
        color: 'orange',
        isOpen: false
      };
    }
    
    return {
      status: 'closed',
      message: 'Closed',
      color: 'red',
      isOpen: false
    };
  }
}

/**
 * Get CSS classes for status styling
 */
export function getStatusClasses(status: StoreStatusResult): string {
  const baseClasses = 'px-[5%] rounded-[2px] text-[80%] font-medium';
  
  switch (status.color) {
    case 'green':
      return `${baseClasses} bg-green-100 text-green-800`;
    case 'red':
      return `${baseClasses} bg-red-100 text-red-800`;
    case 'orange':
      return `${baseClasses} bg-orange-100 text-orange-800`;
    default:
      return `${baseClasses} bg-gray-100 text-gray-800`;
  }
}
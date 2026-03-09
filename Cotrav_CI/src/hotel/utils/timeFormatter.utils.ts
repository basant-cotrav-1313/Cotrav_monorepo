export const convertTo12Hour = (time: string | undefined): string => {
  if (!time) return 'Not specified';
  
  // If already in AM/PM format, return as is
  if (/AM|PM/i.test(time)) {
    return time;
  }
  
  // Parse 24-hour format (e.g., "14:00" or "14:00:00")
  const timeParts = time.split(':');
  let hours = parseInt(timeParts[0], 10);
  const minutes = timeParts[1] || '00';
  
  // Handle invalid hours
  if (isNaN(hours) || hours < 0 || hours > 23) {
    return time; // Return original if can't parse
  }
  
  const period = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // Convert to 12-hour format, 0 becomes 12
  
  return `${hours}:${minutes} ${period}`;
};

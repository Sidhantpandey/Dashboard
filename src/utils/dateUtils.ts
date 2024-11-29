export function calculateStreak(dates: string[]): number {
  if (dates.length === 0) return 0;

  const sortedDates = [...new Set(dates.map(date => date.split('T')[0]))].sort();
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  if (sortedDates[sortedDates.length - 1] < yesterday) return 0;

  let streak = 1;
  let currentDate = new Date(sortedDates[sortedDates.length - 1]);

  for (let i = sortedDates.length - 2; i >= 0; i--) {
    const prevDate = new Date(sortedDates[i]);
    const diffDays = Math.floor((currentDate.getTime() - prevDate.getTime()) / 86400000);
    
    if (diffDays === 1) {
      streak++;
      currentDate = prevDate;
    } else {
      break;
    }
  }

  return streak;
}
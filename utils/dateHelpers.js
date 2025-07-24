export function calculateStreak(completedDates) {
  if (completedDates.length === 0) return 0;

  const sortedDates = [...completedDates].sort((a, b) => new Date(a) - new Date(b));
  let streak = 1;
  let current = new Date(sortedDates[sortedDates.length - 1]);

  for (let i = sortedDates.length - 2; i >= 0; i--) {
    const prev = new Date(sortedDates[i]);
    if (current.getTime() - prev.getTime() === 86400000) { // 24 hours in ms
      streak++;
      current = prev;
    } else {
      break;
    }
  }
  return streak;
}

export function calculatePercentWeek(completedDates) {
  const today = new Date();
  const weekAgo = new Date(today.getTime() - 6 * 86400000); // last 7 days including today
  let count = 0;

  completedDates.forEach((d) => {
    const date = new Date(d);
    if (date >= weekAgo && date <= today) {
      count++;
    }
  });

  return Math.round((count / 7) * 100);
}

export function getLast7Days() {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    days.push(date.toISOString().split('T')[0]);
  }
  return days;
}

export function isCompleted(completedDates, day) {
  return completedDates.includes(day);
}
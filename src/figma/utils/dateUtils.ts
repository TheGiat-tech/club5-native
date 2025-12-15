export function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  });
}

export function formatTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleTimeString('en-US', { 
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

export function getLast7Days(): string[] {
  const days: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    days.push(date.toISOString().split('T')[0]);
  }
  return days;
}

export function getLast30Days(): string[] {
  const days: string[] = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    days.push(date.toISOString().split('T')[0]);
  }
  return days;
}

export function getDayOfWeek(dateStr: string): string {
  const date = new Date(dateStr);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[date.getDay()];
}

export function isWithinWakeUpWindow(checkTime: Date, wakeUpTime: string): boolean {
  const [time, period] = wakeUpTime.split(' ');
  const [hours, minutes] = time.split(':').map(Number);
  
  let targetHour = hours;
  if (period === 'PM' && hours !== 12) targetHour += 12;
  if (period === 'AM' && hours === 12) targetHour = 0;

  const targetTime = new Date(checkTime);
  targetTime.setHours(targetHour, minutes, 0, 0);

  const diffMs = Math.abs(checkTime.getTime() - targetTime.getTime());
  const diffMins = Math.floor(diffMs / (1000 * 60));

  return diffMins <= 20;
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

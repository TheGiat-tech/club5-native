import { CoachType } from '../context/AppContext';

interface CoachAvatarProps {
  coach: CoachType;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function CoachAvatar({ coach, size = 'md' }: CoachAvatarProps) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32',
  };

  if (coach === 'natalie') {
    return (
      <div className={`${sizeClasses[size]} relative`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Background circle */}
          <circle cx="50" cy="50" r="50" fill="url(#natalie-gradient)" />
          
          {/* Face */}
          <circle cx="50" cy="45" r="22" fill="#FFECD2" />
          
          {/* Hair */}
          <ellipse cx="50" cy="30" rx="24" ry="20" fill="#8B5E3C" />
          <ellipse cx="35" cy="35" rx="8" ry="15" fill="#8B5E3C" />
          <ellipse cx="65" cy="35" rx="8" ry="15" fill="#8B5E3C" />
          
          {/* Eyes */}
          <circle cx="43" cy="43" r="2.5" fill="#4A4A4A" />
          <circle cx="57" cy="43" r="2.5" fill="#4A4A4A" />
          
          {/* Eyebrows */}
          <path d="M 38 38 Q 43 36 48 38" stroke="#6B4423" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M 52 38 Q 57 36 62 38" stroke="#6B4423" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          
          {/* Nose */}
          <path d="M 50 45 Q 51 48 50 49" stroke="#E8C4A4" strokeWidth="1" strokeLinecap="round" fill="none" />
          
          {/* Smile */}
          <path d="M 43 52 Q 50 55 57 52" stroke="#D4A574" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          
          {/* Neck/Shoulders */}
          <ellipse cx="50" cy="75" rx="18" ry="12" fill="#C9A0DC" />
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id="natalie-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DDA0DD" />
              <stop offset="100%" stopColor="#BA68C8" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  // Max avatar
  return (
    <div className={`${sizeClasses[size]} relative`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Background circle */}
        <circle cx="50" cy="50" r="50" fill="url(#max-gradient)" />
        
        {/* Face */}
        <circle cx="50" cy="45" r="22" fill="#FFE0BD" />
        
        {/* Hair */}
        <path d="M 28 32 Q 35 22 50 20 Q 65 22 72 32 L 72 40 Q 65 35 50 33 Q 35 35 28 40 Z" fill="#4A4A4A" />
        
        {/* Eyes */}
        <circle cx="42" cy="43" r="2.5" fill="#2C2C2C" />
        <circle cx="58" cy="43" r="2.5" fill="#2C2C2C" />
        
        {/* Eyebrows */}
        <path d="M 36 37 Q 42 35 48 37" stroke="#3A3A3A" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M 52 37 Q 58 35 64 37" stroke="#3A3A3A" strokeWidth="2" strokeLinecap="round" fill="none" />
        
        {/* Nose */}
        <path d="M 50 44 Q 51 48 50 50" stroke="#D4A574" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        
        {/* Smile */}
        <path d="M 42 54 Q 50 57 58 54" stroke="#C48B5F" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        
        {/* Neck/Shoulders */}
        <ellipse cx="50" cy="75" rx="18" ry="12" fill="#5B9BD5" />
        
        {/* Gradient definition */}
        <defs>
          <linearGradient id="max-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#64B5F6" />
            <stop offset="100%" stopColor="#4A90E2" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

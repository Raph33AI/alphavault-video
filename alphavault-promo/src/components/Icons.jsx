export const RobotIcon = ({ size = 60, gradient = 'url(#iconGradient1)' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="iconGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#667eea" />
        <stop offset="100%" stopColor="#764ba2" />
      </linearGradient>
    </defs>
    <path d="M12 2a2 2 0 0 1 2 2v2h3a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h3V4a2 2 0 0 1 2-2z" 
      fill={gradient} opacity="0.9" />
    <circle cx="9" cy="12" r="1.5" fill="white" />
    <circle cx="15" cy="12" r="1.5" fill="white" />
    <path d="M9 16h6" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const BriefcaseIcon = ({ size = 60, gradient = 'url(#iconGradient2)' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="iconGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f093fb" />
        <stop offset="100%" stopColor="#f5576c" />
      </linearGradient>
    </defs>
    <rect x="3" y="7" width="18" height="13" rx="2" fill={gradient} opacity="0.9" />
    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="white" strokeWidth="2" />
    <path d="M3 12h18" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const TargetIcon = ({ size = 60, gradient = 'url(#iconGradient3)' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="iconGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4facfe" />
        <stop offset="100%" stopColor="#00f2fe" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="10" fill={gradient} opacity="0.2" />
    <circle cx="12" cy="12" r="6" fill={gradient} opacity="0.4" />
    <circle cx="12" cy="12" r="2" fill={gradient} />
  </svg>
);

export const ChartIcon = ({ size = 60, gradient = 'url(#iconGradient4)' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="iconGradient4" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#43e97b" />
        <stop offset="100%" stopColor="#38f9d7" />
      </linearGradient>
    </defs>
    <path d="M3 3v18h18" stroke={gradient} strokeWidth="2" strokeLinecap="round" />
    <path d="M7 14l4-4 3 3 5-6" stroke={gradient} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="7" cy="14" r="2" fill={gradient} />
    <circle cx="11" cy="10" r="2" fill={gradient} />
    <circle cx="14" cy="13" r="2" fill={gradient} />
    <circle cx="19" cy="7" r="2" fill={gradient} />
  </svg>
);

export const RocketIcon = ({ size = 80 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="rocketGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#667eea" />
        <stop offset="100%" stopColor="#764ba2" />
      </linearGradient>
    </defs>
    <path d="M12 2a10 10 0 0 1 10 10c0 3-1 5-3 7l-2 2-5 5-5-5-2-2c-2-2-3-4-3-7A10 10 0 0 1 12 2z" 
      fill="url(#rocketGradient)" opacity="0.9" />
    <circle cx="12" cy="10" r="2" fill="white" />
  </svg>
);

export const StarIcon = ({ size = 80 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f093fb" />
        <stop offset="100%" stopColor="#f5576c" />
      </linearGradient>
    </defs>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" 
      fill="url(#starGradient)" />
  </svg>
);

export const CrownIcon = ({ size = 80 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="crownGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#f59e0b" />
      </linearGradient>
    </defs>
    <path d="M3 18h18v2H3v-2zm0-6l4-4 4 4 4-4 4 4v6H3v-6z" fill="url(#crownGradient)" />
    <circle cx="7" cy="8" r="1.5" fill="url(#crownGradient)" />
    <circle cx="12" cy="4" r="1.5" fill="url(#crownGradient)" />
    <circle cx="17" cy="8" r="1.5" fill="url(#crownGradient)" />
  </svg>
);
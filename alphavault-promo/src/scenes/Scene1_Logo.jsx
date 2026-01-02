import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const Scene1_Logo = ({ duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(
    frame,
    [0, 30, duration - 30, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const logoScale = spring({
    frame,
    fps,
    config: { damping: 100, stiffness: 200 },
  });

  const glowIntensity = Math.sin(frame / 20) * 0.3 + 0.7;

  return (
    <AbsoluteFill style={{ opacity }}>
      <div style={styles.container}>
        {/* Logo SVG Animé */}
        <div style={{
          ...styles.logoContainer,
          transform: `scale(${logoScale}) rotateY(${interpolate(frame, [0, 60], [360, 0])}deg)`,
        }}>
          <div style={{
            ...styles.logoGlow,
            opacity: glowIntensity,
          }} />
          
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
            <defs>
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#667eea', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#764ba2', stopOpacity: 1 }} />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Ligne graphique montante */}
            <path 
              d="M 20 80 L 30 70 L 40 75 L 50 60 L 60 65 L 70 45 L 80 50 L 90 30" 
              stroke="url(#logoGradient)" 
              strokeWidth="4" 
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              filter="url(#glow)"
              strokeDasharray={interpolate(frame, [0, 60], [200, 0])}
            />
            
            {/* Points animés */}
            <circle cx="30" cy="70" r="4" fill="url(#logoGradient)" 
              opacity={interpolate(frame, [20, 30], [0, 1], { extrapolateRight: 'clamp' })} />
            <circle cx="50" cy="60" r="4" fill="url(#logoGradient)"
              opacity={interpolate(frame, [30, 40], [0, 1], { extrapolateRight: 'clamp' })} />
            <circle cx="70" cy="45" r="4" fill="url(#logoGradient)"
              opacity={interpolate(frame, [40, 50], [0, 1], { extrapolateRight: 'clamp' })} />
            <circle cx="90" cy="30" r="5" fill="url(#logoGradient)"
              opacity={interpolate(frame, [50, 60], [0, 1], { extrapolateRight: 'clamp' })} />
            
            {/* Flèche */}
            <path 
              d="M 85 35 L 90 30 L 85 25" 
              stroke="url(#logoGradient)" 
              strokeWidth="3" 
              fill="none" 
              strokeLinecap="round"
              filter="url(#glow)"
              opacity={interpolate(frame, [55, 65], [0, 1], { extrapolateRight: 'clamp' })}
            />
          </svg>
        </div>

        {/* Titre principal */}
        <h1 style={{
          ...styles.mainTitle,
          transform: `translateY(${interpolate(frame, [30, 60], [100, 0], { extrapolateRight: 'clamp' })}px)`,
          opacity: interpolate(frame, [30, 60], [0, 1], { extrapolateRight: 'clamp' }),
        }}>
          AlphaVault AI
        </h1>

        {/* Sous-titre */}
        <p style={{
          ...styles.subtitle,
          transform: `translateY(${interpolate(frame, [45, 75], [50, 0], { extrapolateRight: 'clamp' })}px)`,
          opacity: interpolate(frame, [45, 75], [0, 1], { extrapolateRight: 'clamp' }),
        }}>
          AI-Powered Financial Intelligence Platform
        </p>

        {/* Tagline avec glassmorphism */}
        <div style={{
          ...styles.tagline,
          transform: `scale(${interpolate(frame, [60, 90], [0.8, 1], { extrapolateRight: 'clamp' })})`,
          opacity: interpolate(frame, [60, 90], [0, 1], { extrapolateRight: 'clamp' }),
        }}>
          Empowering Individual Investors with Institutional-Grade Analytics
        </div>
      </div>
    </AbsoluteFill>
  );
};

const styles = {
  container: {
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  logoContainer: {
    width: 400,
    height: 400,
    position: 'relative',
    marginBottom: 40,
    transformStyle: 'preserve-3d',
  },
  logoGlow: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '120%',
    height: '120%',
    background: 'radial-gradient(circle, rgba(102, 126, 234, 0.6) 0%, transparent 70%)',
    filter: 'blur(80px)',
    animation: 'pulse 3s ease-in-out infinite',
  },
  mainTitle: {
    fontSize: 140,
    fontWeight: 900,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textAlign: 'center',
    margin: 0,
    marginBottom: 24,
    textShadow: '0 0 40px rgba(102, 126, 234, 0.5)',
    letterSpacing: '-2px',
  },
  subtitle: {
    fontSize: 42,
    color: 'rgba(255, 255, 255, 0.95)',
    fontWeight: 600,
    textAlign: 'center',
    margin: 0,
    marginBottom: 40,
    textShadow: '0 2px 20px rgba(0, 0, 0, 0.5)',
  },
  tagline: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px) saturate(180%)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: 24,
    padding: '24px 48px',
    fontSize: 32,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: 600,
    textAlign: 'center',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
    maxWidth: 1400,
  },
};
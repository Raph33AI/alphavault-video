import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const Scene4_Stats = ({ duration }) => {
  const frame = useCurrentFrame();
  const containerRef = useRef(null);

  const opacity = interpolate(
    frame,
    [0, 15, duration - 15, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline();
    
    tl.from('.stats-title', {
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: 'power4.out',
    })
    .from('.stat-card', {
      scale: 0.8,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'elastic.out(1, 0.5)',
    }, '-=0.3')
    .from('.tagline-stats', {
      y: 30,
      opacity: 0,
      duration: 0.7,
      ease: 'power2.out',
    }, '-=0.4');
  }, []);

  const stats = [
    { 
      value: 12.5, 
      suffix: 'B', 
      prefix: '$',
      label: 'Global Market (TAM)',
      color: '#667eea',
    },
    { 
      value: 100, 
      suffix: 'K', 
      prefix: '',
      label: 'Target Users (Year 5)',
      color: '#f093fb',
    },
    { 
      value: 12, 
      suffix: 'M', 
      prefix: '$',
      label: 'Projected ARR (Year 5)',
      color: '#4facfe',
    },
    { 
      value: 82, 
      suffix: '%', 
      prefix: '',
      label: 'Gross Margin',
      color: '#43e97b',
    },
  ];

  return (
    <AbsoluteFill style={{ opacity }}>
      <div ref={containerRef} style={styles.container}>
        <h2 className="stats-title" style={styles.title}>
          Massive Market Opportunity
        </h2>

        <div style={styles.statsGrid}>
          {stats.map((stat, index) => {
            const statDelay = 30 + index * 15;
            
            const animatedValue = interpolate(
              frame,
              [statDelay, statDelay + 50],
              [0, stat.value],
              { extrapolateRight: 'clamp' }
            );

            const displayValue = frame >= statDelay 
              ? (stat.value >= 10 ? animatedValue.toFixed(1) : Math.floor(animatedValue))
              : 0;

            const glowIntensity = 0.6 + Math.sin((frame - statDelay + index * 20) / 20) * 0.4;

            return (
              <div
                key={index}
                className="stat-card"
                style={{
                  ...styles.statCard,
                  boxShadow: `0 20px 60px ${stat.color}40, 0 0 ${60 * glowIntensity}px ${stat.color}30`,
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `radial-gradient(circle at top left, ${stat.color}20, transparent)`,
                  borderRadius: 32,
                  opacity: glowIntensity,
                }} />

                <div style={{
                  ...styles.statNumber,
                  color: stat.color,
                }}>
                  {stat.prefix}{displayValue}{stat.suffix}
                </div>
                <div style={styles.statLabel}>{stat.label}</div>

                <div style={styles.statBorder} />
              </div>
            );
          })}
        </div>

        <div className="tagline-stats" style={styles.tagline}>
          <strong>$160M</strong> Serviceable Obtainable Market (5-year target)
        </div>
      </div>
    </AbsoluteFill>
  );
};

const styles = {
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 72,
    fontWeight: 900,
    background: 'linear-gradient(135deg, #60a5fa 0%, #818cf8 25%, #a78bfa 50%, #c084fc 75%, #e879f9 100%)',
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textAlign: 'center',
    margin: 0,
    marginBottom: 80,
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 50,
    maxWidth: 1600,
    marginBottom: 60,
  },
  statCard: {
    position: 'relative',
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(40px) saturate(180%)',
    borderRadius: 32,
    padding: '60px 80px',
    textAlign: 'center',
  },
  statBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 32,
    border: '2px solid rgba(255, 255, 255, 0.1)',
    pointerEvents: 'none',
  },
  statNumber: {
    fontSize: 100,
    fontWeight: 900,
    margin: 0,
    marginBottom: 20,
    textShadow: '0 0 40px currentColor',
    position: 'relative',
    zIndex: 1,
  },
  statLabel: {
    fontSize: 32,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: 600,
    margin: 0,
    position: 'relative',
    zIndex: 1,
  },
  tagline: {
    fontSize: 36,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    fontWeight: 600,
  },
};
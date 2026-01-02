import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const Scene4_Stats = ({ duration }) => {
  const frame = useCurrentFrame();
  const containerRef = useRef(null);
  const particlesRef = useRef([]);

  const opacity = interpolate(
    frame,
    [0, 10, duration - 10, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline();
    
    // 1. Title reveal
    tl.from('.stats-title-reveal', {
      z: -300,
      rotationX: 90,
      opacity: 0,
      duration: 1,
      ease: 'power4.out',
    });

    // 2. Stats cards with stagger
    tl.from('.stat-card-reveal', {
      scale: 0,
      rotationY: 180,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: 'back.out(2)',
    }, '-=0.4');

    // 3. Create particle burst for each stat
    const statCards = containerRef.current.querySelectorAll('.stat-card-reveal');
    statCards.forEach((card, i) => {
      setTimeout(() => {
        createParticleBurst(card, 15, ['#667eea', '#f093fb', '#4facfe', '#43e97b'][i]);
      }, 800 + i * 150);
    });

    // 4. Tagline
    tl.from('.stats-tagline-reveal', {
      y: 60,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
    }, '-=0.5');

  }, []);

  const createParticleBurst = (container, count, color) => {
    const rect = container.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: 6px;
        height: 6px;
        background: ${color};
        border-radius: 50%;
        pointer-events: none;
        top: ${centerY}px;
        left: ${centerX}px;
      `;
      container.appendChild(particle);

      const angle = (i / count) * Math.PI * 2;
      const distance = 80 + Math.random() * 60;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      gsap.to(particle, {
        x,
        y,
        opacity: 0,
        scale: 0,
        duration: 1.2,
        ease: 'power2.out',
        onComplete: () => particle.remove(),
      });
    }
  };

  const stats = [
    { value: 1000, suffix: '+', label: 'Active Investors', color: '#667eea' },
    { value: 100, suffix: 'K+', label: 'Analyses Performed', color: '#f093fb' },
    { value: 30, suffix: '+', label: 'Advanced Tools', color: '#4facfe' },
    { value: 99.9, suffix: '%', label: 'Platform Uptime', color: '#43e97b' },
  ];

  return (
    <AbsoluteFill style={{ opacity, perspective: 2000 }}>
      <div ref={containerRef} style={styles.container}>
        <h2 className="stats-title-reveal" style={styles.title}>
          Trusted by Thousands of Investors
        </h2>

        <div style={styles.grid}>
          {stats.map((stat, index) => {
            const statDelay = 25 + index * 12;
            
            const animatedValue = interpolate(
              frame,
              [statDelay, statDelay + 50],
              [0, stat.value],
              { extrapolateRight: 'clamp' }
            );

            const displayValue = frame >= statDelay 
              ? (stat.value >= 50 ? animatedValue.toFixed(1) : Math.floor(animatedValue))
              : 0;

            const glowIntensity = 0.6 + Math.sin((frame - statDelay + index * 20) / 18) * 0.4;

            return (
              <div
                key={index}
                className="stat-card-reveal"
                style={{
                  ...styles.card,
                  boxShadow: `0 25px 70px ${stat.color}40, 0 0 ${70 * glowIntensity}px ${stat.color}30`,
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

                {/* Animated rings */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: `${100 + Math.sin((frame + index * 30) / 20) * 20}%`,
                  height: `${100 + Math.sin((frame + index * 30) / 20) * 20}%`,
                  border: `2px solid ${stat.color}40`,
                  borderRadius: '50%',
                  opacity: 0.3,
                }} />

                <div style={{
                  ...styles.number,
                  color: stat.color,
                  textShadow: `0 0 50px ${stat.color}`,
                }}>
                  {displayValue}{stat.suffix}
                </div>
                <div style={styles.label}>{stat.label}</div>

                <div style={styles.cardBorder} />
              </div>
            );
          })}
        </div>

        <div className="stats-tagline-reveal" style={styles.tagline}>
          Join the community transforming investment decisions with <strong>AI-powered analytics</strong>
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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 50,
    maxWidth: 1400,
    marginBottom: 60,
  },
  card: {
    position: 'relative',
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(40px) saturate(180%)',
    borderRadius: 32,
    padding: '60px 80px',
    textAlign: 'center',
    transformStyle: 'preserve-3d',
    overflow: 'visible',
  },
  cardBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 32,
    border: '2px solid rgba(255, 255, 255, 0.1)',
    pointerEvents: 'none',
  },
  number: {
    fontSize: 110,
    fontWeight: 900,
    margin: 0,
    marginBottom: 20,
    position: 'relative',
    zIndex: 1,
  },
  label: {
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
    fontWeight: 500,
    maxWidth: 1200,
  },
};
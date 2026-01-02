import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const Scene1_Logo = ({ duration }) => {
  const frame = useCurrentFrame(); // Frame LOCAL (commence à 0 pour cette scène)
  const { fps } = useVideoConfig();
  const containerRef = useRef(null);

  // Fade in/out
  const opacity = interpolate(
    frame,
    [0, 30, duration - 30, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Animation GSAP
  useEffect(() => {
    if (!containerRef.current) return;

    const timeline = gsap.timeline();
    
    timeline
      .from('.logo-glow', {
        scale: 0,
        opacity: 0,
        duration: 1.5,
        ease: 'elastic.out(1, 0.5)',
      })
      .from('.main-title', {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
      }, '-=0.8')
      .from('.subtitle', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.5');

  }, []);

  // Rotation du logo
  const rotation = spring({
    frame,
    fps,
    config: { damping: 100 },
  }) * 360;

  return (
    <AbsoluteFill style={{ opacity }}>
      <div ref={containerRef} style={styles.container}>
        <div style={styles.logoContainer}>
          <div className="logo-glow" style={{
            ...styles.logoGlow,
            transform: `rotate(${rotation}deg)`,
          }} />
          <div style={styles.logoText}>AV</div>
        </div>

        <h1 className="main-title" style={styles.mainTitle}>
          AlphaVault AI
        </h1>

        <p className="subtitle" style={styles.subtitle}>
          Premium Financial Intelligence Platform
        </p>
      </div>
    </AbsoluteFill>
  );
};

const styles = {
  container: {
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    width: 300,
    height: 300,
    position: 'relative',
    marginBottom: 40,
  },
  logoGlow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle, rgba(102, 126, 234, 0.8) 0%, transparent 70%)',
    filter: 'blur(60px)',
  },
  logoText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: 120,
    fontWeight: 900,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textAlign: 'center',
  },
  mainTitle: {
    fontSize: 120,
    fontWeight: 900,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textAlign: 'center',
    margin: 0,
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 48,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: 600,
    textAlign: 'center',
    margin: 0,
  },
};
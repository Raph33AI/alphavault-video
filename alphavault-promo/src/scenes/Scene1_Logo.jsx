import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const Scene1_Logo = ({ duration }) => {
  const frame = useCurrentFrame();
  const containerRef = useRef(null);

  const opacity = interpolate(
    frame,
    [0, 20, duration - 20, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline();
    
    tl.from('.logo-svg-path', {
      strokeDashoffset: 500,
      duration: 1.5,
      ease: 'power2.out',
    })
    .from('.logo-circle', {
      scale: 0,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'back.out(2)',
    }, '-=1')
    .from('.main-title', {
      y: 80,
      opacity: 0,
      duration: 1,
      ease: 'power4.out',
    }, '-=0.6')
    .from('.subtitle', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.5')
    .from('.tagline', {
      scale: 0.9,
      opacity: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.5)',
    }, '-=0.4');
  }, []);

  return (
    <AbsoluteFill style={{ opacity }}>
      <div ref={containerRef} style={styles.container}>
        {/* Logo SVG */}
        <div style={styles.logoContainer}>
          <div style={{
            ...styles.logoGlow,
            opacity: 0.6 + Math.sin(frame / 20) * 0.3,
          }} />
          
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: 400, height: 400 }}>
            <defs>
              <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#60a5fa' }} />
                <stop offset="50%" style={{ stopColor: '#818cf8' }} />
                <stop offset="100%" style={{ stopColor: '#a78bfa' }} />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            <path 
              className="logo-svg-path"
              d="M 20 80 L 30 70 L 40 75 L 50 60 L 60 65 L 70 45 L 80 50 L 90 30" 
              stroke="url(#logoGrad)" 
              strokeWidth="5" 
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              filter="url(#glow)"
              style={{
                strokeDasharray: 500,
                strokeDashoffset: 0,
              }}
            />
            
            <circle className="logo-circle" cx="30" cy="70" r="5" fill="url(#logoGrad)" filter="url(#glow)" />
            <circle className="logo-circle" cx="50" cy="60" r="5" fill="url(#logoGrad)" filter="url(#glow)" />
            <circle className="logo-circle" cx="70" cy="45" r="5" fill="url(#logoGrad)" filter="url(#glow)" />
            <circle className="logo-circle" cx="90" cy="30" r="6" fill="url(#logoGrad)" filter="url(#glow)" />
            
            <path 
              className="logo-circle"
              d="M 85 35 L 90 30 L 85 25" 
              stroke="url(#logoGrad)" 
              strokeWidth="4" 
              fill="none" 
              strokeLinecap="round"
              filter="url(#glow)"
            />
          </svg>
        </div>

        {/* Titre */}
        <h1 className="main-title" style={styles.mainTitle}>
          AlphaVault AI
        </h1>

        {/* Sous-titre */}
        <p className="subtitle" style={styles.subtitle}>
          AI-Powered Financial Intelligence Platform
        </p>

        {/* Tagline glassmorphism */}
        <div className="tagline" style={styles.tagline}>
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  logoContainer: {
    position: 'relative',
    marginBottom: 40,
  },
  logoGlow: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 500,
    background: 'radial-gradient(circle, rgba(96, 165, 250, 0.6) 0%, transparent 70%)',
    filter: 'blur(100px)',
    pointerEvents: 'none',
  },
  mainTitle: {
    fontSize: 140,
    fontWeight: 900,
    background: 'linear-gradient(135deg, #60a5fa 0%, #818cf8 25%, #a78bfa 50%, #c084fc 75%, #e879f9 100%)',
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textAlign: 'center',
    margin: 0,
    marginBottom: 24,
    letterSpacing: '-2px',
    textShadow: '0 0 60px rgba(168, 85, 247, 0.5)',
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
    background: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(20px) saturate(180%)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: 24,
    padding: '24px 48px',
    fontSize: 32,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: 600,
    textAlign: 'center',
    boxShadow: '0 8px 32px rgba(59, 130, 246, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    maxWidth: 1400,
  },
};
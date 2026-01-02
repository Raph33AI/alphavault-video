import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { drawSVGPath, animateTextSplit } from '../utils/gsapHelpers';

export const Scene1_Hero = ({ duration }) => {
  const frame = useCurrentFrame();
  const containerRef = useRef(null);
  const logoPathsRef = useRef([]);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  const opacity = interpolate(
    frame,
    [0, 15, duration - 15, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline();

    // 1. Draw SVG paths (logo)
    logoPathsRef.current.forEach((path, i) => {
      if (path) {
        const length = path.getTotalLength?.() || 500;
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        
        tl.to(path, {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: 'power2.out',
        }, i * 0.15);
      }
    });

    // 2. Logo glow reveal
    tl.from('.logo-glow-hero', {
      scale: 0,
      opacity: 0,
      duration: 1.5,
      ease: 'elastic.out(1, 0.3)',
    }, '-=1');

    // 3. Circles pop in
    tl.from('.logo-circle-hero', {
      scale: 0,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'back.out(3)',
    }, '-=0.8');

    // 4. Title - split text animation
    if (titleRef.current) {
      const text = titleRef.current.textContent;
      const lines = text.split('\n').filter(l => l.trim());
      
      titleRef.current.innerHTML = lines
        .map(line => {
          const chars = line.split('');
          return `<div style="overflow:hidden;margin-bottom:10px;">${chars
            .map((char, i) => `<span style="display:inline-block;transform:translateY(150%) rotateX(-90deg);opacity:0;">${char === ' ' ? '&nbsp;' : char}</span>`)
            .join('')}</div>`;
        })
        .join('');

      const allChars = titleRef.current.querySelectorAll('span');
      
      tl.to(allChars, {
        y: 0,
        rotationX: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.02,
        ease: 'power4.out',
      }, '-=0.5');
    }

    // 5. Subtitle reveal
    tl.from('.hero-subtitle-line', {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
    }, '-=0.6');

    // 6. Social proof cards
    tl.from('.proof-card-hero', {
      scale: 0,
      rotationY: 90,
      opacity: 0,
      duration: 1,
      stagger: 0.12,
      ease: 'elastic.out(1, 0.5)',
    }, '-=0.4');

  }, []);

  const logoRotation = Math.sin(frame / 60) * 5;

  return (
    <AbsoluteFill style={{ opacity, perspective: 2000 }}>
      <div ref={containerRef} style={styles.container}>
        {/* Logo SVG avec DrawSVG */}
        <div style={{
          ...styles.logoWrapper,
          transform: `rotateY(${logoRotation}deg)`,
        }}>
          <div className="logo-glow-hero" style={styles.logoGlow} />
          
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: 350, height: 350 }}>
            <defs>
              <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#60a5fa' }} />
                <stop offset="50%" style={{ stopColor: '#818cf8' }} />
                <stop offset="100%" style={{ stopColor: '#a78bfa' }} />
              </linearGradient>
              <filter id="heroGlow">
                <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Main path (animated) */}
            <path 
              ref={el => logoPathsRef.current[0] = el}
              d="M 20 80 L 30 70 L 40 75 L 50 60 L 60 65 L 70 45 L 80 50 L 90 30" 
              stroke="url(#heroGrad)" 
              strokeWidth="6" 
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              filter="url(#heroGlow)"
            />
            
            {/* Circles (pop in) */}
            <circle className="logo-circle-hero" cx="30" cy="70" r="6" fill="url(#heroGrad)" filter="url(#heroGlow)" />
            <circle className="logo-circle-hero" cx="50" cy="60" r="6" fill="url(#heroGrad)" filter="url(#heroGlow)" />
            <circle className="logo-circle-hero" cx="70" cy="45" r="6" fill="url(#heroGrad)" filter="url(#heroGlow)" />
            <circle className="logo-circle-hero" cx="90" cy="30" r="7" fill="url(#heroGrad)" filter="url(#heroGlow)" />
            
            {/* Arrow (animated) */}
            <path 
              ref={el => logoPathsRef.current[1] = el}
              className="logo-circle-hero"
              d="M 85 35 L 90 30 L 85 25" 
              stroke="url(#heroGrad)" 
              strokeWidth="5" 
              fill="none" 
              strokeLinecap="round"
              filter="url(#heroGlow)"
            />
          </svg>
        </div>

        {/* Titre avec SplitText effect */}
        <h1 ref={titleRef} style={styles.mainTitle}>
          Financial Intelligence
          Powered by AI
        </h1>

        {/* Sous-titre */}
        <div style={styles.subtitle}>
          <p className="hero-subtitle-line" style={styles.subtitleLine}>
            Transform your investment decisions with AlphaVault AI
          </p>
          <p className="hero-subtitle-line" style={styles.subtitleLine}>
            IPO analysis • M&A screening • Portfolio optimization
          </p>
        </div>

        {/* Social Proof */}
        <div style={styles.socialProof}>
          {[
            { number: '1000+', label: 'Investors' },
            { number: '100K+', label: 'Analyses' },
            { number: 'All US', label: 'Companies' },
          ].map((item, i) => (
            <div key={i} className="proof-card-hero" style={styles.proofCard}>
              <div style={styles.proofNumber}>{item.number}</div>
              <div style={styles.proofLabel}>{item.label}</div>
            </div>
          ))}
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
    transformStyle: 'preserve-3d',
  },
  logoWrapper: {
    position: 'relative',
    marginBottom: 50,
    transformStyle: 'preserve-3d',
  },
  logoGlow: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    height: 450,
    background: 'radial-gradient(circle, rgba(96, 165, 250, 0.6) 0%, transparent 70%)',
    filter: 'blur(100px)',
    pointerEvents: 'none',
  },
  mainTitle: {
    fontSize: 110,
    fontWeight: 900,
    color: 'white',
    textAlign: 'center',
    margin: 0,
    marginBottom: 30,
    lineHeight: 1.3,
    letterSpacing: '-2px',
    textShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
  },
  subtitle: {
    marginBottom: 50,
  },
  subtitleLine: {
    fontSize: 34,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    margin: '0 0 8px 0',
    fontWeight: 500,
    textShadow: '0 2px 20px rgba(0, 0, 0, 0.3)',
  },
  socialProof: {
    display: 'flex',
    gap: 70,
  },
  proofCard: {
    textAlign: 'center',
    padding: '20px 30px',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    transformStyle: 'preserve-3d',
  },
  proofNumber: {
    fontSize: 46,
    fontWeight: 900,
    background: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: 8,
  },
  proofLabel: {
    fontSize: 19,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: 600,
  },
};
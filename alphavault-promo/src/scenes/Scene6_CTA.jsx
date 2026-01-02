import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const Scene6_CTA = ({ duration }) => {
  const frame = useCurrentFrame();
  const containerRef = useRef(null);
  const buttonRef = useRef(null);

  const opacity = interpolate(
    frame,
    [0, 10, duration - 10, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline();
    
    // 1. Logo with spiral motion
    tl.from('.cta-logo-spiral', {
      scale: 0,
      rotation: 720,
      opacity: 0,
      duration: 1.5,
      ease: 'power3.out',
    });

    // 2. Title with wave reveal
    const titleChars = '.cta-title-char';
    tl.from(titleChars, {
      y: 100,
      rotationX: -90,
      opacity: 0,
      duration: 0.8,
      stagger: {
        each: 0.03,
        from: 'center',
      },
      ease: 'back.out(2)',
    }, '-=1');

    // 3. Subtitle
    tl.from('.cta-subtitle-reveal', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.4');

    // 4. Button with elastic scale
    tl.from('.cta-button-magnetic', {
      scale: 0,
      rotation: 180,
      opacity: 0,
      duration: 1.5,
      ease: 'elastic.out(1, 0.4)',
    }, '-=0.5');

    // 5. Benefits
    tl.from('.cta-benefit-reveal', {
      x: -50,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power2.out',
    }, '-=0.8');

    // 6. URL
    tl.from('.cta-url-reveal', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    }, '-=0.4');

  }, []);

  const buttonPulse = 1 + Math.sin(frame / 12) * 0.08;
  const buttonRotation = Math.sin(frame / 30) * 3;

  const titleText = "Ready to Transform Your Investments?";
  const titleChars = titleText.split('');

  return (
    <AbsoluteFill style={{ opacity, perspective: 2000 }}>
      <div ref={containerRef} style={styles.container}>
        {/* Logo avec spiral */}
        <div className="cta-logo-spiral" style={{
          ...styles.miniLogo,
          transform: `rotate(${frame * 0.5}deg)`,
        }}>
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
            <defs>
              <linearGradient id="ctaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#60a5fa' }} />
                <stop offset="50%" style={{ stopColor: '#818cf8' }} />
                <stop offset="100%" style={{ stopColor: '#a78bfa' }} />
              </linearGradient>
            </defs>
            <path d="M 20 80 L 30 70 L 40 75 L 50 60 L 60 65 L 70 45 L 80 50 L 90 30" 
              stroke="url(#ctaGrad)" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="30" cy="70" r="5" fill="url(#ctaGrad)"/>
            <circle cx="50" cy="60" r="5" fill="url(#ctaGrad)"/>
            <circle cx="70" cy="45" r="5" fill="url(#ctaGrad)"/>
            <circle cx="90" cy="30" r="6" fill="url(#ctaGrad)"/>
            <path d="M 85 35 L 90 30 L 85 25" stroke="url(#ctaGrad)" strokeWidth="4" fill="none" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Titre avec caractères individuels */}
        <h2 style={styles.titleWrapper}>
          {titleChars.map((char, i) => (
            <span
              key={i}
              className="cta-title-char"
              style={{
                ...styles.titleChar,
                display: 'inline-block',
                transform: `translateY(${Math.sin((frame + i * 5) / 20) * 3}px)`,
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h2>

        <p className="cta-subtitle-reveal" style={styles.subtitle}>
          Join thousands of investors using AI-powered analytics
        </p>

        {/* Button avec magnetic effect */}
        <button
          ref={buttonRef}
          className="cta-button-magnetic"
          style={{
            ...styles.button,
            transform: `scale(${buttonPulse}) rotate(${buttonRotation}deg)`,
          }}
        >
          <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 16 }}>
            Start Free Trial
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          
          {/* Animated shine */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: `${-100 + (frame % 100) * 2}%`,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
          }} />
        </button>

        <div style={styles.benefits}>
          {['14-day free trial', 'No credit card required', 'Cancel anytime'].map((text, i) => (
            <div key={i} className="cta-benefit-reveal" style={styles.benefit}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ marginRight: 12 }}>
                <circle cx="12" cy="12" r="10" fill="#43e97b" opacity="0.2"/>
                <path d="M7 12l3 3 7-7" stroke="#43e97b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {text}
            </div>
          ))}
        </div>

        <div className="cta-url-reveal" style={styles.url}>
          alphavault-ai.com
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
  miniLogo: {
    width: 140,
    height: 140,
    marginBottom: 50,
    filter: 'drop-shadow(0 0 30px rgba(96, 165, 250, 0.7))',
  },
  titleWrapper: {
    fontSize: 80,
    fontWeight: 900,
    textAlign: 'center',
    margin: 0,
    marginBottom: 30,
    maxWidth: 1400,
    lineHeight: 1.2,
  },
  titleChar: {
    background: 'linear-gradient(135deg, #60a5fa 0%, #818cf8 25%, #a78bfa 50%, #c084fc 75%, #e879f9 100%)',
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    fontSize: 38,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    margin: 0,
    marginBottom: 60,
    fontWeight: 500,
  },
  button: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    backgroundSize: '200% auto',
    color: 'white',
    fontSize: 50,
    fontWeight: 800,
    padding: '36px 90px',
    borderRadius: 28,
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 25px 70px rgba(102, 126, 234, 0.6), 0 0 100px rgba(118, 75, 162, 0.4)',
    marginBottom: 50,
    position: 'relative',
    overflow: 'hidden',
    transformStyle: 'preserve-3d',
  },
  benefits: {
    display: 'flex',
    gap: 60,
    marginBottom: 50,
  },
  benefit: {
    fontSize: 26,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
  },
  url: {
    fontSize: 44,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: 700,
    letterSpacing: '1px',
  },
};
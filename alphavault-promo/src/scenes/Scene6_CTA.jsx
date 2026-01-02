import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const Scene6_CTA = ({ duration }) => {
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
    
    tl.from('.cta-logo', {
      scale: 0,
      opacity: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.5)',
    })
    .from('.cta-title', {
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: 'power4.out',
    }, '-=0.3')
    .from('.cta-subtitle', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
    }, '-=0.4')
    .from('.cta-button', {
      scale: 0,
      opacity: 0,
      duration: 1,
      ease: 'elastic.out(1, 0.5)',
    }, '-=0.2')
    .from('.benefit-item', {
      x: -30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
    }, '-=0.5')
    .from('.cta-url', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
    }, '-=0.3');
  }, []);

  const pulse = 1 + Math.sin(frame / 15) * 0.1;

  return (
    <AbsoluteFill style={{ opacity }}>
      <div ref={containerRef} style={styles.container}>
        {/* Mini Logo */}
        <div className="cta-logo" style={styles.miniLogo}>
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
            <defs>
              <linearGradient id="ctaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#60a5fa' }} />
                <stop offset="50%" style={{ stopColor: '#818cf8' }} />
                <stop offset="100%" style={{ stopColor: '#a78bfa' }} />
              </linearGradient>
            </defs>
            <path d="M 20 80 L 30 70 L 40 75 L 50 60 L 60 65 L 70 45 L 80 50 L 90 30" 
              stroke="url(#ctaGrad)" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="30" cy="70" r="4" fill="url(#ctaGrad)"/>
            <circle cx="50" cy="60" r="4" fill="url(#ctaGrad)"/>
            <circle cx="70" cy="45" r="4" fill="url(#ctaGrad)"/>
            <circle cx="90" cy="30" r="5" fill="url(#ctaGrad)"/>
            <path d="M 85 35 L 90 30 L 85 25" stroke="url(#ctaGrad)" strokeWidth="3" fill="none" strokeLinecap="round"/>
          </svg>
        </div>

        <h2 className="cta-title" style={styles.title}>
          Ready to Invest Smarter?
        </h2>

        <p className="cta-subtitle" style={styles.subtitle}>
          Join thousands of investors using AI-powered analytics
        </p>

        <button className="cta-button" style={{
          ...styles.ctaButton,
          transform: `scale(${pulse})`,
        }}>
          <span style={{ position: 'relative', zIndex: 1 }}>Start Free Trial →</span>
          <div style={{
            position: 'absolute',
            top: 0,
            left: `${-100 + (frame % 120) * 2}%`,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
          }} />
        </button>

        <div style={styles.benefits}>
          {['14-day free trial', 'No credit card required', 'Cancel anytime'].map((text, i) => (
            <div key={i} className="benefit-item" style={styles.benefit}>
              <span style={styles.benefitIcon}>✓</span>
              {text}
            </div>
          ))}
        </div>

        <div className="cta-url" style={styles.url}>
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
    width: 120,
    height: 120,
    marginBottom: 40,
    filter: 'drop-shadow(0 0 20px rgba(96, 165, 250, 0.6))',
  },
  title: {
    fontSize: 90,
    fontWeight: 900,
    background: 'linear-gradient(135deg, #60a5fa 0%, #818cf8 25%, #a78bfa 50%, #c084fc 75%, #e879f9 100%)',
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textAlign: 'center',
    margin: 0,
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 36,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    margin: 0,
    marginBottom: 60,
    fontWeight: 500,
  },
  ctaButton: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    backgroundSize: '200% auto',
    color: 'white',
    fontSize: 48,
    fontWeight: 800,
    padding: '32px 80px',
    borderRadius: 24,
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 20px 60px rgba(102, 126, 234, 0.6), 0 0 80px rgba(118, 75, 162, 0.4)',
    marginBottom: 50,
    position: 'relative',
    overflow: 'hidden',
  },
  benefits: {
    display: 'flex',
    gap: 50,
    marginBottom: 40,
  },
  benefit: {
    fontSize: 24,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  benefitIcon: {
    color: '#43e97b',
    fontSize: 28,
    fontWeight: 900,
  },
  url: {
    fontSize: 40,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: 700,
    letterSpacing: '1px',
  },
};
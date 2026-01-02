import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const Scene2_Problem = ({ duration }) => {
  const frame = useCurrentFrame();
  const containerRef = useRef(null);

  const opacity = interpolate(
    frame,
    [0, 10, duration - 10, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline();
    
    // 1. Title reveal with perspective
    tl.from('.problem-title-main', {
      z: -500,
      rotationX: 90,
      opacity: 0,
      duration: 1.2,
      ease: 'power4.out',
    });

    // 2. Bloomberg card - FLIP from center
    tl.fromTo('.bloomberg-card-flip', {
      x: 0,
      y: 0,
      scale: 0.5,
      rotationY: 180,
      opacity: 0,
    }, {
      x: 0,
      scale: 1,
      rotationY: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'power3.out',
    }, '-=0.5');

    // 3. VS morphing circle to text
    tl.from('.vs-morph', {
      scale: 0,
      rotation: 720,
      opacity: 0,
      duration: 0.8,
      ease: 'back.out(3)',
    }, '-=0.6');

    // 4. AlphaVault card - FLIP from center
    tl.fromTo('.alphavault-card-flip', {
      x: 0,
      y: 0,
      scale: 0.5,
      rotationY: -180,
      opacity: 0,
    }, {
      x: 0,
      scale: 1,
      rotationY: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'power3.out',
    }, '-=1');

    // 5. Comparison line drawing
    tl.from('.comparison-line', {
      scaleX: 0,
      duration: 0.8,
      ease: 'power2.inOut',
    }, '-=0.4');

    // 6. Tagline reveal
    tl.from('.tagline-problem', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.3');

  }, []);

  const vsRotation = Math.sin(frame / 15) * 10;

  return (
    <AbsoluteFill style={{ opacity, perspective: 2000 }}>
      <div ref={containerRef} style={styles.container}>
        <h2 className="problem-title-main" style={styles.title}>
          Professional Tools at Consumer Prices
        </h2>

        <div className="comparison-line" style={styles.comparisonLine} />

        <div style={styles.comparison}>
          {/* Bloomberg */}
          <div className="bloomberg-card-flip" style={{
            ...styles.card,
            ...styles.bloombergCard,
          }}>
            <div style={styles.cardIconWrapper}>
              <svg width="90" height="90" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="3" fill="url(#blockGrad)" opacity="0.9"/>
                <defs>
                  <linearGradient id="blockGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="#dc2626" />
                  </linearGradient>
                </defs>
                <path d="M8 8h8M8 12h8M8 16h5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            
            <h3 style={styles.cardTitle}>Bloomberg Terminal</h3>
            <div style={styles.price}>
              $24,000
              <span style={styles.period}>/year</span>
            </div>
            <div style={styles.cardTag}>Institutional Only</div>
          </div>

          {/* VS with morphing */}
          <div className="vs-morph" style={{
            ...styles.vsText,
            transform: `rotate(${vsRotation}deg) scale(${1 + Math.abs(Math.sin(frame / 20)) * 0.1})`,
          }}>
            VS
          </div>

          {/* AlphaVault */}
          <div className="alphavault-card-flip" style={{
            ...styles.card,
            ...styles.alphavaultCard,
          }}>
            <div style={styles.cardIconWrapper}>
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="90" height="90">
                <defs>
                  <linearGradient id="avGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>
                <path d="M 20 80 L 30 70 L 40 75 L 50 60 L 60 65 L 70 45 L 80 50 L 90 30" 
                  stroke="url(#avGrad2)" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="30" cy="70" r="5" fill="url(#avGrad2)"/>
                <circle cx="50" cy="60" r="5" fill="url(#avGrad2)"/>
                <circle cx="70" cy="45" r="5" fill="url(#avGrad2)"/>
                <circle cx="90" cy="30" r="6" fill="url(#avGrad2)"/>
              </svg>
            </div>
            
            <h3 style={styles.cardTitle}>AlphaVault AI</h3>
            <div style={styles.price}>
              $20
              <span style={styles.period}>/month</span>
            </div>
            <div style={{ ...styles.cardTag, ...styles.successTag }}>
              <strong>100x</strong> More Affordable
            </div>
          </div>
        </div>

        <div className="tagline-problem" style={styles.tagline}>
          Institutional-grade analytics accessible to <strong>everyone</strong>
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
    padding: '0 100px',
    transformStyle: 'preserve-3d',
  },
  title: {
    fontSize: 76,
    fontWeight: 900,
    color: 'white',
    textAlign: 'center',
    margin: 0,
    marginBottom: 80,
    textShadow: '0 4px 30px rgba(59, 130, 246, 0.5)',
  },
  comparisonLine: {
    width: '80%',
    height: 2,
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
    marginBottom: 60,
    transformOrigin: 'center',
  },
  comparison: {
    display: 'flex',
    alignItems: 'center',
    gap: 100,
    marginBottom: 60,
  },
  card: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(30px) saturate(180%)',
    border: '2px solid rgba(255, 255, 255, 0.1)',
    borderRadius: 32,
    padding: 50,
    textAlign: 'center',
    minWidth: 420,
    transformStyle: 'preserve-3d',
    boxShadow: '0 25px 80px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
  },
  bloombergCard: {
    borderColor: 'rgba(239, 68, 68, 0.5)',
  },
  alphavaultCard: {
    borderColor: 'rgba(16, 185, 129, 0.5)',
  },
  cardIconWrapper: {
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 36,
    fontWeight: 800,
    color: 'white',
    margin: '0 0 20px 0',
  },
  price: {
    fontSize: 72,
    fontWeight: 900,
    color: 'white',
    marginBottom: 16,
  },
  period: {
    fontSize: 30,
    fontWeight: 600,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  cardTag: {
    fontSize: 20,
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: 600,
    padding: '8px 20px',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    display: 'inline-block',
  },
  successTag: {
    color: '#10b981',
    borderColor: '#10b981',
  },
  vsText: {
    fontSize: 60,
    fontWeight: 900,
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    padding: '20px 40px',
    borderRadius: 24,
    border: '3px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 12px 40px rgba(102, 126, 234, 0.4)',
  },
  tagline: {
    fontSize: 38,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    fontWeight: 500,
  },
};
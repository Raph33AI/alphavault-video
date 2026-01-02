import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const Scene2_Problem = ({ duration }) => {
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
    
    tl.from('.problem-title', {
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: 'power4.out',
    })
    .from('.bloomberg-card', {
      x: -300,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    }, '-=0.3')
    .from('.vs-divider', {
      scale: 0,
      opacity: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)',
    }, '-=0.5')
    .from('.alphavault-card', {
      x: 300,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    }, '-=0.8')
    .from('.tagline-problem', {
      y: 30,
      opacity: 0,
      duration: 0.7,
      ease: 'power2.out',
    }, '-=0.4');
  }, []);

  return (
    <AbsoluteFill style={{ opacity }}>
      <div ref={containerRef} style={styles.container}>
        <h2 className="problem-title" style={styles.title}>
          The Financial Intelligence Gap
        </h2>

        <div style={styles.comparison}>
          {/* Bloomberg Card */}
          <div className="bloomberg-card" style={{
            ...styles.comparisonCard,
            borderColor: 'rgba(239, 68, 68, 0.5)',
            boxShadow: `0 20px 60px rgba(239, 68, 68, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
          }}>
            <div style={styles.cardIcon}>
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7v10c0 5.5 3.8 10.7 10 12 6.2-1.3 10-6.5 10-12V7l-10-5z" 
                  fill="url(#sadGradient)" opacity="0.9"/>
                <defs>
                  <linearGradient id="sadGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="#dc2626" />
                  </linearGradient>
                </defs>
                <circle cx="9" cy="10" r="1.5" fill="white" />
                <circle cx="15" cy="10" r="1.5" fill="white" />
                <path d="M8 15c0-1 1-2 4-2s4 1 4 2" stroke="white" strokeWidth="2" strokeLinecap="round" transform="scale(1,-1) translate(0,-28)"/>
              </svg>
            </div>
            <h3 style={styles.cardTitle}>Bloomberg Terminal</h3>
            <div style={styles.cardPrice}>
              $24,000<span style={styles.pricePeriod}>/year</span>
            </div>
            <div style={styles.cardDesc}>Professional-only pricing</div>
            <div style={styles.cardLabel}>Out of reach for retail investors</div>
          </div>

          {/* VS Divider */}
          <div className="vs-divider" style={{
            ...styles.vsDivider,
            boxShadow: `0 8px 32px rgba(102, 126, 234, 0.4)`,
          }}>
            VS
          </div>

          {/* AlphaVault Card */}
          <div className="alphavault-card" style={{
            ...styles.comparisonCard,
            borderColor: 'rgba(16, 185, 129, 0.5)',
            boxShadow: `0 20px 60px rgba(16, 185, 129, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
          }}>
            <div style={styles.cardIcon}>
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="happyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>
                <path d="M12 2a10 10 0 0 1 10 10c0 3-1 5-3 7l-2 2-5 5-5-5-2-2c-2-2-3-4-3-7A10 10 0 0 1 12 2z" 
                  fill="url(#happyGradient)" opacity="0.9" />
                <circle cx="9" cy="10" r="1.5" fill="white" />
                <circle cx="15" cy="10" r="1.5" fill="white" />
                <path d="M7 14s1.5 2 5 2 5-2 5-2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 style={styles.cardTitle}>AlphaVault AI</h3>
            <div style={styles.cardPrice}>
              $20<span style={styles.pricePeriod}>/month</span>
            </div>
            <div style={styles.cardDesc}>Platinum Plan</div>
            <div style={{ ...styles.cardLabel, color: '#10b981' }}>
              <strong>100x</strong> more affordable
            </div>
          </div>
        </div>

        <div className="tagline-problem" style={styles.tagline}>
          <strong>Institutional-grade tools</strong> at consumer-friendly prices
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
  },
  title: {
    fontSize: 80,
    fontWeight: 900,
    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textAlign: 'center',
    margin: 0,
    marginBottom: 80,
    textShadow: '0 4px 20px rgba(239, 68, 68, 0.3)',
  },
  comparison: {
    display: 'flex',
    alignItems: 'center',
    gap: 60,
    marginBottom: 60,
  },
  comparisonCard: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px) saturate(180%)',
    border: '2px solid rgba(255, 255, 255, 0.1)',
    borderRadius: 32,
    padding: 50,
    textAlign: 'center',
    minWidth: 450,
    position: 'relative',
  },
  cardIcon: {
    marginBottom: 24,
    display: 'flex',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 36,
    fontWeight: 800,
    color: 'white',
    margin: 0,
    marginBottom: 20,
  },
  cardPrice: {
    fontSize: 72,
    fontWeight: 900,
    color: 'white',
    margin: 0,
    marginBottom: 12,
  },
  pricePeriod: {
    fontSize: 32,
    fontWeight: 600,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  cardDesc: {
    fontSize: 24,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 16,
  },
  cardLabel: {
    fontSize: 20,
    color: 'rgba(255, 255, 255, 0.6)',
    fontStyle: 'italic',
  },
  vsDivider: {
    fontSize: 56,
    fontWeight: 900,
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    padding: '20px 30px',
    borderRadius: 20,
    border: '3px solid rgba(255, 255, 255, 0.2)',
  },
  tagline: {
    fontSize: 38,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    fontWeight: 600,
  },
};
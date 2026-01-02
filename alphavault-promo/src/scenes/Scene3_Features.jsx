import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { RobotIcon, BriefcaseIcon, TargetIcon, ChartIcon } from '../components/Icons';

export const Scene3_Features = ({ duration }) => {
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
    
    tl.from('.features-title', {
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: 'power4.out',
    })
    .from('.features-subtitle', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
    }, '-=0.4')
    .from('.feature-card', {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'elastic.out(1, 0.5)',
    }, '-=0.2');
  }, []);

  const features = [
    { 
      Icon: RobotIcon,
      title: 'FinanceGPT AI', 
      desc: '24/7 conversational AI assistant',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    { 
      Icon: BriefcaseIcon,
      title: 'M&A Predictor', 
      desc: '6-factor AI scoring system',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    { 
      Icon: TargetIcon,
      title: 'Insider Flow', 
      desc: '14 pattern classification',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    },
    { 
      Icon: ChartIcon,
      title: 'ML Predictions', 
      desc: 'Multi-horizon trend forecasting',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    },
  ];

  return (
    <AbsoluteFill style={{ opacity }}>
      <div ref={containerRef} style={styles.container}>
        <h2 className="features-title" style={styles.title}>
          Institutional-Grade Tools
        </h2>

        <p className="features-subtitle" style={styles.subtitle}>
          Previously only available to hedge funds and professional traders
        </p>

        <div style={styles.featuresGrid}>
          {features.map((feature, index) => {
            const glowIntensity = 0.7 + Math.sin((frame + index * 30) / 20) * 0.3;

            return (
              <div
                key={index}
                className="feature-card"
                style={{
                  ...styles.featureCard,
                  boxShadow: `0 20px 60px rgba(0, 0, 0, 0.4), 0 0 ${40 * glowIntensity}px ${feature.gradient.match(/#[a-f0-9]{6}/gi)?.[0] || '#667eea'}40`,
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: feature.gradient,
                  opacity: 0.08,
                  borderRadius: 28,
                  filter: 'blur(20px)',
                }} />

                <div style={{
                  ...styles.featureIcon,
                  background: feature.gradient,
                }}>
                  <feature.Icon size={60} />
                </div>
                <h3 style={styles.featureTitle}>{feature.title}</h3>
                <p style={styles.featureDesc}>{feature.desc}</p>

                <div style={styles.cardBorder} />
              </div>
            );
          })}
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
    padding: '0 80px',
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
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 32,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    margin: 0,
    marginBottom: 80,
    fontWeight: 500,
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 40,
    maxWidth: 1600,
  },
  featureCard: {
    position: 'relative',
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(40px) saturate(180%)',
    borderRadius: 28,
    padding: 50,
    textAlign: 'center',
  },
  cardBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 28,
    border: '2px solid rgba(255, 255, 255, 0.1)',
    pointerEvents: 'none',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)',
  },
  featureIcon: {
    width: 120,
    height: 120,
    margin: '0 auto 30px',
    borderRadius: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)',
    position: 'relative',
    zIndex: 1,
  },
  featureTitle: {
    fontSize: 38,
    fontWeight: 800,
    color: 'white',
    margin: 0,
    marginBottom: 16,
    position: 'relative',
    zIndex: 1,
  },
  featureDesc: {
    fontSize: 24,
    color: 'rgba(255, 255, 255, 0.7)',
    margin: 0,
    fontWeight: 500,
    position: 'relative',
    zIndex: 1,
  },
};
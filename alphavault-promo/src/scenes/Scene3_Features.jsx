import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const Scene3_Features = ({ duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(
    frame,
    [0, 30, duration - 30, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const features = [
    { 
      icon: '🤖', 
      title: 'FinanceGPT AI', 
      desc: '24/7 conversational AI assistant',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    { 
      icon: '💼', 
      title: 'M&A Predictor', 
      desc: '6-factor AI scoring system',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    { 
      icon: '🎯', 
      title: 'Insider Flow', 
      desc: '14 pattern classification',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    },
    { 
      icon: '📊', 
      title: 'ML Predictions', 
      desc: 'Multi-horizon trend forecasting',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    },
  ];

  return (
    <AbsoluteFill style={{ opacity }}>
      <div style={styles.container}>
        <h2 style={{
          ...styles.title,
          transform: `translateY(${interpolate(frame, [0, 40], [80, 0], { extrapolateRight: 'clamp' })}px)`,
          opacity: interpolate(frame, [0, 40], [0, 1], { extrapolateRight: 'clamp' }),
        }}>
          Institutional-Grade Tools
        </h2>

        <p style={{
          ...styles.subtitle,
          opacity: interpolate(frame, [20, 50], [0, 1], { extrapolateRight: 'clamp' }),
        }}>
          Previously only available to hedge funds and professional traders
        </p>

        <div style={styles.featuresGrid}>
          {features.map((feature, index) => {
            const cardDelay = 60 + index * 15;
            const cardY = spring({
              frame: frame - cardDelay,
              fps,
              config: { damping: 100, stiffness: 200 },
            }) * 120 - 120;

            const cardRotate = spring({
              frame: frame - cardDelay,
              fps,
              config: { damping: 80, stiffness: 150 },
            }) * 10 - 5;

            const glowIntensity = Math.sin((frame - cardDelay) / 15) * 0.3 + 0.7;

            return (
              <div
                key={index}
                style={{
                  ...styles.featureCard,
                  transform: `translateY(${Math.max(cardY, 0)}px) rotateY(${cardRotate}deg)`,
                  opacity: frame >= cardDelay ? 1 : 0,
                  boxShadow: `0 20px 60px rgba(0, 0, 0, 0.4), 
                              0 0 ${40 * glowIntensity}px ${feature.gradient.match(/#[a-f0-9]{6}/gi)?.[0] || '#667eea'}40`,
                }}
              >
                {/* Glow background */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: feature.gradient,
                  opacity: 0.1,
                  borderRadius: 28,
                  filter: 'blur(20px)',
                }} />

                <div style={{
                  ...styles.featureIcon,
                  background: feature.gradient,
                  transform: `scale(${interpolate(frame, [cardDelay + 20, cardDelay + 40], [0.8, 1], { extrapolateRight: 'clamp' })})`,
                }}>
                  {feature.icon}
                </div>
                <h3 style={styles.featureTitle}>{feature.title}</h3>
                <p style={styles.featureDesc}>{feature.desc}</p>

                {/* Glassmorphism border */}
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
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 80px',
  },
  title: {
    fontSize: 72,
    fontWeight: 900,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
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
    transformStyle: 'preserve-3d',
    transition: 'all 0.3s ease',
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
    fontSize: 60,
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
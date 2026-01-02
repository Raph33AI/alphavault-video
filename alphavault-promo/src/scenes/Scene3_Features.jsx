import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const Scene3_Features = ({ startFrame, endFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(
    frame,
    [startFrame, startFrame + 30, endFrame - 30, endFrame],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const features = [
    { icon: '📊', title: 'AI Predictions', desc: 'Multi-horizon forecasting' },
    { icon: '💼', title: 'M&A Scoring', desc: '6-factor AI analysis' },
    { icon: '🎯', title: 'Insider Flow', desc: '14 pattern classes' },
  ];

  return (
    <AbsoluteFill style={{ opacity }}>
      <div style={styles.container}>
        <h2 style={styles.title}>AlphaVault AI Simplifie Tout</h2>
        
        <div style={styles.featuresGrid}>
          {features.map((feature, index) => {
            const cardY = spring({
              frame: frame - (startFrame + 30 + index * 10),
              fps,
              config: { damping: 100, stiffness: 200 },
            }) * 100 - 100;

            return (
              <div
                key={index}
                style={{
                  ...styles.featureCard,
                  transform: `translateY(${cardY}px)`,
                }}
              >
                <div style={styles.featureIcon}>{feature.icon}</div>
                <h3 style={styles.featureTitle}>{feature.title}</h3>
                <p style={styles.featureDesc}>{feature.desc}</p>
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
    padding: '0 100px',
  },
  title: {
    fontSize: 60,
    color: 'rgba(255, 255, 255, 0.95)',
    fontWeight: 800,
    textAlign: 'center',
    marginBottom: 80,
    margin: '0 0 80px 0',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 40,
    maxWidth: 1600,
  },
  featureCard: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: 24,
    padding: 40,
    textAlign: 'center',
  },
  featureIcon: {
    fontSize: 80,
    marginBottom: 24,
    filter: 'drop-shadow(0 0 20px rgba(102, 126, 234, 0.6))',
  },
  featureTitle: {
    fontSize: 36,
    fontWeight: 800,
    color: 'white',
    marginBottom: 16,
    margin: '0 0 16px 0',
  },
  featureDesc: {
    fontSize: 24,
    color: 'rgba(255, 255, 255, 0.7)',
    margin: 0,
  },
};
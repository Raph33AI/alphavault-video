import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

export const Scene2_Problem = ({ duration }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [0, 30, duration - 30, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill style={{ opacity }}>
      <div style={styles.container}>
        <h2 style={{
          ...styles.title,
          transform: `translateY(${interpolate(frame, [0, 30], [100, 0], { extrapolateRight: 'clamp' })}px)`,
          opacity: interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' }),
        }}>
          The Financial Intelligence Gap
        </h2>

        <div style={styles.comparison}>
          {/* Bloomberg Card */}
          <div style={{
            ...styles.comparisonCard,
            ...styles.cardExpensive,
            transform: `translateX(${interpolate(frame, [30, 60], [-200, 0], { extrapolateRight: 'clamp' })}px)`,
            opacity: interpolate(frame, [30, 60], [0, 1], { extrapolateRight: 'clamp' }),
          }}>
            <div style={styles.cardIcon}>😰</div>
            <h3 style={styles.cardTitle}>Bloomberg Terminal</h3>
            <div style={styles.cardPrice}>$24,000<span style={styles.pricePeriod}>/year</span></div>
            <div style={styles.cardDesc}>Professional-only pricing</div>
            <div style={styles.cardLabel}>Out of reach for retail investors</div>
          </div>

          {/* VS Divider */}
          <div style={{
            ...styles.vsDivider,
            opacity: interpolate(frame, [60, 75], [0, 1], { extrapolateRight: 'clamp' }),
            transform: `scale(${interpolate(frame, [60, 75], [0.5, 1], { extrapolateRight: 'clamp' })})`,
          }}>
            VS
          </div>

          {/* AlphaVault Card */}
          <div style={{
            ...styles.comparisonCard,
            ...styles.cardAffordable,
            transform: `translateX(${interpolate(frame, [45, 75], [200, 0], { extrapolateRight: 'clamp' })}px)`,
            opacity: interpolate(frame, [45, 75], [0, 1], { extrapolateRight: 'clamp' }),
          }}>
            <div style={styles.cardIcon}>🚀</div>
            <h3 style={styles.cardTitle}>AlphaVault AI</h3>
            <div style={styles.cardPrice}>$20<span style={styles.pricePeriod}>/month</span></div>
            <div style={styles.cardDesc}>Platinum Plan</div>
            <div style={styles.cardLabel}>100x more affordable</div>
          </div>
        </div>

        <div style={{
          ...styles.tagline,
          opacity: interpolate(frame, [90, 120], [0, 1], { extrapolateRight: 'clamp' }),
        }}>
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
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
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
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
  },
  cardExpensive: {
    borderColor: 'rgba(239, 68, 68, 0.5)',
    boxShadow: '0 20px 60px rgba(239, 68, 68, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
  },
  cardAffordable: {
    borderColor: 'rgba(16, 185, 129, 0.5)',
    boxShadow: '0 20px 60px rgba(16, 185, 129, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
  },
  cardIcon: {
    fontSize: 80,
    marginBottom: 20,
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
    boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4)',
  },
  tagline: {
    fontSize: 38,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    fontWeight: 600,
  },
};
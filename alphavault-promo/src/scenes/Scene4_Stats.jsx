import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

export const Scene4_Stats = ({ startFrame, endFrame }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [startFrame, startFrame + 30, endFrame - 30, endFrame],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const stats = [
    { value: 87, label: '% Accuracy' },
    { value: 14, label: 'Indicators' },
    { value: 24, label: '7 Support' },
  ];

  return (
    <AbsoluteFill style={{ opacity }}>
      <div style={styles.container}>
        <h2 style={styles.title}>Des Résultats Prouvés</h2>
        
        <div style={styles.statsContainer}>
          {stats.map((stat, index) => {
            const animatedValue = Math.floor(
              interpolate(
                frame,
                [startFrame + 30 + index * 10, startFrame + 90 + index * 10],
                [0, stat.value],
                { extrapolateRight: 'clamp' }
              )
            );

            return (
              <div key={index} style={styles.statItem}>
                <div style={styles.statNumber}>{animatedValue}</div>
                <div style={styles.statLabel}>{stat.label}</div>
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
  },
  title: {
    fontSize: 60,
    color: 'rgba(255, 255, 255, 0.95)',
    fontWeight: 800,
    textAlign: 'center',
    marginBottom: 60,
    margin: '0 0 60px 0',
  },
  statsContainer: {
    display: 'flex',
    gap: 100,
  },
  statItem: {
    textAlign: 'center',
  },
  statNumber: {
    fontSize: 100,
    fontWeight: 900,
    background: 'linear-gradient(135deg, #10b981, #059669)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  statLabel: {
    fontSize: 32,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: 600,
  },
};
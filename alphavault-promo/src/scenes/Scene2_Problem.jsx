import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

export const Scene2_Problem = ({ startFrame, endFrame }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [startFrame, startFrame + 30, endFrame - 30, endFrame],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const titleY = interpolate(
    frame,
    [startFrame, startFrame + 30],
    [100, 0],
    { extrapolateRight: 'clamp' }
  );

  const subtitleY = interpolate(
    frame,
    [startFrame + 15, startFrame + 45],
    [50, 0],
    { extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill style={{ opacity }}>
      <div style={styles.container}>
        <h2 style={{
          ...styles.mainTitle,
          transform: `translateY(${titleY}px)`,
        }}>
          Les Marchés Sont Complexes
        </h2>
        
        <p style={{
          ...styles.subtitle,
          transform: `translateY(${subtitleY}px)`,
        }}>
          Des milliers de données • Risques invisibles • Opportunités manquées
        </p>
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
  mainTitle: {
    fontSize: 90,
    fontWeight: 900,
    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textAlign: 'center',
    marginBottom: 40,
    margin: 0,
  },
  subtitle: {
    fontSize: 40,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: 500,
    textAlign: 'center',
    margin: 0,
    lineHeight: 1.6,
  },
};
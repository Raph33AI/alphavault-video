import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const Scene5_CTA = ({ duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(
    frame,
    [0, 30, duration - 30, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const buttonScale = spring({
    frame: frame - 30,
    fps,
    config: { damping: 100 },
  });

  const pulse = Math.sin(frame / 10) * 0.05 + 1;

  return (
    <AbsoluteFill style={{ opacity }}>
      <div style={styles.container}>
        <h2 style={styles.mainTitle}>
          Prêt à Investir Intelligemment ?
        </h2>
        
        <button style={{
          ...styles.ctaButton,
          transform: `scale(${Math.max(buttonScale, 0) * pulse})`,
        }}>
          Start Free Trial →
        </button>
        
        <p style={styles.subtitle}>alphavault-ai.com</p>
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
  mainTitle: {
    fontSize: 90,
    fontWeight: 900,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textAlign: 'center',
    margin: '0 0 60px 0',
  },
  ctaButton: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    fontSize: 48,
    fontWeight: 800,
    padding: '40px 80px',
    borderRadius: 24,
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 20px 60px rgba(102, 126, 234, 0.5)',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 36,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: 600,
    margin: 0,
  },
};
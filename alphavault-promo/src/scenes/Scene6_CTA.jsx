import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const Scene6_CTA = ({ duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(
    frame,
    [0, 30, duration - 30, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const buttonScale = spring({
    frame: frame - 60,
    fps,
    config: { damping: 100, stiffness: 200 },
  });

  const pulse = Math.sin(frame / 15) * 0.1 + 1;

  return (
    <AbsoluteFill style={{ opacity }}>
      <div style={styles.container}>
        {/* Logo SVG (petit) */}
        <div style={{
          ...styles.miniLogo,
          opacity: interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' }),
        }}>
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
            <defs>
              <linearGradient id="ctaLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#667eea', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#764ba2', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <path d="M 20 80 L 30 70 L 40 75 L 50 60 L 60 65 L 70 45 L 80 50 L 90 30" 
              stroke="url(#ctaLogoGradient)" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="30" cy="70" r="4" fill="url(#ctaLogoGradient)"/>
            <circle cx="50" cy="60" r="4" fill="url(#ctaLogoGradient)"/>
            <circle cx="70" cy="45" r="4" fill="url(#ctaLogoGradient)"/>
            <circle cx="90" cy="30" r="5" fill="url(#ctaLogoGradient)"/>
            <path d="M 85 35 L 90 30 L 85 25" stroke="url(#ctaLogoGradient)" strokeWidth="3" fill="none" strokeLinecap="round"/>
          </svg>
        </div>

        <h2 style={{
          ...styles.title,
          opacity: interpolate(frame, [20, 50], [0, 1], { extrapolateRight: 'clamp' }),
          transform: `translateY(${interpolate(frame, [20, 50], [60, 0], { extrapolateRight: 'clamp' })}px)`,
        }}>
          Ready to Invest Smarter?
        </h2>

        <p style={{
          ...styles.subtitle,
          opacity: interpolate(frame, [35, 65], [0, 1], { extrapolateRight: 'clamp' }),
        }}>
          Join thousands of investors using AI-powered analytics
        </p>

        {/* CTA Button */}
        <button style={{
          ...styles.ctaButton,
          transform: `scale(${Math.max(buttonScale, 0) * pulse})`,
          opacity: interpolate(frame, [50, 80], [0, 1], { extrapolateRight: 'clamp' }),
        }}>
          Start Free Trial →
        </button>

        {/* Benefits */}
        <div style={{
          ...styles.benefits,
          opacity: interpolate(frame, [80, 110], [0, 1], { extrapolateRight: 'clamp' }),
        }}>
          <div style={styles.benefit}>
            <span style={styles.benefitIcon}>✓</span> 14-day free trial
          </div>
          <div style={styles.benefit}>
            <span style={styles.benefitIcon}>✓</span> No credit card required
          </div>
          <div style={styles.benefit}>
            <span style={styles.benefitIcon}>✓</span> Cancel anytime
          </div>
        </div>

        {/* URL */}
        <div style={{
          ...styles.url,
          opacity: interpolate(frame, [100, 130], [0, 1], { extrapolateRight: 'clamp' }),
        }}>
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
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniLogo: {
    width: 120,
    height: 120,
    marginBottom: 40,
    filter: 'drop-shadow(0 0 20px rgba(102, 126, 234, 0.6))',
  },
  title: {
    fontSize: 90,
    fontWeight: 900,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
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
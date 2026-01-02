import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const Scene5_Pricing = ({ duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(
    frame,
    [0, 30, duration - 30, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const plans = [
    {
      name: 'Basic',
      price: 0,
      icon: '🚀',
      features: ['Stock analysis', 'Budget dashboard', 'News terminal'],
      gradient: 'linear-gradient(135deg, #6b7280 0%, #9ca3af 100%)',
    },
    {
      name: 'Pro',
      price: 10,
      icon: '⭐',
      features: ['Advanced analytics', 'M&A predictor', 'Insider tracking'],
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      featured: true,
    },
    {
      name: 'Platinum',
      price: 20,
      icon: '👑',
      features: ['AI Chatbot', 'ML predictions', 'Priority support'],
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
  ];

  return (
    <AbsoluteFill style={{ opacity }}>
      <div style={styles.container}>
        <h2 style={{
          ...styles.title,
          opacity: interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' }),
        }}>
          Simple, Transparent Pricing
        </h2>

        <p style={{
          ...styles.subtitle,
          opacity: interpolate(frame, [15, 45], [0, 1], { extrapolateRight: 'clamp' }),
        }}>
          100x more affordable than Bloomberg Terminal
        </p>

        <div style={styles.pricingGrid}>
          {plans.map((plan, index) => {
            const cardDelay = 60 + index * 30;
            
            const cardY = spring({
              frame: frame - cardDelay,
              fps,
              config: { damping: 100, stiffness: 200 },
            }) * 120 - 120;

            const cardScale = plan.featured
              ? interpolate(frame, [cardDelay + 20, cardDelay + 50], [0.95, 1.05], { extrapolateRight: 'clamp' })
              : 1;

            return (
              <div
                key={index}
                style={{
                  ...styles.pricingCard,
                  ...(plan.featured ? styles.featuredCard : {}),
                  transform: `translateY(${Math.max(cardY, 0)}px) scale(${cardScale})`,
                  opacity: frame >= cardDelay ? 1 : 0,
                  zIndex: plan.featured ? 2 : 1,
                }}
              >
                {plan.featured && (
                  <div style={styles.featuredBadge}>Most Popular</div>
                )}

                {/* Gradient background */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 180,
                  background: plan.gradient,
                  borderRadius: '28px 28px 0 0',
                  opacity: 0.8,
                }} />

                <div style={styles.cardContent}>
                  <div style={{
                    ...styles.planIcon,
                    background: plan.gradient,
                  }}>
                    {plan.icon}
                  </div>
                  <h3 style={styles.planName}>{plan.name}</h3>
                  <div style={styles.priceContainer}>
                    <span style={styles.currency}>$</span>
                    <span style={styles.price}>
                      {interpolate(
                        frame,
                        [cardDelay + 20, cardDelay + 50],
                        [0, plan.price],
                        { extrapolateRight: 'clamp' }
                      ).toFixed(0)}
                    </span>
                    <span style={styles.period}>/mo</span>
                  </div>
                  
                  <div style={styles.features}>
                    {plan.features.map((feature, i) => (
                      <div
                        key={i}
                        style={{
                          ...styles.feature,
                          opacity: interpolate(
                            frame,
                            [cardDelay + 40 + i * 10, cardDelay + 50 + i * 10],
                            [0, 1],
                            { extrapolateRight: 'clamp' }
                          ),
                        }}
                      >
                        <span style={styles.checkIcon}>✓</span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

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
  },
  pricingGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 40,
    maxWidth: 1600,
  },
  pricingCard: {
    position: 'relative',
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(40px) saturate(180%)',
    borderRadius: 28,
    overflow: 'hidden',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
  },
  featuredCard: {
    transform: 'scale(1.05)',
    boxShadow: '0 30px 80px rgba(102, 126, 234, 0.5)',
  },
  featuredBadge: {
    position: 'absolute',
    top: 20,
    right: 20,
    background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    color: 'white',
    padding: '8px 20px',
    borderRadius: 20,
    fontSize: 16,
    fontWeight: 800,
    zIndex: 3,
    boxShadow: '0 4px 12px rgba(67, 233, 123, 0.5)',
  },
  cardContent: {
    position: 'relative',
    zIndex: 1,
    padding: '200px 40px 40px',
  },
  planIcon: {
    position: 'absolute',
    top: -100,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 100,
    height: 100,
    borderRadius: 25,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 50,
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
  },
  planName: {
    fontSize: 36,
    fontWeight: 800,
    color: 'white',
    textAlign: 'center',
    margin: 0,
    marginBottom: 20,
  },
  priceContainer: {
    textAlign: 'center',
    marginBottom: 30,
  },
  currency: {
    fontSize: 36,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: 700,
  },
  price: {
    fontSize: 72,
    fontWeight: 900,
    color: 'white',
  },
  period: {
    fontSize: 24,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: 600,
  },
  features: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  feature: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  checkIcon: {
    color: '#43e97b',
    fontSize: 20,
    fontWeight: 900,
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
  },
};
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const Scene5_Pricing = ({ duration }) => {
  const frame = useCurrentFrame();
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  const opacity = interpolate(
    frame,
    [0, 10, duration - 10, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline();
    
    // 1. Title reveal
    tl.from('.pricing-title-reveal', {
      y: 100,
      rotationX: -90,
      opacity: 0,
      duration: 1,
      ease: 'power4.out',
    });

    // 2. Cards - Fan layout animation
    cardsRef.current.forEach((card, i) => {
      if (card) {
        const fanAngle = (i - 1) * 15; // -15deg, 0deg, 15deg
        const initialAngle = (i - 1) * 120;
        
        gsap.set(card, {
          rotation: initialAngle,
          x: 0,
          y: 400,
          scale: 0.5,
          opacity: 0,
        });

        tl.to(card, {
          rotation: fanAngle,
          x: (i - 1) * 480,
          y: i === 1 ? -30 : 0, // Middle card slightly higher
          scale: i === 1 ? 1.05 : 1,
          opacity: 1,
          duration: 1.5,
          ease: 'elastic.out(1, 0.5)',
        }, 0.5 + i * 0.15);

        // Hover effect simulation
        if (i === 1) { // Pro card
          tl.to(card, {
            y: '-=15',
            duration: 0.6,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          }, 2);
        }
      }
    });

  }, []);

  const plans = [
    {
      name: 'Basic',
      price: 0,
      features: ['Portfolio tracking', 'Monte Carlo', 'Basic analytics'],
      gradient: 'linear-gradient(135deg, #6b7280 0%, #9ca3af 100%)',
      icon: 'M12 2L2 7v6c0 5.5 4.5 10.5 10 12 5.5-1.5 10-6.5 10-12V7l-10-5z',
    },
    {
      name: 'Pro',
      price: 10,
      features: ['All Basic features', 'AI predictions', 'Real-time data'],
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      popular: true,
      icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
    },
    {
      name: 'Platinum',
      price: 20,
      features: ['All Pro features', 'Full AI chatbot', 'Priority support'],
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      icon: 'M12 2l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6l2-6z',
    },
  ];

  return (
    <AbsoluteFill style={{ opacity, perspective: 2000 }}>
      <div ref={containerRef} style={styles.container}>
        <h2 className="pricing-title-reveal" style={styles.title}>
          Simple, Transparent Pricing
        </h2>

        <div style={styles.cardsWrapper}>
          {plans.map((plan, index) => {
            const priceValue = interpolate(
              frame,
              [60 + index * 20, 100 + index * 20],
              [0, plan.price],
              { extrapolateRight: 'clamp' }
            );

            return (
              <div
                key={index}
                ref={el => cardsRef.current[index] = el}
                style={{
                  ...styles.card,
                  ...(plan.popular ? styles.popularCard : {}),
                }}
              >
                {plan.popular && (
                  <div style={styles.popularBadge}>Most Popular</div>
                )}

                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 160,
                  background: plan.gradient,
                  borderRadius: '28px 28px 0 0',
                  opacity: 0.85,
                }} />

                <div style={styles.cardContent}>
                  <div style={{
                    ...styles.planIcon,
                    background: plan.gradient,
                  }}>
                    <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
                      <path d={plan.icon} fill="white" opacity="0.9"/>
                    </svg>
                  </div>

                  <h3 style={styles.planName}>{plan.name}</h3>
                  
                  <div style={styles.priceContainer}>
                    <span style={styles.currency}>$</span>
                    <span style={styles.price}>{Math.floor(priceValue)}</span>
                    <span style={styles.period}>/mo</span>
                  </div>
                  
                  <div style={styles.features}>
                    {plan.features.map((feature, i) => (
                      <div key={i} style={styles.feature}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ marginRight: 12, flexShrink: 0 }}>
                          <circle cx="12" cy="12" r="10" fill="#43e97b" opacity="0.2"/>
                          <path d="M7 12l3 3 7-7" stroke="#43e97b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

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
    transformStyle: 'preserve-3d',
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
    marginBottom: 100,
  },
  cardsWrapper: {
    position: 'relative',
    width: 1600,
    height: 600,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    position: 'absolute',
    width: 380,
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(40px) saturate(180%)',
    borderRadius: 28,
    overflow: 'hidden',
    transformStyle: 'preserve-3d',
    boxShadow: '0 25px 70px rgba(0, 0, 0, 0.3)',
  },
  popularCard: {
    boxShadow: '0 35px 90px rgba(102, 126, 234, 0.5)',
    zIndex: 10,
  },
  popularBadge: {
    position: 'absolute',
    top: 20,
    right: 20,
    background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    color: 'white',
    padding: '10px 24px',
    borderRadius: 24,
    fontSize: 16,
    fontWeight: 800,
    zIndex: 3,
    boxShadow: '0 6px 16px rgba(67, 233, 123, 0.5)',
  },
  cardContent: {
    position: 'relative',
    zIndex: 1,
    padding: '190px 40px 40px',
  },
  planIcon: {
    position: 'absolute',
    top: -95,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 100,
    height: 100,
    borderRadius: 25,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 15px 45px rgba(0, 0, 0, 0.4)',
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
    gap: 14,
  },
  feature: {
    fontSize: 17,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
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
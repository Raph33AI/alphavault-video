import { AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig } from 'remotion';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const Scene3_Features = ({ duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
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
    
    // 1. Title with glitch effect
    tl.from('.features-title-glitch', {
      opacity: 0,
      scale: 0.8,
      duration: 0.8,
      ease: 'power4.out',
    });

    // Glitch animation
    for (let i = 0; i < 6; i++) {
      tl.to('.features-title-glitch', {
        x: gsap.utils.random(-5, 5),
        y: gsap.utils.random(-5, 5),
        duration: 0.05,
      });
    }
    tl.to('.features-title-glitch', { x: 0, y: 0, duration: 0.1 });

    // 2. Cards in 3D carousel formation
    cardsRef.current.forEach((card, i) => {
      if (card) {
        const radius = 800;
        const angle = (i / 8) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        gsap.set(card, {
          x,
          z,
          rotationY: -(angle * 180) / Math.PI,
        });

        tl.from(card, {
          opacity: 0,
          scale: 0.5,
          duration: 1,
          ease: 'elastic.out(1, 0.5)',
        }, 0.3 + i * 0.1);
      }
    });

  }, []);

  // Carousel rotation
  const carouselRotation = (frame * 0.3) % 360;

  const features = [
    { 
      title: 'AI Analysis', 
      desc: 'ML predictions',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      icon: 'M12 2a10 10 0 0 1 10 10c0 5.5-10 18-10 18S2 17.5 2 12A10 10 0 0 1 12 2z',
    },
    { 
      title: 'IPO Intelligence', 
      desc: 'Real-time detection',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      icon: 'M12 2L2 7v6c0 5.5 4.5 10.5 10 12 5.5-1.5 10-6.5 10-12V7l-10-5z',
    },
    { 
      title: 'M&A Screening', 
      desc: 'SEC analysis',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      icon: 'M20 6L9 17l-5-5',
    },
    { 
      title: 'Portfolio Optimizer', 
      desc: 'Markowitz',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      icon: 'M3 3v18h18',
    },
    { 
      title: 'Monte Carlo', 
      desc: '10K simulations',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      icon: 'M12 8v8m-4-4h8',
    },
    { 
      title: 'Technical Indicators', 
      desc: 'RSI, MACD',
      gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
      icon: 'M3 15l4-8 4 4 5-6 5 6',
    },
    { 
      title: 'News Terminal', 
      desc: 'Sentiment AI',
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      icon: 'M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10l6 6v8a2 2 0 0 1-2 2z',
    },
    { 
      title: 'Community Hub', 
      desc: 'Expert analyses',
      gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
      icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2',
    },
  ];

  return (
    <AbsoluteFill style={{ opacity, perspective: 1500 }}>
      <div ref={containerRef} style={styles.container}>
        <h2 className="features-title-glitch" style={styles.title}>
          Everything You Need to Excel
        </h2>

        <div style={{
          ...styles.carousel,
          transform: `rotateY(${carouselRotation}deg)`,
        }}>
          {features.map((feature, index) => {
            const radius = 800;
            const angle = (index / 8) * Math.PI * 2 - (carouselRotation * Math.PI) / 180;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            const rotationY = -(angle * 180) / Math.PI;
            const scale = interpolate(z, [-radius, radius], [0.7, 1]);
            const cardOpacity = interpolate(z, [-radius, 0, radius], [0.3, 1, 0.3]);

            return (
              <div
                key={index}
                ref={el => cardsRef.current[index] = el}
                style={{
                  ...styles.card,
                  transform: `translateX(${x}px) translateZ(${z}px) rotateY(${rotationY}deg) scale(${scale})`,
                  opacity: cardOpacity,
                  zIndex: Math.round(z),
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: feature.gradient,
                  opacity: 0.1,
                  borderRadius: 24,
                  filter: 'blur(20px)',
                }} />

                <div style={{
                  ...styles.icon,
                  background: feature.gradient,
                }}>
                  <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
                    <path d={feature.icon} stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                <h3 style={styles.cardTitle}>{feature.title}</h3>
                <p style={styles.cardDesc}>{feature.desc}</p>

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
    position: 'relative',
    zIndex: 100,
  },
  carousel: {
    position: 'relative',
    width: '100%',
    height: 500,
    transformStyle: 'preserve-3d',
  },
  card: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginLeft: -180,
    marginTop: -150,
    width: 360,
    height: 300,
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(40px) saturate(180%)',
    borderRadius: 24,
    padding: 40,
    textAlign: 'center',
    transformStyle: 'preserve-3d',
    backfaceVisibility: 'hidden',
  },
  cardBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 24,
    border: '2px solid rgba(255, 255, 255, 0.1)',
    pointerEvents: 'none',
  },
  icon: {
    width: 90,
    height: 90,
    margin: '0 auto 20px',
    borderRadius: 22,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)',
    position: 'relative',
    zIndex: 1,
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: 800,
    color: 'white',
    margin: 0,
    marginBottom: 10,
    position: 'relative',
    zIndex: 1,
  },
  cardDesc: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.7)',
    margin: 0,
    fontWeight: 500,
    position: 'relative',
    zIndex: 1,
  },
};
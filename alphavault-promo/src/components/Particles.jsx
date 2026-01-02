import { useCurrentFrame, useVideoConfig } from 'remotion';

export const Particles = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Générer 50 particules
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: (i * 137.5) % width,
    y: (i * 73.2) % height,
    size: 2 + (i % 4),
    speed: 0.5 + (i % 3) * 0.3,
  }));

  return (
    <div style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      opacity: 0.4,
    }}>
      {particles.map((p) => {
        const offsetY = (frame * p.speed) % (height + 100);
        
        return (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: p.x,
              top: p.y + offsetY - 100,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(102, 126, 234, 0.8), rgba(118, 75, 162, 0.4))',
              boxShadow: '0 0 10px rgba(102, 126, 234, 0.6)',
            }}
          />
        );
      })}
    </div>
  );
};
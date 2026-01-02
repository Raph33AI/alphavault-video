import { useCurrentFrame } from 'remotion';

export const Background3D = () => {
  const frame = useCurrentFrame();

  const gradientPos = (Math.sin(frame / 60) + 1) * 50;
  
  const orb1X = -50 + Math.cos(frame / 120) * 30;
  const orb1Y = -100 + Math.sin(frame / 150) * 50;
  const orb1Opacity = 0.6 + Math.sin(frame / 80) * 0.2;
  
  const orb2X = -100 + Math.sin(frame / 150) * 35;
  const orb2Y = -150 + Math.cos(frame / 180) * 40;
  const orb2Opacity = 0.6 + Math.cos(frame / 90) * 0.2;

  const gridOpacity = 0.3 + Math.sin(frame / 60) * 0.3;

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      overflow: 'hidden',
    }}>
      {/* Gradient animé */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: `linear-gradient(135deg, 
          #0f172a ${gradientPos * 0}%, 
          #1e293b ${gradientPos * 0.25}%, 
          #334155 ${gradientPos * 0.5}%, 
          #1e293b ${gradientPos * 0.75}%, 
          #0f172a ${gradientPos * 1}%)`,
      }} />

      {/* Orbe 1 (bleu) */}
      <div style={{
        position: 'absolute',
        width: 600,
        height: 600,
        top: orb1Y,
        left: orb1X,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, rgba(99, 102, 241, 0.6) 35%, transparent 70%)',
        filter: 'blur(120px)',
        opacity: orb1Opacity,
        mixBlendMode: 'screen',
      }} />

      {/* Orbe 2 (violet) */}
      <div style={{
        position: 'absolute',
        width: 550,
        height: 550,
        bottom: orb2Y,
        right: orb2X,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.8) 0%, rgba(168, 85, 247, 0.6) 35%, transparent 70%)',
        filter: 'blur(120px)',
        opacity: orb2Opacity,
        mixBlendMode: 'screen',
      }} />

      {/* Grille futuriste */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundImage: `
          linear-gradient(rgba(59, 130, 246, ${0.03 + Math.sin(frame / 60) * 0.03}) 1px, transparent 1px),
          linear-gradient(90deg, rgba(59, 130, 246, ${0.03 + Math.sin(frame / 60) * 0.03}) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        opacity: gridOpacity,
        maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%)',
      }} />
    </div>
  );
};
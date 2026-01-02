import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

export const SceneTransition = ({ type = 'fade' }) => {
  const frame = useCurrentFrame();

  if (type === 'fade') {
    const opacity = interpolate(frame, [0, 10, 15, 20], [0, 0.8, 0.8, 0]);
    return (
      <AbsoluteFill style={{
        background: 'rgba(15, 23, 42, 1)',
        opacity,
      }} />
    );
  }

  if (type === 'wipe-left') {
    const x = interpolate(frame, [0, 20], [1920, 0], { extrapolateRight: 'clamp' });
    return (
      <AbsoluteFill style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        transform: `translateX(${x}px)`,
      }} />
    );
  }

  if (type === 'wipe-right') {
    const x = interpolate(frame, [0, 20], [-1920, 0], { extrapolateRight: 'clamp' });
    return (
      <AbsoluteFill style={{
        background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        transform: `translateX(${x}px)`,
      }} />
    );
  }

  if (type === 'zoom-rotate') {
    const scale = interpolate(frame, [0, 10, 20], [0, 50, 0]);
    const rotation = interpolate(frame, [0, 20], [0, 360]);
    const opacity = interpolate(frame, [0, 10, 20], [0, 1, 0]);
    
    return (
      <AbsoluteFill style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(15, 23, 42, 0.95)',
        opacity,
      }}>
        <div style={{
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          transform: `scale(${scale}) rotate(${rotation}deg)`,
          filter: 'blur(20px)',
        }} />
      </AbsoluteFill>
    );
  }

  if (type === 'curtain') {
    const height = interpolate(frame, [0, 10, 15, 20], [0, 1080, 1080, 0]);
    
    return (
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{
          height: height / 2,
          background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
          transformOrigin: 'top',
        }} />
        <div style={{
          height: height / 2,
          background: 'linear-gradient(0deg, #0f172a 0%, #1e293b 100%)',
          transformOrigin: 'bottom',
        }} />
      </AbsoluteFill>
    );
  }

  return null;
};
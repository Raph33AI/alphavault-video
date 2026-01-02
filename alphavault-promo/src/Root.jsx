import { Composition } from 'remotion';
import { Video } from './Video';

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="AlphaVaultPromo"
        component={Video}
        durationInFrames={2700} // 45 secondes à 60 FPS
        fps={60}
        width={1920}
        height={1080}
      />
    </>
  );
};
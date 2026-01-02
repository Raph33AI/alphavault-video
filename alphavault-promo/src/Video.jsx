import { AbsoluteFill, Sequence } from 'remotion';
import { Scene1_Logo } from './scenes/Scene1_Logo';
import { Scene2_Problem } from './scenes/Scene2_Problem';
import { Scene3_Features } from './scenes/Scene3_Features';
import { Scene4_Stats } from './scenes/Scene4_Stats';
import { Scene5_CTA } from './scenes/Scene5_CTA';

export const Video = () => {
  // Durées en frames (60 FPS)
  const scene1 = { start: 0, duration: 300 }; // 5s
  const scene2 = { start: 300, duration: 300 }; // 5s
  const scene3 = { start: 600, duration: 600 }; // 10s
  const scene4 = { start: 1200, duration: 480 }; // 8s
  const scene5 = { start: 1680, duration: 420 }; // 7s
  // Total: 35s

  return (
    <AbsoluteFill style={{ backgroundColor: '#0f172a' }}>
      <Sequence from={scene1.start} durationInFrames={scene1.duration}>
        <Scene1_Logo 
          startFrame={scene1.start} 
          endFrame={scene1.start + scene1.duration} 
        />
      </Sequence>

      <Sequence from={scene2.start} durationInFrames={scene2.duration}>
        <Scene2_Problem 
          startFrame={scene2.start} 
          endFrame={scene2.start + scene2.duration} 
        />
      </Sequence>

      <Sequence from={scene3.start} durationInFrames={scene3.duration}>
        <Scene3_Features 
          startFrame={scene3.start} 
          endFrame={scene3.start + scene3.duration} 
        />
      </Sequence>

      <Sequence from={scene4.start} durationInFrames={scene4.duration}>
        <Scene4_Stats 
          startFrame={scene4.start} 
          endFrame={scene4.start + scene4.duration} 
        />
      </Sequence>

      <Sequence from={scene5.start} durationInFrames={scene5.duration}>
        <Scene5_CTA 
          startFrame={scene5.start} 
          endFrame={scene5.start + scene5.duration} 
        />
      </Sequence>
    </AbsoluteFill>
  );
};
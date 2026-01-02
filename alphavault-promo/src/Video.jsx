import { AbsoluteFill, Sequence } from 'remotion';
import { Scene1_Logo } from './scenes/Scene1_Logo';
import { Scene2_Problem } from './scenes/Scene2_Problem';
import { Scene3_Features } from './scenes/Scene3_Features';
import { Scene4_Stats } from './scenes/Scene4_Stats';
import { Scene5_CTA } from './scenes/Scene5_CTA';

export const Video = () => {
  // Durées en frames (60 FPS)
  const scene1Duration = 300; // 5s
  const scene2Duration = 300; // 5s
  const scene3Duration = 600; // 10s
  const scene4Duration = 480; // 8s
  const scene5Duration = 420; // 7s

  return (
    <AbsoluteFill style={{ backgroundColor: '#0f172a' }}>
      {/* Scène 1 : Logo (0-5s) */}
      <Sequence from={0} durationInFrames={scene1Duration}>
        <Scene1_Logo duration={scene1Duration} />
      </Sequence>

      {/* Scène 2 : Problème (5-10s) */}
      <Sequence from={scene1Duration} durationInFrames={scene2Duration}>
        <Scene2_Problem duration={scene2Duration} />
      </Sequence>

      {/* Scène 3 : Features (10-20s) */}
      <Sequence from={scene1Duration + scene2Duration} durationInFrames={scene3Duration}>
        <Scene3_Features duration={scene3Duration} />
      </Sequence>

      {/* Scène 4 : Stats (20-28s) */}
      <Sequence from={scene1Duration + scene2Duration + scene3Duration} durationInFrames={scene4Duration}>
        <Scene4_Stats duration={scene4Duration} />
      </Sequence>

      {/* Scène 5 : CTA (28-35s) */}
      <Sequence from={scene1Duration + scene2Duration + scene3Duration + scene4Duration} durationInFrames={scene5Duration}>
        <Scene5_CTA duration={scene5Duration} />
      </Sequence>
    </AbsoluteFill>
  );
};
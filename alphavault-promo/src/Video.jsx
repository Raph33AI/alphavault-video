import { AbsoluteFill, Sequence } from 'remotion';
import { Scene1_Logo } from './scenes/Scene1_Logo';
import { Scene2_Problem } from './scenes/Scene2_Problem';
import { Scene3_Features } from './scenes/Scene3_Features';
import { Scene4_Stats } from './scenes/Scene4_Stats';
import { Scene5_Pricing } from './scenes/Scene5_Pricing';
import { Scene6_CTA } from './scenes/Scene6_CTA';
import { Particles } from './components/Particles';

export const Video = () => {
  // Durées en frames (60 FPS)
  const scene1Duration = 360; // 6s - Logo + Mission
  const scene2Duration = 360; // 6s - Problem (Bloomberg vs AlphaVault)
  const scene3Duration = 720; // 12s - Features (4 cards)
  const scene4Duration = 480; // 8s - Stats
  const scene5Duration = 480; // 8s - Pricing
  const scene6Duration = 300; // 5s - CTA
  // Total: 45s

  return (
    <AbsoluteFill style={{ backgroundColor: '#0f172a' }}>
      {/* Particles Background (permanent) */}
      <Particles />

      {/* Scène 1 : Logo + Mission */}
      <Sequence from={0} durationInFrames={scene1Duration}>
        <Scene1_Logo duration={scene1Duration} />
      </Sequence>

      {/* Scène 2 : Problème */}
      <Sequence from={scene1Duration} durationInFrames={scene2Duration}>
        <Scene2_Problem duration={scene2Duration} />
      </Sequence>

      {/* Scène 3 : Features */}
      <Sequence from={scene1Duration + scene2Duration} durationInFrames={scene3Duration}>
        <Scene3_Features duration={scene3Duration} />
      </Sequence>

      {/* Scène 4 : Stats */}
      <Sequence from={scene1Duration + scene2Duration + scene3Duration} durationInFrames={scene4Duration}>
        <Scene4_Stats duration={scene4Duration} />
      </Sequence>

      {/* Scène 5 : Pricing */}
      <Sequence from={scene1Duration + scene2Duration + scene3Duration + scene4Duration} durationInFrames={scene5Duration}>
        <Scene5_Pricing duration={scene5Duration} />
      </Sequence>

      {/* Scène 6 : CTA */}
      <Sequence from={scene1Duration + scene2Duration + scene3Duration + scene4Duration + scene5Duration} durationInFrames={scene6Duration}>
        <Scene6_CTA duration={scene6Duration} />
      </Sequence>
    </AbsoluteFill>
  );
};
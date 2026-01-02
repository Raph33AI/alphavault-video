import { AbsoluteFill, Sequence } from 'remotion';
import { Scene1_Logo } from './scenes/Scene1_Logo';
import { Scene2_Problem } from './scenes/Scene2_Problem';
import { Scene3_Features } from './scenes/Scene3_Features';
import { Scene4_Stats } from './scenes/Scene4_Stats';
import { Scene5_Pricing } from './scenes/Scene5_Pricing';
import { Scene6_CTA } from './scenes/Scene6_CTA';
import { HeroBackground } from './components/HeroBackground';

export const Video = () => {
  // Durées réduites (60 FPS)
  const scene1Duration = 240; // 4s
  const scene2Duration = 300; // 5s
  const scene3Duration = 480; // 8s
  const scene4Duration = 360; // 6s
  const scene5Duration = 420; // 7s
  const scene6Duration = 300; // 5s
  // Total: 35s

  return (
    <AbsoluteFill>
      {/* Background permanent (orbes + grille) */}
      <HeroBackground />

      <Sequence from={0} durationInFrames={scene1Duration}>
        <Scene1_Logo duration={scene1Duration} />
      </Sequence>

      <Sequence from={scene1Duration} durationInFrames={scene2Duration}>
        <Scene2_Problem duration={scene2Duration} />
      </Sequence>

      <Sequence from={scene1Duration + scene2Duration} durationInFrames={scene3Duration}>
        <Scene3_Features duration={scene3Duration} />
      </Sequence>

      <Sequence from={scene1Duration + scene2Duration + scene3Duration} durationInFrames={scene4Duration}>
        <Scene4_Stats duration={scene4Duration} />
      </Sequence>

      <Sequence from={scene1Duration + scene2Duration + scene3Duration + scene4Duration} durationInFrames={scene5Duration}>
        <Scene5_Pricing duration={scene5Duration} />
      </Sequence>

      <Sequence from={scene1Duration + scene2Duration + scene3Duration + scene4Duration + scene5Duration} durationInFrames={scene6Duration}>
        <Scene6_CTA duration={scene6Duration} />
      </Sequence>
    </AbsoluteFill>
  );
};
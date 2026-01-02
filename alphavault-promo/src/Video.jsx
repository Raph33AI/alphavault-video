import { AbsoluteFill, Sequence } from 'remotion';
import { Scene1_Hero } from './scenes/Scene1_Hero';
import { Scene2_Problem } from './scenes/Scene2_Problem';
import { Scene3_Features } from './scenes/Scene3_Features';
import { Scene4_Stats } from './scenes/Scene4_Stats';
import { Scene5_Pricing } from './scenes/Scene5_Pricing';
import { Scene6_CTA } from './scenes/Scene6_CTA';
import { Background3D } from './components/Background3D';
import { SceneTransition } from './components/SceneTransition';

export const Video = () => {
  const scene1Duration = 240; // 4s
  const scene2Duration = 300; // 5s
  const scene3Duration = 480; // 8s
  const scene4Duration = 360; // 6s
  const scene5Duration = 420; // 7s
  const scene6Duration = 300; // 5s

  const transitionDuration = 20; // 0.33s overlap for smooth transitions

  return (
    <AbsoluteFill style={{ 
      fontFamily: "'Satoshi', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      overflow: 'hidden',
    }}>
      <link rel="stylesheet" href="/fonts.css" />
      
      {/* Background permanent */}
      <Background3D />

      {/* Scene 1: Hero */}
      <Sequence from={0} durationInFrames={scene1Duration}>
        <Scene1_Hero duration={scene1Duration} />
      </Sequence>

      {/* Transition 1 → 2 */}
      <Sequence from={scene1Duration - transitionDuration} durationInFrames={transitionDuration}>
        <SceneTransition type="wipe-left" />
      </Sequence>

      {/* Scene 2: Problem */}
      <Sequence from={scene1Duration} durationInFrames={scene2Duration}>
        <Scene2_Problem duration={scene2Duration} />
      </Sequence>

      {/* Transition 2 → 3 */}
      <Sequence from={scene1Duration + scene2Duration - transitionDuration} durationInFrames={transitionDuration}>
        <SceneTransition type="zoom-rotate" />
      </Sequence>

      {/* Scene 3: Features */}
      <Sequence from={scene1Duration + scene2Duration} durationInFrames={scene3Duration}>
        <Scene3_Features duration={scene3Duration} />
      </Sequence>

      {/* Transition 3 → 4 */}
      <Sequence from={scene1Duration + scene2Duration + scene3Duration - transitionDuration} durationInFrames={transitionDuration}>
        <SceneTransition type="wipe-right" />
      </Sequence>

      {/* Scene 4: Stats */}
      <Sequence from={scene1Duration + scene2Duration + scene3Duration} durationInFrames={scene4Duration}>
        <Scene4_Stats duration={scene4Duration} />
      </Sequence>

      {/* Transition 4 → 5 */}
      <Sequence from={scene1Duration + scene2Duration + scene3Duration + scene4Duration - transitionDuration} durationInFrames={transitionDuration}>
        <SceneTransition type="curtain" />
      </Sequence>

      {/* Scene 5: Pricing */}
      <Sequence from={scene1Duration + scene2Duration + scene3Duration + scene4Duration} durationInFrames={scene5Duration}>
        <Scene5_Pricing duration={scene5Duration} />
      </Sequence>

      {/* Transition 5 → 6 */}
      <Sequence from={scene1Duration + scene2Duration + scene3Duration + scene4Duration + scene5Duration - transitionDuration} durationInFrames={transitionDuration}>
        <SceneTransition type="fade" />
      </Sequence>

      {/* Scene 6: CTA */}
      <Sequence from={scene1Duration + scene2Duration + scene3Duration + scene4Duration + scene5Duration} durationInFrames={scene6Duration}>
        <Scene6_CTA duration={scene6Duration} />
      </Sequence>
    </AbsoluteFill>
  );
};
import { gsap } from 'gsap';

// Simulate DrawSVG for logo paths
export const drawSVGPath = (element, duration = 1.5, ease = 'power2.out') => {
  const length = element.getTotalLength?.() || 500;
  
  gsap.set(element, {
    strokeDasharray: length,
    strokeDashoffset: length,
  });

  return gsap.to(element, {
    strokeDashoffset: 0,
    duration,
    ease,
  });
};

// Split text animation (character by character)
export const animateTextSplit = (element, delay = 0) => {
  const text = element.textContent;
  const chars = text.split('');
  
  element.innerHTML = chars
    .map((char, i) => `<span style="display:inline-block;opacity:0;transform:translateY(100px) rotateX(-90deg);">${char === ' ' ? '&nbsp;' : char}</span>`)
    .join('');

  const charElements = element.querySelectorAll('span');

  return gsap.to(charElements, {
    opacity: 1,
    y: 0,
    rotationX: 0,
    duration: 0.8,
    stagger: 0.03,
    ease: 'back.out(2)',
    delay,
  });
};

// 3D Flip animation
export const flip3D = (element, direction = 'horizontal') => {
  const axis = direction === 'horizontal' ? 'rotationY' : 'rotationX';
  
  return gsap.timeline()
    .set(element, { transformStyle: 'preserve-3d', transformPerspective: 1000 })
    .from(element, {
      [axis]: 90,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
    });
};

// Magnetic hover effect
export const magneticEffect = (element, strength = 20) => {
  return {
    onUpdate: (self) => {
      const progress = self.progress;
      const x = Math.sin(progress * Math.PI * 2) * strength;
      const y = Math.cos(progress * Math.PI * 2) * strength;
      
      gsap.to(element, {
        x,
        y,
        duration: 0.3,
        ease: 'power2.out',
      });
    },
  };
};

// Curve motion path
export const curveMotion = (element, points, duration = 2) => {
  return gsap.to(element, {
    motionPath: {
      path: points,
      align: 'self',
      autoRotate: true,
      alignOrigin: [0.5, 0.5],
    },
    duration,
    ease: 'power1.inOut',
  });
};

// Glitch effect
export const glitchText = (element, duration = 0.5) => {
  const originalText = element.textContent;
  const glitchChars = '!<>-_\\/[]{}—=+*^?#________';
  
  const tl = gsap.timeline();
  
  for (let i = 0; i < 10; i++) {
    tl.to(element, {
      duration: 0.05,
      onStart: () => {
        element.textContent = originalText
          .split('')
          .map((char) => Math.random() < 0.3 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char)
          .join('');
      },
    });
  }
  
  tl.set(element, {
    onComplete: () => {
      element.textContent = originalText;
    },
  });
  
  return tl;
};

// Morph between elements (FLIP technique simulation)
export const morphTransition = (fromEl, toEl, duration = 1) => {
  const fromBounds = fromEl.getBoundingClientRect();
  const toBounds = toEl.getBoundingClientRect();
  
  const scaleX = fromBounds.width / toBounds.width;
  const scaleY = fromBounds.height / toBounds.height;
  const deltaX = fromBounds.left - toBounds.left;
  const deltaY = fromBounds.top - toBounds.top;
  
  return gsap.timeline()
    .set(toEl, {
      x: deltaX,
      y: deltaY,
      scaleX,
      scaleY,
      opacity: 0,
    })
    .to(fromEl, {
      opacity: 0,
      duration: duration / 2,
    })
    .to(toEl, {
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      opacity: 1,
      duration,
      ease: 'power2.inOut',
    }, `-=${duration / 2}`);
};

// Particle burst
export const particleBurst = (container, count = 20, color = '#667eea') => {
  const particles = [];
  
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      width: 8px;
      height: 8px;
      background: ${color};
      border-radius: 50%;
      pointer-events: none;
    `;
    container.appendChild(particle);
    particles.push(particle);
  }
  
  const tl = gsap.timeline({
    onComplete: () => particles.forEach(p => p.remove()),
  });
  
  particles.forEach((particle, i) => {
    const angle = (i / count) * Math.PI * 2;
    const distance = 100 + Math.random() * 100;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    
    tl.to(particle, {
      x,
      y,
      opacity: 0,
      scale: 0,
      duration: 1.5,
      ease: 'power2.out',
    }, 0);
  });
  
  return tl;
};

// Custom easing curves
export const customEases = {
  elastic: 'elastic.out(1, 0.3)',
  bounce: 'bounce.out',
  smooth: 'power4.inOut',
  snap: 'back.out(3)',
  slow: 'slow(0.7, 0.7, false)',
};
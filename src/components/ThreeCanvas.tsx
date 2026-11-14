import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ThreeCanvasProps {
  interactive?: boolean;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ interactive = true }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [wireframeMode, setWireframeMode] = useState<boolean>(false);
  const [particlesActive, setParticlesActive] = useState<boolean>(true);
  const [rotationSpeed, setRotationSpeed] = useState<number>(1);
  const [isSoftwareMode, setIsSoftwareMode] = useState<boolean>(false);
  const wireframeRef = useRef<boolean>(false);
  const particlesRef = useRef<boolean>(true);
  const speedRef = useRef<number>(1);

  // Sync refs for animation loop
  useEffect(() => {
    wireframeRef.current = wireframeMode;
  }, [wireframeMode]);

  useEffect(() => {
    particlesRef.current = particlesActive;
  }, [particlesActive]);

  useEffect(() => {
    speedRef.current = rotationSpeed;
  }, [rotationSpeed]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Software WebGL Detection per Three.js guidelines
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    setIsSoftwareMode(isSoftwareGl);

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020817, 0.035);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 8);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x07152b, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x00e5ff, 2.5);
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x008cff, 2.0);
    rimLight.position.set(-5, -3, -2);
    scene.add(rimLight);

    const pointLight = new THREE.PointLight(0x00e5ff, 3, 15);
    pointLight.position.set(0, 0, 2);
    scene.add(pointLight);

    // 1. Procedural 3D Floating Developer Geometry Group
    const objectsGroup = new THREE.Group();
    scene.add(objectsGroup);

    // Central Floating Tech Core: Torus Knot + Outer Icosahedron Ring
    const torusGeometry = new THREE.TorusKnotGeometry(1.2, 0.32, 80, 16);
    const torusMaterial = new THREE.MeshStandardMaterial({
      color: 0x008cff,
      emissive: 0x002447,
      roughness: 0.25,
      metalness: 0.85,
      wireframe: false,
    });
    const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
    objectsGroup.add(torusMesh);

    // Outer Holographic Shield (Icosahedron)
    const icoGeometry = new THREE.IcosahedronGeometry(2.3, 1);
    const icoMaterial = new THREE.MeshStandardMaterial({
      color: 0x00e5ff,
      emissive: 0x003344,
      roughness: 0.3,
      metalness: 0.9,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const icoMesh = new THREE.Mesh(icoGeometry, icoMaterial);
    objectsGroup.add(icoMesh);

    // Orbiting Satellite Octahedrons (Logic & Algorithms)
    const satellites: THREE.Mesh[] = [];
    const satCount = 4;
    const satGeometry = new THREE.OctahedronGeometry(0.35);
    const satMaterial = new THREE.MeshStandardMaterial({
      color: 0x00e5ff,
      emissive: 0x005577,
      roughness: 0.2,
      metalness: 0.95,
    });

    for (let i = 0; i < satCount; i++) {
      const sat = new THREE.Mesh(satGeometry, satMaterial.clone());
      satellites.push(sat);
      objectsGroup.add(sat);
    }

    // Floating Cyber Grid Ring
    const ringGeometry = new THREE.RingGeometry(3.2, 3.25, 64);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
    });
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh.rotation.x = Math.PI / 2.3;
    objectsGroup.add(ringMesh);

    // 2. Futuristic Particle Starfield
    const particleCount = isSoftwareGl ? 350 : 800;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 30;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 25;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      particleScales[i] = Math.random() * 2 + 0.5;
    }

    particleGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePositions, 3)
    );

    // Procedural glowing particle texture via Canvas
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(0, 229, 255, 1)');
      grad.addColorStop(0.3, 'rgba(0, 140, 255, 0.7)');
      grad.addColorStop(1, 'rgba(0, 8, 23, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 32, 32);
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.15,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: 0x00e5ff,
      opacity: 0.75,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Mouse Tracking for Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop with Software-WebGL Pacing
    let frameId = 0;
    let lastTime = performance.now();
    let totalTime = 0;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 8);
        } else {
          gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 60);
        }
      };
      frameId = window.setTimeout(poll, 8);
    }

    const tick = () => {
      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      totalTime += delta;
      const elapsedTime = totalTime;
      const speed = speedRef.current;

      // Update wireframe mode dynamically
      torusMaterial.wireframe = wireframeRef.current;
      particles.visible = particlesRef.current;

      // Parallax smooth camera drift
      targetX += (mouseX * 0.8 - targetX) * 0.05;
      targetY += (mouseY * 0.8 - targetY) * 0.05;
      camera.position.x = targetX;
      camera.position.y = targetY;
      camera.lookAt(0, 0, 0);

      // Core rotation
      torusMesh.rotation.x += delta * 0.4 * speed;
      torusMesh.rotation.y += delta * 0.6 * speed;
      icoMesh.rotation.x -= delta * 0.2 * speed;
      icoMesh.rotation.y -= delta * 0.3 * speed;
      ringMesh.rotation.z += delta * 0.15 * speed;

      // Orbiting satellites
      const satRadius = 3.6;
      satellites.forEach((sat, idx) => {
        const angle = elapsedTime * 0.7 * speed + (idx * Math.PI * 2) / satCount;
        sat.position.x = Math.cos(angle) * satRadius;
        sat.position.y = Math.sin(angle * 1.5) * 1.2;
        sat.position.z = Math.sin(angle) * satRadius;
        sat.rotation.x += delta * 1.5;
        sat.rotation.y += delta * 2.0;
      });

      // Slowly rotate particle field
      if (particlesRef.current) {
        particles.rotation.y += delta * 0.04 * speed;
        particles.rotation.x += delta * 0.02 * speed;
      }

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    // Kickoff loop
    if (isSoftwareGl) {
      afterDraw(tick);
    } else {
      frameId = requestAnimationFrame(tick);
    }

    // Cleanup
    return () => {
      if (isSoftwareGl) {
        clearTimeout(frameId);
      } else {
        cancelAnimationFrame(frameId);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      // Dispose geometry and materials
      torusGeometry.dispose();
      torusMaterial.dispose();
      icoGeometry.dispose();
      icoMaterial.dispose();
      satGeometry.dispose();
      satMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      particleTexture.dispose();
      renderer.dispose();

      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[500px]">
      <div ref={mountRef} className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none" />
    </div>
  );
};

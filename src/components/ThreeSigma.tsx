import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeSigmaProps {
  isActive?: boolean;
  isRevealed?: boolean;
}

export const ThreeSigma: React.FC<ThreeSigmaProps> = ({
  isActive = true,
  isRevealed = true,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const isRevealedRef = useRef<boolean>(isRevealed);
  const isActiveRef = useRef<boolean>(isActive);

  // Keep refs up to date for the animation loop
  useEffect(() => {
    isRevealedRef.current = isRevealed;
  }, [isRevealed]);

  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Detect software WebGL or low-power GPU
    const isSoftwareGl = (() => {
      try {
        const testCanvas = document.createElement('canvas');
        const gl = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    // Check for reduced motion preference
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 2. Scene & Camera Setup
    const scene = new THREE.Scene();

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 100);
    // Position camera so Sigma has a powerful, statuesque presence behind the avatar
    camera.position.set(0, 0, 9.8);

    // 3. Renderer with cinematic tone mapping and transparency
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;

    container.appendChild(renderer.domElement);

    // 4. Procedural 3D Greek Sigma (Σ) Geometry
    // Constructed with clean mathematical proportions and beveled extruded edges
    const sigmaShape = new THREE.Shape();
    const W = 4.8;  // Total width
    const H = 6.0;  // Total height
    const T = 0.95; // Bar thickness

    // Counter-clockwise polygon contour for the Greek capital Sigma (Σ):
    sigmaShape.moveTo(W, H);                             // Top-right outer corner
    sigmaShape.lineTo(0, H);                             // Top-left outer corner
    sigmaShape.lineTo(W * 0.44, H * 0.5);                // Central inner notch apex
    sigmaShape.lineTo(0, 0);                             // Bottom-left outer corner
    sigmaShape.lineTo(W, 0);                             // Bottom-right outer corner
    sigmaShape.lineTo(W, T);                             // Bottom-right inner corner
    sigmaShape.lineTo(1.4, T);                           // Bottom horizontal-to-diagonal turn
    sigmaShape.lineTo(W * 0.44 + T * 0.95, H * 0.5);     // Inner center notch tip
    sigmaShape.lineTo(1.4, H - T);                       // Top diagonal-to-horizontal turn
    sigmaShape.lineTo(W, H - T);                         // Top-right inner corner
    sigmaShape.closePath();

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 0.52,
      bevelEnabled: true,
      bevelThickness: 0.14,
      bevelSize: 0.09,
      bevelOffset: 0,
      bevelSegments: 4,
      steps: 1,
    };

    const sigmaGeometry = new THREE.ExtrudeGeometry(sigmaShape, extrudeSettings);
    // Center geometry so rotation happens symmetrically around its vertical Y-axis
    sigmaGeometry.center();
    sigmaGeometry.computeVertexNormals();

    // 5. Dark Purple Metallic Surface Material
    const sigmaMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x160829, // Deep obsidian purple
      emissive: 0x1f073a, // Subtle internal purple glow
      emissiveIntensity: 0.35,
      metalness: 0.92, // High metallicity for realistic metallic sheen
      roughness: 0.18, // Smooth gloss with sharp reflections
      clearcoat: 0.8,
      clearcoatRoughness: 0.15,
      reflectivity: 0.95,
    });

    const sigmaMesh = new THREE.Mesh(sigmaGeometry, sigmaMaterial);

    // 6. Bright Violet Neon Edges (Edge Lines)
    const edgesGeometry = new THREE.EdgesGeometry(sigmaGeometry, 26);
    const edgesMaterial = new THREE.LineBasicMaterial({
      color: 0xc084fc, // Bright violet lavender neon
      linewidth: 2,
      transparent: true,
      opacity: 0.72,
      blending: THREE.AdditiveBlending,
    });
    const edgeLines = new THREE.LineSegments(edgesGeometry, edgesMaterial);
    sigmaMesh.add(edgeLines);

    // 7. Grouping & Scaling for Responsiveness
    const sigmaGroup = new THREE.Group();
    sigmaGroup.add(sigmaMesh);
    scene.add(sigmaGroup);

    // Responsive scaling based on viewport width
    const updateSigmaScale = () => {
      const curWidth = window.innerWidth;
      if (curWidth < 640) {
        // Mobile: scaled down slightly to avoid overcrowding text
        sigmaGroup.scale.set(0.68, 0.68, 0.68);
        sigmaGroup.position.set(0, 0.2, 0);
      } else if (curWidth < 1024) {
        // Tablet
        sigmaGroup.scale.set(0.85, 0.85, 0.85);
        sigmaGroup.position.set(0, 0.1, 0);
      } else {
        // Desktop
        sigmaGroup.scale.set(1.08, 1.08, 1.08);
        sigmaGroup.position.set(0, 0, 0);
      }
    };
    updateSigmaScale();

    // 8. Cinematic Studio Lighting
    // Ambient deep dark purple tone
    const ambientLight = new THREE.AmbientLight(0x18092d, 1.4);
    scene.add(ambientLight);

    // Bright violet front key light highlighting metallic surface
    const frontKeyLight = new THREE.PointLight(0xc084fc, 4.2, 18);
    frontKeyLight.position.set(2.5, 3.2, 6);
    scene.add(frontKeyLight);

    // Deep purple rim light from behind for silhouette definition
    const backRimLight = new THREE.PointLight(0xa855f7, 5.0, 22);
    backRimLight.position.set(-3, -2, -4);
    scene.add(backRimLight);

    // Secondary subtle fill light
    const fillLight = new THREE.DirectionalLight(0x7e22ce, 1.8);
    fillLight.position.set(-5, 4, 3);
    scene.add(fillLight);

    // 9. Interactive Mouse Tracking & Parallax
    let targetParallaxX = 0;
    let targetParallaxY = 0;
    let currentParallaxX = 0;
    let currentParallaxY = 0;
    let isMouseOverHero = false;

    const handleMouseMove = (e: MouseEvent) => {
      isMouseOverHero = true;
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;

      // Slight mouse-follow parallax rotation angles (in radians)
      targetParallaxY = normX * 0.45;
      targetParallaxX = -normY * 0.28;
    };

    const handleMouseLeave = () => {
      isMouseOverHero = false;
      // Smoothly return to center
      targetParallaxX = 0;
      targetParallaxY = 0;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || window.innerWidth;
      const newH = container.clientHeight || window.innerHeight;

      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
      updateSigmaScale();
    };

    window.addEventListener('resize', handleResize);

    // 10. Animation Loop
    let animationFrameId = 0;
    let lastTime = performance.now();
    let totalTime = 0;
    let baseRotationY = 0;

    const tick = () => {
      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Only perform rendering updates if active
      if (isActiveRef.current) {
        totalTime += delta;

        // Smooth rotation speed: slower if reduced motion requested
        const rotSpeed = prefersReducedMotion ? 0.08 : 0.26;
        baseRotationY += delta * rotSpeed;

        // Inertial damping towards target parallax; returns smoothly when mouse leaves
        const lerpFactor = isMouseOverHero ? 0.05 : 0.035;
        currentParallaxX += (targetParallaxX - currentParallaxX) * lerpFactor;
        currentParallaxY += (targetParallaxY - currentParallaxY) * lerpFactor;

        // Apply continuous Y rotation + mouse parallax
        sigmaMesh.rotation.y = baseRotationY + currentParallaxY;

        // Gentle floating movement and subtle tilt
        const floatSpeed = prefersReducedMotion ? 0.6 : 1.25;
        const floatAmp = prefersReducedMotion ? 0.06 : 0.16;
        sigmaMesh.position.y = Math.sin(totalTime * floatSpeed) * floatAmp;
        sigmaMesh.rotation.x = currentParallaxX + Math.sin(totalTime * 0.8) * 0.04;
        sigmaMesh.rotation.z = Math.sin(totalTime * 0.6) * 0.03;

        // Gentle edge line opacity pulse for neon vibrancy
        const edgePulse = 0.65 + Math.sin(totalTime * 1.8) * 0.18;
        edgesMaterial.opacity = edgePulse;

        // Subtle light movement for realistic specular reflections
        frontKeyLight.position.x = 2.5 + Math.sin(totalTime * 0.7) * 1.5;
        frontKeyLight.position.y = 3.2 + Math.cos(totalTime * 0.9) * 1.2;

        renderer.render(scene, camera);
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    // Cleanup resources on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);

      sigmaGeometry.dispose();
      sigmaMaterial.dispose();
      edgesGeometry.dispose();
      edgesMaterial.dispose();
      renderer.dispose();

      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-1000 ease-out z-[4] flex items-center justify-center ${
        isRevealed ? 'opacity-100' : 'opacity-25'
      }`}
      aria-hidden="true"
    />
  );
};

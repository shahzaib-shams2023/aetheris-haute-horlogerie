import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export type MaterialTheme = 'titanium' | 'rose-gold' | 'obsidian' | 'platinum';

interface WatchCanvasProps {
  explodeDistance?: number; // 0 to 1
  activeLayer?: number | null; // 0: sapphire, 1: dial, 2: gears, 3: tourbillon, 4: chassis
  materialTheme?: MaterialTheme;
  interactive?: boolean;
  className?: string;
}

export const WatchCanvas: React.FC<WatchCanvasProps> = ({
  explodeDistance = 0,
  activeLayer = null,
  materialTheme = 'titanium',
  interactive = true,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const explodeTargetRef = useRef<number>(explodeDistance);
  const activeLayerRef = useRef<number | null>(activeLayer);
  const themeRef = useRef<MaterialTheme>(materialTheme);

  explodeTargetRef.current = explodeDistance;
  activeLayerRef.current = activeLayer;
  themeRef.current = materialTheme;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL support
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      return;
    }

    // SCENE SETUP
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07080b, 0.04);

    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff4e0, 2.2);
    keyLight.position.set(5, 6, 8);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.8);
    rimLight.position.set(-6, -4, -4);
    scene.add(rimLight);

    const goldAccentLight = new THREE.PointLight(0xd4af37, 2.0, 15);
    goldAccentLight.position.set(0, 2, 4);
    scene.add(goldAccentLight);

    // MASTER HOROLOGICAL RIG
    const watchRig = new THREE.Group();
    scene.add(watchRig);

    // MATERIAL DEFINITIONS
    const getThemeColors = (theme: MaterialTheme) => {
      switch (theme) {
        case 'rose-gold':
          return { caseColor: 0xe8a588, metalness: 0.95, roughness: 0.22, name: '18K 4N Rose Gold' };
        case 'obsidian':
          return { caseColor: 0x1f232b, metalness: 0.85, roughness: 0.38, name: 'DLC Forged Carbon' };
        case 'platinum':
          return { caseColor: 0xf1f5f9, metalness: 0.98, roughness: 0.14, name: '950 Platinum' };
        case 'titanium':
        default:
          return { caseColor: 0xd0d7de, metalness: 0.92, roughness: 0.26, name: 'Grade 5 Titanium' };
      }
    };

    const currentTheme = getThemeColors(themeRef.current);

    const caseMaterial = new THREE.MeshStandardMaterial({
      color: currentTheme.caseColor,
      metalness: currentTheme.metalness,
      roughness: currentTheme.roughness,
    });

    const brassGearMaterial = new THREE.MeshStandardMaterial({
      color: 0xdfb15b,
      metalness: 0.88,
      roughness: 0.28,
    });

    const steelGearMaterial = new THREE.MeshStandardMaterial({
      color: 0xdde3ea,
      metalness: 0.95,
      roughness: 0.2,
    });

    const bluedScrewMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e56a0,
      metalness: 0.9,
      roughness: 0.25,
    });

    const rubyMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xdf1144,
      transmission: 0.6,
      opacity: 0.9,
      transparent: true,
      roughness: 0.1,
      metalness: 0.1,
      ior: 1.77,
    });

    const dialMaterial = new THREE.MeshStandardMaterial({
      color: 0x0a0d14,
      metalness: 0.85,
      roughness: 0.35,
    });

    const sapphireMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.94,
      opacity: 0.35,
      transparent: true,
      roughness: 0.05,
      ior: 1.77,
      metalness: 0.05,
    });

    // 5 CALIBRATED EXPLODABLE LAYERS
    const layer0_Sapphire = new THREE.Group(); // Front
    const layer1_Dial = new THREE.Group();
    const layer2_Gears = new THREE.Group();
    const layer3_Tourbillon = new THREE.Group();
    const layer4_Chassis = new THREE.Group(); // Back

    watchRig.add(layer4_Chassis);
    watchRig.add(layer3_Tourbillon);
    watchRig.add(layer2_Gears);
    watchRig.add(layer1_Dial);
    watchRig.add(layer0_Sapphire);

    // LAYER 4: CASEBACK & CHASSIS
    const caseRingGeo = new THREE.TorusGeometry(2.35, 0.25, 32, 64);
    const caseRing = new THREE.Mesh(caseRingGeo, caseMaterial);
    layer4_Chassis.add(caseRing);

    const baseplateGeo = new THREE.CylinderGeometry(2.3, 2.3, 0.15, 64);
    const baseplate = new THREE.Mesh(baseplateGeo, dialMaterial);
    baseplate.rotation.x = Math.PI / 2;
    baseplate.position.z = -0.15;
    layer4_Chassis.add(baseplate);

    // Decorative perimeter lugs
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2 + Math.PI / 4;
      const lugGeo = new THREE.BoxGeometry(0.3, 0.7, 0.4);
      const lug = new THREE.Mesh(lugGeo, caseMaterial);
      lug.position.set(Math.cos(angle) * 2.5, Math.sin(angle) * 2.5, 0);
      lug.rotation.z = angle;
      layer4_Chassis.add(lug);
    }

    // Crown / Pushers
    const crownGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.5, 24);
    const crown = new THREE.Mesh(crownGeo, caseMaterial);
    crown.rotation.z = Math.PI / 2;
    crown.position.set(2.65, 0, 0);
    layer4_Chassis.add(crown);

    // LAYER 3: TOURBILLON CAGE & BALANCE WHEEL
    const tourbillonCage = new THREE.Group();
    tourbillonCage.position.set(0, -0.65, 0.1);
    layer3_Tourbillon.add(tourbillonCage);

    // Outer tourbillon carriage ring
    const cageRingGeo = new THREE.TorusGeometry(0.72, 0.04, 16, 32);
    const cageRing = new THREE.Mesh(cageRingGeo, caseMaterial);
    tourbillonCage.add(cageRing);

    // Inner balance wheel
    const balanceGeo = new THREE.TorusGeometry(0.55, 0.035, 16, 32);
    const balanceWheel = new THREE.Mesh(balanceGeo, brassGearMaterial);
    tourbillonCage.add(balanceWheel);

    // Balance screws & spokes
    for (let j = 0; j < 4; j++) {
      const spokeGeo = new THREE.CylinderGeometry(0.02, 0.02, 1.1, 8);
      const spoke = new THREE.Mesh(spokeGeo, steelGearMaterial);
      spoke.rotation.z = (j * Math.PI) / 2;
      tourbillonCage.add(spoke);
    }

    // Synthetic ruby endstone bearings
    const rubyGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const topRuby = new THREE.Mesh(rubyGeo, rubyMaterial);
    topRuby.position.set(0, 0, 0.12);
    tourbillonCage.add(topRuby);

    const botRuby = new THREE.Mesh(rubyGeo, rubyMaterial);
    botRuby.position.set(0, 0, -0.12);
    tourbillonCage.add(botRuby);

    // LAYER 2: INTERLOCKING GEAR TRAIN
    const gearList: { mesh: THREE.Group; speed: number }[] = [];

    const createGear = (radius: number, teeth: number, mat: THREE.Material, zPos: number) => {
      const gearGroup = new THREE.Group();
      const discGeo = new THREE.CylinderGeometry(radius * 0.88, radius * 0.88, 0.05, 32);
      const disc = new THREE.Mesh(discGeo, mat);
      disc.rotation.x = Math.PI / 2;
      gearGroup.add(disc);

      // Tooth perimeter
      const toothGeo = new THREE.BoxGeometry(0.06, 0.12, 0.05);
      for (let t = 0; t < teeth; t++) {
        const theta = (t / teeth) * Math.PI * 2;
        const tooth = new THREE.Mesh(toothGeo, mat);
        tooth.position.set(Math.cos(theta) * radius, Math.sin(theta) * radius, 0);
        tooth.rotation.z = theta;
        gearGroup.add(tooth);
      }

      gearGroup.position.z = zPos;
      return gearGroup;
    };

    // Center driving wheel
    const gear1 = createGear(0.85, 28, brassGearMaterial, 0.05);
    gear1.position.set(-0.7, 0.6, 0.05);
    layer2_Gears.add(gear1);
    gearList.push({ mesh: gear1, speed: 0.8 });

    // Escapement pinion
    const gear2 = createGear(0.55, 18, steelGearMaterial, 0.05);
    gear2.position.set(0.65, 0.7, 0.05);
    layer2_Gears.add(gear2);
    gearList.push({ mesh: gear2, speed: -1.24 });

    // Intermediate transfer wheel
    const gear3 = createGear(0.42, 14, brassGearMaterial, 0.08);
    gear3.position.set(0.0, 1.25, 0.08);
    layer2_Gears.add(gear3);
    gearList.push({ mesh: gear3, speed: 1.63 });

    // Blued screws across bridges
    const screwPositions = [
      [-1.2, 0.2],
      [1.1, 0.3],
      [-0.4, 1.4],
      [0.8, -1.2],
      [-0.8, -1.1],
    ];
    screwPositions.forEach(([x, y]) => {
      const screwGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.06, 16);
      const screw = new THREE.Mesh(screwGeo, bluedScrewMaterial);
      screw.rotation.x = Math.PI / 2;
      screw.position.set(x, y, 0.12);
      layer2_Gears.add(screw);
    });

    // LAYER 1: CELESTIAL DIAL FACE
    const dialOuterGeo = new THREE.RingGeometry(1.65, 2.25, 64);
    const dialRing = new THREE.Mesh(dialOuterGeo, dialMaterial);
    layer1_Dial.add(dialRing);

    // Celestial Equator & Ecliptic Orbital Rings
    const celestialRingGeo1 = new THREE.TorusGeometry(1.4, 0.02, 16, 64);
    const celestialRing1 = new THREE.Mesh(celestialRingGeo1, brassGearMaterial);
    celestialRing1.rotation.x = 0.3;
    layer1_Dial.add(celestialRing1);

    const celestialRingGeo2 = new THREE.TorusGeometry(1.1, 0.015, 16, 64);
    const celestialRing2 = new THREE.Mesh(celestialRingGeo2, caseMaterial);
    celestialRing2.rotation.y = -0.4;
    layer1_Dial.add(celestialRing2);

    // Hour Markers (Gold baton indices)
    for (let h = 0; h < 12; h++) {
      const theta = (h / 12) * Math.PI * 2;
      const markerGeo = new THREE.BoxGeometry(0.04, 0.22, 0.04);
      const marker = new THREE.Mesh(markerGeo, brassGearMaterial);
      marker.position.set(Math.cos(theta) * 1.95, Math.sin(theta) * 1.95, 0.02);
      marker.rotation.z = theta;
      layer1_Dial.add(marker);
    }

    // Hands
    const hourHandGroup = new THREE.Group();
    const hourGeo = new THREE.BoxGeometry(0.05, 1.1, 0.03);
    const hourMesh = new THREE.Mesh(hourGeo, brassGearMaterial);
    hourMesh.position.y = 0.55;
    hourHandGroup.add(hourMesh);
    hourHandGroup.position.z = 0.15;
    layer1_Dial.add(hourHandGroup);

    const minuteHandGroup = new THREE.Group();
    const minGeo = new THREE.BoxGeometry(0.035, 1.6, 0.025);
    const minMesh = new THREE.Mesh(minGeo, bluedScrewMaterial);
    minMesh.position.y = 0.8;
    minuteHandGroup.add(minMesh);
    minuteHandGroup.position.z = 0.18;
    layer1_Dial.add(minuteHandGroup);

    // LAYER 0: SAPPHIRE CRYSTAL DOME
    const crystalGeo = new THREE.CylinderGeometry(2.32, 2.32, 0.12, 64);
    const crystal = new THREE.Mesh(crystalGeo, sapphireMaterial);
    crystal.rotation.x = Math.PI / 2;
    layer0_Sapphire.add(crystal);

    const bezelGeo = new THREE.TorusGeometry(2.34, 0.08, 16, 64);
    const bezel = new THREE.Mesh(bezelGeo, caseMaterial);
    layer0_Sapphire.add(bezel);

    // INTERACTION & DRAG ROTATION
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    const targetRotation = { x: 0.15, y: -0.25 };
    const currentRotation = { x: 0.15, y: -0.25 };
    const mouseNormalized = { x: 0, y: 0 };

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (!interactive) return;
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const rect = container.getBoundingClientRect();
      mouseNormalized.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouseNormalized.y = -(((clientY - rect.top) / rect.height) * 2 - 1);

      if (isDragging && interactive) {
        const deltaX = clientX - prevMouseX;
        const deltaY = clientY - prevMouseY;
        targetRotation.y += deltaX * 0.008;
        targetRotation.x += deltaY * 0.008;
        // Limit X pitch to prevent flipping
        targetRotation.x = Math.max(-0.9, Math.min(0.9, targetRotation.x));
        prevMouseX = clientX;
        prevMouseY = clientY;
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    container.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // ANIMATION LOOP
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth rotation damping
      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.08;
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.08;

      // Subtle resting float
      const idleFloatX = Math.sin(elapsedTime * 0.8) * 0.03;
      const idleFloatY = Math.cos(elapsedTime * 0.6) * 0.03;

      watchRig.rotation.x = currentRotation.x + idleFloatX;
      watchRig.rotation.y = currentRotation.y + idleFloatY;

      // Dynamic cursor light
      goldAccentLight.position.x = mouseNormalized.x * 4;
      goldAccentLight.position.y = mouseNormalized.y * 4 + 2;

      // Mechanical gear animations
      gearList.forEach(({ mesh, speed }) => {
        mesh.rotation.z += speed * delta * 1.5;
      });

      // Tourbillon rotation (tri-axial movement)
      tourbillonCage.rotation.z += delta * 1.8;
      tourbillonCage.rotation.y = Math.sin(elapsedTime * 2.2) * 0.35;
      balanceWheel.rotation.z = Math.sin(elapsedTime * 18.0) * 0.85; // 4Hz vibration

      // Hands movement
      minuteHandGroup.rotation.z = -elapsedTime * 0.08;
      hourHandGroup.rotation.z = -elapsedTime * 0.0067;

      // Celestial orbit ring drift
      celestialRing1.rotation.z += delta * 0.25;
      celestialRing2.rotation.z -= delta * 0.18;

      // EXPLODED VIEW PROPAGATION
      const exp = explodeTargetRef.current;
      const targetZ0 = exp * 2.2;
      const targetZ1 = exp * 1.1;
      const targetZ2 = exp * 0.0;
      const targetZ3 = exp * -1.0;
      const targetZ4 = exp * -2.2;

      layer0_Sapphire.position.z += (targetZ0 - layer0_Sapphire.position.z) * 0.08;
      layer1_Dial.position.z += (targetZ1 - layer1_Dial.position.z) * 0.08;
      layer2_Gears.position.z += (targetZ2 - layer2_Gears.position.z) * 0.08;
      layer3_Tourbillon.position.z += (targetZ3 - layer3_Tourbillon.position.z) * 0.08;
      layer4_Chassis.position.z += (targetZ4 - layer4_Chassis.position.z) * 0.08;

      // Layer highlighting opacity
      const act = activeLayerRef.current;
      const layers = [layer0_Sapphire, layer1_Dial, layer2_Gears, layer3_Tourbillon, layer4_Chassis];
      layers.forEach((l, idx) => {
        const isDimmed = act !== null && act !== idx;
        const targetScale = isDimmed ? 0.94 : 1.0;
        l.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      });

      // Update material if theme changed dynamically
      const themeConfig = getThemeColors(themeRef.current);
      if (caseMaterial.color.getHex() !== themeConfig.caseColor) {
        caseMaterial.color.setHex(themeConfig.caseColor);
        caseMaterial.metalness = themeConfig.metalness;
        caseMaterial.roughness = themeConfig.roughness;
      }

      renderer.render(scene, camera);
    };

    animate();

    // RESIZE LISTENER
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      container.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);

      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [interactive]);

  if (!webglSupported) {
    return (
      <div className={`flex flex-col items-center justify-center border border-surfaceLight bg-surface/50 rounded-2xl p-8 text-center ${className}`}>
        <div className="w-48 h-48 rounded-full border-2 border-gold/40 flex items-center justify-center animate-spin-slow mb-4">
          <div className="w-36 h-36 rounded-full border border-titanium/30 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full border border-breguet/50 flex items-center justify-center">
              <span className="font-mono text-xs text-gold">AE-90</span>
            </div>
          </div>
        </div>
        <p className="font-display tracking-widest text-sm text-gold">CALIBER AE-90 VIRTUAL MATRIX</p>
        <p className="text-xs text-titanium-dark mt-1 font-mono">Hardware WebGL acceleration unavailable. Fallback vector schematics active.</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full cursor-grab active:cursor-grabbing select-none ${className}`}
      aria-label="Interactive 3D Caliber AE-90 Astronomical Tourbillon Movement"
    />
  );
};

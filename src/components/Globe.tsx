import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { CONTINENTS } from '../data/continents';

// Pittsburgh, PA coordinates
const PITTSBURGH_LAT = 40.44;
const PITTSBURGH_LON = -79.99;

function latLonToVec3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

export function Globe() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // ── Scene, camera, renderer ─────────────────────────────
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // ── Globe group ─────────────────────────────────────────
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const radius = 1.6;

    // Wireframe sphere
    const sphereGeo = new THREE.SphereGeometry(radius, 48, 32);
    const sphereWire = new THREE.LineSegments(
      new THREE.WireframeGeometry(sphereGeo),
      new THREE.LineBasicMaterial({
        color: 0x4fc3f7,
        opacity: 0.08,
        transparent: true,
      }),
    );
    globeGroup.add(sphereWire);

    // Latitude rings
    for (let lat = -60; lat <= 60; lat += 30) {
      const ringRadius = radius * Math.cos((lat * Math.PI) / 180);
      const y = radius * Math.sin((lat * Math.PI) / 180);
      const ringGeo = new THREE.TorusGeometry(ringRadius, 0.01, 16, 80);
      const ring = new THREE.Mesh(
        ringGeo,
        new THREE.MeshBasicMaterial({
          color: 0x4fc3f7,
          opacity: 0.12,
          transparent: true,
        }),
      );
      ring.position.y = y;
      ring.rotation.x = Math.PI / 2;
      globeGroup.add(ring);
    }

    // Longitude rings
    for (let lon = 0; lon < 180; lon += 30) {
      const ringGeo = new THREE.TorusGeometry(radius, 0.01, 16, 80);
      const ring = new THREE.Mesh(
        ringGeo,
        new THREE.MeshBasicMaterial({
          color: 0x4fc3f7,
          opacity: 0.1,
          transparent: true,
        }),
      );
      ring.rotation.y = (lon * Math.PI) / 180;
      globeGroup.add(ring);
    }

    // ── Continent outlines & filled landmasses ─────────────
    const continentGroup = new THREE.Group();

    // Shared materials
    const outlineMat = new THREE.LineBasicMaterial({
      color: 0x4fc3f7,
      opacity: 0.5,
      transparent: true,
    });
    const fillMat = new THREE.MeshBasicMaterial({
      color: 0x4fc3f7,
      opacity: 0.06,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    for (const continent of CONTINENTS) {
      for (const ring of continent.rings) {
        // Project outline points to 3D, slightly above sphere surface
        const outlinePts = ring.map(([lon, lat]) =>
          latLonToVec3(lat, lon, radius * 1.006),
        );

        // Continent outline — use LineLoop to close the polygon
        const outlineGeo = new THREE.BufferGeometry().setFromPoints(outlinePts);
        const outline = new THREE.LineLoop(outlineGeo, outlineMat);
        continentGroup.add(outline);

        // Filled landmass — fan triangulation from 3D centroid
        if (outlinePts.length >= 3) {
          // Compute centroid of projected points, then re-normalize to sphere surface
          const centroid = new THREE.Vector3();
          for (const p of outlinePts) centroid.add(p);
          centroid.divideScalar(outlinePts.length);
          centroid.normalize().multiplyScalar(radius * 1.004);

          // Fan triangles: centroid → edge[i] → edge[i+1]
          const verts: number[] = [];
          for (let i = 0; i < outlinePts.length; i++) {
            const curr = outlinePts[i];
            const next = outlinePts[(i + 1) % outlinePts.length];
            verts.push(
              centroid.x, centroid.y, centroid.z,
              curr.x, curr.y, curr.z,
              next.x, next.y, next.z,
            );
          }

          const fillGeo = new THREE.BufferGeometry();
          fillGeo.setAttribute(
            'position',
            new THREE.Float32BufferAttribute(verts, 3),
          );
          fillGeo.computeVertexNormals();
          const fill = new THREE.Mesh(fillGeo, fillMat);
          continentGroup.add(fill);
        }
      }
    }
    globeGroup.add(continentGroup);

    // ── Sparse ambient dots on oceans ──────────────────────
    const dotsGroup = new THREE.Group();
    const dotGeo = new THREE.SphereGeometry(0.018, 4, 4);
    const dotMat = new THREE.MeshBasicMaterial({ color: 0x4fc3f7, opacity: 0.35, transparent: true });

    // City dot clusters
    const clusters = [
      { lat: 40.44, lon: -79.99 }, // Pittsburgh
      { lat: 40.71, lon: -74.01 }, // New York
      { lat: 51.51, lon: -0.13 },  // London
      { lat: 35.68, lon: 139.76 }, // Tokyo
      { lat: 37.77, lon: -122.42 },// San Francisco
      { lat: -33.87, lon: 151.21 },// Sydney
      { lat: 55.75, lon: 37.62 },  // Moscow
      { lat: 19.43, lon: -99.13 }, // Mexico City
    ];

    for (const cluster of clusters) {
      for (let j = 0; j < 6; j++) {
        const spreadLat = cluster.lat + (Math.random() - 0.5) * 3;
        const spreadLon = cluster.lon + (Math.random() - 0.5) * 3;
        const dot = new THREE.Mesh(dotGeo, dotMat);
        dot.position.copy(latLonToVec3(spreadLat, spreadLon, radius * 1.003));
        dotsGroup.add(dot);
      }
    }
    globeGroup.add(dotsGroup);

    // ── Pittsburgh marker ───────────────────────────────────
    const markerGroup = new THREE.Group();
    const pghPos = latLonToVec3(PITTSBURGH_LAT, PITTSBURGH_LON, radius);
    markerGroup.position.copy(pghPos);

    // Glowing core dot
    const coreGeo = new THREE.SphereGeometry(0.06, 16, 16);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0x4fc3f7 });
    const core = new THREE.Mesh(coreGeo, coreMat);
    markerGroup.add(core);

    // Outer glow ring
    const ringGeo = new THREE.TorusGeometry(0.1, 0.015, 8, 24);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x4fc3f7,
      opacity: 0.7,
      transparent: true,
    });
    const glowRing = new THREE.Mesh(ringGeo, ringMat);
    markerGroup.add(glowRing);

    // Pulsing outer ring
    const pulseRingGeo = new THREE.TorusGeometry(0.14, 0.01, 8, 32);
    const pulseRingMat = new THREE.MeshBasicMaterial({
      color: 0x80cbc4,
      opacity: 0.5,
      transparent: true,
    });
    const pulseRing = new THREE.Mesh(pulseRingGeo, pulseRingMat);
    markerGroup.add(pulseRing);

    globeGroup.add(markerGroup);

    // ── Subtle ambient particles ────────────────────────────
    const particlesGeo = new THREE.BufferGeometry();
    const particlesCount = 60;
    const positionsArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
      const r = radius + 0.3 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positionsArray[i] = r * Math.sin(phi) * Math.cos(theta);
      positionsArray[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      positionsArray[i + 2] = r * Math.cos(phi);
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positionsArray, 3));
    const particlesMat = new THREE.PointsMaterial({
      color: 0x4fc3f7,
      size: 0.02,
      opacity: 0.3,
      transparent: true,
    });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    globeGroup.add(particles);

    // ── Animation loop ──────────────────────────────────────
    let animationId: number;
    const clock = new THREE.Clock();

    function animate() {
      animationId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      // Slow auto-rotation
      globeGroup.rotation.y += delta * 0.12;

      // Pulse the marker rings
      const time = clock.getElapsedTime();
      const pulse = 1 + Math.sin(time * 2) * 0.25;
      pulseRing.scale.setScalar(pulse);
      pulseRingMat.opacity = 0.3 + Math.sin(time * 2) * 0.2;

      // Gentle glow ring rotation
      glowRing.rotation.x += delta * 0.5;
      glowRing.rotation.y += delta * 0.3;

      renderer.render(scene, camera);
    }

    // Initial rotation to make Pittsburgh face camera
    const targetLon = PITTSBURGH_LON * (Math.PI / 180);
    globeGroup.rotation.y = targetLon + Math.PI / 2;
    globeGroup.rotation.x = 0.3; // slight tilt

    animate();

    // ── Resize handler ──────────────────────────────────────
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / Math.max(h, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // ── Cleanup ─────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      // Dispose geometries and materials
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Line) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            (obj.material as THREE.Material).dispose();
          }
        }
        if (obj instanceof THREE.Points) {
          obj.geometry.dispose();
          (obj.material as THREE.Material).dispose();
        }
      });
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full min-h-[280px] md:min-h-[380px]"
      style={{ cursor: 'grab' }}
    />
  );
}

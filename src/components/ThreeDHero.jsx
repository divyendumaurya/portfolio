import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  OrbitControls,
  Sphere,
  MeshDistortMaterial,
  Environment,
  Stars,
} from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
import { Monitor } from "lucide-react";

// Simple Interactive Geometry
const InteractiveGeometry = ({
  position,
  shape = "box",
  color = "#00d2ff",
}) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;

      // Simple mouse interaction
      const targetScale = hovered ? 1.3 : clicked ? 0.7 : 1;
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );
    }
  });

  const geometry = useMemo(() => {
    switch (shape) {
      case "sphere":
        return <sphereGeometry args={[0.6, 16, 16]} />;
      case "torus":
        return <torusGeometry args={[0.6, 0.2, 8, 16]} />;
      case "octahedron":
        return <octahedronGeometry args={[0.6]} />;
      default:
        return <boxGeometry args={[0.8, 0.8, 0.8]} />;
    }
  }, [shape]);

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
        onClick={(e) => {
          e.stopPropagation();
          setClicked(!clicked);
          console.log(`${shape} clicked!`); // Debug log
        }}
      >
        {geometry}
        <meshStandardMaterial
          color={hovered ? "#ffffff" : clicked ? "#ff6b8a" : color}
          roughness={0.3}
          metalness={0.7}
          emissive={hovered ? color : "#000000"}
          emissiveIntensity={hovered ? 0.2 : 0}
        />
      </mesh>
    </Float>
  );
};

// Energy Blast Particle System
const EnergyParticles = ({
  isCharging,
  energy,
  isBlasting,
  centerPosition = [0, 0, 0],
}) => {
  const points = useRef();
  const particleCount = 150;
  const initialPositions = useRef();
  const velocities = useRef();

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const vels = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      // Start particles in a sphere around center
      const radius = 3 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      positions[i * 3] =
        centerPosition[0] + radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] =
        centerPosition[1] + radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = centerPosition[2] + radius * Math.cos(phi);

      // Random velocities for blast
      vels[i * 3] = (Math.random() - 0.5) * 0.3;
      vels[i * 3 + 1] = (Math.random() - 0.5) * 0.3;
      vels[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
    }

    initialPositions.current = positions.slice();
    velocities.current = vels;
    return positions;
  }, [centerPosition]);

  useFrame((state) => {
    if (points.current && initialPositions.current) {
      const positions = points.current.geometry.attributes.position.array;
      const time = state.clock.elapsedTime;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const ix = initialPositions.current[i3];
        const iy = initialPositions.current[i3 + 1];
        const iz = initialPositions.current[i3 + 2];

        if (isBlasting) {
          // Explode outward with velocity
          positions[i3] += velocities.current[i3] * 0.5;
          positions[i3 + 1] += velocities.current[i3 + 1] * 0.5;
          positions[i3 + 2] += velocities.current[i3 + 2] * 0.5;

          // Add some gravity-like effect
          velocities.current[i3 + 1] -= 0.01;
        } else if (isCharging) {
          // Converge towards center
          const convergeFactor = energy * 0.1;
          positions[i3] += (centerPosition[0] - positions[i3]) * convergeFactor;
          positions[i3 + 1] +=
            (centerPosition[1] - positions[i3 + 1]) * convergeFactor;
          positions[i3 + 2] +=
            (centerPosition[2] - positions[i3 + 2]) * convergeFactor;
        } else {
          // Gentle floating motion
          positions[i3] = ix + Math.sin(time + i * 0.1) * 0.1;
          positions[i3 + 1] = iy + Math.cos(time + i * 0.15) * 0.1;
          positions[i3 + 2] = iz + Math.sin(time * 0.5 + i * 0.05) * 0.05;
        }
      }

      points.current.geometry.attributes.position.needsUpdate = true;

      // Gentle overall rotation when not active
      if (!isCharging && !isBlasting) {
        points.current.rotation.y = time * 0.01;
      }
    }
  });

  const particleColor = isBlasting
    ? "#ffffff"
    : isCharging
    ? energy > 0.7
      ? "#ff0040"
      : energy > 0.4
      ? "#ff6b8a"
      : "#ffaa00"
    : "#00d2ff";

  const particleSize = isBlasting
    ? 0.05
    : isCharging
    ? 0.02 + energy * 0.03
    : 0.02;

  const particleOpacity = isBlasting
    ? 0.9
    : isCharging
    ? 0.6 + energy * 0.3
    : 0.4;

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={particleSize}
        color={particleColor}
        transparent
        opacity={particleOpacity}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Enhanced Center Sphere with Clean Energy Blast
const CenterSphere = ({ onStateChange }) => {
  const sphereRef = useRef();
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isCharging, setIsCharging] = useState(false);
  const [energy, setEnergy] = useState(0);
  const [isBlasting, setIsBlasting] = useState(false);
  const chargingTimer = useRef(null);
  const blastTimer = useRef(null);

  const startCharging = () => {
    setIsCharging(true);
    setEnergy(0);
    console.log("🔋 Energy charging started!");

    chargingTimer.current = setInterval(() => {
      setEnergy((prev) => {
        if (prev >= 1) {
          triggerBlast();
          return 1;
        }
        return prev + 0.015; // Slightly slower charge rate for better control
      });
    }, 16);
  };

  const stopCharging = () => {
    if (chargingTimer.current) {
      clearInterval(chargingTimer.current);
      chargingTimer.current = null;
    }

    if (isCharging && energy > 0.15) {
      triggerBlast();
    } else {
      setIsCharging(false);
      setEnergy(0);
    }
  };

  const triggerBlast = () => {
    const power = Math.round(energy * 100);
    console.log(`💥 ENERGY BLAST! Power: ${power}%`);
    setIsCharging(false);
    setIsBlasting(true);
    setEnergy(0);

    blastTimer.current = setTimeout(() => {
      setIsBlasting(false);
    }, 1200); // Longer blast duration
  };

  useFrame((state) => {
    if (sphereRef.current) {
      // Smooth rotation
      sphereRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      sphereRef.current.rotation.y = state.clock.elapsedTime * 0.15;

      let targetScale = 1;
      if (isBlasting) {
        // Clean explosion - quick expand then contract
        const blastProgress = state.clock.elapsedTime % 1.2;
        if (blastProgress < 0.3) {
          targetScale = 1 + (blastProgress / 0.3) * 1.5; // Quick expand
        } else {
          targetScale = 2.5 - ((blastProgress - 0.3) / 0.9) * 1.5; // Slow contract
        }
      } else if (isCharging) {
        targetScale = 1 + energy * 0.5; // Steady growth
      } else if (hovered) {
        targetScale = 1.1;
      }

      sphereRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );
    }
  });

  // Notify parent component about state changes
  React.useEffect(() => {
    if (onStateChange) {
      onStateChange({ isCharging, energy, isBlasting });
    }
  }, [isCharging, energy, isBlasting, onStateChange]);

  React.useEffect(() => {
    return () => {
      if (chargingTimer.current) clearInterval(chargingTimer.current);
      if (blastTimer.current) clearTimeout(blastTimer.current);
    };
  }, []);

  return (
    <Sphere
      ref={sphereRef}
      args={[1, 64, 64]}
      position={[0, 0, 0]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
      onPointerDown={(e) => {
        e.stopPropagation();
        startCharging();
      }}
      onPointerUp={(e) => {
        e.stopPropagation();
        stopCharging();
      }}
      onClick={(e) => {
        e.stopPropagation();
        setClicked(!clicked);
      }}
    >
      <MeshDistortMaterial
        color={
          isBlasting
            ? "#ffffff"
            : isCharging
            ? energy > 0.8
              ? "#ff0040"
              : energy > 0.6
              ? "#ff3366"
              : energy > 0.4
              ? "#ff6b8a"
              : energy > 0.2
              ? "#ffaa00"
              : "#00d2ff"
            : clicked
            ? "#ff6b8a"
            : hovered
            ? "#ffffff"
            : "#00d2ff"
        }
        distort={
          isBlasting
            ? 0.2 // Clean, minimal distortion during blast
            : isCharging
            ? 0.3 + energy * 0.5
            : clicked
            ? 0.8
            : hovered
            ? 0.5
            : 0.3
        }
        speed={
          isBlasting
            ? 15
            : isCharging
            ? 2 + energy * 4
            : clicked
            ? 4
            : hovered
            ? 2.5
            : 1.5
        }
        roughness={isBlasting ? 0 : 0.1}
        metalness={isBlasting ? 1 : 0.8}
        transparent
        opacity={isBlasting ? 1 : 0.85}
        emissive={
          isBlasting
            ? "#ffffff"
            : isCharging
            ? energy > 0.6
              ? "#ff6b8a"
              : energy > 0.3
              ? "#ffaa00"
              : "#00d2ff"
            : hovered
            ? "#00d2ff"
            : "#000000"
        }
        emissiveIntensity={
          isBlasting ? 1 : isCharging ? energy * 0.8 : hovered ? 0.2 : 0
        }
      />
    </Sphere>
  );
};

// Simple Floating Text Box
const FloatingTextBox = () => {
  const textRef = useRef();

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
      textRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <mesh ref={textRef} position={[-2, 1, 0]}>
      <boxGeometry args={[1.5, 0.3, 0.1]} />
      <meshStandardMaterial
        color="#ff6b8a"
        roughness={0.3}
        metalness={0.7}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
};

// Particle System Component
const ParticleSystem = () => {
  const points = useRef();
  const particleCount = 300;

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#00d2ff" transparent opacity={0.6} />
    </points>
  );
};

// Animated 3D Text Component with Fallback
const AnimatedText = () => {
  const textRef = useRef();

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={textRef} position={[-1.5, 0.5, 0]}>
        <boxGeometry args={[2, 0.5, 0.1]} />
        <MeshDistortMaterial
          color="#ff6b8a"
          attach="material"
          distort={0.2}
          speed={1}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
};

// Interactive Sphere with Distortion
const InteractiveSphere = () => {
  const sphereRef = useRef();

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      sphereRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Sphere ref={sphereRef} args={[1.2, 64, 32]} position={[2, 0, -1]}>
      <MeshDistortMaterial
        color="#00d2ff"
        attach="material"
        distort={0.6}
        speed={2}
        roughness={0}
        metalness={1}
        transparent
        opacity={0.8}
      />
    </Sphere>
  );
};

// Main Interactive 3D Scene with Energy System
const ThreeDScene = () => {
  const [sphereState, setSphereState] = useState({
    isCharging: false,
    energy: 0,
    isBlasting: false,
  });

  return (
    <>
      <Environment preset="night" />
      <Stars radius={50} depth={50} count={800} factor={2} />

      {/* Enhanced Lighting for Energy Effects */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-3, 2, 3]} intensity={0.5} color="#00d2ff" />
      <pointLight position={[3, -2, -3]} intensity={0.5} color="#ff6b8a" />

      {/* Dynamic lighting based on energy state */}
      {sphereState.isCharging && (
        <pointLight
          position={[0, 0, 0]}
          intensity={sphereState.energy * 2}
          color={sphereState.energy > 0.6 ? "#ff6b8a" : "#ffaa00"}
          distance={10}
        />
      )}

      {sphereState.isBlasting && (
        <pointLight
          position={[0, 0, 0]}
          intensity={3}
          color="#ffffff"
          distance={15}
        />
      )}

      {/* Floating Geometries */}
      <InteractiveGeometry
        position={[-2, 1, -2]}
        shape="torus"
        color="#ff6b8a"
      />
      <InteractiveGeometry
        position={[2, -1, -2]}
        shape="octahedron"
        color="#00d2ff"
      />
      <InteractiveGeometry
        position={[-1, -1.5, -3]}
        shape="sphere"
        color="#ffffff"
      />
      <InteractiveGeometry
        position={[1.5, 1.5, -1]}
        shape="box"
        color="#00d2ff"
      />

      {/* Center Interactive Sphere with State Management */}
      <CenterSphere onStateChange={setSphereState} />

      {/* Floating Text */}
      <FloatingTextBox />

      {/* Energy Particle System */}
      <EnergyParticles
        isCharging={sphereState.isCharging}
        energy={sphereState.energy}
        isBlasting={sphereState.isBlasting}
        centerPosition={[0, 0, 0]}
      />

      {/* Camera Controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={4}
        maxDistance={8}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 4}
        autoRotate={true}
        autoRotateSpeed={0.2}
        enableDamping={true}
        dampingFactor={0.05}
      />
    </>
  );
};

// Professional CTA Component with 3D Background
const ThreeDHero = () => {
  const [is3DSupported, setIs3DSupported] = React.useState(true);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    // Check for mobile devices and screen size
    const checkMobile = () => {
      const isMobileDevice =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      const isSmallScreen = window.innerWidth < 768; // md breakpoint
      setIsMobile(isMobileDevice || isSmallScreen);
    };

    // Check for WebGL support and performance considerations
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) {
      setIs3DSupported(false);
    }

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Mobile fallback component
  if (isMobile) {
    return (
      <motion.div
        className="relative w-full h-80 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl overflow-hidden border border-gray-700 shadow-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Simple gradient background for mobile */}
        <div className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-br from-brand-cyan/20 via-brand-magenta/20 to-transparent opacity-50">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-cyan/20 via-transparent to-brand-magenta/20"></div>
          </div>
        </div>

        {/* Simplified content for mobile */}
        <div className="relative z-10 flex flex-col justify-center h-full px-6">
          <motion.div
            className="text-center max-w-sm"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.h2
              className="text-2xl font-bold mb-4 bg-gradient-to-r from-brand-cyan via-white to-brand-magenta bg-clip-text text-transparent leading-tight"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Let's Build Something
              <br />
              <span className="text-brand-cyan">Extraordinary</span>
            </motion.h2>

            <motion.p
              className="text-sm text-gray-300 leading-relaxed mb-6 backdrop-blur-sm bg-black/30 p-3 rounded-lg border border-white/10"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              Frontend Engineer specializing in React.js ecosystems and modern
              web technologies.
            </motion.p>

            {/* Simplified stats for mobile */}
            <motion.div
              className="flex justify-center gap-4 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <div className="text-center">
                <div className="text-lg font-bold text-brand-cyan">1.5+</div>
                <div className="text-xs text-gray-400">Years</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-brand-magenta">5+</div>
                <div className="text-xs text-gray-400">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-white">100%</div>
                <div className="text-xs text-gray-400">Satisfaction</div>
              </div>
            </motion.div>

            {/* Status indicator */}
            <motion.div
              className="flex items-center justify-center gap-2 text-green-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <div className="relative">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping opacity-75"></div>
              </div>
              <span className="text-xs font-medium">
                Available for Opportunities
              </span>
            </motion.div>
          </motion.div>

          {/* 3D instruction below the card */}
          <motion.div
            className="text-center mt-4 px-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
          >
            <div className="text-xs text-gray-400 bg-black/40 backdrop-blur-sm rounded-full px-3 py-2 border border-brand-cyan/20 inline-flex items-center justify-center">
              <Monitor className="w-3 h-3 mr-2 text-brand-cyan flex-shrink-0" />
              <span className="leading-none">
                For full interactive 3D experience, switch to desktop version
              </span>
            </div>
          </motion.div>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>
      </motion.div>
    );
  }

  // Desktop version with full 3D experience
  return (
    <motion.div
      className="relative w-full h-96 md:h-[28rem] bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl overflow-hidden border border-gray-700 shadow-2xl"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* 3D Canvas Background or Fallback */}
      <div className="absolute inset-0 pointer-events-auto">
        {is3DSupported ? (
          <Canvas
            camera={{ position: [0, 0, 5], fov: 75 }}
            className="w-full h-full pointer-events-auto"
            dpr={[1, 2]}
            performance={{ min: 0.5 }}
            gl={{
              antialias: true,
              alpha: true,
            }}
            style={{ pointerEvents: "auto" }}
          >
            <ThreeDScene />
          </Canvas>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-brand-cyan/20 via-brand-magenta/20 to-transparent opacity-50">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-cyan/20 via-transparent to-brand-magenta/20"></div>
          </div>
        )}
      </div>

      {/* Interactive Hints - Desktop only */}
      <div className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur-sm rounded-lg p-3 border border-brand-cyan/30 pointer-events-auto">
        <div className="text-xs text-brand-cyan font-medium mb-1">
          Interactive 3D
        </div>
        <div className="text-xs text-gray-400 space-y-1">
          <div>🖱️ Drag to rotate view</div>
          <div>🔍 Scroll to zoom</div>
          <div>👆 Click objects to animate</div>
          <div>⚡ Hold center sphere for energy blast</div>
        </div>
      </div>

      {/* Content Overlay - Non-blocking */}
      <div className="relative z-10 flex items-center justify-center h-full bg-black/10 pointer-events-none">
        <motion.div
          className="text-center max-w-lg px-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Main Heading */}
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-brand-cyan via-white to-brand-magenta bg-clip-text text-transparent leading-tight"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Let's Build Something
            <br />
            <span className="text-brand-cyan">Extraordinary</span>
          </motion.h2>

          {/* Professional Description */}
          <motion.p
            className="text-lg text-gray-300 leading-relaxed mb-8 backdrop-blur-sm bg-black/30 p-4 rounded-lg border border-white/10"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            Frontend Engineer specializing in React.js ecosystems and modern web
            technologies. I transform complex ideas into elegant, scalable
            digital experiences with precision and creativity.
          </motion.p>

          {/* Professional Stats */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-brand-cyan">1.5+</div>
              <div className="text-sm text-gray-400">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-brand-magenta">5+</div>
              <div className="text-sm text-gray-400">Projects Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">100%</div>
              <div className="text-sm text-gray-400">Client Satisfaction</div>
            </div>
          </motion.div>

          {/* Status Indicator */}
          <motion.div
            className="flex items-center justify-center gap-3 text-green-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <div className="relative">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75"></div>
            </div>
            <span className="text-sm font-medium">
              Available for New Opportunities
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>
    </motion.div>
  );
};

export default ThreeDHero;

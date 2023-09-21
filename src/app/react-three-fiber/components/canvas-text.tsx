// orig: https://codesandbox.io/s/p9umgf?file=/src/App.js:0-1885
// modified, maybe a new version of the library?

'use client';
import { useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';

export function CanvasText() {
  const ref = useRef<any>();
  return (
    <div ref={ref} className="relative w-full h-[300px]">
      <div className="text-left text-8xl break-words absolute top-0 left-0 w-full h-full leading-1">
        Testing some text, you can hover over the Boxes to see a highlight
      </div>
      <Canvas shadows frameloop="demand" camera={{ position: [0, 0, 4] }}>
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 10]}
          castShadow
          shadow-mapSize={[2024, 2024]}
        />
        <pointLight position={[10, 0, 0]} />
        <Box position={[-2, 0, 0]} />
        <Box position={[2, -1, 0]} />
        <Shadows position={[0, 0, -0.5]} />
      </Canvas>
    </div>
  );
}

function Box(props: any) {
  const ref = useRef();
  const [hovered, hover] = useState(false);
  console.log('Box', { props, ref, hovered });
  return (
    <mesh
      {...props}
      castShadow
      ref={ref}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

function Shadows(props: any) {
  const { viewport } = useThree();
  return (
    <mesh receiveShadow scale={[viewport.width, viewport.height, 1]} {...props}>
      <planeGeometry />
      <shadowMaterial transparent opacity={0.5} />
    </mesh>
  );
}

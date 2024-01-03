import React, { Suspense, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF, Text } from "@react-three/drei";
import { easing } from "maath";
import EditorPanel from "./EditorPanel";
import ActionButtons from "../../../utils/ActionButtons";
import { useBackpack } from "../../../contexts/BackpackContext";
import { useUser } from "../../../contexts/UserContext";

const Backpack = () => {
  const { id, text, textColor, bagColor, setText, setTextColor, setBagColor } =
    useBackpack();
  const { user } = useUser();
  return (
    <div className="w-full h-screen bg-black-primary mt-16 relative">
      <EditorPanel
        {...{ text, setText, textColor, setTextColor, bagColor, setBagColor }}
      />
      <Canvas>
        <Suspense fallback={null}>
          <Model {...{ text, textColor, bagColor }} />
          <OrbitControls />
          <Environment preset="apartment" background />
        </Suspense>
      </Canvas>
      <ActionButtons
        type="backpack"
        data={{
          text,
          textColor,
          bagColor,
          username: user.username,
          _id: id,
        }}
      />
    </div>
  );
};

function Model(props) {
  const { nodes, materials } = useGLTF("/backpack.glb");
  useFrame((delta) =>
    easing.dampC(materials.material.color, props.bagColor, 0.25, delta)
  );
  return (
    <group scale={4} position={[1, 0.5, 0]} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.033}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group
            position={[0, 0.206, 0.779]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[11.557, 5.316, 16.341]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes["Cube001_��������������_������_0"].geometry}
              material={materials.material}
            >
              <Text
                position={[0, -1.5, -0.5]}
                rotation={[1.5, -0.1, 0]}
                fontSize={0.15}
                color={props.textColor}
                anchorX="center"
                anchorY="middle"
              >
                {props.text}
              </Text>
            </mesh>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes["Cube001_��������������_0"].geometry}
              material={materials.material_1}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes["Cube001_��������������_0_1"].geometry}
              material={materials.material_2}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/backpack.glb");

export default Backpack;

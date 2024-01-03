import React, { Suspense, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  useTexture,
  Decal,
  useGLTF,
} from "@react-three/drei";
import { easing } from "maath";
import EditorPanel from "./EditorPanel";
import ActionButtons from "../../../utils/ActionButtons";
import { useTshirt } from "../../../contexts/TshirtContext";
import { useUser } from "../../../contexts/UserContext";

const Tshirt = () => {
  const { tshirtColor, setTshirtColor, uploadedImage, setUploadedImage, id } =
    useTshirt();
  const { user } = useUser();
  const handleImageUpload = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target.result;
        setUploadedImage(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full h-screen bg-black-primary mt-16">
      <EditorPanel {...{ tshirtColor, setTshirtColor, handleImageUpload }} />
      <Canvas>
        <Suspense fallback={null}>
          <Model {...{ tshirtColor, uploadedImage }} />
          <OrbitControls />
          <Environment preset="apartment" background />
        </Suspense>
      </Canvas>
      <ActionButtons
        type="tshirt"
        data={{
          tshirtColor,
          image: uploadedImage,
          username: user.username,
          _id: id,
        }}
      />
    </div>
  );
};

function Model(props) {
  const { nodes, materials } = useGLTF("/shirt_baked.glb");
  console.log(props);
  const logoTexture = useTexture(props.uploadedImage);
  useFrame((delta) =>
    easing.dampC(materials.lambert1.color, props.tshirtColor, 0.25, delta)
  );

  return (
    <group scale={10} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
      >
        <Decal
          position={[0, 0.1, 0.15]}
          scale={0.1}
          rotation={[0, 0, 0]}
          map={logoTexture}
          depthTest={false}
          depthWrite={true}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/shirt_baked.glb");

export default Tshirt;

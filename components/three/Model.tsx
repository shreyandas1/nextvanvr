"use client";
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

// Model with mtl, obj and texture file 
interface modelProps {
  materialFile: string,
  objectFile: string,
  textureFile: string,

}
export const Model = ({ materialFile, objectFile, textureFile }: modelProps) => {
  const colorMap = useLoader(THREE.TextureLoader, textureFile);

  const materials = useLoader(MTLLoader, materialFile);
  const obj = useLoader(OBJLoader, objectFile, (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });
  return <primitive object={obj} map={colorMap} position={[0, 0, 0]} />;
};

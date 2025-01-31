import React, { useMemo } from "react";

import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { TextureLoader } from "three";

export interface ModelProps {
  materialFile: string; // MTL file as base4 representation of a Buffer from Azure
  objectFile: string;  // OBJ file as base4 representation of a Buffer from Azure
  textureFile: string; // Texture file as base4 representation of a Buffer from Azure
}

const base64ToBuffer = (base64: string): ArrayBuffer => {
  const binary = atob(base64); // Decode base64 to binary string
  const buffer = new ArrayBuffer(binary.length);
  const view = new Uint8Array(buffer);
  for (let i = 0; i < binary.length; i++) {
    view[i] = binary.charCodeAt(i);
  }
  return buffer;
};

export const Model = ({ materialFil, objectFil, textureFil }: ModelProps) => {
  // Convert ArrayBuffer to text for MTL and OBJ files

  const materialFile = base64ToBuffer(materialFil)
  const objectFile = base64ToBuffer(objectFil);
  const textureFile = base64ToBuffer(textureFil)

  const materialText = useMemo(() => new TextDecoder().decode(materialFile), [materialFile]);
  const objectText = useMemo(() => new TextDecoder().decode(objectFile), [objectFile]);

  // Load texture from ArrayBuffer
  const texture = useMemo(() => {
    const blob = new Blob([textureFile], { type: "image/jpeg" }); // Adjust MIME type if needed
    const url = URL.createObjectURL(blob);
    return new TextureLoader().load(url);
  }, [textureFile]);

  // Load materials from MTL text
  const materials = useMemo(() => {
    const mtlLoader = new MTLLoader();
    return mtlLoader.parse(materialText);
  }, [materialText]);

  // Load object from OBJ text
  const obj = useMemo(() => {
    const objLoader = new OBJLoader();
    if (materials) {
      materials.preload();
      objLoader.setMaterials(materials);
    }
    return objLoader.parse(objectText);
  }, [objectText, materials]);

  return (
    <primitive object={obj} map={texture} position={[0, 0, 0]} />
  );
};
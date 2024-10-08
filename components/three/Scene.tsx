"use client";
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense, useEffect, useState } from 'react';
import { Model, modelProps } from "./Model";
import { Button } from '../ui/button';
import { db } from '@/lib/db';



export function Scene( { args } ) {

  const [ annotationMode, setAnnotationMode] = useState(false)
  const [ annotations, setAnnotations ] = useState([])


  useEffect(() => {
    const load = async () => {
      const annotations = await db.annotation.findMany({
        where: {
            modelName: args.name
        }
    })
    setAnnotations(annotations)

    }
  }, [])


  

  return (
    <div style={{ width: "70vw", height: "70vh" }}>
       {annotationMode ? <p> true</p> : <p> false </p>}
      <Canvas camera={{ fov: 75, near: 0.1, far: 1000, position: [-100, -100, -100] }}>
        <Suspense fallback={null}>
          <ambientLight intensity={Math.PI * 2}/>
          <mesh /> 
           <Model {...args} />
          <mesh/>

          <OrbitControls />
        </Suspense>
      </Canvas>
      <Button onClick={() => { 
              setAnnotationMode(!annotationMode) 
            }} > toggle annotation mode</Button> 

    </div>
  );
}

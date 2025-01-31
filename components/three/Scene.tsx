"use client";
import { Canvas } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import { Suspense, useEffect, useState } from 'react';
import { Model, modelProps } from "./Model";
import ClickableMesh from './ClickableMesh';
import { Button } from '../ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { AppSidebar } from '../app-sidebar';
import { SidebarProvider } from '../ui/sidebar';
import axios from "axios"
import { Router, useRouter } from 'next/router';
import { redirect } from 'next/navigation';
import Link from 'next/link';


export function Scene( { args } ) {

  const [ annotationMode, setAnnotationMode] = useState(false)
  const [ annotations, setAnnotations ] = useState([])
  const [ position, setPosition] = useState({}  )
  const [ data, setData] = useState([])

  // USE TO INTEGRATE BACKEND
  // useEffect(() => {
  //   const load = async () => {
  //     const annotations = await db.annotation.findMany({
  //       where: {
  //           modelName: args.name
  //       }
  //   })
  //   setAnnotations(annotations)

  //   }
  // }, [])



  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ fov: 75, near: 0.1, far: 1000, position: [-100, -100, -100] }}>
        <Suspense fallback={null}>
          <ambientLight intensity={Math.PI }/>
            <ClickableMesh >
              <Model {...args} />
            </ClickableMesh>
           <OrbitControls enablePan={false} enableZoom={true} />  {/* minPolarAngle={Math.PI / 2.2} maxPolarAngle={Math.PI / 2.2} \> */}  
        </Suspense>
      </Canvas>
    </div>
  );
}

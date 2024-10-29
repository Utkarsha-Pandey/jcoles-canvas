"use client";

import { useEffect, useRef } from "react";
import { useEditor } from "../hooks/use-editor";
import  {fabric} from 'fabric';

export const Editor = () => {
    const { init } = useEditor();
    const canvasRef = useRef(null);
    const containerRef = useRef<HTMLDivElement>(null);
    

    useEffect(() => {
        if (!canvasRef.current) {
            return;
          }
        const canvas = new fabric.Canvas(canvasRef.current, {
            controlsAboveOverlay: true,
            preserveObjectStacking: true,
        });
        
        init({
            initialCanvas: canvas,
            initialContainer: containerRef.current!,
        });
    }, []);
    return (
        <div className="w-screen h-screen flex justify-center items-center overflow-hidden relative">
            <div ref={containerRef} className="flex-1 h-full bg-black" >
                <canvas ref={canvasRef} />
            </div>
        </div>
    );
};

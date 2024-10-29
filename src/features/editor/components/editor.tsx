"use client";

import { useEffect, useRef } from "react";
import { useEditor } from "../hooks/use-editor";
import * as fabric from 'fabric';

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
        <div className="h-full flex flex-col">
            <div ref={containerRef} className="flex-1 h-full bg-black">
                <canvas ref={canvasRef} />
            </div>
        </div>
    );
};

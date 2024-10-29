import { useCallback, useEffect } from "react";

interface useAutoResizeProps{
    canvas: fabric.Canvas|null;
    container: HTMLDivElement | null;
};

export const useAutoResize = ({ canvas,container}:
    useAutoResizeProps) =>{
        const autoZoom =useCallback(()=>{
            if(!canvas || !container) return;
            const width= container.offsetWidth;
            const height= container.offsetHeight;
            canvas.setWidth(width);
            canvas.setHeight(height);
           
        },[canvas,container]);
    useEffect(() =>{
       let resizeObserver:ResizeObserver | null=null;

       if(canvas && container){
        resizeObserver=new ResizeObserver(()=>{
            autoZoom();
        });
        resizeObserver.observe(container);
       }
       return ()=>{
        if(resizeObserver){
            resizeObserver.disconnect();
        }
       }

    },[canvas,container]);
};
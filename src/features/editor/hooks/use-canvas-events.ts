import { fabric } from "fabric";
import { useEffect } from "react";


interface UseCanvasEventsProps {
    canvas: fabric.Canvas | null;
    container: HTMLDivElement | null;
    setSelectedObjects: (objects: fabric.Object[]) => void;
    clearSelectionCallback?: () => void;

}

export const useCanvasEvents = ({
    canvas,  
    setSelectedObjects,
    clearSelectionCallback,
} : UseCanvasEventsProps) =>{
    useEffect(() => {
        if(canvas){
            canvas.on("selected:created" , (e) => {
                setSelectedObjects(e.selected || []); 
            })
            canvas.on("selected:updated" , (e) => {
                setSelectedObjects(e.selected || []);
            })
            canvas.on("selected:cleared" , (e) => {
                setSelectedObjects(e.selected || []);
                clearSelectionCallback?.(); 
            })
        }

        return () => {
            if(canvas){
                canvas.off("selection:created");
                canvas.off("selection:updated");
                canvas.off("selection:cleared");
            }
        }
        
    } , [canvas, setSelectedObjects, clearSelectionCallback])
}

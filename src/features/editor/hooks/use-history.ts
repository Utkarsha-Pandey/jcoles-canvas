import { JSON_KEYS } from "@/features/types";
import { fabric } from "fabric";
import { useCallback, useRef, useState } from "react";
import { object } from "zod";



interface UseHistoryProps {
    canvas : fabric.Canvas | null;
    saveCallback?: (values : {
        json: string;
        height: number;
        width: number;
    }) => void;
}
export const useHistory = ( {
    canvas , saveCallback
} : UseHistoryProps) => {
    const [historyIndex, setHistoryIndex] = useState(0);
    const canvasHistory = useRef<string[]>([]);
    const skipSave = useRef(false);

    const canUndo = useCallback(() => {
        return historyIndex > 0;
    } , [])

    const canRedo = useCallback(() => {
        return historyIndex < canvasHistory.current.length - 1;
    } , [historyIndex]);

    

    const save = useCallback((skip = false) => {
        if(!canvas){
            return;
        }
        const currState = canvas.toJSON(JSON_KEYS);
        const json = JSON.stringify(currState);

        if(!skip && !skipSave.current){
            canvasHistory.current.push(json);
            setHistoryIndex(canvasHistory.current.length - 1);
        }

        const workspace = canvas
            .getObjects()
            .find((object) => object.name === "clip");
        
        const height = workspace?.height || 0;
        const width = workspace?.width || 0;

        saveCallback?.({json, height, width});



    }, [canvas , saveCallback]);

    const undo = useCallback(() => {
        if(canUndo()){
            skipSave.current = true;
            canvas?.clear().renderAll();
            const prevIndex = historyIndex - 1;
            const prevState = JSON.parse(
                canvasHistory.current[prevIndex]
            )

            canvas?.loadFromJSON(prevState , () => {
                canvas.renderAll();
                setHistoryIndex(prevIndex);
                skipSave.current = false;
            })
        }
    }, [canUndo , canvas , historyIndex])


    const redo = useCallback(() => {
        if(canRedo()){
            skipSave.current = true;
            canvas?.clear().renderAll();

            const nextIndex = historyIndex + 1;
            const nextState = JSON.parse(
                canvasHistory.current[nextIndex]
            )

            canvas?.loadFromJSON(nextState , () => {
                canvas.renderAll();
                setHistoryIndex(nextIndex);
                skipSave.current = false;
            })
        }
    }, [canvas , historyIndex , canRedo])

    return { save , canUndo , canRedo , undo , redo , setHistoryIndex , canvasHistory};
};

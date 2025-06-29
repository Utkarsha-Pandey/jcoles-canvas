import { fabric } from "fabric";
import {useEvent} from "react-use";

interface UseHotkeysProps{
    canvas:fabric.Canvas | null;
    undo: ()=>void;
    redo: ()=>void;
    save: (skip?:boolean)=>void;
    copy: ()=>void;
    paste: ()=>void;
}


export const useHotkeys=( {
    canvas,
    undo,
    redo,
    save,
    copy,
    paste,
}:UseHotkeysProps)=>{
    useEvent("keydown", (event)=>{
        const isCtrlkey = event.ctrlkey || event.metaKey;
        const isBackspace = event.key === "Backspace";
        const isInput = ["INPUT","TEXTAREA"].includes(
            (event.target as HTMLElement).tagName,
        );
        if(isInput)return;
        if(isBackspace ){
            canvas?.remove(...canvas.getActiveObjects());
            canvas?.discardActiveObject();
        }

        if(isCtrlkey && event.key ==="z"){
            event.preventDefault();
            undo();
        }
        if(isCtrlkey && event.key ==="y"){
            event.preventDefault();
            redo();
        }
        if(isCtrlkey && event.key ==="c"){
            event.preventDefault();
            copy();
        }
        if(isCtrlkey && event.key ==="v"){
            event.preventDefault(); 
            paste();
        }
        if(isCtrlkey && event.key ==="s"){
            event.preventDefault();
            save(true);
        }
        if(isCtrlkey && event.key ==="a"){
            event.preventDefault();
            canvas?.discardActiveObject();

            const allObjects=canvas?.getObjects()
            .filter((object)=> object.selectable);
            canvas?.setActiveObject(new fabric.ActiveSelection(allObjects,{canvas}))

            canvas?.setActiveObject(
            new fabric.ActiveSelection(allObjects,{canvas})
            );
            canvas?.renderAll();
        }
    })
    
}
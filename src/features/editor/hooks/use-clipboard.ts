import { fabric } from "fabric";
import { useCallback, useRef } from "react";

interface useClipboardProps {
    canvas: fabric.Canvas | null;
}

export const useClipboard = ({ canvas }: useClipboardProps) => {
    const clipboard = useRef<any>(null);

    const copy = useCallback(() => {
        const selected = canvas?.getActiveObject();
        if (selected) {
            canvas?.clone((cloned: any) => {
                clipboard.current = cloned;
            });
        }
    }, [canvas]);

    const paste = useCallback(() => {
        if (!clipboard.current) {
            return;
        }
        clipboard.current.clone((clonedObject: any) => {
            canvas?.discardActiveObject();
            clonedObject.set({
                left: clonedObject.left + 10,
                top: clonedObject.top + 10,
                evented: true, //making sure new copy is interactive
            });

            if (clonedObject.type === "activeSelection") { //for checking multiple objects selected together
                clonedObject.canvas = canvas;
                clonedObject.forEachObject((obj: any) => {
                    canvas?.add(obj);
                });
                clonedObject.setCoords();
                clonedObject.destroy();
            } else {
                canvas?.add(clonedObject);
            }

            clipboard.current.left += 10;
            clipboard.current.top += 10;
            canvas?.setActiveObject(clonedObject);
            canvas?.requestRenderAll();
        });
    }, [canvas]);

    return { copy , paste};
};

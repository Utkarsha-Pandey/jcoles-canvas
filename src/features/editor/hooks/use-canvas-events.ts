import { fabric } from "fabric";
import { useEffect } from "react";

interface UseCanvasEventsProps {
    save: () => void;
    canvas: fabric.Canvas | null;
    container: HTMLDivElement | null;
    setSelectedObjects: (objects: fabric.Object[]) => void;
    clearSelectionCallback?: () => void;
}

export const useCanvasEvents = ({
    save,
    canvas,
    setSelectedObjects,
    clearSelectionCallback,
}: UseCanvasEventsProps) => {
    useEffect(() => {
        if (canvas) {
            canvas.on("object:added", () => save());
            canvas.on("object:removed", () => save());
            canvas.on("object.modified", () => save());

            canvas.on("selection:created", (e) => {
                setSelectedObjects(e.selected || []);
            });
            canvas.on("selection:updated", (e) => {
                setSelectedObjects(e.selected || []);
            });
            canvas.on("selection:cleared", (e) => {
                setSelectedObjects(e.selected || []);
                clearSelectionCallback?.();
            });
        }

        return () => {
            if (canvas) {
                canvas.off("object:added");
                canvas.off("object:removed");
                canvas.off("object.modified");
                canvas.off("selection:created");
                canvas.off("selection:updated");
                canvas.off("selection:cleared");
            }
        };
    }, [save , canvas, setSelectedObjects, clearSelectionCallback]);
};

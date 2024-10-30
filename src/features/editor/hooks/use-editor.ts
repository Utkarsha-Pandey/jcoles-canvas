import { useCallback, useState, useMemo } from "react";
import { fabric } from "fabric";
import { useAutoResize } from "./use-auto-resize";
import { BuildEditorProps, CIRCLE_OPTIONS, Editor, RECTANGLE_OPTIONS } from "@/features/types";

const buildEditor = ({ canvas }: BuildEditorProps): Editor => {
    const getWorkspace = () => {
        return canvas
        .getObjects()
        .find((object) => object.name === "clip");
    }
    const center = (object : fabric.Object) => {
        const workspace = getWorkspace();
        const center = workspace?.getCenterPoint();
        // canvas._centerObject(object, center);
        canvas.centerObject(object);
         
    }

    const addToCanvas = (object: fabric.Object) => {
        center(object);
        canvas.add(object);
        canvas.setActiveObject(object);
    }
    return {
        addCircle: () => {
            const object = new fabric.Circle({
                ...CIRCLE_OPTIONS,
            });
            
            addToCanvas(object);
        },

        addSoftRectangle: () => {
            const object = new fabric.Rect({
                ...RECTANGLE_OPTIONS,
                rx: 10,
                ry: 10,
            });
            
            addToCanvas(object);
        },
    };
};
export const useEditor = () => {
    const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
    const [container, setContainer] = useState<HTMLDivElement | null>(null);
    useAutoResize({ canvas, container });

    const editor = useMemo(() => {
        if (canvas) {
            return buildEditor({
                canvas,
            });
        }

        return undefined;
    }, [canvas]);
    const init = useCallback(
        ({
            initialCanvas,
            initialContainer,
        }: {
            initialCanvas: fabric.Canvas;
            initialContainer: HTMLDivElement;
        }) => {
            initialContainer.style.height = "100vh";
            initialContainer.style.width = "100vw";
            fabric.Object.prototype.set({
                cornerColor: "#FFF",
                cornerStyle: "circle",
                borderColor: "#3b82f6",
                borderScaleFactor: 1.5,
                transparentCorners: false,
                borderOpacityWhenMoving: 1,
                cornerStrokeColor: "#3b82f6",
            });

            const initialWorkspace = new fabric.Rect({
                width: 900,
                height: 1200,
                name: "clip",
                fill: "white",
                selectable: false,
                hasControls: false,
                shadow: new fabric.Shadow({
                    color: "rgba(0,0,0,0.8)",
                    blur: 5,
                }),
            });

            console.log(initialContainer.offsetHeight);

            // const heighKamHai = initialContainer.offsetHeight < 800 ? 1200 : initialContainer.offsetHeight;

            initialCanvas.setDimensions({
                width: initialContainer.offsetWidth,
                height: initialContainer.offsetHeight,
            });

            initialCanvas.add(initialWorkspace);
            initialCanvas.centerObject(initialWorkspace);
            initialCanvas.clipPath = initialWorkspace;

            setCanvas(initialCanvas);
            setContainer(initialContainer);

            
        },
        []
    );

    return { init, editor };
};

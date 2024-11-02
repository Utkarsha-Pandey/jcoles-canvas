import { useCallback, useState, useMemo } from "react";
import { fabric } from "fabric";
import { useAutoResize } from "./use-auto-resize";
import {
    BuildEditorProps,
    CIRCLE_OPTIONS,
    DIAMOND_OPTIONS,
    Editor,
    EditorHookProps,
    FILL_COLOR,
    FONT_FAMILY,
    FONT_WEIGHT,
    RECTANGLE_OPTIONS,
    STROKE_COLOR,
    STROKE_DASH_ARRAY,
    STROKE_WIDTH,
    TEXT_OPTIONS,
    TRIANGLE_OPTIONS,
} from "@/features/types";
import { useCanvasEvents } from "./use-canvas-events";
import { isTextType } from "../utils";

const buildEditor = ({
    canvas,
    fillColor,
    fontFamily,
    setFontFamily,
    setFillColor,
    strokeColor,
    setStrokeColor,
    strokeWidth,
    setStrokeWidth,
    selectedObjects,
    strokeDashArray,
    setStrokeDashArray,
}: BuildEditorProps): Editor => {
    const getWorkspace = () => {
        return canvas.getObjects().find((object) => object.name === "clip");
    };
    const center = (object: fabric.Object) => {
        const workspace = getWorkspace();
        const center = workspace?.getCenterPoint();
        // canvas._centerObject(object, center);
        canvas.centerObject(object);
    };

    const addToCanvas = (object: fabric.Object) => {
        center(object);
        canvas.add(object);
        canvas.setActiveObject(object);
    };
    return {

        addText: (value , options) => {
            const object = new fabric.Textbox(value , {
                ...TEXT_OPTIONS,
                fill: fillColor,
                ...options,
            })
            

            addToCanvas(object);
        },

        getActiveOpacity:()=>{
                const selectedObject = selectedObjects[0];
                if(!selectedObject){
                    return 1;
                }
    
                const value = selectedObject.get("opacity") || 1;
                
                
                return value;
            },

        changeOpacity: (value: number)=>{
            canvas.getActiveObjects().forEach((object)=>{
                object.set({opacity :value});
            })
            canvas.renderAll();
        },
        bringForward: () => {
            canvas.getActiveObjects().forEach((object) =>{
                canvas.bringForward(object);
            });
            
            canvas.renderAll();

            const workspace = getWorkspace();
            workspace?.sendToBack();
        },
        sendBackwards: () => {
            canvas.getActiveObjects().forEach((object) =>{
                canvas.sendBackwards(object);
            });

            canvas.renderAll();
            const workspace = getWorkspace();
            workspace?.sendToBack();
        },

        changeFontFamily: (value: string) => {
            setFontFamily(value);
            canvas.getActiveObjects().forEach((object) => {
                if (isTextType(object.type)) {
                    (object as fabric.Textbox).set({ fontFamily: value });
                }
            });
            canvas.renderAll();
        }, 
        changeFillColor: (value: string) => {
            setFillColor(value);
            canvas.getActiveObjects().forEach((object) => {
                object.set({ fill: value });
            });
            canvas.renderAll();
        },
        changeStrokeColor: (value: string) => {
            setStrokeColor(value);
            canvas.getActiveObjects().forEach((object) => {
                //text types don't have stroke
                if (isTextType(object.type)) {
                    object.set({ fill: value });
                    return;
                }
                object.set({ stroke: value });
                canvas.renderAll();
            });
        },

        changeStrokeWidth: (value: number) => {
            setStrokeWidth(value);
            canvas.getActiveObjects().forEach((object) => {
                object.set({ strokeWidth: value });
            });
            canvas.renderAll();
        },

        changeStrokeDashArray: (value: number[]) => {
            setStrokeDashArray(value);
            canvas.getActiveObjects().forEach((object) => {
                object.set({ strokeDashArray: value });
            });
            canvas.renderAll();
        },


        addCircle: () => {
            const object = new fabric.Circle({
                ...CIRCLE_OPTIONS,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                strokeDashArray : strokeDashArray,

            });

            addToCanvas(object);
        },

        addSoftRectangle: () => {
            const object = new fabric.Rect({
                ...RECTANGLE_OPTIONS,
                rx: 30,
                ry: 30,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                strokeDashArray : strokeDashArray,

            });

            addToCanvas(object);
        },
        addRectangle: () => {
            const object = new fabric.Rect({
                ...RECTANGLE_OPTIONS,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                strokeDashArray : strokeDashArray,

            });

            addToCanvas(object);
        },
        addTriangle: () => {
            const object = new fabric.Triangle({
                ...TRIANGLE_OPTIONS,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                strokeDashArray : strokeDashArray,

            });

            addToCanvas(object);
        },
        addInverseTriangle: () => {
            const HEIGHT = TRIANGLE_OPTIONS.height;
            const WIDTH = TRIANGLE_OPTIONS.width;
            const object = new fabric.Polygon(
                [
                    { x: 0, y: 0 },
                    { x: WIDTH, y: 0 },
                    { x: WIDTH / 2, y: HEIGHT },
                ],
                {
                    ...TRIANGLE_OPTIONS,
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth,
                    strokeDashArray : strokeDashArray,

                }
            );

            addToCanvas(object);
        },
        addDiamond: () => {
            const HEIGHT = DIAMOND_OPTIONS.height;
            const WIDTH = DIAMOND_OPTIONS.width;
            const object = new fabric.Polygon( 
                [
                    { x: WIDTH / 2, y: 0 },
                    { x: WIDTH, y: HEIGHT / 2 },
                    { x: WIDTH, y: HEIGHT / 2 },
                    { x: WIDTH / 2, y: HEIGHT },
                    { x: 0, y: HEIGHT / 2 },
                ],
                {
                    ...DIAMOND_OPTIONS,
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth,
                    strokeDashArray : strokeDashArray,
                }
            );

            addToCanvas(object);
        },
        canvas,
        getActiveFillColor : () => {
            const selectedObject = selectedObjects[0];
            if(!selectedObject){
                return fillColor;
            }

            const value = selectedObject.get("fill") || fillColor;
            
            //since we r not using gradient and patterns
            return value as string;
        },
        getActiveFontWeight : () => {
            const selectedObject = selectedObjects[0];
            if(!selectedObject){
                return FONT_WEIGHT;
            }

            const value = selectedObject.get("fontWeight") || FONT_FAMILY;
            
            //since we r not using gradient and patterns
            return value ;
        },
        getActiveFontFamily : () => {
            const selectedObject = selectedObjects[0];
            if(!selectedObject){
                return fontFamily;
            }

            const value = selectedObject.get("fontFamily") || fontFamily;
            
            //since we r not using gradient and patterns
            return value ;
        },

        getActiveStrokeColor : () => {
            const selectedObject = selectedObjects[0];
            if(!selectedObject){
                return strokeColor;
            }

            const value = selectedObject.get("stroke") || strokeColor;
            
            //since we r not using gradient and patterns
            return value;
        },
        getActiveStrokeWidth : () => {
            const selectedObject = selectedObjects[0];
            if(!selectedObject){
                return strokeWidth;
            }

            const value = selectedObject.get("strokeWidth") || strokeWidth;
            
            //since we r not using gradient and patterns
            return value;
        },

        getActiveStrokeDashArray : () => {
            const selectedObject = selectedObjects[0];
            if(!selectedObject){
                return strokeDashArray;
            }

            const value = selectedObject.get("strokeDashArray") || strokeDashArray;
            
            //since we r not using gradient and patterns
            return value;
        },
        
        selectedObjects,
    };
};
export const useEditor = ({
    clearSelectionCallback
} : EditorHookProps) => {
    const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
    const [container, setContainer] = useState<HTMLDivElement | null>(null);
    const [selectedObjects, setSelectedObjects] = useState<fabric.Object[]>([]);

    const[fontFamily,setFontFamily]=useState(FONT_FAMILY);
    const [fillColor, setFillColor] = useState(FILL_COLOR);
    const [strokeColor, setStrokeColor] = useState(STROKE_COLOR);
    const [strokeWidth, setStrokeWidth] = useState(STROKE_WIDTH);
    const [strokeDashArray, setStrokeDashArray] = useState<number[]>(STROKE_DASH_ARRAY);

    useAutoResize({ canvas, container });

    useCanvasEvents({
        canvas,
        container,
        setSelectedObjects,
        clearSelectionCallback,


    });

    const editor = useMemo(() => {
        if (canvas) {
            return buildEditor({
                canvas,
                fillColor,
                setFillColor,
                strokeColor,
                setStrokeColor,
                strokeWidth,
                strokeDashArray,
                setStrokeDashArray,
                setStrokeWidth,
                selectedObjects,
                fontFamily,
                setFontFamily,
                
            });
        }

        return undefined;
    }, [canvas, fillColor, strokeColor, strokeWidth, selectedObjects, strokeDashArray,fontFamily]);
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

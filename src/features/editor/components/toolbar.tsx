import { useState } from "react";
import { ActiveTool, Editor, FONT_SIZE, FONT_WEIGHT } from "../../types";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {TbColorFilter} from "react-icons/tb"
import { RxTransparencyGrid } from "react-icons/rx";
import { BsBorderWidth } from "react-icons/bs";
import {
    AlignCenter,
    AlignLeft,
    AlignRight,
    ArrowDown,
    ArrowUp,
    ChevronDown,
    Clipboard,
    Copy,
    Trash,
} from "lucide-react";
import { isTextType } from "../utils";
import { FaBold, FaCopy, FaItalic, FaPaste, FaStrikethrough, FaUnderline } from "react-icons/fa";
import { FontSizeInput } from "./font-size-input";

interface ToolbarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
}
export const Toolbar = ({
    editor,
    activeTool,
    onChangeActiveTool,
}: ToolbarProps) => {
    // const fillColor = getProperty("fill");
    const initialFillColor = editor?.getActiveFillColor();
    const initialStrokeColor = editor?.getActiveStrokeColor();
    const initialFontFamily = editor?.getActiveFontFamily();
    const initialFontWeight = editor?.getActiveFontWeight() || FONT_WEIGHT;
    const initialFontStyle = editor?.getActiveFontStyle();
    const initialLinethrough = editor?.getActiveFontLineThrough();
    const initialUnderline = editor?.getActiveFontUnderline();
    const initialTextAlign = editor?.getActiveTextAlign();
    const initialFontSize = editor?.getActiveFontSize() || FONT_SIZE;

    const selectedObject = editor?.selectedObjects[0];
    const selectedObjectType = selectedObject?.type; // Ensure type is string | undefined
    const isText = isTextType(selectedObjectType);
    const isImage =selectedObjectType === "image";

    // console.log("Selected Object Type:", selectedObjectType); // Add this to check type


    const [properties, setProperties] = useState({
        fillColor: initialFillColor,
        strokeColor: initialStrokeColor,
        fontFamily: initialFontFamily,
        fontWeight: initialFontWeight,
        fontStyle: initialFontStyle,
        fontLinethrough: initialLinethrough,
        fontUnderline: initialUnderline,
        textAlign: initialTextAlign,
        fontSize: initialFontSize,
    });
    // if (!editor || editor.selectedObjects.length === 0){
    //     return (
    //         <div
    //         className="shrink-0 h-[56px] border-b bg-white w-full flex
    //     items-center overflow-x-auto z-[49] p-2 gap-x-2"
    //     />
    //     )
    // }

    const toggleBold = () => {
        if (!selectedObject) {
            return;
        }
        const newValue = properties.fontWeight > 500 ? 500 : 700;

        editor?.changeFontWeight(newValue);
        setProperties((current) => ({
            ...current,
            fontWeight: newValue,
        }));
    };

    const toggleItalic = () => {
        if (!selectedObject) {
            return;
        }

        const isItalic = properties.fontStyle === "italic";
        const newValue = isItalic ? "normal" : "italic";

        editor?.changeFontStyle(newValue);
        setProperties((current) => ({
            ...current,
            fontStyle: newValue,
        }));
    };

    const toggleLinethrough = () => {
        if (!selectedObject) {
            return;
        }

        const newValue = properties.fontLinethrough ? false : true;

        editor?.changeFontLineThrough(newValue);
        setProperties((current) => ({
            ...current,
            fontLinethrough: newValue,
        }));
    };

    const toggleUnderline = () => {
        if (!selectedObject) {
            return;
        }

        const newValue = properties.fontUnderline ? false : true;

        editor?.changeFontUnderline(newValue);
        setProperties((current) => ({
            ...current,
            fontUnderline: newValue,
        }));
    };

    const onChangeTextAlign = (value: string) => {
        if (!selectedObject) {
            return;
        }

        editor?.changeTextAlign(value);
        setProperties((current) => ({
            ...current,
            textAlign: value,
        }));
    };

    const onChangeFontSize = (value: number) => {
        if (!selectedObject) {
            return;
        }

        editor?.changeFontSize(value);
        setProperties((current) => ({
            ...current,
            fontSize: value,
        }));
    };

    return (
        <div
            className="shrink-0 h-[56px] border-b bg-white w-full flex 
        items-center overflow-x-auto z-[49] p-2 gap-x-2 "
        >
            {!isImage && (
            <div className="flex items-center h-full justify-center">
                <Hint label="Color" side="bottom" sideOffset={5}>
                    <Button
                        onClick={() => onChangeActiveTool("fill")}
                        size="icon"
                        variant="ghost"
                        className={cn(activeTool === "fill" && "bg-gray-100")}
                    >
                        <div
                            className="rounded-sm size-4 border"
                            style={{
                                backgroundColor: properties.fillColor,
                            }}
                        />
                    </Button>
                </Hint>
            </div>
              )}
            {!isText && (
                <div className="flex items-center h-full justify-center">
                    <Hint label="Stroke Color" side="bottom" sideOffset={5}>
                        <Button
                            onClick={() => onChangeActiveTool("stroke-color")}
                            size="icon"
                            variant="ghost"
                            className={cn(
                                activeTool === "stroke-color" && "bg-gray-100"
                            )}
                        >
                            <div
                                className="rounded-sm size-4 border-2 bg-white"
                                style={{
                                    borderColor: properties.strokeColor,
                                }}
                            />
                        </Button>
                    </Hint>
                </div>
            )}

            {!isText && (
                <div className="flex items-center h-full justify-center">
                    <Hint label="Stroke Width" side="bottom" sideOffset={5}>
                        <Button
                            onClick={() => onChangeActiveTool("stroke-width")}
                            size="icon"
                            variant="ghost"
                            className={cn(
                                activeTool === "stroke-width" && "bg-gray-100"
                            )}
                        >
                            <BsBorderWidth className="size-4 " />
                        </Button>
                    </Hint>
                </div>
            )}

            <div className="flex items-center h-full justify-center">
                <Hint label="Font" side="bottom" sideOffset={5}>
                    <Button
                        onClick={() => onChangeActiveTool("font")}
                        size="icon"
                        variant="ghost"
                        className={cn(
                            "w-auto px-2 text-sm",
                            activeTool === "font" && "bg-gray-100"
                        )}
                    >
                        <div className="max-w-[300px] truncate">
                            {properties.fontFamily}
                        </div>
                        <ChevronDown className="size-4 ml-2 shrink-0" />
                    </Button>
                </Hint>
            </div>
            <div className="flex items-center h-full justify-center">
                <Hint label="Bold" side="bottom" sideOffset={5}>
                    <Button
                        onClick={toggleBold}
                        size="icon"
                        variant="ghost"
                        className={cn(
                            properties.fontWeight > 500 && "bg-gray-100"
                        )}
                    >
                        <FaBold className="size-4 " />
                    </Button>
                </Hint>
            </div>

            <div className="flex items-center h-full justify-center">
                <Hint label="Italic" side="bottom" sideOffset={5}>
                    <Button
                        onClick={toggleItalic}
                        size="icon"
                        variant="ghost"
                        className={cn(
                            properties.fontStyle === "italic" && "bg-gray-100"
                        )}
                    >
                        <FaItalic className="size-4 " />
                    </Button>
                </Hint>
            </div>

            <div className="flex items-center h-full justify-center">
                <Hint label="Strike" side="bottom" sideOffset={5}>
                    <Button
                        onClick={toggleLinethrough}
                        size="icon"
                        variant="ghost"
                        className={cn(
                            properties.fontLinethrough && "bg-gray-100"
                        )}
                    >
                        <FaStrikethrough className="size-4 " />
                    </Button>
                </Hint>
            </div>

            <div className="flex items-center h-full justify-center">
                <Hint label="Underline" side="bottom" sideOffset={5}>
                    <Button
                        onClick={toggleUnderline}
                        size="icon"
                        variant="ghost"
                        className={cn(
                            properties.fontUnderline && "bg-gray-100"
                        )}
                    >
                        <FaUnderline className="size-4 " />
                    </Button>
                </Hint>
            </div>

            <div className="flex items-center h-full justify-center">
                <Hint label="Align left" side="bottom" sideOffset={5}>
                    <Button
                        onClick={() => onChangeTextAlign("left")}
                        size="icon"
                        variant="ghost"
                        className={cn(
                            properties.textAlign === "left" && "bg-gray-100"
                        )}
                    >
                        <AlignLeft className="size-4 " />
                    </Button>
                </Hint>
            </div>

            <div className="flex items-center h-full justify-center">
                <Hint label="Align Center" side="bottom" sideOffset={5}>
                    <Button
                        onClick={() => onChangeTextAlign("center")}
                        size="icon"
                        variant="ghost"
                        className={cn(
                            properties.textAlign === "center" && "bg-gray-100"
                        )}
                    >
                        <AlignCenter className="size-4 " />
                    </Button>
                </Hint>
            </div>

            <div className="flex items-center h-full justify-center">
                <Hint label="Align right" side="bottom" sideOffset={5}>
                    <Button
                        onClick={() => onChangeTextAlign("right")}
                        size="icon"
                        variant="ghost"
                        className={cn(
                            properties.textAlign === "right" && "bg-gray-100"
                        )}
                    >
                        <AlignRight className="size-4 " />
                    </Button>
                </Hint>
            </div>
            <div className="flex items-center h-full justify-center">
                <FontSizeInput
                    value={properties.fontSize} 
                    onChange={onChangeFontSize}

                />
            </div>
            {isImage && (
            <div className="flex items-center h-full justify-center">
                <Hint label="Filters" side="bottom" sideOffset={5}>
                    <Button
                        onClick={() => onChangeActiveTool("filter")}
                        size="icon"
                        variant="ghost"
                        className={cn(
                            activeTool === "filter" && "bg-gray-100"
                        )}
                    >
                        <TbColorFilter className="size-4 " />
                    </Button>
                </Hint>
            </div>
            )}

            <div className="flex items-center h-full justify-center">
                <Hint label="Bring Forward" side="bottom" sideOffset={5}>
                    <Button
                        onClick={() => editor?.bringForward()}
                        size="icon"
                        variant="ghost"
                    >
                        <ArrowUp className="size-4 " />
                    </Button>
                </Hint>
            </div>

            <div className="flex items-center h-full justify-center">
                <Hint label="Bring Forward" side="bottom" sideOffset={5}>
                    <Button
                        onClick={() => editor?.sendBackwards()}
                        size="icon"
                        variant="ghost"
                    >
                        <ArrowDown className="size-4 " />
                    </Button>
                </Hint>
            </div>
            <div className="flex items-center h-full justify-center">
                <Hint label="Opacity" side="bottom" sideOffset={5}>
                    <Button
                        onClick={() => onChangeActiveTool("opacity")}
                        size="icon"
                        variant="ghost"
                        className={cn(
                            activeTool === "opacity" && "bg-gray-100"
                        )}
                    >
                        <RxTransparencyGrid className="size-4 " />
                    </Button>
                </Hint>
            </div>
            
            <div className="flex items-center h-full justify-center">
                <Hint label="Duplicate" side="bottom" sideOffset={5}>
                    <Button
                        onClick={() => {editor?.onCopy();
                            editor?.onPaste();
                        }}
                        size="icon"
                        variant="ghost"
                        
                    >
                        <Copy className="size-4 " />
                    </Button>
                </Hint>
            </div>

            

            <div className="flex items-center h-full justify-center">
                <Hint label="Delete" side="bottom" sideOffset={5}>
                    <Button
                        onClick={() => editor?.delete()}
                        size="icon"
                        variant="ghost"
                        
                    >
                        <Trash className="size-4 " />
                    </Button>
                </Hint>
            </div>
        </div>
    );
};

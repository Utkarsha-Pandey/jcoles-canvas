"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useEditor } from "../hooks/use-editor";
import { fabric } from "fabric";

import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";
import { Toolbar } from "./toolbar";
import { Footer } from "./footer";
import { ActiveTool, selectionDependentTools } from "@/features/types";
import { ShapeSidebar } from "./shape-sidebar";
import { FillColorSidebar } from "./fill-color-sidebar";
import { StrokeColorSidebar } from "./stroke-color-sidebar";
import { StrokeWidthSidebar } from "./stroke-width-sidebar";
import { OpacitySidebar } from "./opacity-sidebar";
import { TextSidebar } from "./text-sidebar";
import { FontSidebar } from "./font-sidebar";
import { ImageSidebar } from "./image-sidebar";
import { TemplateSidebar } from "./template-sidebar";

import { FilterSidebar } from "./filter-sidebar";
import { DrawSidebar } from "./draw-sidebar";
import { SettingsSidebar } from "./settings-sidebar";
import { ResponseType } from "@/features/projects/api/use-get-project";
import { useUpdateProject } from "@/features/projects/api/use-update-project";
import debounce from "lodash.debounce";

interface EditorProps {
    initialData: ResponseType["data"];
}

export const Editor = ({ initialData }: EditorProps) => {
    const { mutate } = useUpdateProject(initialData.id);

    const debouncedSave = useCallback(
        debounce(
            (values: {
                json: string,
                height: number,
                width: number,
            }) => {
                mutate(values);
            },
            500
        ), [mutate]);

    const [activeTool, setActiveTool] = useState<ActiveTool>("select");

    const onClearSelection = useCallback(() => {
        if (selectionDependentTools.includes(activeTool)) {
            setActiveTool("select");
        }
    }, [activeTool]);

    const { init, editor } = useEditor({
        defaultState: initialData.json,
        defaultWidth: initialData.width,
        defaultHeight: initialData.height,
        clearSelectionCallback: onClearSelection,
        saveCallback: debouncedSave,
    });
    const onChangeActiveTool = useCallback(
        (tool: ActiveTool) => {
            if (tool === "draw") {
                editor?.enableDrawingMode();
            }
            if (activeTool === "draw") {
                editor?.disableDrawingMode();
            }
            if (tool === activeTool) {
                return setActiveTool("select");
            }

            setActiveTool(tool);
        },
        [activeTool, editor]
    );
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
        return () => {
            canvas.dispose();
        };
    }, [init]);
    return (
        <div className="h-full flex flex-col">
            <Navbar
                id={initialData.id}
                editor={editor}
                activeTool={activeTool}
                onChangeActiveTool={onChangeActiveTool}
            />
            <div className="absolute h-[calc(100%-68px)] w-full top-[68px] flex">
                <Sidebar
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <ShapeSidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <FillColorSidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />

                <StrokeColorSidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />

                <StrokeWidthSidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />

                <OpacitySidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />

                <TextSidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <FontSidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />

                <ImageSidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />

                <TemplateSidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />

                <FilterSidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <SettingsSidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />

                <DrawSidebar
                    editor={editor}
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />

                <main className="bg-muted flex-1 overflow-hidden relative flex flex-col">
                    <Toolbar
                        editor={editor}
                        activeTool={activeTool}
                        onChangeActiveTool={onChangeActiveTool}
                        key={JSON.stringify(editor?.canvas.getActiveObject())}
                    />
                    <div
                        ref={containerRef}
                        className="flex-1 h-[calc(100%-124px)] bg-muted"
                    >
                        <canvas ref={canvasRef} />
                    </div>
                    <Footer editor={editor} />
                </main>
            </div>
        </div>
    );
};

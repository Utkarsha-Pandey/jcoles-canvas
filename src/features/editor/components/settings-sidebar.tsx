import { ActiveTool, Editor, FILL_COLOR } from "@/features/types";
import { cn } from "@/lib/utils";
import { ToolSidebarHeader } from "./tool-sidebar-header";
import { ToolSidebarClose } from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ColorPicker } from "./color-picker";
import { useEffect, useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SettingsSidebarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
}

export const SettingsSidebar = ({
    editor,
    activeTool,
    onChangeActiveTool,
}: SettingsSidebarProps) => { 
   const workspace= editor?.getWorkspace();
   const initialWidth = useMemo(()=> `${workspace?.width ?? 0}`,[workspace]);
   const initialHeight = useMemo(()=> `${workspace?.height ?? 0}`,[workspace]);
   const initialBackground = useMemo(()=> workspace?.fill ?? '#ffffff',[workspace]);

   const [width,setWidth]=useState(initialWidth);
   const [height,setHeight]=useState(initialHeight);
   const [background,setBackground]=useState(initialBackground);

   useEffect(() =>{
      setWidth(initialWidth);
      setHeight(initialHeight);
      setBackground(initialBackground);
    
   },[
    initialWidth,
    initialHeight,
    initialBackground
   ]);

   const changeWidth = (value:string)=>setWidth(value);
   const changeHeight =(value:string)=>setHeight(value);
   const changeBackground =(value:string)=>{
    setBackground(value);
    editor?.changeBackground(value);
   };
   const onSubmit =(e: React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      editor?.changeSize({
        width:parseInt(width,10),
        height:parseInt(height,10),
      });
   }
    const onClose = () => {
        onChangeActiveTool("select");
    };

    const onChange = (value: string) => {
        editor?.changeFillColor(value);
    };
    return (
        <aside
            className={cn(
                "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
                activeTool === "settings" ? "visible" : "hidden"
            )}
        >
            <ToolSidebarHeader
                title="Settings"
                description="change the look of your workspace"
            />
            <ScrollArea>
                <form className="space-y-4 p-4" onSubmit={onSubmit}>
                <div className=" space-y-2">
                    <Label>
                        Height
                    </Label>
                    <Input
                    placeholder="Height"
                    value={height}
                    type="number"
                    onChange={(e) => changeHeight(e.target.value)}
                    />
                </div>
                <div className=" space-y-2">
                    <Label>
                        Width
                    </Label>
                    <Input
                    placeholder="Width"
                    value={width}
                    type="number"
                    onChange={(e) => changeWidth(e.target.value)}
                    />
                </div>
                <Button type="submit" className="w-full">
                    Resize
                </Button>
                <div className="p-4">
                    <ColorPicker
                    value={background as string} // we dont support gradients and patterns 
                    onChange={changeBackground}
                    />
                </div>
                </form>
            </ScrollArea>
            <ToolSidebarClose onClick={onClose} />
        </aside>
    );
};

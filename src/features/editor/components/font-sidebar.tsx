import { ActiveTool, Editor, fonts } from "@/features/types";
import { cn } from "@/lib/utils";
import { ToolSidebarHeader } from "./tool-sidebar-header";
import { ToolSidebarClose } from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface FontSidebarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
}

export const FontSidebar = ({
    editor,
    activeTool,
    onChangeActiveTool,
}: FontSidebarProps) => {
    const value= editor?.getActiveFontFamily();
    const onClose = () => {
        onChangeActiveTool("select");
    };

    return (
        <aside
            className={cn(
                "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
                activeTool === "font" ? "visible" : "hidden"
            )}
        >
            <ToolSidebarHeader
                title="font"
                description="change the text font "
            />
            <ScrollArea>
                <div className="p-4 space-y-1 border-b">
                   {fonts.map((font) =>(
                    <Button
                        key={font}
                        variant="secondary"
                        size="lg"
                        className={cn(
                            "w-full h-16 justify-start text-left",
                            value === font && "border-2 border-blue-500",
                          )}
                        style={{
                            fontFamily:font,
                            fontSize:"16px",
                            padding:"8px 16px"
                        }}
                        onClick={()=>editor?.changeFontFamily(font )}> 
                            {font}
                    </Button>
                   ))}
                </div>
            </ScrollArea>
            <ToolSidebarClose onClick={onClose} />
        </aside>
    );
};

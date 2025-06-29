"use client";

import {
    LayoutTemplate,
    ImageIcon,
    Pencil,
    Settings,
    Shapes,
    Sparkles,
    Type,
} from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { ActiveTool } from "@/features/types";

interface SidebarProps {
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
}

export const Sidebar = ({ activeTool, onChangeActiveTool }: SidebarProps) => {
    return (
        <aside className="bg-white flex flex-col w-[100px] h-full vorder-r overflow-y-auto">
            <ul className="flex flex-col">
                <SidebarItem
                    icon={LayoutTemplate}
                    label="Templates"
                    isActive={activeTool === "templates"}
                    onClick={() => onChangeActiveTool("templates")}
                />
                <SidebarItem
                    icon={Pencil}
                    label="Draw"
                    isActive={activeTool === "draw"}
                    onClick={() => onChangeActiveTool("draw")}
                />
                <SidebarItem
                    icon={ImageIcon}
                    label="Image"
                    isActive={activeTool === "image"}
                    onClick={() => onChangeActiveTool("image")}
                />
                <SidebarItem
                    icon={Type}
                    label="Text"
                    isActive={activeTool === "text"}
                    onClick={() => onChangeActiveTool("text")}
                />
                <SidebarItem
                    icon={Shapes}
                    label="Shapes"
                    isActive={activeTool === "shapes"}
                    onClick={() => onChangeActiveTool("shapes")}
                />

                
                {/* { <SidebarItem
                    icon={Sparkles}
                    label="AI"
                    isActive={activeTool === "ai"}
                    onClick={() => onChangeActiveTool("ai")}
                /> */}
                <SidebarItem
                    icon={Settings}
                    label="Settings"
                    isActive={activeTool === "settings"}
                    onClick={() => onChangeActiveTool("settings")}
                /> 
            </ul>
        </aside>
    );
};

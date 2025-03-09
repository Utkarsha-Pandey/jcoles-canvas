"use client";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";

import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Hint } from "@/components/hint";
import {
    ChevronDown,
    Download,
    MousePointerClick,
    Redo2,
    Undo2,
} from "lucide-react";
import { CiFileOn } from "react-icons/ci";
import { Separator } from "@/components/ui/separator";
import { BsCloudCheck } from "react-icons/bs";
import { ActiveTool, Editor } from "@/features/types";
import { cn } from "@/lib/utils";
import { UserButton } from "@/features/auth/components/user-button";

interface NavbarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
}

export const Navbar = ({
    editor,
    activeTool,
    onChangeActiveTool,
}: NavbarProps) => {
    return (
        <nav className="w-full flex items-center p-4 h-[68px] gap-x-8 border-b lg:pl-[34px] bg-white justify-between">
            {/* Left Side - Logo and Main Controls */}
            <div className="flex items-center gap-x-4">
                <Logo />
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Button>
                            File
                            <ChevronDown className="size-4 ml-2" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="min-w-60">
                        <DropdownMenuItem
                            className="flex items-center gap-x-2"
                            onClick={() => {}}
                        >
                            <CiFileOn className="size-8" />
                            <div>
                                <p>Open</p>
                                <p className="text-xs text-muted-foreground">
                                    Open a JSON file
                                </p>
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Separator orientation="vertical" className="mx-2" />
                <Hint label="Select" side="bottom" sideOffset={10}>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onChangeActiveTool("select")}
                        className={cn(activeTool === "select" && "bg-gray-100")}
                    >
                        <MousePointerClick className="size-4" />
                    </Button>
                </Hint>
                <Hint label="Undo" side="bottom" sideOffset={10}>
                    <Button
                        disabled={!editor?.canUndo()}
                        variant="ghost"
                        size="icon"
                        onClick={() => editor?.onUndo()}
                    >
                        <Undo2 className="size-4" />
                    </Button>
                </Hint>
                <Hint label="Redo" side="bottom" sideOffset={10}>
                    <Button
                        disabled={!editor?.canRedo()}
                        variant="ghost"
                        size="icon"
                        onClick={() => editor?.onRedo()}
                    >
                        <Redo2 className="size-4" />
                    </Button>
                </Hint>
                <Separator orientation="vertical" className="mx-2" />
                <div className="flex items-center gap-x-2">
                    <BsCloudCheck className="size-[20px] text-muted-foreground" />
                    <div className="text-xs text-muted-foreground">Saved</div>
                </div>
            </div>

            {/* Right Side - Export Button */}
            <div className="flex items-center">
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="ghost">
                            Export
                            <Download className="size-4 ml-2" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="min-w-60">
                        
                        <DropdownMenuItem
                            className="flex items-center gap-x-2"
                            onClick={() => editor?.savePng()}
                        >
                            <CiFileOn className="size-8" />
                            <div>
                                <p>PNG</p>
                                <p className="text-xs text-muted-foreground">
                                    Best for sharing on the web
                                </p>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="flex items-center gap-x-2"
                            onClick={() => editor?.saveJpg()}
                        >
                            <CiFileOn className="size-8" />
                            <div>
                                <p>JPEG</p>
                                <p className="text-xs text-muted-foreground">
                                    Best for printing
                                </p>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="flex items-center gap-x-2"
                            onClick={() => editor?.saveSvg()}
                        >
                            <CiFileOn className="size-8" />
                            <div>
                                <p>SVG</p>
                                <p className="text-xs text-muted-foreground">
                                    Best for vector software
                                </p>
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <UserButton />
            </div>
        </nav>
    );
};

"use client";
import React from "react"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { AlertTriangle, CopyIcon, FileIcon, Loader, MoreHorizontal, Search, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import {formatDistanceToNow} from "date-fns";
import { DropdownMenu , DropdownMenuContent , DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useDuplicateProject } from "@/features/projects/api/use-duplicate-project";

export const ProjectsSection = () => {
    const duplicateMutation = useDuplicateProject();
    const router = useRouter();
    const onCopy = (id: string) =>{
        duplicateMutation.mutate({id});
    };
    const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage } = useGetProjects();

    if (status === "pending") {
        <div className="space-y-4">
            <h3 className="font-semibold text-lg">
                Recent Projects
            </h3>
            <div className="flex flex-col gap-y-4 items-center justify-center">
                <Loader className="size-6 animate-spin text-muted-foreground" />
            </div>
        </div>
    }
    if (status === "error") {
        <div className="space-y-4">
            <h3 className="font-semibold text-lg">
                Recent Projects
            </h3>
            <div className="flex flex-col gap-y-4 items-center justify-center">
                <AlertTriangle className="size-6 text-muted-foreground" />
                <p className="text-muted-foreground text-sm">
                    Failed to load projects
                </p>
            </div>
        </div>
    }

    if (!data?.pages.length) {
        return (
            <div className="space-y-4">
                <h3 className="font-semibold text-lg">
                    Recent Projects
                </h3>
                <div className="flex flex-col gap-y-4 items-center justify-center">
                    <Search className="size-6 text-muted-foreground" />
                    <p className="text-muted-foreground text-sm">
                        No Projects found
                    </p>
                </div>
            </div>
        )
    }
    return (
        <div className="space-y-4">
            <h3 className="font-semibold text-lg">
                Recent Projects
            </h3>
            <Table>
                <TableBody>
                    {data.pages.map((group , i) => (
                        <React.Fragment key={i}>
                            {group.data.map((project) =>(
                                <TableRow>
                                    <TableCell
                                        onClick={() => router.push(`/editor/${project.id}`)}
                                        className="font-medium flex items-center gap-x-2 cursor-pointer">
                                        <FileIcon className="size-6"/>
                                        {project.name}
                                    </TableCell>

                                    <TableCell 
                                        onClick={() => router.push(`/editor/${project.id}`)}
                                        className="hidden md:table-cell curson-pointer">
                                        {project.width} x {project.height} px
                                    </TableCell>

                                    <TableCell 
                                        onClick={() => router.push(`/editor/${project.id}`)}
                                        className="hidden md:table-cell curson-pointer">
                                        {formatDistanceToNow(project.updatedAt , {
                                            addSuffix: true,

                                        })}
                                    </TableCell>


                                    <TableCell 
                                        onClick={() => router.push(`/editor/${project.id}`)}
                                        className="flex items-center justify-end">
                                            <DropdownMenu modal={false} >
                                                <DropdownMenuTrigger asChild>
                                                    <Button size="icon" variant="ghost" disabled={false}>
                                                        <MoreHorizontal className="size-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-60">
                                                    <DropdownMenuItem className="h-10 cursor-pointer" disabled={duplicateMutation.isPending} onClick={() => onCopy(project.id)}>
                                                        <CopyIcon className="size-4 mr-2"/>
                                                        Make a Copy
                                                    </DropdownMenuItem>

                                                    <DropdownMenuItem className="h-10 cursor-pointer" disabled={false} onClick={() => {}}>
                                                        <TrashIcon className="size-4 mr-2"/>
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                    </TableCell>


                                </TableRow>
                            ))}
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>

            {hasNextPage && (
                <div className="w-full flex items-center justify-center pt-4">
                    <Button variant="ghost" onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage} >
                        Load More
                    </Button>

                </div>  
            )}
        </div>
    )
}
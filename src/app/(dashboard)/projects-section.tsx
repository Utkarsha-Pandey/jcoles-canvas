"use client";
import React from "react"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { AlertTriangle, CopyIcon, FileIcon, Loader, MoreHorizontal, Search, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useDuplicateProject } from "@/features/projects/api/use-duplicate-project";
import { useDeleteProject } from "@/features/projects/api/use-delete-project";
import { useConfirm } from "@/hooks/use-confirm";

export const ProjectsSection = () => {

    const [ConfirmDialog , confirm] = useConfirm(
        "Are you sure?" ,
        "You are about to delete this project."
    )
    const duplicateMutation = useDuplicateProject();
    const removeMutation = useDeleteProject();
    const router = useRouter();

    const onCopy = (id: string) => {
        duplicateMutation.mutate({ id });
    };

    const onDelete = async (id: string) => {
        const ok = await confirm();
        if(ok){
            removeMutation.mutate({ id });

        }
    };

    const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage } = useGetProjects();

    if (status === "pending") {
        return (
            <div className="space-y-4">
                <h3 className="font-semibold text-lg">Recent Projects</h3>
                <div className="flex flex-col gap-y-4 items-center justify-center">
                    <Loader className="size-6 animate-spin text-muted-foreground" />
                </div>
            </div>
        );
    }

    if (status === "error") {
        return (
            <div className="space-y-4">
                <h3 className="font-semibold text-lg">Recent Projects</h3>
                <div className="flex flex-col gap-y-4 items-center justify-center">
                    <AlertTriangle className="size-6 text-muted-foreground" />
                    <p className="text-muted-foreground text-sm">Failed to load projects</p>
                </div>
            </div>
        );
    }

    if (!data?.pages.length || !data.pages[0].data.length) {
        return (
            <div className="space-y-4">
                <h3 className="font-semibold text-lg">Recent Projects</h3>
                <div className="flex flex-col gap-y-4 items-center justify-center">
                    <Search className="size-6 text-muted-foreground" />
                    <p className="text-muted-foreground text-sm">No Projects found</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <ConfirmDialog />
            <h3 className="font-semibold text-lg">Recent Projects</h3>
            <Table>
                <TableBody>
                    {data.pages.map((group, i) => (
                        <React.Fragment key={i}>
                            {group.data.map((project) => (
                                <TableRow key={project.id}>
                                    <TableCell
                                        onClick={() => router.push(`/editor/${project.id}`)}
                                        className="font-medium flex items-center gap-x-2 cursor-pointer"
                                    >
                                        <FileIcon className="size-6" />
                                        {project.name}
                                    </TableCell>

                                    <TableCell
                                        onClick={() => router.push(`/editor/${project.id}`)}
                                        className="hidden md:table-cell cursor-pointer"
                                    >
                                        {project.width} x {project.height} px
                                    </TableCell>

                                    <TableCell
                                        onClick={() => router.push(`/editor/${project.id}`)}
                                        className="hidden md:table-cell cursor-pointer"
                                    >
                                        {formatDistanceToNow(project.updatedAt, { addSuffix: true })}
                                    </TableCell>

                                    <TableCell className="flex items-center justify-end">
                                        <div className="pointer-events-auto">
                                            <DropdownMenu modal={false}>
                                                <DropdownMenuTrigger asChild>
                                                    <Button size="icon" variant="ghost">
                                                        <MoreHorizontal className="size-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-60">
                                                    <DropdownMenuItem
                                                        className="h-10 cursor-pointer"
                                                        disabled={duplicateMutation.isPending}
                                                        onClick={() => onCopy(project.id)}
                                                    >
                                                        <CopyIcon className="size-4 mr-2" />
                                                        Make a Copy
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="h-10 cursor-pointer"
                                                        disabled={removeMutation.isPending}
                                                        onClick={() => onDelete(project.id)}
                                                    >
                                                        <TrashIcon className="size-4 mr-2" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>

            {hasNextPage && (
                <div className="w-full flex items-center justify-center pt-4">
                    <Button variant="ghost" onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
                        Load More
                    </Button>
                </div>
            )}
        </div>
    );
};

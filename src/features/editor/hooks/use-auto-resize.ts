import { useCallback, useEffect } from "react";
import { fabric } from "fabric";

interface useAutoResizeProps {
    canvas: fabric.Canvas | null;
    container: HTMLDivElement | null;
}

export const useAutoResize = ({ canvas, container }: useAutoResizeProps) => {
    const autoZoom = useCallback(() => {
        if (!canvas || !container) return;

        const width = container.offsetWidth;
        const height = container.offsetHeight;
        canvas.setWidth(width);
        canvas.setHeight(height);

        const center = canvas.getCenter();
        const zoomRatio = 0.85;
        const localWorkspace = canvas.getObjects().find((object) => object.name === "clip");

        if (!localWorkspace) return;

        // Manually calculate scale to fit
        const scaleX = width / localWorkspace.width!;
        const scaleY = height / localWorkspace.height!;
        const scale = Math.min(scaleX, scaleY); // Find the smaller scale to fit the object

        const zoom = zoomRatio * scale;

        // Reset the viewport transform
        canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
        canvas.zoomToPoint(new fabric.Point(center.left, center.top), zoom);

        const workspaceCenter = localWorkspace.getCenterPoint();
        const viewportTransform = canvas.viewportTransform;

        if (canvas.width === undefined ||
            canvas.height === undefined ||
            !viewportTransform
        ) {
            return;
        }

        viewportTransform[4] = canvas.width / 2 - workspaceCenter.x * viewportTransform[0];
        viewportTransform[5] = canvas.height / 2 - workspaceCenter.y * viewportTransform[3];

        canvas.setViewportTransform(viewportTransform);

        localWorkspace.clone((cloned: fabric.Rect) => {
            canvas.clipPath = cloned;
            canvas.requestRenderAll();
        });
    }, [canvas, container]);

    useEffect(() => {
        let resizeObserver: ResizeObserver | null = null;

        if (canvas && container) {
            resizeObserver = new ResizeObserver(() => {
                autoZoom();
            });
            resizeObserver.observe(container);
        }

        return () => {
            if (resizeObserver) {
                resizeObserver.disconnect();
            }
        };
    }, [canvas, container, autoZoom]);

    return {autoZoom};
};

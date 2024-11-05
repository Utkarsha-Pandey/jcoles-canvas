import type { RGBColor } from "react-color";

export const isTextType = (type: string | undefined): boolean => {
    return (
        type === "textbox" ||
        type === "text" ||
        type === "i-text"
    );
};



export function rgbObjectToString(rgba: RGBColor | "transparent") {
    if (rgba === "transparent") {
        return `rgba(0,0,0,0)`;
    }

    const alpha = rgba.a === undefined ? 1 : rgba.a;

    return `rgba(${rgba.r} , ${rgba.g} , ${rgba.b} , ${alpha})`;
}

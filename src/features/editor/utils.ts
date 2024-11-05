import type { RGBColor } from "react-color";
import {fabric} from "fabric";
export function isTextType(type: string | undefined) {
    return type === "text" || type === "i-text" || type === "textbox";
}

export function rgbObjectToString(rgba: RGBColor | "transparent") {
    if (rgba === "transparent") {
        return `rgba(0,0,0,0)`;
    }

    const alpha = rgba.a === undefined ? 1 : rgba.a;

    return `rgba(${rgba.r} , ${rgba.g} , ${rgba.b} , ${alpha})`;
};

export const createFilter =(value: string)=>{
  let effect;
  switch(value){
    case "polaroid":
        //@ts-ignore
    effect= new fabric.Image.filters.Polaroid();
    break;
    case "sepia":
    effect= new fabric.Image.filters.Sepia();
    break;
    case "kodachrome":
        //@ts-ignore
    effect= new fabric.Image.filters.Kodachrome();
    break;
    case "contrast":
    effect= new fabric.Image.filters.Contrast({contrast:0.3});
    break;
    case "brightness":
    effect= new fabric.Image.filters.Brightness({brightness :0.8});
    break;
    case "brownie":
    //@ts-ignore
    effect= new fabric.Image.filters.Brownie();
    break;
  }
}

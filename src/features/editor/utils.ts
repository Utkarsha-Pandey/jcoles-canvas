import type { RGBColor } from "react-color";
import { fabric } from "fabric";
import { uuid } from "uuidv4";

export function downloadFile(file : string , type: string ){
  const anchorElement = document.createElement("a");
  anchorElement.href = file;
  anchorElement.download = `${uuid()}.${type}`;
  document.body.appendChild(anchorElement);
  anchorElement.click();
  anchorElement.remove();
}

export const isTextType = (type: string | undefined): boolean => {
  return type === "textbox" || type === "text" || type === "i-text";
};

export function rgbObjectToString(rgba: RGBColor | "transparent") {
  if (rgba === "transparent") {
    return `rgba(0,0,0,0)`;
  }

  const alpha = rgba.a === undefined ? 1 : rgba.a;

  return `rgba(${rgba.r} , ${rgba.g} , ${rgba.b} , ${alpha})`;
}

export const createFilter = (value: string) => {
  let effect;
  switch (value) {
    case "greyscale":
      effect = new fabric.Image.filters.Grayscale();
      break;
    case "polaroid":
      //@ts-ignore
      effect = new fabric.Image.filters.Polaroid();
      break;
    case "sepia":
      effect = new fabric.Image.filters.Sepia();
      break;
    case "kodachrome":
      //@ts-ignore
      effect = new fabric.Image.filters.Kodachrome();
      break;
    case "contrast":
      effect = new fabric.Image.filters.Contrast({ contrast: 0.3 });
      break;
    case "brightness":
      effect = new fabric.Image.filters.Brightness({ brightness: 0.8 });
      break;
    case "brownie":
      //@ts-ignore
      effect = new fabric.Image.filters.Brownie();
      break;
    case "vintage":
      //@ts-ignore
      effect = new fabric.Image.filters.Vintage();
      break;
    case "technicolor":
      //@ts-ignore
      effect = new fabric.Image.filters.Technicolor();
      break;
    case "pixelate":
      //@ts-ignore
      effect = new fabric.Image.filters.Pixalate();
      break;
    case "invert":
      effect = new fabric.Image.filters.Invert();
      break;
    case "blur":
      effect = new fabric.Image.filters.Blur();
      break;
    case "sharpen":
      effect = new fabric.Image.filters.Convolute({
        matrix: [0, -1, 0, -1, 5, -1, 0, -1, 0],
      });
      break;
    case "emboss":
      effect = new fabric.Image.filters.Convolute({
        matrix: [1, 1, 1, 1, 0.7, -1, -1, -1, -1],
      });
      break;
    case "removecolor":
      //@ts-ignore
      effect = new fabric.Image.filters.RemoveColor({
        threshold: 0.2,
        distance: 0.5,
      });
      break;
    case "blacknwhite":
      //@ts-ignore
      effect = new fabric.Image.filters.BlackWhite();
      break;
    case "vibrance":
      //@ts-ignore
      effect = new fabric.Image.filters.Vibrance({
        vibrance: 1,
      });
      break;
    case "blendcolor":
      //@ts-ignore
      effect = new fabric.Image.filters.Blendcolor({
        color: "00ff00",
        mode: "multipy",
      });
      break;
    case "huerotate":
      effect = new fabric.Image.filters.HueRotation({
        rotation: 0.5,
      });
      break;
    case "resize":
      effect = new fabric.Image.filters.Resize();
      break;
    case "gamma":
      effect = new fabric.Image.filters.Gamma({
        gamma: [1, 0.5, 2.1],
      });
      break;
    case "saturation":
      effect = new fabric.Image.filters.Saturation({
        saturation: 0.7,
      });
      break;
    default:
      effect = null;
      return;
  }
  return effect;
};

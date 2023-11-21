import { EventCenter } from "../event/eventCenter";
import { RoughCanvasRenderer } from "./renderer";
import { VerbalCanvas } from "./verbalCanvas";
import rough from "roughjs";
import { VerbalManager } from "./verbalManager";

export function initCanvas(
  container: HTMLElement,
  width: number,
  height: number
) {
  const renderCanvasDom = document.createElement("canvas");
  const eventCanvasDom = document.createElement("canvas");
  const renderCanvasCtx = renderCanvasDom.getContext("2d")!;
  const eventCanvasCtx = eventCanvasDom.getContext("2d")!;
  const renderer1 = new RoughCanvasRenderer(
    renderCanvasDom,
    renderCanvasCtx,
    rough.canvas(renderCanvasDom)
  );
  const renderer2 = new RoughCanvasRenderer(
    eventCanvasDom,
    eventCanvasCtx,
    rough.canvas(eventCanvasDom)
  );

  container.setAttribute(
    "style",
    `position: relative; width: ${width}px; height: ${height}px;`
  );

  renderCanvasDom.setAttribute("width", width + "");
  renderCanvasDom.setAttribute("height", height + "");
  renderCanvasDom.setAttribute("style", "background-color: #eee;");
  eventCanvasDom.setAttribute("width", width + "");
  eventCanvasDom.setAttribute("height", height + "");
  eventCanvasDom.setAttribute("style", `position: absolute; left: 0; top: 0;`);
  eventCanvasDom.setAttribute(
    "oldStyle",
    `position: absolute; left: 0; top: 0;`
  );

  const renderCanvas = new VerbalCanvas(
    renderCanvasDom,
    renderCanvasCtx,
    renderer1
  );
  const eventCanvas = new VerbalCanvas(
    eventCanvasDom,
    eventCanvasCtx,
    renderer2
  );

  const eventCenter = new EventCenter(
    eventCanvasDom,
    renderCanvas,
    eventCanvas
  );

  container.appendChild(renderCanvasDom);
  container.appendChild(eventCanvasDom);

  return new VerbalManager(renderCanvas, eventCanvas, eventCenter);
}

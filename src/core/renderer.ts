import { RoughCanvas } from "../../node_modules/roughjs/bin/canvas";
import { Point } from "../util/math";
import { VerbalWidget } from "../widget/verbalWidget";

export interface Renderer {
  render(widget: VerbalWidget): void;
  getCanvasDom(): HTMLCanvasElement;
  getCanvasCtx(): CanvasRenderingContext2D;
}

export class RoughCanvasRenderer implements Renderer {
  private canvasDom: HTMLCanvasElement;
  private canvasCtx: CanvasRenderingContext2D;
  private rc: RoughCanvas;

  constructor(
    canvasDom: HTMLCanvasElement,
    canvasCtx: CanvasRenderingContext2D,
    rc: RoughCanvas
  ) {
    this.canvasDom = canvasDom;
    this.canvasCtx = canvasCtx;
    this.rc = rc;
  }

  render(widget: VerbalWidget): void {
    const type = widget.get("shapeType");
    switch (type) {
      case "rectangle":
        this.rc.rectangle(
          widget.get("x"),
          widget.get("y"),
          widget.get("width"),
          widget.get("height"),
          widget.get("style")
        );
        break;
      case "ellipse":
        const basePoint: Point = widget.get("basePoint");
        this.rc.ellipse(
          basePoint.x,
          basePoint.y,
          widget.get("width"),
          widget.get("height"),
          widget.get("style")
        );
        break;
      case "line":
        this.rc.line(
          widget.get("p1").x,
          widget.get("p1").y,
          widget.get("p2").x,
          widget.get("p2").y,
          widget.get("style")
        );
        break;
    }
  }

  getCanvasDom(): HTMLCanvasElement {
    return this.canvasDom;
  }

  getCanvasCtx(): CanvasRenderingContext2D {
    return this.canvasCtx;
  }
}

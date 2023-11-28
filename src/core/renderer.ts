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
          0,
          0,
          widget.get("scaleWidth"),
          widget.get("scaleHeight"),
          widget.get("style")
        );
        break;
      case "ellipse":
        this.rc.ellipse(
          widget.get("scaleWidth") >> 1,
          widget.get("scaleHeight") >> 1,
          widget.get("scaleWidth"),
          widget.get("scaleHeight"),
          widget.get("style")
        );
        break;
      case "line":
        this.rc.line(
          0,
          0,
          widget.get("width"),
          widget.get("height"),
          widget.get("style")
        );
        break;
      case "triangle":
        this.rc.polygon(
          [
            [widget.get("scaleWidth") >> 1, 0],
            [0, widget.get("scaleHeight")],
            [widget.get("scaleWidth"), widget.get("scaleHeight")],
          ],
          widget.get("style")
        );
        break;
      case "rhombus":
        this.rc.polygon(
          [
            [widget.get("scaleWidth") >> 1, 0],
            [widget.get("scaleWidth"), widget.get("scaleHeight") >> 1],
            [widget.get("scaleWidth") >> 1, widget.get("scaleHeight")],
            [0, widget.get("scaleHeight") >> 1],
          ],
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

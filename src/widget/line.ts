import { Renderer } from "../core/renderer";
import {
  Point,
  calP2pDistance,
  calVectorAngle2,
  degreeToRadian,
} from "../util/math";
import { VerbalWidget } from "./verbalWidget";

export class Line extends VerbalWidget {
  shapeType: string = "line";
  p1: Point = { x: 0, y: 0 };
  p2: Point = { x: 0, y: 0 };

  constructor(data: any) {
    super(data);
    if (data.x1 && data.x2 && data.y1 && data.y2) {
      this.p1.x = data.x1;
      this.p1.y = data.y1;
      this.p2.x = data.x2;
      this.p2.y = data.y2;
      const lineWidth = this.style.strokeWidth ?? 2;
      this.x = Math.min(data.x1, data.x2) - (lineWidth >> 1);
      this.y = Math.min(data.y1, data.y2) - (lineWidth >> 1);
      const nWidth = Math.max(data.x1, data.x2) - this.x;
      const nHeight = Math.max(data.y1, data.y2) - this.y;
      this.width = nWidth === 0 ? lineWidth : nWidth;
      this.height = nHeight === 0 ? lineWidth : nHeight;
    }
  }

  protected _render(renderer: Renderer): void {
    renderer.render(this);
  }

  update(data: any): void {
    this.initData(data);
  }

  updatePosition(data: any) {
    this.initData(data);
    this.updateBasePoint();
    this.updateTransformer();
    this.emit("_update_watch_", {
      target: this,
      eventType: "_update_watch_",
    });
  }

  isPointOnWidget(x: number, y: number): boolean {
    const degree = calVectorAngle2(
      { start: this.p1, end: this.p2 },
      {
        start: this.p1,
        end: { x, y },
      }
    );
    const dis =
      Math.sin(degreeToRadian(degree)) * calP2pDistance({ x, y }, this.p1);
    return dis <= 2.5;
  }
}

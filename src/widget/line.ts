import { Renderer } from "../core/renderer";
import { Point, calBoxSelectInfo, rayMethod } from "../util/math";
import { VerbalWidget } from "./verbalWidget";

export class Line extends VerbalWidget {
  shapeType: string = "line";
  p1: Point = { x: 0, y: 0 };
  p2: Point = { x: 0, y: 0 };
  style: any = { strokeWidth: 2 };

  constructor(data: any) {
    super(data);
    this.p1 = data.p1 ?? this.p1;
    this.p2 = data.p2 ?? this.p2;
    const strokeWidthHalf = this.style.strokeWidth
      ? this.style.strokeWidth >> 1
      : 1;
    const { x, y, width, height } = calBoxSelectInfo(this.p1, this.p2);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    if (width === 0) {
      this.x = x - strokeWidthHalf;
      this.width = strokeWidthHalf << 1;
    }
    if (height === 0) {
      this.y = y - strokeWidthHalf;
      this.height = strokeWidthHalf << 1;
    }
  }

  protected updateCornerPoints(): void {
    this.width;
  }

  isPointOnCorner(x: number, y: number): number {
    return -1;
  }

  protected _render(renderer: Renderer): void {
    renderer.render(this);
  }
}

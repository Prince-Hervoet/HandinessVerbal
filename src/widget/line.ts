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
    this.x = data.x1 ?? 0;
    this.y = data.y1 ?? 0;
    this.width = data.x2 ?? 0 - this.x;
    this.height = data.y2 ?? 0 - this.y;
  }

  protected updateCornerPoints(): void {
    const cornerWidth = 12;
    const cornerHeight = 12;
    const cornerWidthHalf = 6;
    const cornerHeightHalf = 6;
  }

  isPointOnCorner(x: number, y: number): number {
    return -1;
  }

  protected _render(renderer: Renderer): void {
    renderer.render(this);
  }
}

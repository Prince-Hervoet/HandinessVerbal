import { Renderer } from "../core/renderer";
import { VerbalWidget } from "./verbalWidget";

export class Line extends VerbalWidget {
  shapeType: string = "line";
  x1: number = 0;
  y1: number = 0;
  x2: number = 0;
  y2: number = 0;
  style: any = { strokeWidth: 2 };

  constructor(data: any) {
    super(data);
    console.log(data);
    this.x1 = data.x1 ?? 0;
    this.y1 = data.y1 ?? 0;
    this.x2 = data.x2 ?? 0;
    this.y2 = data.y2 ?? 0;
    this.x = this.x1;
    this.y = this.y1;
    this.width = this.x2 - this.x1;
    this.height = this.y2 - this.y1;
    this.updateBoundingBoxPoints();
    this.updateCornerPoints();
    this.updateTransformer();
    this.updateTransformer();
    console.log(this);
  }

  update(data: any): void {
    this.initData(data);
    this.x = this.x1;
    this.y = this.y1;
    this.width = this.x2 - this.x;
    this.height = this.y2 - this.y;
    this.updateBoundingBoxPoints();
    this.updateCornerPoints();
    this.updateTransformer();
    this.emit("_update_watch_", {
      target: this,
      eventType: "_update_watch_",
    });
  }

  updatePosition(data: any): void {
    this.initData(data);
    this.x1 = this.x;
    this.y1 = this.y;
    this.x2 = this.x + this.width;
    this.y2 = this.y + this.height;
    this.updateBoundingBoxPoints();
    this.updateCornerPoints();
    this.updateTransformer();
    this.emit("_update_watch_", {
      target: this,
      eventType: "_update_watch_",
    });
  }

  protected updateCornerPoints(): void {
    const cornerWidth = 12;
    const cornerHeight = 12;
    const cornerWidthHalf = 6;
    const cornerHeightHalf = 6;
    const nx = this.x + this.width;
    const ny = this.y + this.height;
    this.cornerPoints = [
      [
        { x: this.x - cornerWidthHalf, y: this.y - cornerHeightHalf },
        { x: this.x + cornerWidthHalf, y: this.y - cornerHeightHalf },
        { x: this.x + cornerWidthHalf, y: this.y + cornerHeightHalf },
        { x: this.x - cornerWidthHalf, y: this.y + cornerHeightHalf },
      ],
      [
        { x: nx - cornerWidthHalf, y: ny - cornerHeightHalf },
        { x: nx + cornerWidthHalf, y: ny - cornerHeightHalf },
        { x: nx + cornerWidthHalf, y: ny + cornerHeightHalf },
        { x: nx - cornerWidthHalf, y: ny + cornerHeightHalf },
      ],
    ];
  }

  protected _render(renderer: Renderer): void {
    renderer.render(this);
  }
}

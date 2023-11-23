import { Renderer } from "../../core/renderer";
import { Point } from "../../util/math";
import { VerbalWidget } from "../verbalWidget";

export class LineTransformer extends VerbalWidget {
  shapeType: string = "lineTransformer";
  cornerWidth: number = 12;
  cornerHeight: number = 12;
  padding: number = 6;
  p1: Point = { x: 0, y: 0 };
  p2: Point = { x: 0, y: 0 };

  protected _render(renderer: Renderer): void {
    const ctx = renderer.getCanvasCtx();
    const cornerWidthHalf = this.cornerWidth >> 1;
    const cornerHeightHalf = this.cornerHeight >> 1;
    ctx.globalAlpha = this.style.globalAlpha ?? 0.7;
    ctx.fillStyle = this.style.fill ?? "#3d84a8";
    ctx.fillRect(
      this.p1.x - cornerWidthHalf,
      this.p1.y - cornerHeightHalf,
      this.cornerWidth,
      this.cornerHeight
    );
    ctx.fillRect(
      this.p2.x - cornerWidthHalf,
      this.p2.y - cornerHeightHalf,
      this.cornerWidth,
      this.cornerHeight
    );
  }

  update(data: any): void {
    this.initData(data);
    this.updateBasePoint();
    this.emit("_update_watch_", {
      target: this,
      eventType: "_update_watch_",
    });
  }
}

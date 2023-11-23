import { Renderer } from "../../core/renderer";
import { VerbalWidget } from "../verbalWidget";

export class HittingFlag extends VerbalWidget {
  shapeType: string = "hittingFlag";
  cornerWidth: number = 12;
  cornerHeight: number = 12;
  padding: number = 6;

  update(data: any): void {
    this.initData(data);
    this.updateBasePoint();
    this.emit("_update_watch_", {
      target: this,
      eventType: "_update_watch_",
    });
  }

  protected _render(renderer: Renderer): void {
    const ctx = renderer.getCanvasCtx();
    ctx.strokeStyle = this.style.stroke ?? "#46cdcf";
    ctx.globalAlpha = this.style.globalAlpha ?? 0.7;
    ctx.lineWidth = this.style.strokeWidth ?? 3;
    ctx.fillStyle = this.style.fill ?? "#3d84a8";
    const nx = this.x - this.padding;
    const ny = this.y - this.padding;
    const nWidth = this.width + (this.padding << 1);
    const nHeight = this.height + (this.padding << 1);
    const cornerWidthHalf = this.cornerWidth >> 1;
    const cornerHeightHalf = this.cornerHeight >> 1;
    const widthHalf = nWidth >> 1;
    const heightHalf = nHeight >> 1;
    ctx.strokeRect(nx, ny, nWidth, nHeight);
    ctx.fillRect(
      nx - cornerWidthHalf,
      ny - cornerHeightHalf,
      this.cornerWidth,
      this.cornerHeight
    );
    ctx.fillRect(
      nx - cornerWidthHalf + nWidth,
      ny - cornerHeightHalf,
      this.cornerWidth,
      this.cornerHeight
    );
    ctx.fillRect(
      nx - cornerWidthHalf + nWidth,
      ny - cornerHeightHalf + nHeight,
      this.cornerWidth,
      this.cornerHeight
    );
    ctx.fillRect(
      nx - cornerWidthHalf,
      ny - cornerHeightHalf + nHeight,
      this.cornerWidth,
      this.cornerHeight
    );
    ctx.fillRect(
      nx - cornerWidthHalf + widthHalf,
      ny - cornerHeightHalf - 20,
      this.cornerWidth,
      this.cornerHeight
    );
  }
}

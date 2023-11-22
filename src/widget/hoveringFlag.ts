import { Renderer } from "../core/renderer";
import { VerbalWidget } from "./verbalWidget";

export class HoveringFlag extends VerbalWidget {
  shapeType: string = "hoveringFlag";

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
    ctx.lineWidth = this.style.strokeWidth ?? 3;
    ctx.strokeRect(
      this.x - ctx.lineWidth,
      this.y - ctx.lineWidth,
      this.width + (ctx.lineWidth << 1),
      this.height + (ctx.lineWidth << 1)
    );
  }
}

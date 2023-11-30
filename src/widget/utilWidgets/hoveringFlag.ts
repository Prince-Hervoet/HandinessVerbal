import { Renderer } from "../../core/renderer";
import { GStyles } from "../../util/gStyles";
import { VerbalWidget } from "../verbalWidget";

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
    const { stroke, strokeWidth } = GStyles.hoveringFlagStyle;
    const ctx = renderer.getCanvasCtx();
    ctx.strokeStyle = this.style.stroke ?? stroke;
    ctx.lineWidth = this.style.strokeWidth ?? strokeWidth;
    ctx.strokeRect(
      -ctx.lineWidth,
      -ctx.lineWidth,
      this.width + (ctx.lineWidth << 1),
      this.height + (ctx.lineWidth << 1)
    );
  }
}

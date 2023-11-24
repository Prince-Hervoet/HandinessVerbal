import { Renderer } from "../../core/renderer";
import { VerbalWidget } from "../verbalWidget";

export class BoxSelectRect extends VerbalWidget {
  shapeType: string = "boxSelectRect";

  protected _render(renderer: Renderer): void {
    const ctx = renderer.getCanvasCtx();
    ctx.fillStyle = this.style.fill ?? "#46cdcf";
    ctx.globalAlpha = this.style.globalAlpha ?? 0.3;
    ctx.fillRect(0, 0, this.width, this.height);
  }
}

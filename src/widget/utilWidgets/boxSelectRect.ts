import { Renderer } from "../../core/renderer";
import { GStyles } from "../../util/gStyles";
import { VerbalWidget } from "../verbalWidget";

export class BoxSelectRect extends VerbalWidget {
  shapeType: string = "boxSelectRect";

  protected _render(renderer: Renderer): void {
    const { fill, globalAlpha } = GStyles.boxSelectFlagStyle;
    const ctx = renderer.getCanvasCtx();
    ctx.fillStyle = this.style.fill ?? fill;
    ctx.globalAlpha = this.style.globalAlpha ?? globalAlpha;
    ctx.fillRect(0, 0, this.width, this.height);
  }
}

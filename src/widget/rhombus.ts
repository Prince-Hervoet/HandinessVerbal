import { Renderer } from "../core/renderer";
import { rayMethod } from "../util/math";
import { VerbalWidget } from "./verbalWidget";

export class Rhombus extends VerbalWidget {
  shapeType: string = "rhombus";

  protected _render(renderer: Renderer): void {
    renderer.render(this);
  }

  protected updatePathPoints(): void {
    this.pathPoints = [
      { x: this.x + (this.scaleWidth >> 1), y: this.y },
      { x: this.x + this.scaleWidth, y: this.y + (this.scaleHeight >> 1) },
      { x: this.x + (this.scaleWidth >> 1), y: this.y + this.scaleHeight },
      { x: this.x, y: this.y + (this.scaleHeight >> 1) },
    ];
  }

  isPointOnWidget(x: number, y: number): boolean {
    return rayMethod({ x, y }, this.pathPoints);
  }
}

import { Renderer } from "../core/renderer";
import { calMultiPointsInfo, rayMethod } from "../util/math";
import { VerbalWidget } from "./verbalWidget";

export class Triangle extends VerbalWidget {
  shapeType: string = "triangle";

  protected _render(renderer: Renderer): void {
    renderer.render(this);
  }

  protected updatePathPoints(): void {
    this.pathPoints = [
      { x: this.x + (this.scaleWidth >> 1), y: this.y },
      { x: this.x, y: this.y + this.scaleHeight },
      { x: this.x + this.scaleWidth, y: this.y + this.scaleHeight },
    ];
  }

  isPointOnWidget(x: number, y: number): boolean {
    return rayMethod({ x, y }, this.pathPoints);
  }
}

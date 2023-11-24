import { Renderer } from "../core/renderer";
import { rayMethod } from "../util/math";
import { VerbalWidget } from "./verbalWidget";

/**
 * 矩形
 */
export class Rectangle extends VerbalWidget {
  shapeType: string = "rectangle";

  protected _render(renderer: Renderer): void {
    renderer.render(this);
  }

  protected updatePathPoints(): void {
    this.pathPoints = [
      { x: this.x, y: this.y },
      { x: this.x + this.scaleWidth, y: this.y },
      { x: this.x + this.scaleWidth, y: this.y + this.scaleHeight },
      { x: this.x, y: this.y + this.scaleHeight },
    ];
  }

  isPointOnWidget(x: number, y: number): boolean {
    return rayMethod({ x, y }, this.pathPoints);
  }
}

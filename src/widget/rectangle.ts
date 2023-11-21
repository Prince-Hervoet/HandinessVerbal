import { Renderer } from "../core/renderer";
import { rayMethod } from "../util/math";
import { VerbalWidget } from "./verbalWidget";

export class Rectangle extends VerbalWidget {
  shapeType: string = "rectangle";

  protected _render(renderer: Renderer): void {
    renderer.render(this);
  }

  protected updatePathPoints(): void {
    this.pathPoints = [
      { x: this.x, y: this.y },
      { x: this.x + this.width, y: this.y },
      { x: this.x + this.width, y: this.y + this.height },
      { x: this.x, y: this.y + this.height },
    ];
  }

  isPointOnWidget(x: number, y: number): boolean {
    return rayMethod({ x, y }, this.pathPoints);
  }
}

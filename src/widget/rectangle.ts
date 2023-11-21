import { rayMethod } from "../util/math";
import { VerbalWidget } from "./verbalWidget";

export class Rectangle extends VerbalWidget {
  shapeType: string = "rectangle";

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

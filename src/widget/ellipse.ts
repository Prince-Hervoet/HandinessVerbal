import { Renderer } from "../core/renderer";
import { VerbalWidget } from "./verbalWidget";

export class Ellipse extends VerbalWidget {
  shapeType: string = "ellipse";

  protected _render(renderer: Renderer): void {
    renderer.render(this);
  }

  isPointOnWidget(x: number, y: number): boolean {
    const widthHalf = this.scaleWidth >> 1;
    const heightHalf = this.scaleHeight >> 1;
    const nx = x - this.basePoint.x;
    const ny = y - this.basePoint.y;
    return (
      (nx * nx) / (widthHalf * widthHalf) +
        (ny * ny) / (heightHalf * heightHalf) <
      1
    );
  }
}

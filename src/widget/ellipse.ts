import { Renderer } from "../core/renderer";
import { degreeToRadian } from "../util/math";
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
    const cos = Math.cos(degreeToRadian(this.degree));
    const sin = Math.sin(degreeToRadian(this.degree));
    const ta = nx * cos + ny * sin;
    const tb = -nx * sin - ny * cos;
    return (
      (ta * ta) / (widthHalf * widthHalf) +
        (tb * tb) / (heightHalf * heightHalf) <
      1
    );
  }
}

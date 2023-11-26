import { Renderer } from "../core/renderer";
import { degreeToRadian, rayMethod } from "../util/math";
import { VerbalWidget } from "./verbalWidget";

export class Ellipse extends VerbalWidget {
  shapeType: string = "ellipse";

  protected _render(renderer: Renderer): void {
    renderer.render(this);
  }

  isPointOnWidget(x: number, y: number): boolean {
    return rayMethod({ x, y }, this.boundingBoxPoints);
  }
}

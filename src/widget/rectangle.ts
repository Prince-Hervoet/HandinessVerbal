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

  isPointOnWidget(x: number, y: number): boolean {
    return rayMethod({ x, y }, this.boundingBoxPoints);
  }
}

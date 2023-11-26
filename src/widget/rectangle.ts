import { Renderer } from "../core/renderer";
import { VerbalWidget } from "./verbalWidget";

/**
 * 矩形
 */
export class Rectangle extends VerbalWidget {
  shapeType: string = "rectangle";

  protected _render(renderer: Renderer): void {
    renderer.render(this);
  }
}

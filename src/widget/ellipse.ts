import { Renderer } from "../core/renderer";
import { VerbalWidget } from "./verbalWidget";

export class Ellipse extends VerbalWidget {
  shapeType: string = "ellipse";

  protected _render(renderer: Renderer): void {
    renderer.render(this);
  }
}

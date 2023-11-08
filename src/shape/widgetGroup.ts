import { BaseBoxPosition, IWidget, Point } from "../util/someTypes.js";
import { BaseWidget } from "./baseWidget.js";

export class WidgetGroup extends BaseWidget {
  public members: IWidget[] = [];

  render(ctx: CanvasRenderingContext2D): void {
    throw new Error("Method not implemented.");
  }
  update(props: any): void {
    throw new Error("Method not implemented.");
  }
  getPoints(): Point[] {
    throw new Error("Method not implemented.");
  }
  getBoundingBoxPosition(): BaseBoxPosition {
    throw new Error("Method not implemented.");
  }
}

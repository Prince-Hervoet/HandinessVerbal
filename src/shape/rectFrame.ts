import { BoundingBoxPosition, IWidget, Point } from "../util/someTypes";

class RectFrame implements IWidget {
  render(ctx: CanvasRenderingContext2D): void {
    throw new Error("Method not implemented.");
  }
  update(props: any): void {
    throw new Error("Method not implemented.");
  }
  getWidgetId(): string {
    throw new Error("Method not implemented.");
  }
  getPoints(): Point[] {
    throw new Error("Method not implemented.");
  }
  getBoundingBoxPosition(): BoundingBoxPosition {
    throw new Error("Method not implemented.");
  }
}

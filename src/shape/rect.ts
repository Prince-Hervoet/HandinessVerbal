import { getWidgetId, setCtxStyle } from "../util/calculate.js";
import { BoundingBoxPosition, IWidget, Point } from "../util/someTypes.js";

export class Rect implements IWidget {
  private widgetId: string = "";
  private x: number = 0;
  private y: number = 0;
  private width: number = 0;
  private height: number = 0;
  private style: any;
  private points: Point[] = [];

  constructor(props: any) {
    this.widgetId = getWidgetId();
    this.x = props.x;
    this.y = props.y;
    this.width = props.width;
    this.height = props.height;
    this.style = props.style;
    this.calPoints();
  }

  private calPoints() {
    this.points.push({ x: this.x, y: this.y });
    this.points.push({ x: this.x + this.width, y: this.y });
    this.points.push({ x: this.x + this.width, y: this.y + this.height });
    this.points.push({ x: this.x, y: this.y + this.height });
  }

  render(ctx: CanvasRenderingContext2D): void {
    // 设置风格
    setCtxStyle(ctx, this.style);
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update(props: any): void {
    this.x = props.x;
    this.y = props.y;
    this.width = props.width;
    this.height = props.height;
    this.style = props.style;
    this.calPoints();
  }

  getWidgetId(): string {
    return this.widgetId;
  }

  getPoints(): Point[] {
    return this.points;
  }

  getBoundingBoxPosition(): BoundingBoxPosition {
    return { x: this.x, y: this.y, width: this.width, height: this.height };
  }
}

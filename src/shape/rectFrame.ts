import { setCtxStyle } from "../util/calculate.js";
import { BoundingBoxPosition, IWidget, Point } from "../util/someTypes.js";
import { BaseWidget } from "./baseWidget.js";

export class RectFrame extends BaseWidget {
  constructor(props: any) {
    super();
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
    setCtxStyle(ctx, this.style);
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }

  update(props: any): void {
    this.x = props.x ?? this.x;
    this.y = props.y ?? this.y;
    this.width = props.width ?? this.width;
    this.height = props.height ?? this.height;
    this.style = props.style ?? this.style;
    this.calPoints();
  }

  getPoints(): Point[] {
    return this.points;
  }

  getBoundingBoxPosition(): BoundingBoxPosition {
    return { x: this.x, y: this.y, width: this.width, height: this.height };
  }
}

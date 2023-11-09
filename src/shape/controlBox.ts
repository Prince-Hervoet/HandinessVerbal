import { setCtxStyle } from "../util/calculate.js";
import { BoundingBoxPosition, Point } from "../util/someTypes.js";
import { BaseWidget } from "./baseWidget.js";

const SmallRectWidth = 10;

export class ControlBox extends BaseWidget {
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
    this.points = [];
    this.points.push({ x: this.x, y: this.y });
    this.points.push({ x: this.x + this.width, y: this.y });
    this.points.push({ x: this.x + this.width, y: this.y + this.height });
    this.points.push({ x: this.x, y: this.y + this.height });
  }

  render(ctx: CanvasRenderingContext2D): void {
    setCtxStyle(ctx, this.style);
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    const halfLen = 5,
      len = 10;
    const halfWidth = this.width >> 1;
    const halfHeight = this.height >> 1;
    ctx.fillRect(this.x + halfWidth - halfLen, this.y - halfLen - 30, len, len); // 北

    ctx.fillRect(this.x - halfLen, this.y - halfLen, len, len); // 西北

    ctx.fillRect(this.x + halfWidth - halfLen, this.y - halfLen, len, len); // 北

    ctx.fillRect(this.x + this.width - halfLen, this.y - halfLen, len, len); // 东北

    ctx.fillRect(
      this.x + this.width - halfLen,
      this.y + (this.height >> 1) - halfLen,
      len,
      len
    ); // 东

    ctx.fillRect(
      this.x + this.width - halfLen,
      this.y + this.height - halfLen,
      len,
      len
    ); // 东南

    ctx.fillRect(
      this.x + halfWidth - halfLen,
      this.y + this.height - halfLen,
      len,
      len
    ); // 南

    ctx.fillRect(this.x - halfLen, this.y + this.height - halfLen, len, len); // 西南

    ctx.fillRect(this.x - halfLen, this.y + halfHeight - halfLen, len, len); // 西
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

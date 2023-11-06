import { setStyle } from "../util/baseDraw.js";

/**
 * 矩形类
 */
export class Rectangle {
  x;
  y;
  width;
  height;
  style;
  points;

  constructor(x, y, width, height, style) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.style = style;
  }

  draw(ctx) {
    setStyle(ctx, this.style);
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

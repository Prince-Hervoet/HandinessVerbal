import { setStyle } from "../util/baseDraw.js";

function createRectangle(x, y, width, height, style) {
  const widget = {
    x,
    y,
    width,
    height,
    style,
  };

  widget.draw = function (ctx) {
    setStyle(ctx, this.style);
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };
  return widget;
}

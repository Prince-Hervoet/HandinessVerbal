import { IWidget, Point } from "./someTypes.js";

/**
 * 获取一个部件随机id
 * @returns
 */
export function getWidgetId(): string {
  return Date.now() + "_" + Math.random();
}

/**
 * 判断坐标是否在图形中
 * @param x
 * @param y
 * @param widget
 */
export function judgePositionInWidget(
  x: number,
  y: number,
  widget: IWidget
): boolean {
  const points: Point[] = widget.getPoints();
  let count = 0;
  for (let i = 1; i < points.length; ++i) {
    if (points[i].x < x && points[i - 1].x < x) continue;
    if (
      (points[i].y <= y && points[i - 1].y >= y) ||
      (points[i].y >= y && points[i - 1].y <= y)
    )
      ++count;
  }
  if (points[0].x >= x && points[points.length - 1].x >= x) {
    if (
      (points[0].y <= y && points[points.length - 1].y >= y) ||
      (points[0].y >= y && points[points.length - 1].y <= y)
    )
      ++count;
  }
  return (count & 1) === 1;
}

/**
 * 设置ctx的风格
 * @param ctx
 * @param style
 */
export function setCtxStyle(ctx: CanvasRenderingContext2D, style: any) {
  ctx.fillStyle = style.fillStyle;
  ctx.strokeStyle = style.strokeStyle;
  ctx.font = style.font;
}
import { BaseBoxPosition, IWidget, Point } from "./someTypes.js";

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
  ctx.lineWidth = style.lineWidth;
  ctx.shadowBlur = style.shadowBlur;
  ctx.shadowColor = style.shadowColor;
}

/**
 * 将当前鼠标坐标和最后一次鼠标按下的坐标转化成canvas画矩形的左上角的坐标
 * @param mouseX
 * @param mouseY
 * @param mouseDownX
 * @param mouseDownY
 */
export function boxSelectRectPositionCal(
  mouseX: number,
  mouseY: number,
  mouseDownX: number,
  mouseDownY: number
) {
  const x = Math.min(mouseX, mouseDownX);
  const y = Math.min(mouseY, mouseDownY);
  const mx = Math.max(mouseX, mouseDownX);
  const my = Math.max(mouseY, mouseDownY);
  return { x, y, width: mx - x, height: my - y };
}

/**
 * 判断两个矩形是否重叠
 * @param pos1
 * @param pos2
 * @returns
 */
export function judgeRectOverlap(
  pos1: BaseBoxPosition,
  pos2: BaseBoxPosition
): boolean {
  if (
    pos1.x + pos1.width > pos2.x &&
    pos2.x + pos2.width > pos1.x &&
    pos1.y + pos1.height > pos2.y &&
    pos2.y + pos2.height > pos1.y
  ) {
    return true;
  }
  return false;
}

/**
 * 框选多个部件，计算最终的选中盒子位置
 * @param widgets
 */
export function boxSelectHittingFlagPosCal(
  widgets: IWidget[]
): BaseBoxPosition {
  const b1 = widgets[0].getBoundingBoxPosition();
  let xmin = b1.x,
    ymin = b1.y,
    xmax = b1.x + b1.width,
    ymax = b1.y + b1.height;
  for (let i = 1; i < widgets.length; ++i) {
    const b = widgets[i].getBoundingBoxPosition();
    xmin = Math.min(xmin, b.x);
    ymin = Math.min(ymin, b.y);
    xmax = Math.max(xmax, b.x + b.width);
    ymax = Math.max(ymax, b.y + b.height);
  }
  return { x: xmin, y: ymin, width: xmax - xmin, height: ymax - ymin };
}

/**
 * 判断坐标是否在控制小方块上
 * @param x
 * @param y
 * @param widget
 */
export function judgePositionOnControlBox(
  mouseX: number,
  mouseY: number,
  widget: IWidget
) {
  const { x, y, width, height } = widget.getBoundingBoxPosition();
  const a1 = mouseX - x,
    b1 = mouseY - y;
  if (a1 * a1 + b1 * b1 <= 25) {
    // 在西北
  }
}

/**
 * 将坐标x , y 以 ox , oy 为圆心旋转 angle角度
 * @param x
 * @param y
 * @param ox
 * @param oy
 * @param angle
 */
export function rotatePosition(
  x: number,
  y: number,
  ox: number,
  oy: number,
  angle: number
) {
  const nx = (x - ox) * Math.cos(angle) - (y - oy) * Math.sin(angle) + ox;
  const ny = (x - ox) * Math.sin(angle) + (y - oy) * Math.cos(angle) + oy;
  return { x: nx, y: ny };
}

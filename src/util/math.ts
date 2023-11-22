export class Point {
  x: number = 0;
  y: number = 0;
}

export interface Vector2 {
  start: Point;
  end: Point;
}

const CAL_FLAG = Math.PI / 180;

/**
 * 角度转成弧度
 * @param degree
 * @returns
 */
export function degreeToRadian(degree: number) {
  return degree * CAL_FLAG;
}

/**
 * 射线法
 * @param target
 * @param pathPoints
 * @returns
 */
export function rayMethod(target: Point, pathPoints: Point[]) {
  const px = target.x,
    py = target.y;
  let flag = false;
  for (let i = 0; i < pathPoints.length; ++i) {
    const nextIndex = i + 1 >= pathPoints.length ? 0 : i + 1;
    const sx = pathPoints[i].x;
    const tx = pathPoints[nextIndex].x;
    if (sx < px && tx < px) continue;
    const sy = pathPoints[i].y;
    const ty = pathPoints[nextIndex].y;
    if ((sx === px && sy === py) || (tx === px && ty === py)) return true;
    if (
      sy === ty &&
      sy === py &&
      ((sx > px && tx < px) || (sx < px && tx > px))
    )
      return true;
    if ((sy < py && ty >= py) || (sy >= py && ty < py)) {
      const x = sx + ((py - sy) * (tx - sx)) / (ty - sy);
      if (x === px) return true;
      if (x > px) flag = !flag;
    }
  }
  return flag;
}

/**
 * 将鼠标拖动的点转化成框选框的绘制坐标
 * @param p1
 * @param p2
 * @returns
 */
export function calBoxSelectInfo(p1: Point, p2: Point) {
  const xmin = Math.min(p1.x, p2.x);
  const ymin = Math.min(p1.y, p2.y);
  const xmax = Math.max(p1.x, p2.x);
  const ymax = Math.max(p1.y, p2.y);
  return { x: xmin, y: ymin, width: xmax - xmin, height: ymax - ymin };
}

/**
 * 计算框选框的点数组
 * @param p1
 * @param p2
 * @returns
 */
export function calBoxSelectPoints(p1: Point, p2: Point) {
  const { x, y, width, height } = calBoxSelectInfo(p1, p2);
  return [
    { x, y },
    { x: x + width, y: y },
    { x: x + width, y: y + height },
    { x: x, y: y + height },
  ];
}

/**
 * 框选判断矩形包含关系
 * @param box
 * @param target
 * @returns
 */
export function boxSelectInclusion(box: Point[], target: Point[]) {
  for (let i = 0; i < target.length; ++i) {
    if (target[i].x < box[0].x || target[i].x > box[1].x) return false;
    if (target[i].y < box[0].y || target[i].y > box[2].y) return false;
  }
  return true;
}

/**
 * 一个点绕着另一个点旋转一定角度之后的点
 * @param p
 * @param op
 * @param degree
 * @returns
 */
export function rotatePoint(p: Point, op: Point, degree: number) {
  const rad = degreeToRadian(degree);
  const sinRad = Math.sin(rad);
  const cosRad = Math.cos(rad);
  const x = (p.x - op.x) * cosRad - (p.y - op.y) * sinRad + op.x;
  const y = (p.x - op.x) * sinRad + (p.y - op.y) * cosRad + op.y;
  return { x, y };
}

/**
 * 计算向量夹角带方向
 * @param v1
 * @param v2
 * @returns
 */
export function calVectorAngle(v1: Vector2, v2: Vector2) {
  const x1 = v1.end.x - v1.start.x;
  const x2 = v2.end.x - v2.start.x;
  const y1 = v1.end.y - v2.start.y;
  const y2 = v2.end.y - v2.start.y;
  const cos =
    (x1 * x2 + y1 * y2) /
    (Math.sqrt(x1 * x1 + y1 * y1) * Math.sqrt(x2 * x2 + y2 * y2));
  const dir = x1 * y2 - y1 * x2;
  const degree = Math.acos(cos) * 57.3;
  if (dir >= 0) return degree;
  return -degree;
}

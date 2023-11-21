export class Point {
  x: number = 0;
  y: number = 0;
}

const CAL_FLAG = Math.PI / 180;

export function degreeToRadian(degree: number) {
  return degree * CAL_FLAG;
}

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

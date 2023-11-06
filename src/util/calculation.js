/**
 * 判断鼠标坐标是否在对象的范围内
 * @param {number} mouseX
 * @param {number} mouseY
 * @param {object} widget
 * @returns boolean
 */
export function judgeMouseOnWidget(mouseX, mouseY, widget) {
  return true;
}

/**
 * 判断两个矩形是否重叠
 * @param {object} point1 {x, y, width, height}
 * @param {object} point2
 */
export function judgeRectOverlap(rect1, rect2) {
  if (
    rect1.x + rect1.width > rect2.x &&
    rect2.x + rect2.width > rect1.x &&
    rect1.y + rect1.height > rect2.y &&
    rect2.y + rect2.height > rect1.y
  )
    return true;
  else return false;
}

/**
 * 计算包围盒位置
 * @param {Array} points
 * @returns object
 */
export function calBoundingBox(points) {
  let x = points[0].x,
    y = points[0].y,
    xm = points[0].x,
    ym = points[0].y;
  width, height;
  for (let i = 1; i < points.length; ++i) {
    x = Math.min(x, points[i].x);
    y = Math.min(y, points[i].y);
    xm = Math.max(xm, points[i].x);
    ym = Math.max(ym, points[i].y);
  }
  width = xm - x;
  height = ym - y;
  return { x, y, width, height };
}

import {
  Point,
  Vector2,
  calVectorAngle,
  getScaleNumber,
  rotatePoint,
} from "../util/math";
import { EventCenter } from "./eventCenter";

export function utilTransformAction(event: MouseEvent, ec: EventCenter) {
  const transformDirIndex = ec.getActionRemark().transformDirIndex;
  const hitting = ec.getHitting()!;
  const { x, y, width, height, degree, scaleWidth, scaleHeight } =
    hitting.getBoundingBoxInfo();
  const basePoint: Point = hitting.get("basePoint");
  const { offsetX, offsetY } = event;
  let nWidth = 0;
  let nHeight = 0;
  let nx = offsetX;
  let ny = offsetY;
  let scaleX = 1;
  let scaleY = 1;
  if (degree !== 0) {
    const nPoint = rotatePoint({ x: offsetX, y: offsetY }, basePoint, -degree);
    nx = nPoint.x;
    ny = nPoint.y;
  }
  switch (transformDirIndex) {
    case 0:
      // 左上角
      nWidth = x - nx + width;
      nHeight = y - ny + height;
      if (nWidth <= 1 || nHeight <= 1) {
        if (nWidth <= 1 && nHeight <= 1)
          ec.getActionRemark().transformDirIndex = 2;
        else if (nWidth <= 1) ec.getActionRemark().transformDirIndex = 1;
        else if (nHeight <= 1) ec.getActionRemark().transformDirIndex = 3;
        return;
      }
      // scaleX = getScaleNumber(width, nWidth);
      // scaleY = getScaleNumber(height, nHeight);
      hitting.update({
        x: nx,
        y: ny,
        width: nWidth,
        height: nHeight,
      });
      break;
    case 1:
      nWidth = nx - x;
      nHeight = y - ny + height;
      if (nWidth <= 1 || nHeight <= 1) {
        if (nWidth <= 1 && nHeight <= 1)
          ec.getActionRemark().transformDirIndex = 3;
        else if (nWidth <= 1) ec.getActionRemark().transformDirIndex = 0;
        else if (nHeight <= 1) ec.getActionRemark().transformDirIndex = 2;
        return;
      }
      // scaleX = getScaleNumber(width, nWidth);
      // scaleY = getScaleNumber(height, nHeight);
      hitting.update({ y: ny, width: nWidth, height: nHeight });
      break;
    case 2:
      nWidth = nx - x;
      nHeight = ny - y;
      if (nWidth <= 1 || nHeight <= 1) {
        if (nWidth <= 1 && nHeight <= 1)
          ec.getActionRemark().transformDirIndex = 0;
        else if (nWidth <= 1) ec.getActionRemark().transformDirIndex = 3;
        else if (nHeight <= 1) ec.getActionRemark().transformDirIndex = 1;
        return;
      }
      // scaleX = getScaleNumber(width, nWidth);
      // scaleY = getScaleNumber(height, nHeight);
      hitting.update({ width: nWidth, height: nHeight });
      break;
    case 3:
      nWidth = x - nx + width;
      nHeight = ny - y;
      if (nWidth <= 1 || nHeight <= 1) {
        if (nWidth <= 1 && nHeight <= 1)
          ec.getActionRemark().transformDirIndex = 1;
        else if (nWidth <= 1) ec.getActionRemark().transformDirIndex = 2;
        else if (nHeight <= 1) ec.getActionRemark().transformDirIndex = 0;
        return;
      }
      // scaleX = getScaleNumber(width, nWidth);
      // scaleY = getScaleNumber(height, nHeight);
      hitting.update({ x: nx, width: nWidth, height: nHeight });
      break;
    case 4:
      // 向上
      nHeight = y - ny + height;
      if (nHeight <= 1) {
        ec.getActionRemark().transformDirIndex = 6;
        return;
      }
      // scaleY = getScaleNumber(height, nHeight);
      hitting.update({ y: ny, height: nHeight });
      break;
    case 5:
      // 向右拖
      nWidth = nx - x;
      if (nWidth <= 1) {
        ec.getActionRemark().transformDirIndex = 7;
        return;
      }
      // scaleX = getScaleNumber(width, nWidth);
      hitting.update({ width: nWidth });
      break;
    case 6:
      nHeight = ny - y;
      if (nHeight <= 1) {
        ec.getActionRemark().transformDirIndex = 4;
        return;
      }
      // scaleY = getScaleNumber(height, nHeight);
      hitting.update({ height: nHeight });
      break;
    case 7:
      // 向左
      nWidth = x - nx + width;
      if (nWidth <= 1) {
        ec.getActionRemark().transformDirIndex = 5;
        return;
      }
      // scaleX = getScaleNumber(width, nWidth);
      hitting.update({ x: nx, width: nWidth });
      break;
    case 8:
      // 旋转
      const verticalVector: Vector2 = {
        start: { x: basePoint.x, y: basePoint.y },
        end: { x: basePoint.x, y: basePoint.y - 1 },
      };
      const mouseVector: Vector2 = {
        start: { x: basePoint.x, y: basePoint.y },
        end: { x: offsetX, y: offsetY },
      };
      const nDegree = calVectorAngle(verticalVector, mouseVector);
      hitting.update({ degree: nDegree });
      break;
  }
}

export function groupTransformAction(event: MouseEvent, ec: EventCenter) {
  const transformDirIndex = ec.getActionRemark().transformDirIndex;
  const hitting = ec.getHitting()!;
  const { x, y, width, height, degree, scaleWidth, scaleHeight } =
    hitting.getBoundingBoxInfo();
  const basePoint: Point = hitting.get("basePoint");
  const { offsetX, offsetY } = event;
  let nWidth = 0;
  let nHeight = 0;
  let nx = offsetX;
  let ny = offsetY;
  let scaleX = 1;
  let scaleY = 1;
  let factScale = 1;
  if (degree !== 0) {
    const nPoint = rotatePoint({ x: offsetX, y: offsetY }, basePoint, -degree);
    nx = nPoint.x;
    ny = nPoint.y;
  }
  switch (transformDirIndex) {
    case 0:
      nWidth = x - nx + width;
      nHeight = y - ny + height;
      if (nWidth <= 1 || nHeight <= 1) {
        if (nWidth <= 1 && nHeight <= 1)
          ec.getActionRemark().transformDirIndex = 2;
        else if (nWidth <= 1) ec.getActionRemark().transformDirIndex = 1;
        else if (nHeight <= 1) ec.getActionRemark().transformDirIndex = 3;
        return;
      }
      scaleX = getScaleNumber(width, nWidth);
      scaleY = getScaleNumber(height, nHeight);
      factScale = Math.max(scaleX, scaleY);
      nx = x + width - factScale * width;
      ny = y + height - factScale * height;
      hitting.update({
        x: nx,
        y: ny,
        width: width * factScale,
        height: height * factScale,
      });
      break;
    case 1:
      nWidth = nx - x;
      nHeight = y - ny + height;
      if (nWidth <= 1 || nHeight <= 1) {
        if (nWidth <= 1 && nHeight <= 1)
          ec.getActionRemark().transformDirIndex = 3;
        else if (nWidth <= 1) ec.getActionRemark().transformDirIndex = 0;
        else if (nHeight <= 1) ec.getActionRemark().transformDirIndex = 2;
        return;
      }
      scaleX = getScaleNumber(width, nWidth);
      scaleY = getScaleNumber(height, nHeight);
      factScale = Math.max(scaleX, scaleY);
      ny = y + height - factScale * height;
      hitting.update({
        y: ny,
        width: width * factScale,
        height: height * factScale,
      });
      break;
    case 2:
      nWidth = nx - x;
      nHeight = ny - y;
      if (nWidth <= 1 || nHeight <= 1) {
        if (nWidth <= 1 && nHeight <= 1)
          ec.getActionRemark().transformDirIndex = 0;
        else if (nWidth <= 1) ec.getActionRemark().transformDirIndex = 3;
        else if (nHeight <= 1) ec.getActionRemark().transformDirIndex = 1;
        return;
      }
      scaleX = getScaleNumber(width, nWidth);
      scaleY = getScaleNumber(height, nHeight);
      factScale = Math.max(scaleX, scaleY);
      hitting.update({ width: width * factScale, height: height * factScale });
      break;
    case 3:
      nWidth = x - nx + scaleWidth;
      nHeight = ny - y;
      if (nWidth <= 1 || nHeight <= 1) {
        if (nWidth <= 1 && nHeight <= 1)
          ec.getActionRemark().transformDirIndex = 1;
        else if (nWidth <= 1) ec.getActionRemark().transformDirIndex = 2;
        else if (nHeight <= 1) ec.getActionRemark().transformDirIndex = 0;
        return;
      }
      scaleX = getScaleNumber(width, nWidth);
      scaleY = getScaleNumber(height, nHeight);
      factScale = Math.max(scaleX, scaleY);
      nx = x + scaleWidth - factScale * width;
      hitting.update({
        x: nx,
        width: width * factScale,
        height: height * factScale,
      });
      break;
    case 8:
      // 旋转
      const verticalVector: Vector2 = {
        start: { x: basePoint.x, y: basePoint.y },
        end: { x: basePoint.x, y: basePoint.y - 1 },
      };
      const mouseVector: Vector2 = {
        start: { x: basePoint.x, y: basePoint.y },
        end: { x: offsetX, y: offsetY },
      };
      const nDegree = calVectorAngle(verticalVector, mouseVector);
      hitting.update({ degree: nDegree });
      break;
  }
}

export function lineTransformAction(event: MouseEvent, ec: EventCenter) {
  const hitting = ec.getHitting()!;
  const { offsetX, offsetY } = event;
  const index = ec.getActionRemark().transformDirIndex;
  switch (index) {
    case 0:
      hitting.update({ x1: offsetX, y1: offsetY });
      break;
    case 1:
      hitting.update({ x2: offsetX, y2: offsetY });
      break;
  }
}

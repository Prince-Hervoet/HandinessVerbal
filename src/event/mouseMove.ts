import {
  Point,
  Vector2,
  calBoxSelectInfo,
  calVectorAngle,
  degreeToRadian,
  getScaleNumber,
  rayMethod,
  rotatePoint,
} from "../util/math";
import { EventCenter, StateEnum, TransformDirsEnum } from "./eventCenter";
import {
  placeBoxSelectFlag,
  placeHoveringFlag,
  removeBoxSelectFlag,
  removeHoveringFlag,
} from "./placeFlag";

export function mouseMoveHandler(event: MouseEvent, ec: EventCenter) {
  switch (ec.getState()) {
    case StateEnum.COMMON:
      mouseMoveCommon(event, ec);
      break;
    case StateEnum.BOXSELECT:
      mouseMoveBoxSelect(event, ec);
      break;
    case StateEnum.HITTING:
      mouseMoveHitting(event, ec);
      break;
    case StateEnum.CATCHING:
      mouseMoveCatching(event, ec);
      break;
    case StateEnum.DRAGGING:
      break;
    case StateEnum.TRANSFORM:
      mouseMoveTransform(event, ec);
      break;
  }
}

function mouseMoveCommon(event: MouseEvent, ec: EventCenter) {
  const { offsetX, offsetY } = event;
  const widget = ec.getRenderCanvas().lookupPointOnWidget(offsetX, offsetY);
  const dom = ec.getTargetDom();
  const oldStyle: string = dom.getAttribute("oldStyle")!;
  if (widget) {
    ec.setHovering(widget);
    removeHoveringFlag(ec);
    placeHoveringFlag(widget, ec);
    dom.setAttribute("style", oldStyle + "cursor: grab;");
  } else {
    ec.setHovering(null);
    removeHoveringFlag(ec);
    dom.setAttribute("style", oldStyle);
  }
}

function mouseMoveBoxSelect(event: MouseEvent, ec: EventCenter) {
  const { offsetX, offsetY } = event;
  const mouseDownPoint = ec.getActionRemark().mouseDownPoint;
  const info = calBoxSelectInfo({ x: offsetX, y: offsetY }, mouseDownPoint);
  removeBoxSelectFlag(ec);
  placeBoxSelectFlag(info, ec);
}

function mouseMoveHitting(event: MouseEvent, ec: EventCenter) {
  const { offsetX, offsetY } = event;
  const widget = ec.getRenderCanvas().lookupPointOnWidget(offsetX, offsetY);
  const dom = ec.getTargetDom();
  const oldStyle: string = dom.getAttribute("oldStyle")!;
  const cornerPoints: Point[][] = ec.getHitting()!.get("cornerPoints");
  const targetPoint = { x: offsetX, y: offsetY };
  let isOnTransformer = false;
  for (let i = 0; i < cornerPoints.length; ++i) {
    if (rayMethod(targetPoint, cornerPoints[i])) {
      ec.getActionRemark().transformDirIndex = i;
      dom.setAttribute("style", oldStyle + `cursor: cell;`);
      isOnTransformer = true;
      break;
    }
  }
  if (isOnTransformer) return;
  dom.setAttribute("style", oldStyle);
  ec.getActionRemark().transformDirIndex = -1;

  if (widget) {
    ec.setHovering(widget);
    removeHoveringFlag(ec);
    if (widget !== ec.getHitting()) placeHoveringFlag(widget, ec);
    dom.setAttribute("style", oldStyle + "cursor: grab;");
  } else {
    ec.setHovering(null);
    removeHoveringFlag(ec);
    dom.setAttribute("style", oldStyle);
  }
}

function mouseMoveCatching(event: MouseEvent, ec: EventCenter) {
  const mouseDownOffset = ec.getActionRemark().mouseDownOffset;
  const hitting = ec.getHitting()!;
  const { offsetX, offsetY } = event;
  if (EventCenter.isGroup(hitting)) {
    hitting.update({
      x: offsetX - mouseDownOffset.x,
      y: offsetY - mouseDownOffset.y,
    });
  } else {
    hitting.updatePosition({
      x: offsetX - mouseDownOffset.x,
      y: offsetY - mouseDownOffset.y,
    });
  }
}

function mouseMoveTransform(event: MouseEvent, ec: EventCenter) {
  utilTransformAction(event, ec);
}

function utilTransformAction(event: MouseEvent, ec: EventCenter) {
  const transformDirIndex = ec.getActionRemark().transformDirIndex;
  const hitting = ec.getHitting()!;
  const { x, y, width, height, degree, scaleWidth, scaleHeight } =
    hitting.getBoundingBoxInfo();
  const basePoint: Point = hitting.get("basePoint");
  const { offsetX, offsetY } = event;
  let nPoint: Point = { x: 0, y: 0 },
    nWidth = 0,
    nHeight = 0;
  let nx = offsetX;
  let ny = offsetY;
  let scaleX = 1;
  let scaleY = 1;
  if (degree !== 0) {
    nPoint = rotatePoint({ x: offsetX, y: offsetY }, basePoint, -degree);
    nx = nPoint.x;
    ny = nPoint.y;
  }
  switch (transformDirIndex) {
    case 0:
      // 左上角
      nWidth = x - nx + scaleWidth;
      nHeight = y - ny + scaleHeight;
      if (nWidth <= 1 || nHeight <= 1) {
        if (nWidth <= 1 && nHeight <= 1)
          ec.getActionRemark().transformDirIndex = 2;
        else if (nWidth <= 1) ec.getActionRemark().transformDirIndex = 1;
        else if (nHeight <= 1) ec.getActionRemark().transformDirIndex = 3;
        return;
      }
      scaleX = getScaleNumber(width, nWidth);
      scaleY = getScaleNumber(height, nHeight);
      hitting.update({
        x: nx,
        y: ny,
        scaleX,
        scaleY,
      });
      break;
    case 1:
      nWidth = nx - x;
      nHeight = y - ny + scaleHeight;
      if (nWidth <= 1 || nHeight <= 1) {
        if (nWidth <= 1 && nHeight <= 1)
          ec.getActionRemark().transformDirIndex = 3;
        else if (nWidth <= 1) ec.getActionRemark().transformDirIndex = 0;
        else if (nHeight <= 1) ec.getActionRemark().transformDirIndex = 2;
        return;
      }
      scaleX = getScaleNumber(width, nWidth);
      scaleY = getScaleNumber(height, nHeight);
      hitting.update({ y: ny, scaleX, scaleY });
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
      hitting.update({ scaleX, scaleY });
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
      hitting.update({ x: nx, scaleX, scaleY });
      break;
    case 4:
      // 向上
      nHeight = y - ny + scaleHeight;
      if (nHeight <= 1) {
        ec.getActionRemark().transformDirIndex = 6;
        return;
      }
      scaleY = getScaleNumber(height, nHeight);
      hitting.update({ y: ny, scaleY });
      break;
    case 5:
      // 向右拖
      nWidth = nx - x;
      if (nWidth <= 1) {
        ec.getActionRemark().transformDirIndex = 7;
        return;
      }
      scaleX = getScaleNumber(width, nWidth);
      hitting.update({ scaleX });
      break;
    case 6:
      nHeight = ny - y;
      if (nHeight <= 1) {
        ec.getActionRemark().transformDirIndex = 4;
        return;
      }
      scaleY = getScaleNumber(height, nHeight);
      hitting.update({ scaleY });
      break;
    case 7:
      // 向左
      nWidth = x - nx + scaleWidth;
      if (nWidth <= 1) {
        ec.getActionRemark().transformDirIndex = 5;
        return;
      }
      scaleX = getScaleNumber(width, nWidth);
      hitting.update({ x: nx, scaleX });
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

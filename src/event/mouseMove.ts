import {
  Point,
  Vector2,
  calBoxSelectInfo,
  calVectorAngle,
  degreeToRadian,
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
      mouseMoveDragging(event, ec);
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
  hitting.updatePosition({
    x: offsetX - mouseDownOffset.x,
    y: offsetY - mouseDownOffset.y,
  });
}

function mouseMoveDragging(event: MouseEvent, ec: EventCenter) {}

function mouseMoveTransform(event: MouseEvent, ec: EventCenter) {
  const transformDirIndex = ec.getActionRemark().transformDirIndex;
  const hitting = ec.getHitting()!;
  const { x, y, width, height, degree } = hitting.getBoundingBoxInfo();
  const basePoint: Point = hitting.get("basePoint");
  const { offsetX, offsetY } = event;
  let nPoint: Point = { x: 0, y: 0 },
    nx = 0,
    ny = 0,
    nWidth = 0,
    nHeight = 0;
  switch (transformDirIndex) {
    case 0:
      // 左上角
      nx = offsetX;
      ny = offsetY;
      if (degree !== 0) {
        nPoint = rotatePoint({ x: offsetX, y: offsetY }, basePoint, -degree);
        nx = nPoint.x;
        ny = nPoint.y;
      }
      nWidth = x - nx + width;
      nHeight = y - ny + height;
      if (nWidth <= 1) {
        ec.getActionRemark().transformDirIndex = 1;
        return;
      } else if (nHeight <= 1) {
        ec.getActionRemark().transformDirIndex = 3;
        return;
      }
      hitting.update({
        x: nx,
        y: ny,
        width: nWidth,
        height: nHeight,
      });
      break;
    case 1:
      nx = offsetX;
      ny = offsetY;
      if (degree !== 0)
        ny = rotatePoint({ x: offsetX, y: offsetY }, basePoint, -degree).y;
      nWidth = nx - x;
      nHeight = y - ny + height;
      if (nWidth <= 1) {
        ec.getActionRemark().transformDirIndex = 0;
        return;
      } else if (nHeight <= 1) {
        ec.getActionRemark().transformDirIndex = 2;
        return;
      }
      hitting.update({ y: ny, width: nx - x, height: y - ny + height });
      break;
    case 2:
      nx = offsetX;
      ny = offsetY;
      if (degree !== 0) {
        nPoint = rotatePoint({ x: offsetX, y: offsetY }, basePoint, -degree);
        nx = nPoint.x;
        ny = nPoint.y;
      }
      nWidth = nx - x;
      nHeight = ny - y;
      if (nWidth <= 1) {
        ec.getActionRemark().transformDirIndex = 3;
        return;
      } else if (nHeight <= 1) {
        ec.getActionRemark().transformDirIndex = 1;
        return;
      }
      hitting.update({ width: nx - x, height: ny - y });
      break;
    case 3:
      nx = offsetX;
      ny = offsetY;
      if (degree !== 0) {
        nPoint = rotatePoint({ x: offsetX, y: offsetY }, basePoint, -degree);
        nx = nPoint.x;
        ny = nPoint.y;
      }
      nWidth = x - nx + width;
      nHeight = ny - y;
      if (nWidth <= 1) {
        ec.getActionRemark().transformDirIndex = 2;
        return;
      } else if (nHeight <= 1) {
        ec.getActionRemark().transformDirIndex = 0;
        return;
      }
      hitting.update({ x: nx, width: x - nx + width, height: ny - y });
      break;
    case 4:
      // 向上
      ny = offsetY;
      if (degree !== 0)
        ny = rotatePoint({ x: offsetX, y: offsetY }, basePoint, -degree).y;
      nHeight = y - ny + height;
      if (nHeight <= 1) {
        ec.getActionRemark().transformDirIndex = 6;
        return;
      }
      hitting.update({ y: ny, height: nHeight });
      break;
    case 5:
      // 向右拖
      nx = offsetX;
      if (degree !== 0)
        nx = rotatePoint({ x: offsetX, y: offsetY }, basePoint, -degree).x;
      nWidth = nx - x;
      if (nWidth <= 1) {
        ec.getActionRemark().transformDirIndex = 7;
        return;
      }
      hitting.update({ width: nWidth });
      break;
    case 6:
      ny = offsetY;
      if (degree !== 0)
        ny = rotatePoint({ x: offsetX, y: offsetY }, basePoint, -degree).y;
      nHeight = ny - y;
      if (nHeight <= 1) {
        ec.getActionRemark().transformDirIndex = 4;
        return;
      }
      hitting.update({ height: nHeight });
      break;
    case 7:
      // 向左
      nx = offsetX;
      if (degree !== 0)
        nx = rotatePoint({ x: offsetX, y: offsetY }, basePoint, -degree).x;
      nWidth = x - nx + width;
      if (nWidth <= 1) {
        ec.getActionRemark().transformDirIndex = 5;
        return;
      }
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

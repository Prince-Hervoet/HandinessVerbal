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
import { groupTransform, utilTransformAction } from "./transform";

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
  const hitting = ec.getHitting()!;
  const dom = ec.getTargetDom();
  const oldStyle: string = dom.getAttribute("oldStyle")!;
  const index = hitting.isPointOnCorner(offsetX, offsetY);
  ec.getActionRemark().transformDirIndex = index;
  if (index !== -1) {
    dom.setAttribute("style", oldStyle + `cursor: cell;`);
    return;
  }

  dom.setAttribute("style", oldStyle);
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
  const hitting = ec.getHitting()!;
  if (EventCenter.isGroup(hitting)) {
    groupTransform(event, ec);
  } else {
    utilTransformAction(event, ec);
  }
}

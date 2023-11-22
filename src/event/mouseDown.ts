import { EventCenter, StateEnum } from "./eventCenter";
import {
  placeHittingFlag,
  removeHittingFlag,
  removeHoveringFlag,
} from "./placeFlag";

export function mouseDownHandler(event: MouseEvent, ec: EventCenter) {
  switch (ec.getState()) {
    case StateEnum.COMMON:
      mouseDownCommon(event, ec);
      break;
    case StateEnum.HITTING:
      mouseDownHitting(event, ec);
      break;
  }
}

function mouseDownCommon(event: MouseEvent, ec: EventCenter) {
  const hovering = ec.getHovering();
  const { offsetX, offsetY } = event;
  if (hovering) {
    ec.setHitting(hovering);
    removeHoveringFlag(ec);
    placeHittingFlag(hovering, ec);
    ec.getActionRemark().mouseDownOffset = {
      x: offsetX - hovering.get("x"),
      y: offsetY - hovering.get("y"),
    };
    ec.transferToEventCanvas(hovering);
    ec.setState(StateEnum.CATCHING);
  } else {
    ec.getActionRemark().mouseDownPoint = { x: offsetX, y: offsetY };
    ec.setState(StateEnum.BOXSELECT);
  }
}

function mouseDownHitting(event: MouseEvent, ec: EventCenter) {
  if (ec.getActionRemark().transformDirIndex !== -1) {
    const hitting = ec.getHitting()!;
    ec.transferToEventCanvas(hitting);
    ec.setState(StateEnum.TRANSFORM);
    return;
  }

  const hovering = ec.getHovering();
  const { offsetX, offsetY } = event;
  if (hovering) {
    if (hovering !== ec.getHitting()) {
      ec.setHitting(hovering);
      removeHoveringFlag(ec);
      removeHittingFlag(ec);
      placeHittingFlag(hovering, ec);
    }
    ec.getActionRemark().mouseDownOffset = {
      x: offsetX - hovering.get("x"),
      y: offsetY - hovering.get("y"),
    };
    ec.transferToEventCanvas(hovering);
    ec.setState(StateEnum.CATCHING);
  } else {
    ec.getActionRemark().mouseDownPoint = { x: offsetX, y: offsetY };
    ec.setState(StateEnum.BOXSELECT);
  }
}

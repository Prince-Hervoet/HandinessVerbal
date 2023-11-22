import { calBoxSelectPoints } from "../util/math";
import { EventCenter, StateEnum } from "./eventCenter";
import {
  placeHittingFlag,
  removeHittingFlag,
  removeHoveringFlag,
} from "./placeFlag";

export function mouseUpHandler(event: MouseEvent, ec: EventCenter) {
  switch (ec.getState()) {
    case StateEnum.CATCHING:
      mouseUpCatching(event, ec);
      break;
    case StateEnum.BOXSELECT:
      mouseUpBoxSelect(event, ec);
      break;
    case StateEnum.DRAGGING:
      mouseUpDragging(event, ec);
      break;
    case StateEnum.TRANSFORM:
      mouseUpTransform(event, ec);
      break;
  }
}

function mouseUpCatching(event: MouseEvent, ec: EventCenter) {
  const hitting = ec.getHitting()!;
  hitting.calPointsInfo();
  ec.transferToRenderCanvas(hitting);
  ec.setState(StateEnum.HITTING);
}

function mouseUpBoxSelect(event: MouseEvent, ec: EventCenter) {
  const { offsetX, offsetY } = event;
  ec.getEventCanvas().clear();
  if (ec.getHovering()) removeHoveringFlag(ec);
  if (ec.getHitting()) removeHittingFlag(ec);
  ec.setHovering(null);
  ec.setHitting(null);
  const boxPoints = calBoxSelectPoints(
    { x: offsetX, y: offsetY },
    ec.getActionRemark().mouseDownPoint
  );
  const widgets = ec.getRenderCanvas().lookupBoxSelectWidgets(boxPoints);
  if (widgets.length === 1) {
    // 点选
    const widget = widgets[0];
    ec.setHitting(widget);
    placeHittingFlag(widget, ec);
    ec.setState(StateEnum.HITTING);
  } else if (widgets.length > 1) {
    // todo: 多选
    ec.setState(StateEnum.COMMON);
  } else {
    ec.setState(StateEnum.COMMON);
  }
}

function mouseUpDragging(event: MouseEvent, ec: EventCenter) {}

function mouseUpTransform(event: MouseEvent, ec: EventCenter) {
  const hitting = ec.getHitting()!;
  ec.transferToRenderCanvas(hitting);
  ec.setState(StateEnum.HITTING);
}

import { calBoxSelectPoints, calMultiPointsInfo } from "../util/math";
import { Group } from "../widget/group";
import { VerbalWidget } from "../widget/verbalWidget";
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
      break;
    case StateEnum.TRANSFORM:
      mouseUpTransform(event, ec);
      break;
  }
}

function mouseUpCatching(event: MouseEvent, ec: EventCenter) {
  const hitting = ec.getHitting()!;
  if (EventCenter.isGroup(hitting)) {
    const widgets: VerbalWidget[] = hitting.get("members");
    widgets.forEach((widget) => {
      widget.calPointsInfo();
    });
    ec.transferToRenderCanvas(...widgets, hitting);
  } else {
    hitting.calPointsInfo();
    ec.transferToRenderCanvas(hitting);
  }
  ec.setState(StateEnum.HITTING);
}

function mouseUpBoxSelect(event: MouseEvent, ec: EventCenter) {
  const { offsetX, offsetY } = event;
  ec.getEventCanvas().clear();
  if (ec.getHovering()) removeHoveringFlag(ec);
  if (ec.getHitting()) {
    const hitting = ec.getHitting()!;
    removeHittingFlag(ec);
    if (EventCenter.isGroup(hitting)) ec.getRenderCanvas().remove(hitting);
  }
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
    const boudingBoxPointsArr = [];
    for (const widget of widgets)
      boudingBoxPointsArr.push(widget.get("boundingBoxPoints"));
    const { x, y, width, height } = calMultiPointsInfo(boudingBoxPointsArr);
    const tempGroup = new Group({ x, y, width, height, members: widgets });
    EventCenter.bindUpdateWatchEvent(tempGroup, ec);
    ec.setHitting(tempGroup);
    ec.getRenderCanvas().place(tempGroup);
    placeHittingFlag(tempGroup, ec);
    ec.setState(StateEnum.HITTING);
  } else {
    ec.setState(StateEnum.COMMON);
  }
}

function mouseUpTransform(event: MouseEvent, ec: EventCenter) {
  const hitting = ec.getHitting()!;
  ec.transferToRenderCanvas(hitting);
  ec.setState(StateEnum.HITTING);
}

import { EventCenter, StateEnum } from "./eventCenter";
import { placeHoveringFlag, removeHoveringFlag } from "./placeFlag";

export function mouseMoveHandler(event: MouseEvent, ec: EventCenter) {
  switch (ec.getState()) {
    case StateEnum.COMMON:
      mouseMoveCommon(event, ec);
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
    placeHoveringFlag(widget, ec);
    dom.setAttribute("style", oldStyle + "cursor: grab;");
  } else {
    ec.setHovering(null);
    removeHoveringFlag(ec);
    dom.setAttribute("style", oldStyle);
  }
}

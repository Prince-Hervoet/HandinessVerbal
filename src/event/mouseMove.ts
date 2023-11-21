import { EventCenter, StateEnum } from "./eventCenter";

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
  console.log(widget);
}

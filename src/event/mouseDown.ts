import { EventCenter, StateEnum } from "./eventCenter";

export function mouseDownHandler(event: MouseEvent, ec: EventCenter) {
  switch (ec.getState()) {
    case StateEnum.COMMON:
      mouseDownCommon(event, ec);
      break;
  }
}

function mouseDownCommon(event: MouseEvent, ec: EventCenter) {
  const hovering = ec.getHovering();
  if (hovering) {
    ec.setHitting(hovering);
  }
}

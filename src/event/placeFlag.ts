import { VerbalWidget } from "../widget/verbalWidget";
import { EventCenter } from "./eventCenter";

export function placeHoveringFlag(widget: VerbalWidget, ec: EventCenter) {
  const hoveringFlag = ec.getActionRemark().gHoveringFlag;
  const { x, y, width, height, degree } = widget.getBoundingBoxInfo();
  hoveringFlag.update({ x, y, width, height, degree });
  ec.getEventCanvas().place(hoveringFlag);
}

export function removeHoveringFlag(ec: EventCenter) {
  const hoveringFlag = ec.getActionRemark().gHoveringFlag;
  ec.getEventCanvas().remove(hoveringFlag);
}

export function placeHittingFlag(widget: VerbalWidget, ec: EventCenter) {}

export function removeHittingFlag(ec: EventCenter) {}

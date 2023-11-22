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

export function placeHittingFlag(widget: VerbalWidget, ec: EventCenter) {
  const hittingFlag = ec.getActionRemark().gHittingFlag;
  const { x, y, width, height, degree } = widget.getBoundingBoxInfo();
  hittingFlag.update({ x, y, width, height, degree });
  widget.set("transformer", hittingFlag);
  ec.getEventCanvas().place(hittingFlag);
}

export function removeHittingFlag(ec: EventCenter) {
  const hittingFlag = ec.getActionRemark().gHittingFlag;
  const widget = ec.getHitting()!;
  widget.set("transformer", null);
  ec.getEventCanvas().remove(hittingFlag);
}

export function placeBoxSelectFlag(info: any, ec: EventCenter) {
  const boxSelectFlag = ec.getActionRemark().gBoxSelectFlag;
  boxSelectFlag.update(info);
  ec.getEventCanvas().place(boxSelectFlag);
}

export function removeBoxSelectFlag(ec: EventCenter) {
  const boxSelectFlag = ec.getActionRemark().gBoxSelectFlag;
  ec.getEventCanvas().remove(boxSelectFlag);
}

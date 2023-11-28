import { VerbalWidget } from "../widget/verbalWidget";
import { EventCenter } from "./eventCenter";

export function placeHoveringFlag(widget: VerbalWidget, ec: EventCenter) {
  const hoveringFlag = ec.getActionRemark().gHoveringFlag;
  const { x, y, degree, width, height } = widget.getBoundingBoxInfo();
  hoveringFlag.update({ x, y, width, height, degree });
  ec.getEventCanvas().place(hoveringFlag);
}

export function removeHoveringFlag(ec: EventCenter) {
  const hoveringFlag = ec.getActionRemark().gHoveringFlag;
  ec.getEventCanvas().remove(hoveringFlag);
}

export function placeHittingFlag(widget: VerbalWidget, ec: EventCenter) {
  let hittingFlag;
  if (widget.get("shapeType") === "line")
    hittingFlag = ec.getActionRemark().lingHittingFlag;
  else hittingFlag = ec.getActionRemark().utilHittingFlag;
  const { x, y, width, height, degree } = widget.getBoundingBoxInfo();
  hittingFlag.update({ x, y, width, height, degree });
  widget.set("transformer", hittingFlag);
  ec.getEventCanvas().place(hittingFlag);
}

export function removeHittingFlag(ec: EventCenter) {
  const hittingFlag = ec.getActionRemark().utilHittingFlag;
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

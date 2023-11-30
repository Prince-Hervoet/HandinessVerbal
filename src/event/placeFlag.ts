import { VerbalWidget } from "../widget/verbalWidget";
import { EventCenter } from "./eventCenter";

/**
 * 放置悬停框
 * @param widget
 * @param ec
 */
export function placeHoveringFlag(widget: VerbalWidget, ec: EventCenter) {
  const hoveringFlag = ec.getActionRemark().gHoveringFlag;
  const { x, y, degree, width, height } = widget.getBoundingBoxInfo();
  hoveringFlag.update({ x, y, width, height, degree });
  ec.getEventCanvas().place(hoveringFlag);
}

/**
 * 移除悬停框
 * @param ec
 */
export function removeHoveringFlag(ec: EventCenter) {
  const hoveringFlag = ec.getActionRemark().gHoveringFlag;
  ec.getEventCanvas().remove(hoveringFlag);
}

/**
 * 放置选中框
 * @param widget
 * @param ec
 */
export function placeHittingFlag(widget: VerbalWidget, ec: EventCenter) {
  let hittingFlag;
  if (widget.get("shapeType") === "line")
    hittingFlag = ec.getActionRemark().gLingHittingFlag;
  else hittingFlag = ec.getActionRemark().gUtilHittingFlag;
  const { x, y, width, height, degree } = widget.getBoundingBoxInfo();
  hittingFlag.update({ x, y, width, height, degree });
  widget.set("transformer", hittingFlag);
  ec.getEventCanvas().place(hittingFlag);
}

/**
 * 移除选中框
 * @param ec
 */
export function removeHittingFlag(ec: EventCenter) {
  const hittingFlag = ec.getActionRemark().gUtilHittingFlag;
  const widget = ec.getHitting()!;
  widget.set("transformer", null);
  ec.getEventCanvas().remove(hittingFlag);
}

/**
 * 放置框选框
 * @param info
 * @param ec
 */
export function placeBoxSelectFlag(info: any, ec: EventCenter) {
  const boxSelectFlag = ec.getActionRemark().gBoxSelectFlag;
  boxSelectFlag.update(info);
  ec.getEventCanvas().place(boxSelectFlag);
}

/**
 * 移除框选框
 * @param ec
 */
export function removeBoxSelectFlag(ec: EventCenter) {
  const boxSelectFlag = ec.getActionRemark().gBoxSelectFlag;
  ec.getEventCanvas().remove(boxSelectFlag);
}

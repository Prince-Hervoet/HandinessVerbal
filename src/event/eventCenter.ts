import { VerbalCanvas } from "../core/verbalCanvas";
import { Point } from "../util/math";
import { BoxSelectRect } from "../widget/utilWidgets/boxSelectRect";
import { UtilTransformer } from "../widget/utilWidgets/utilTransformer";
import { HoveringFlag } from "../widget/utilWidgets/hoveringFlag";
import { VerbalWidget } from "../widget/verbalWidget";
import { mouseDownHandler } from "./mouseDown";
import { mouseMoveHandler } from "./mouseMove";
import { mouseUpHandler } from "./mouseUp";
import { LineTransformer } from "../widget/utilWidgets/lineTransformer";

type VerbalWidgetType = VerbalWidget | null;

export interface SimpleEventData {
  target: VerbalWidget;
  eventType: string;
}

export const StateEnum = {
  COMMON: 0, // 无事发生
  HITTING: 1, // 选中
  CATCHING: 2, // 抓取
  BOXSELECT: 3, // 框选
  TRANSFORM: 4, // 变换

  FREEDRAW: 10, // 自由绘画
};

export const TransformDirsEnum = [
  "nw-resize",
  "ne-resize",
  "se-resize",
  "sw-resize",
  "n-resize",
  "e-resize",
  "s-resize",
  "w-resize",
  "grabbing",
];

/**
 * 行为记录类
 */
class ActionRemark {
  mouseDownPoint: Point = { x: 0, y: 0 };
  mouseDownOffset: Point = { x: 0, y: 0 };
  transformDirIndex: number = -1;

  gHoveringFlag: VerbalWidget = new HoveringFlag({});
  utilHittingFlag: VerbalWidget = new UtilTransformer({});
  lingHittingFlag: VerbalWidget = new LineTransformer({});
  gBoxSelectFlag: VerbalWidget = new BoxSelectRect({});
}

class ActionConfig {
  isBoxSelect: boolean = true;
}

export class EventCenter {
  private targetDom: HTMLElement;
  private renderCanvas: VerbalCanvas;
  private eventCanvas: VerbalCanvas;
  private hovering: VerbalWidgetType = null;
  private hitting: VerbalWidgetType = null;
  private actionRemark: ActionRemark;
  private actionConfig: ActionConfig;
  private state: number = StateEnum.COMMON;
  private isPendingUpdate: boolean = false;

  constructor(
    targetDOM: HTMLElement,
    renderCanvas: VerbalCanvas,
    eventCanvas: VerbalCanvas
  ) {
    this.targetDom = targetDOM;
    this.renderCanvas = renderCanvas;
    this.eventCanvas = eventCanvas;
    this.actionRemark = new ActionRemark();
    this.actionConfig = new ActionConfig();
    this.bindEventHandler();
  }

  static bindUpdateWatchEvent(widget: VerbalWidget, ec: EventCenter) {
    if (!widget) return;
    widget.delete("_update_watch_");
    widget.on("_update_watch_", (data: SimpleEventData) => {
      if (ec.isPendingUpdate) return;
      ec.isPendingUpdate = true;
      requestAnimationFrame(() => {
        const widget = data.target;
        if (ec.renderCanvas.has(widget)) ec.renderCanvas.renderAll();
        if (ec.eventCanvas.has(widget)) ec.eventCanvas.renderAll();
        ec.isPendingUpdate = false;
      });
    });
  }

  static isGroup(widget: VerbalWidget) {
    return widget.get("shapeType") === "group";
  }

  private bindEventHandler() {
    this.targetDom.addEventListener("mousedown", (event) => {
      mouseDownHandler(event, this);
    });

    this.targetDom.addEventListener("mousemove", (event) => {
      mouseMoveHandler(event, this);
    });

    this.targetDom.addEventListener("mouseup", (event) => {
      mouseUpHandler(event, this);
    });
  }

  getTargetDom() {
    return this.targetDom;
  }

  setState(state: number) {
    this.state = state;
  }

  getState() {
    return this.state;
  }

  setHovering(hovering: VerbalWidgetType) {
    this.hovering = hovering;
  }

  getHovering() {
    return this.hovering;
  }

  setHitting(hitting: VerbalWidgetType) {
    this.hitting = hitting;
  }

  getHitting() {
    return this.hitting;
  }

  getRenderCanvas() {
    return this.renderCanvas;
  }

  getEventCanvas() {
    return this.eventCanvas;
  }

  getActionRemark() {
    return this.actionRemark;
  }

  getActionConfig() {
    return this.actionConfig;
  }

  transferToEventCanvas(...widgets: VerbalWidget[]) {
    this.renderCanvas.setIsRender(false, ...widgets);
    this.renderCanvas.renderAll();
    this.eventCanvas.place(...widgets);
  }

  transferToRenderCanvas(...widgets: VerbalWidget[]) {
    this.renderCanvas.setIsRender(true, ...widgets);
    this.renderCanvas.renderAll();
    this.eventCanvas.remove(...widgets);
  }
}

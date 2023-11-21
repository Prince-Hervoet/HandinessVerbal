import { VerbalCanvas } from "../core/verbalCanvas";
import { Point } from "../util/math";
import { VerbalWidget } from "../widget/verbalWidget";
import { mouseDownHandler } from "./mouseDown";
import { mouseMoveHandler } from "./mouseMove";
import { mouseUpHandler } from "./mouseUp";

type VerbalWidgetType = VerbalWidget | null;

export interface SimpleEventData {
  target: VerbalWidget;
  eventType: string;
}

export const StateEnum = {
  COMMON: 0,
  HITTING: 1,
  CATCHING: 2,
  DRAGGING: 3,
};

class ActionRemark {
  mouseDownPoint: Point = { x: 0, y: 0 };
  mouseDownOffset: Point = { x: 0, y: 0 };
}

export class EventCenter {
  private targetDom: HTMLElement;
  private renderCanvas: VerbalCanvas;
  private eventCanvas: VerbalCanvas;
  private hovering: VerbalWidgetType = null;
  private hitting: VerbalWidgetType = null;
  private actionRemark: ActionRemark;
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
    this.bindEventHandler();
  }

  static bindUpdateWatchEvent(widget: VerbalWidget, ec: EventCenter) {
    if (!widget) return;
    widget.on("_update_watch", (data: SimpleEventData) => {
      if (ec.isPendingUpdate) return;
      ec.isPendingUpdate = true;
      requestAnimationFrame(() => {
        const widget = data.target;
        if (ec.renderCanvas.has(widget)) ec.renderCanvas.renderAll();
        if (ec.eventCanvas.has(widget)) ec.eventCanvas.renderAll();
      });
    });
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
}

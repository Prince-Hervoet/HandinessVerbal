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
import { removeHittingFlag, removeHoveringFlag } from "./placeFlag";
import { GroupTransformer } from "../widget/utilWidgets/groupTransformer";

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
  gUtilHittingFlag: VerbalWidget = new UtilTransformer({});
  gLingHittingFlag: VerbalWidget = new LineTransformer({});
  gGroupHittingFlag: VerbalWidget = new GroupTransformer({});
  gBoxSelectFlag: VerbalWidget = new BoxSelectRect({});
}

/**
 * 行为配置类
 */
class ActionConfig {
  isBoxSelect: boolean = true;
}

export class EventCenter {
  private targetDom: HTMLElement; // 事件绑定的目标DOM
  private renderCanvas: VerbalCanvas; // 渲染层
  private eventCanvas: VerbalCanvas; // 事件层
  private hovering: VerbalWidgetType = null; // 当前悬停的部件
  private hitting: VerbalWidgetType = null; // 当前选中的部件
  private actionRemark: ActionRemark;
  private actionConfig: ActionConfig;
  private state: number = StateEnum.COMMON; // 当前画布事件状态
  private isPendingUpdate: boolean = false; // 当前渲染延迟标记

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

  /**
   * 对部件绑定更新通知函数
   * @param widget
   * @param ec
   * @returns
   */
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

  remove(...widgets: VerbalWidget[]) {
    this.renderCanvas.remove(...widgets);
    this.eventCanvas.remove(...widgets);
    for (const widget of widgets) {
      if (widget === this.hovering) {
        removeHoveringFlag(this);
        this.hovering = null;
      }
      if (widget === this.hitting) {
        removeHittingFlag(this);
        this.hitting = null;
        this.state = StateEnum.COMMON;
      }
    }
  }
}

import { IWidget } from "../util/someTypes.js";
import { Board } from "./board.js";

/**
 * 画布控制器，用于操作画布各种方法
 */
export class BoardController {
  private containerDom: HTMLDivElement | null = null; // 容器DOM
  private renderBoard: Board | null = null; // 渲染层
  private eventBoard: Board | null = null; // 事件层

  constructor(
    containerDom: HTMLDivElement,
    renderCanvasDom: HTMLCanvasElement,
    eventCanvasDom: HTMLCanvasElement
  ) {
    this.containerDom = containerDom;
    this.renderBoard = new Board(renderCanvasDom);
    this.eventBoard = new Board(eventCanvasDom);
  }

  /**
   * 从渲染层上检测坐标是否在某个图形上
   */
  checkPositionOnRenderBoard(x: number, y: number): IWidget | null {
    return this.renderBoard!.checkPositionOnWidgetNode(x, y);
  }

  /**
   * 将部件放置到渲染画布上
   * @param widget
   */
  placeRenderBoard(widget: IWidget) {
    if (!widget) return;
    this.renderBoard!.add(widget);
    this.renderBoard!.renderAll();
  }

  /**
   * 将部件从渲染画布上移除
   * @param widget
   */
  removeFromRenderBoard(widget: IWidget) {
    if (!widget) return;
    this.renderBoard!.remove(widget);
    this.renderBoard!.renderAll();
  }

  /**
   * 将部件放置到事件画布上
   * @param widget
   */
  placeEventBoard(widget: IWidget) {
    if (!widget) return;
    this.eventBoard!.add(widget);
    this.eventBoard!.renderAll();
  }

  /**
   * 将部件从事件画布上移除
   * @param widget
   */
  removeFromEventBoard(widget: IWidget) {
    if (!widget) return;
    this.eventBoard!.remove(widget);
    this.eventBoard!.renderAll();
  }

  /**
   * 渲染层画布渲染
   */
  renderBoardRenderAll() {
    this.renderBoard!.renderAll();
  }

  /**
   * 事件层画布渲染
   */
  eventBoardRenderAll() {
    this.eventBoard!.renderAll();
  }

  clearRenderBoard() {
    this.renderBoard!.clearRenderList();
    this.renderBoard!.renderAll();
  }

  clearEventBoard() {
    this.eventBoard!.clearRenderList();
    this.eventBoard!.renderAll();
  }

  /**
   * 将部件传送至事件层，用于响应事件过程的管理
   * @param widget
   */
  transferToEventBoard(widget: IWidget) {
    if (!this.eventBoard) return;
    // 先将这个部件从渲染层隐藏掉
    this.renderBoard!.setWidgetNodeActive(widget, false);
    this.renderBoard!.renderAll();

    // 将这个部件放到事件层上
    this.eventBoard.add(widget);
    this.eventBoard.renderAll();
  }

  /**
   * 将部件从渲染层传送回事件层
   * @param widget
   */
  transferToRenderBoard(widget: IWidget) {
    if (!this.eventBoard) return;
    // 将这个部件从事件层上清除
    this.eventBoard.remove(widget);
    this.eventBoard.renderAll();

    // 将这个部件从渲染层上恢复
    this.renderBoard!.setWidgetNodeActive(widget, true);
    this.renderBoard!.renderAll();
  }

  /**
   * 获取容器DOM
   * @returns
   */
  getContainerDom() {
    return this.containerDom;
  }
}

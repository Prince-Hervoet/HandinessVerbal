import { IWidget } from "../util/someTypes.js";
import { Board } from "./board.js";

/**
 * 画布控制器，用于操作画布各种方法
 */
export class BoardController {
  private containerDom: HTMLDivElement | null = null; // 容器DOM
  private renderBoard: Board | null = null; // 渲染层
  private eventBoard: Board | null = null; // 事件层

  constructor(containerDom: HTMLDivElement, renderBoard: Board) {
    this.containerDom = containerDom;
    this.renderBoard = renderBoard;
  }

  /**
   * 将部件放置到渲染画布上
   * @param widget
   */
  place(widget: IWidget) {
    if (!widget) return;
    this.renderBoard!.add(widget);
    this.renderBoard!.renderAll();
  }

  /**
   * 将部件从渲染画布上移除
   * @param widget
   */
  remove(widget: IWidget) {
    if (!widget) return;
    this.renderBoard!.remove(widget);
  }

  /**
   * 开启事件处理
   */
  openEventMode() {
    this.eventBoard = new Board();
    BoardController.bindEventHandlers(this);
  }

  /**
   * 绑定事件
   * @param boardController
   */
  private static bindEventHandlers(boardController: BoardController) {
    const dom = boardController.containerDom!;
  }
}

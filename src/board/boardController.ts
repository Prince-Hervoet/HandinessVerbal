import { IWidget } from "../util/someTypes.js";
import { RenderBoard } from "./board.js";

/**
 * 画布控制器，用于操作画布各种方法
 */
export class BoardController {
  private containerDom: HTMLDivElement | null = null; // 容器DOM
  private renderBoard: RenderBoard | null = null;

  constructor(containerDom: HTMLDivElement, renderBoard: RenderBoard) {
    this.containerDom = containerDom;
    this.renderBoard = renderBoard;
  }

  /**
   * 将部件放置到画布上
   * @param widget
   */
  place(widget: IWidget) {
    this.renderBoard!.add(widget);
    this.renderBoard!.renderAll();
  }

  /**
   * 将部件从画布上移除
   * @param widget
   */
  remove(widget: IWidget) {}

  private static bindEventHandlers(
    boardController: BoardController,
    eventName: string,
    handler: any
  ) {
    boardController.containerDom!.addEventListener(eventName, handler);
  }
}

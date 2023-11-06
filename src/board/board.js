import { LinkedList, LinkedListNode } from "../util/linkedList.js";
import { createRectangle } from "../widgets/rectangle.js";

/**
 * 画板类，用于装载canvas
 */
export class Board {
  canvasDom; // canvas的dhom
  canvasContext; // canvas的上下文
  boardState; // 画板状态
  hittingWidgetNode; // 当前选中的元素节点
  hoveringWidgetNode; // 当前悬停的元素节点
  widgetList; // 绘制链表

  constructor(canvasDom, canvasContext) {
    this.canvasDom = canvasDom;
    this.canvasContext = canvasContext;
    this.widgetList = new LinkedList();
  }

  /**
   * 清空canvas
   */
  clear() {
    this.widgetList.clear();
    this.canvasContext.clearRect(
      0,
      0,
      this.canvasDom.width,
      this.canvasDom.height
    );
  }

  /**
   * 在canvas上绘制指定widget
   * @param {object} widget
   */
  draw(widget) {
    if (!widget || !widget.draw) return;
    widget.draw(this.canvasContext);
  }

  /**
   * 添加widget到绘制链表
   * @param {object} widget
   */
  addWidget(widget) {
    if (!widget) return;
    this.widgetList.insertData(widget);
  }

  /**
   * 移除绘制链表节点
   * @param {LinkedListNode} node
   */
  removeWidgetNode(node) {
    if (!node) return;
    this.widgetList.remove(node);
  }
}

/**
 * 画板控制器，用于收集多个画板
 */
export class BoardController {
  _eventBoard; // 事件画板
  _renderBoard; // 渲染画板

  constructor(eventBoard, renderBoard) {
    this._eventBoard = eventBoard;
    this._renderBoard = renderBoard;
  }

  createRectangle(x, y, width, height, style) {
    const widget = createRectangle(x, y, width, height, style);
  }
}

class Verbal {
  boardController;

  constructor(boardController) {
    this.boardController = boardController;
  }
}

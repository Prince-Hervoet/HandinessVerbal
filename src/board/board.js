/**
 * 画板类，用于装载canvas
 */
export class Board {
  canvasDom; // canvas的dom
  canvasContext; // canvas的上下文
  currentBoardState; // 画板状态
  currentHittingWidget; // 当前选中的元素
  currentHoveringWidget; // 当前悬停的元素

  constructor(canvasDom, canvasContext) {
    this.canvasDom = canvasDom;
    this.canvasContext = canvasContext;
  }

  /**
   * 清空canvas
   */
  clear() {
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
}

/**
 * 画板控制器，用于收集多个画板
 */
export class BoardController {
  eventBoard; // 事件画板
  renderBoard; // 渲染画板

  constructor(eventBoard, renderBoard) {
    this.eventBoard = eventBoard;
    this.renderBoard = renderBoard;
  }
}

class Verbal {
  boardController;

  constructor(boardController) {
    this.boardController = boardController;
  }
}

/**
 * 画布控制器，用于操作画布各种方法
 */
export class BoardController {
    constructor(containerDom, renderBoard) {
        this.containerDom = null; // 容器DOM
        this.renderBoard = null;
        this.containerDom = containerDom;
        this.renderBoard = renderBoard;
    }
    /**
     * 将部件放置到画布上
     * @param widget
     */
    place(widget) {
        this.renderBoard.add(widget);
        this.renderBoard.renderAll();
    }
    /**
     * 将部件从画布上移除
     * @param widget
     */
    remove(widget) { }
    static bindEventHandlers(boardController, eventName, handler) {
        boardController.containerDom.addEventListener(eventName, handler);
    }
}

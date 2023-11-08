import { Board } from "./board.js";
/**
 * 画布控制器，用于操作画布各种方法
 */
export class BoardController {
    constructor(containerDom, renderBoard) {
        this.containerDom = null; // 容器DOM
        this.renderBoard = null; // 渲染层
        this.eventBoard = null; // 事件层
        this.containerDom = containerDom;
        this.renderBoard = renderBoard;
    }
    /**
     * 将部件放置到渲染画布上
     * @param widget
     */
    place(widget) {
        if (!widget)
            return;
        this.renderBoard.add(widget);
        this.renderBoard.renderAll();
    }
    /**
     * 将部件从渲染画布上移除
     * @param widget
     */
    remove(widget) {
        if (!widget)
            return;
        this.renderBoard.remove(widget);
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
    static bindEventHandlers(boardController) {
        const dom = boardController.containerDom;
    }
}

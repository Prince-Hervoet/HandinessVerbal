import { Board } from "./board.js";
/**
 * 画布控制器，用于操作画布各种方法
 */
export class BoardController {
    constructor(containerDom, renderCanvasDom, eventCanvasDom) {
        this.containerDom = null; // 容器DOM
        this.renderBoard = null; // 渲染层
        this.eventBoard = null; // 事件层
        this.containerDom = containerDom;
        this.renderBoard = new Board(renderCanvasDom);
        this.eventBoard = new Board(eventCanvasDom);
    }
    /**
     * 从渲染层上检测坐标是否在某个图形上
     */
    checkPositionOnWidget(x, y) {
        return this.renderBoard.checkPositionOnWidgetNode(x, y);
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
     * 将部件传送至事件层，用于响应事件过程的管理
     * @param widget
     */
    transferToEventBoard(widget) {
        if (!this.eventBoard)
            return;
        // 先将这个部件从渲染层隐藏掉
        this.renderBoard.setWidgetNodeActive(widget, false);
        this.renderBoard.renderAll();
        // 将这个部件放到事件层上
        this.eventBoard.add(widget);
        this.eventBoard.renderAll();
    }
    /**
     * 将部件从渲染层传送回事件层
     * @param widget
     */
    transferToRenderBoard(widget) {
        if (!this.eventBoard)
            return;
        // 将这个部件从事件层上清除
        this.eventBoard.remove(widget);
        this.eventBoard.renderAll();
        // 将这个部件从渲染层上恢复
        this.renderBoard.setWidgetNodeActive(widget, true);
        this.renderBoard.renderAll();
    }
    getContainerDom() {
        return this.containerDom;
    }
}

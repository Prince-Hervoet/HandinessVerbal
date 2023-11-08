import { judgePositionInWidget, judgeRectOverlap } from "../util/calculate.js";
export class Board {
    constructor(canvasDom) {
        this.canvasDom = null; // canvas dom
        this.canvasCtx = null; // canvas context
        this.renderList = new RenderLinkedList(); // render list
        this.widgetToNode = new Map(); // widget to renderListNode
        this.canvasDom = canvasDom;
        this.canvasCtx = canvasDom.getContext("2d");
    }
    /**
     * 检测鼠标坐标是否在图形上
     * @param mouseX
     * @param mouseY
     */
    checkPositionOnWidgetNode(mouseX, mouseY) {
        const head = this.renderList.getHead();
        let run = this.renderList.getTail();
        run = run.prev;
        while (run !== head) {
            if (run.isActive) {
                const widget = run.value;
                if (judgePositionInWidget(mouseX, mouseY, widget))
                    return widget;
            }
            run = run.prev;
        }
        return null;
    }
    /**
     * 判断指定矩形是否与某个部件的包围盒重叠
     * @param rectPos
     * @returns
     */
    checkRectOverlapWidgetNode(rectPos) {
        const head = this.renderList.getHead();
        const ans = [];
        let run = this.renderList.getTail();
        run = run.prev;
        while (run !== head) {
            if (run.isActive) {
                const widget = run.value;
                if (judgeRectOverlap(rectPos, widget.getBoundingBoxPosition()))
                    ans.push(widget);
            }
            run = run.prev;
        }
        return ans;
    }
    /**
     * 将渲染列表全部渲染出来
     */
    renderAll() {
        this.eraseAll();
        const head = this.renderList.getHead();
        let run = this.renderList.getTail();
        run = run.prev;
        while (run !== head) {
            if (run.isActive) {
                const widget = run.value;
                this.canvasCtx.save();
                widget.render(this.canvasCtx);
                this.canvasCtx.restore();
            }
            run = run.prev;
        }
    }
    /**
     * 局部渲染 -- todo
     * @param widget
     */
    renderPart(widget) { }
    /**
     * 清空画布上的部件
     */
    eraseAll() {
        this.canvasCtx.clearRect(0, 0, this.canvasDom.width, this.canvasDom.height);
    }
    /**
     * 清空渲染列表
     */
    clearRenderList() {
        this.renderList.clear();
        this.widgetToNode.clear();
        this.renderAll();
    }
    /**
     * 添加部件到渲染列表中
     * @param widget
     */
    add(widget) {
        let node = this.widgetToNode.get(widget);
        if (node)
            return;
        node = new RenderListNode();
        node.value = widget;
        this.renderList.addLast(node);
        this.widgetToNode.set(widget, node);
    }
    /**
     * 移除部件
     * @param widget
     * @returns
     */
    remove(widget) {
        const node = this.widgetToNode.get(widget);
        if (!node)
            return;
        this.renderList.remove(node);
        this.widgetToNode.delete(widget);
    }
    /**
     * 设置渲染节点的激活状态
     * @param widget
     * @param isActive
     * @returns
     */
    setWidgetNodeActive(widget, isActive) {
        const node = this.widgetToNode.get(widget);
        if (!node)
            return;
        node.isActive = isActive;
    }
    widgetSize() {
        return this.renderList.getLength();
    }
}
/**
 * 渲染列表节点
 */
class RenderListNode {
    constructor() {
        this.next = null;
        this.prev = null;
        this.value = null;
        this.isActive = true; // 当设置为false时，widget将不会渲染
    }
}
/**
 * 渲染列表
 */
class RenderLinkedList {
    constructor() {
        this.head = new RenderListNode();
        this.tail = new RenderListNode();
        this.length = 0;
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }
    addLast(node) {
        const temp = this.tail.prev;
        temp.next = node;
        node.prev = temp;
        node.next = this.tail;
        this.tail.prev = node;
        ++this.length;
    }
    remove(node) {
        const prevNode = node.prev;
        const nextNode = node.next;
        prevNode.next = nextNode;
        nextNode.prev = prevNode;
        --this.length;
    }
    getLength() {
        return this.length;
    }
    clear() {
        this.head.next = this.tail;
        this.tail.prev = this.head;
        this.length = 0;
    }
    getHead() {
        return this.head;
    }
    getTail() {
        return this.tail;
    }
}

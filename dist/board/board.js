export class Board {
    constructor() {
        this.canvasDom = null; // canvas dom
        this.canvasCtx = null; // canvas context
        this.renderList = null; // render list
        this.idToNode = new Map(); // widgetId to RenderListNode
    }
    /**
     * 检测鼠标坐标是否在图形上
     * @param mouseX
     * @param mouseY
     */
    checkMousePositionOnNode(mouseX, mouseY) {
        return null;
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
                widget.render(this.canvasCtx);
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
        this.idToNode.clear();
    }
    /**
     * 添加部件到渲染列表中
     * @param widget
     */
    add(widget) {
        const node = new RenderListNode();
        node.value = widget;
        this.renderList.addLast(node);
        this.idToNode.set(widget.getWidgetId(), node);
    }
    /**
     * 移除部件
     * @param widget
     * @returns
     */
    remove(widget) {
        const widgetId = widget.getWidgetId();
        const node = this.idToNode.get(widgetId);
        if (!node)
            return;
        this.renderList.remove(node);
        this.idToNode.delete(widgetId);
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
        this.isActive = true;
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

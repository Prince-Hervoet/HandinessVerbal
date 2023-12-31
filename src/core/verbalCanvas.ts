import { VerbalWidget } from "../widget/verbalWidget";
import { Renderer } from "./renderer";
import { Point, boxSelectInclusion } from "../util/math";

export class VerbalCanvas {
  private canvasDom: HTMLCanvasElement;
  private canvasCtx: CanvasRenderingContext2D;
  private renderer: Renderer;
  private widgetToNode: Map<VerbalWidget, RenderNode>;
  private renderList: RenderList;

  constructor(
    canvasDom: HTMLCanvasElement,
    canvasCtx: CanvasRenderingContext2D,
    renderer: Renderer
  ) {
    this.canvasDom = canvasDom;
    this.canvasCtx = canvasCtx;
    this.renderer = renderer;
    this.widgetToNode = new Map();
    this.renderList = new RenderList();
  }

  add(...widgets: VerbalWidget[]) {
    for (const widget of widgets) {
      if (!widget) continue;
      let node = this.widgetToNode.get(widget);
      if (node) continue;
      node = new RenderNode();
      node.value = widget;
      this.renderList.addLast(node);
      this.widgetToNode.set(widget, node);
    }
  }

  place(...widgets: VerbalWidget[]) {
    this.add(...widgets);
    this.renderAll();
  }

  removeWithoutRender(...widgets: VerbalWidget[]) {
    for (const widget of widgets) {
      const node = this.widgetToNode.get(widget);
      if (!node) continue;
      this.renderList.remove(node);
      this.widgetToNode.delete(widget);
    }
  }

  remove(...widgets: VerbalWidget[]) {
    let isNeedRender = false;
    for (const widget of widgets) {
      const node = this.widgetToNode.get(widget);
      if (!node) continue;
      this.renderList.remove(node);
      this.widgetToNode.delete(widget);
      isNeedRender = true;
    }
    if (isNeedRender) this.renderAll();
  }

  renderAll() {
    this.erase();
    if (this.widgetToNode.size === 0) return;
    const tail = this.renderList.getTail();
    let cursor = this.renderList.getHead();
    cursor = cursor.next!;
    while (cursor !== tail) {
      if (cursor.isRender) {
        const widget = cursor.value!;
        widget.render(this.renderer);
      }
      cursor = cursor.next!;
    }
  }

  lookupPointOnWidget(x: number, y: number): VerbalWidget | null {
    if (this.widgetToNode.size === 0) return null;
    const head = this.renderList.getHead();
    let cursor = this.renderList.getTail();
    cursor = cursor.prev!;
    while (cursor !== head) {
      if (cursor.isRender) {
        const widget = cursor.value!;
        if (widget.get("isEventActive"))
          if (widget.isPointOnWidget(x, y)) return widget;
      }
      cursor = cursor.prev!;
    }
    return null;
  }

  lookupBoxSelectWidgets(box: Point[]): VerbalWidget[] {
    const ans: VerbalWidget[] = [];
    if (this.widgetToNode.size === 0) return ans;
    const tail = this.renderList.getTail();
    let cursor = this.renderList.getHead();
    cursor = cursor.next!;
    while (cursor !== tail) {
      if (cursor.isRender && cursor.isActive) {
        const widget = cursor.value!;
        if (widget.get("isEventActive"))
          if (boxSelectInclusion(box, widget.get("boundingBoxPoints")))
            ans.push(widget);
      }
      cursor = cursor.next!;
    }
    return ans;
  }

  levelGoUp(widget: VerbalWidget) {
    const node = this.widgetToNode.get(widget);
    if (!node) return;
    if (node.next === this.renderList.getTail()) return;
    const prevNode = node.prev!;
    const nextNode = node.next!;
    const temp = nextNode.next!;
    node.next = temp;
    temp.prev = node;
    prevNode.next = nextNode;
    nextNode.prev = prevNode;
    nextNode.next = node;
    node.prev = nextNode;
  }

  levelGoDown(widget: VerbalWidget) {
    const node = this.widgetToNode.get(widget);
    if (!node) return;
    if (node.prev === this.renderList.getHead()) return;
    const prevNode = node.prev!;
    const nextNode = node.next!;
    const temp = prevNode.prev!;
    temp.next = node;
    node.prev = temp;
    node.next = prevNode;
    prevNode.prev = node;
    prevNode.next = nextNode;
    nextNode.prev = prevNode;
  }

  setIsRender(isRender: boolean, ...widgets: VerbalWidget[]) {
    for (const widget of widgets) {
      const node = this.widgetToNode.get(widget);
      if (!node) continue;
      node.isRender = isRender;
    }
  }

  setIsActive(isActive: boolean, ...widgets: VerbalWidget[]) {
    for (const widget of widgets) {
      const node = this.widgetToNode.get(widget);
      if (!node) continue;
      node.isActive = isActive;
    }
  }

  has(widget: VerbalWidget) {
    const node = this.widgetToNode.get(widget);
    if (!node || !node.isRender) return false;
    return true;
  }

  clear() {
    this.erase();
    this.renderList.clear();
    this.widgetToNode.clear();
  }

  erase() {
    this.canvasCtx.clearRect(0, 0, this.canvasDom.width, this.canvasDom.height);
  }

  size() {
    return this.widgetToNode.size;
  }
}

class RenderNode {
  next: RenderNode | null = null;
  prev: RenderNode | null = null;
  value: VerbalWidget | null = null;
  isRender: boolean = true;
  isActive: boolean = true;
}

class RenderList {
  private head: RenderNode;
  private tail: RenderNode;

  constructor() {
    this.head = new RenderNode();
    this.tail = new RenderNode();
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  addLast(node: RenderNode) {
    const temp = this.tail.prev!;
    temp.next = node;
    node.prev = temp;
    node.next = this.tail;
    this.tail.prev = node;
  }

  remove(node: RenderNode) {
    const prevNode = node.prev!;
    const nextNode = node.next!;
    prevNode.next = nextNode;
    nextNode.prev = prevNode;
  }

  getHead() {
    return this.head;
  }

  getTail() {
    return this.tail;
  }

  clear() {
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }
}

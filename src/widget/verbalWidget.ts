import { Renderer } from "../core/renderer";
import { Point, degreeToRadian, rayMethod } from "../util/math";

export interface ISimpleEvent {
  on(name: string, handler: Function): void;
  emit(name: string, args: any): void;
  delete(name: string): void;
}

export abstract class VerbalWidget implements ISimpleEvent {
  // 包围盒位置
  x: number = 0;
  y: number = 0;
  width: number = 0;
  height: number = 0;
  basePoint: Point = { x: 0, y: 0 };
  degree: number = 0;

  // 点数组
  boundingBoxPoints: Point[] = [];
  pathPoints: Point[] = [];
  cornerPoints: Point[][] = [];

  // 风格
  style: any = {};

  // 携带的变换器
  transformer: VerbalWidget | null = null;

  // 类型
  shapeType: string = "unknown";

  // 事件
  eventObject: any = {};

  constructor(data: any) {
    this.initData(data);
    this.updateBoundingBoxPoints();
    this.updateBasePoint();
    this.updateCornerPoints();
    this.updatePathPoints();
    this.updateTransformer();
  }

  on(name: string, handler: Function): void {
    let handlers: Function[] = this.eventObject[name];
    if (!handlers) {
      this.eventObject[name] = handlers = [];
    }
    handlers.push(handler);
  }

  emit(name: string, args: any): void {
    const handlers: Function[] = this.eventObject[name];
    if (!handlers) return;
    for (const handler of handlers) {
      handler.call(this, args);
    }
  }

  delete(name: string): void {
    this.eventObject[name] = [];
  }

  protected initData(data: any) {
    const self: any = this;
    const keys: string[] = Object.keys(data);
    for (const key of keys) {
      self[key] = data[key] ?? self[key];
    }
  }

  protected updateTransformer() {}

  protected updatePathPoints() {}

  protected updateBoundingBoxPoints() {}

  protected updateCornerPoints() {}

  protected updateBasePoint() {}

  protected amendBasePoint() {}

  protected transform(ctx: CanvasRenderingContext2D) {
    if (this.degree === 0) return;
    ctx.translate(this.x, this.y);
    ctx.rotate(degreeToRadian(this.degree));
    ctx.translate(-this.x, -this.y);
  }

  protected _render(renderer: Renderer) {}

  update(data: any) {}

  render(renderer: Renderer) {
    if (this.width === 0 || this.height === 0) return;
    const ctx = renderer.getCanvasCtx();
    ctx.save();
    this.transform(ctx);
    renderer.render(this);
    ctx.restore();
  }

  get(key: string) {
    const self: any = this;
    return self[key];
  }

  set(key: string, value: any) {
    const self: any = this;
    self[key] = value;
  }

  isPointOnWidget(x: number, y: number): boolean {
    return false;
  }
}

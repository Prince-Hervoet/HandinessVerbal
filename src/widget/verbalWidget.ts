import { Renderer } from "../core/renderer";
import { SimpleEventData } from "../event/eventCenter";
import { Point, degreeToRadian, rayMethod, rotatePoint } from "../util/math";

export interface ISimpleEvent {
  on(name: string, handler: Function): void;
  emit(name: string, args: SimpleEventData): void;
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

  protected updateTransformer() {
    if (!this.transformer) return;
    this.transformer.update({
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      degree: this.degree,
    });
  }

  protected updatePathPoints() {}

  protected updateBoundingBoxPoints() {
    this.boundingBoxPoints = [
      { x: this.x, y: this.y },
      { x: this.x + this.width, y: this.y },
      { x: this.x + this.width, y: this.y + this.height },
      { x: this.x, y: this.y + this.height },
    ];
  }

  protected updateCornerPoints() {
    const padding = 6;
    const cornerWidth = 12;
    const cornerHeight = 12;
    const cornerWidthHalf = cornerWidth >> 1;
    const cornerHeightHalf = cornerHeight >> 1;
    const nx = this.x - padding;
    const ny = this.y - padding;
    const nWidth = this.width + (padding << 1);
    const nHeight = this.height + (padding << 1);
    // 四个角
    const dirs = [
      [0, 0],
      [nWidth, 0],
      [nWidth, nHeight],
      [0, nHeight],
    ];
    for (let i = 0; i < dirs.length; ++i) {
      const sx = nx + dirs[i][0] - cornerWidthHalf;
      const sy = ny + dirs[i][1] - cornerHeightHalf;
      this.cornerPoints[i] = [
        { x: sx, y: sy },
        { x: sx + cornerWidth, y: sy },
        { x: sx + cornerWidth, y: sy + cornerHeight },
        { x: sx, y: sy + cornerHeight },
      ];
    }
    this.cornerPoints[4] = [
      { x: this.x, y: this.y - cornerHeight },
      { x: this.x + this.width, y: this.y - cornerHeight },
      { x: this.x, y: this.y },
      { x: this.x + this.width, y: this.y },
    ];
    this.cornerPoints[5] = [
      { x: this.x + this.width, y: this.y },
      { x: this.x + this.width + cornerWidth, y: this.y },
      { x: this.x + this.width, y: this.y + this.height },
      { x: this.x + this.width + cornerWidth, y: this.y + this.height },
    ];
    this.cornerPoints[6] = [
      { x: this.x, y: this.y + this.height },
      { x: this.x + this.width, y: this.y + this.height },
      { x: this.x, y: this.y + this.height + cornerHeight },
      { x: this.x + this.width, y: this.y + this.height + cornerHeight },
    ];
    this.cornerPoints[7] = [
      { x: this.x - cornerWidth, y: this.y },
      { x: this.x, y: this.y },
      { x: this.x, y: this.y + this.height },
      { x: this.x - cornerWidth, y: this.y + this.height },
    ];
    this.cornerPoints[8] = [
      {
        x: this.x + (this.width >> 1) - cornerWidthHalf,
        y: ny - 20 - cornerHeightHalf,
      },
      {
        x: this.x + (this.width >> 1) + cornerWidthHalf,
        y: ny - 20 - cornerHeightHalf,
      },
      {
        x: this.x + (this.width >> 1) + cornerWidthHalf,
        y: ny - 20 + cornerHeightHalf,
      },
      {
        x: this.x + (this.width >> 1) - cornerWidthHalf,
        y: ny - 20 + cornerHeightHalf,
      },
    ];
  }

  protected updateBasePoint() {
    this.basePoint.x = this.x + (this.width >> 1);
    this.basePoint.y = this.y + (this.height >> 1);
  }

  protected amendBasePoint() {
    const nPoint = rotatePoint(
      {
        x: this.x + (this.width >> 1),
        y: this.y + (this.height >> 1),
      },
      this.basePoint,
      this.degree
    );
    this.x = nPoint.x - (this.width >> 1);
    this.y = nPoint.y - (this.height >> 1);
  }

  protected transform(ctx: CanvasRenderingContext2D) {
    if (this.degree === 0) return;
    ctx.translate(this.basePoint.x, this.basePoint.y);
    ctx.rotate(degreeToRadian(this.degree));
    ctx.translate(-this.basePoint.x, -this.basePoint.y);
  }

  protected rotatePoints() {
    if (this.degree === 0) return;
    for (let i = 0; i < this.boundingBoxPoints.length; ++i) {
      this.boundingBoxPoints[i] = rotatePoint(
        this.boundingBoxPoints[i],
        this.basePoint,
        this.degree
      );
    }

    for (let i = 0; i < this.cornerPoints.length; ++i) {
      for (let k = 0; k < this.cornerPoints[i].length; ++k) {
        this.cornerPoints[i][k] = rotatePoint(
          this.cornerPoints[i][k],
          this.basePoint,
          this.degree
        );
      }
    }

    for (let i = 0; i < this.pathPoints.length; ++i) {
      this.pathPoints[i] = rotatePoint(
        this.pathPoints[i],
        this.basePoint,
        this.degree
      );
    }
  }

  protected _render(renderer: Renderer) {}

  update(data: any) {
    this.initData(data);
    this.amendBasePoint();
    this.updateBoundingBoxPoints();
    this.updatePathPoints();
    this.updateCornerPoints();
    this.updateBasePoint();
    this.rotatePoints();
    this.updateTransformer();
    this.emit("_update_watch_", {
      target: this,
      eventType: "_update_watch_",
    });
  }

  calPointsInfo() {
    this.amendBasePoint();
    this.updateBoundingBoxPoints();
    this.updatePathPoints();
    this.updateCornerPoints();
    this.updateBasePoint();
    this.rotatePoints();
  }

  updatePosition(data: any) {
    this.initData(data);
    this.updateBasePoint();
    this.updateTransformer();
    this.emit("_update_watch_", {
      target: this,
      eventType: "_update_watch_",
    });
  }

  render(renderer: Renderer) {
    if (this.width === 0 || this.height === 0) return;
    const ctx = renderer.getCanvasCtx();
    ctx.save();
    this.transform(ctx);
    this._render(renderer);
    ctx.restore();
  }

  get(key: string) {
    const self: any = this;
    return self[key];
  }

  getBoundingBoxInfo() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      degree: this.degree,
    };
  }

  set(key: string, value: any) {
    const self: any = this;
    self[key] = value;
  }

  isPointOnWidget(x: number, y: number): boolean {
    return false;
  }
}

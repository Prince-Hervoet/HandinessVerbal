import { Renderer } from "../core/renderer";
import { SimpleEventData } from "../event/eventCenter";
import { Point, degreeToRadian, rotatePoint } from "../util/math";

export interface ISimpleEvent {
  on(name: string, handler: Function): void;
  emit(name: string, args: SimpleEventData): void;
  delete(name: string): void;
}

/**
 * 部件抽象基类
 */
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

  /**
   * 等待子类实现
   * @param renderer
   */
  protected _render(renderer: Renderer) {}

  /**
   * 等待子类实现
   */
  protected updatePathPoints() {}

  /**
   * 等待子类实现，例如⚪就是特殊的判断方式
   * @param x
   * @param y
   * @returns
   */
  isPointOnWidget(x: number, y: number): boolean {
    return false;
  }

  /**
   * 默认实现，无需子类替换
   * @param data
   */
  protected initData(data: any) {
    const self: any = this;
    const keys: string[] = Object.keys(data);
    for (const key of keys) {
      self[key] = data[key] ?? self[key];
    }
  }

  /**
   * 默认实现，无需子类替换
   * @returns
   */
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

  /**
   * 默认实现，无需子类替换
   */
  protected updateBoundingBoxPoints() {
    this.boundingBoxPoints = [
      { x: this.x, y: this.y },
      { x: this.x + this.width, y: this.y },
      { x: this.x + this.width, y: this.y + this.height },
      { x: this.x, y: this.y + this.height },
    ];
  }

  /**
   * 基本图形实现，对于特殊的图形例如线段可能需要子类实现
   */
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

  /**
   * 默认实现，无需子类替换
   */
  protected updateBasePoint() {
    this.basePoint.x = this.x + (this.width >> 1);
    this.basePoint.y = this.y + (this.height >> 1);
  }

  /**
   * 修正中心点，默认实现，无需子类替换
   */
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

  /**
   * 渲染前的变换设置，无需子类替换
   * @param ctx
   * @returns
   */
  protected transform(ctx: CanvasRenderingContext2D) {
    if (this.degree === 0) return;
    ctx.translate(this.basePoint.x, this.basePoint.y);
    ctx.rotate(degreeToRadian(this.degree));
    ctx.translate(-this.basePoint.x, -this.basePoint.y);
  }

  /**
   * 将所有计算过的点数组进行旋转修正，无需子类替换
   * @returns
   */
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

  /**
   * 统一更新方式，可能需要子类替换
   * @param data
   */
  update(data: any) {
    this.initData(data);
    this.calPointsInfo();
    this.updateTransformer();
    this.emit("_update_watch_", {
      target: this,
      eventType: "_update_watch_",
    });
  }

  /**
   * 计算所需的点数组，一般无需子类替换
   */
  calPointsInfo() {
    this.amendBasePoint();
    this.updateBoundingBoxPoints();
    this.updatePathPoints();
    this.updateCornerPoints();
    this.updateBasePoint();
    this.rotatePoints();
  }

  /**
   * 更新位置信息，可能需要子类替换
   * @param data
   */
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

  isPointOnCorner(x: number, y: number): boolean {
    return false;
  }

  stringify() {
    return JSON.stringify({
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      degree: this.degree,
      basePoint: this.basePoint,
      shapeType: this.shapeType,
      style: this.style,
    });
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
}

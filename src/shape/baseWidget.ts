import { BoundingBoxPosition, IWidget, Point } from "../util/someTypes.js";

export class BaseWidget implements IWidget {
  public shapeName: string = ""; // 图形名称
  public x: number = 0; // left
  public y: number = 0; // top
  public width: number = 0; // 宽 （矩形）
  public height: number = 0; // 高 （矩形）
  public rotateAngle: number = 0; // 旋转角度
  public style: any; // canvas风格
  public points: Point[] = []; // 顶点信息 （闭合图形）

  render(ctx: CanvasRenderingContext2D): void {
    throw new Error("Method not implemented.");
  }
  update(props: any): void {
    throw new Error("Method not implemented.");
  }
  getPoints(): Point[] {
    throw new Error("Method not implemented.");
  }
  getBoundingBoxPosition(): BoundingBoxPosition {
    throw new Error("Method not implemented.");
  }
}

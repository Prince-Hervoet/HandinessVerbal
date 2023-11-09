export class Point {
  public x: number = 0;
  public y: number = 0;
}

export class BaseBoxPosition {
  public x: number = 0;
  public y: number = 0;
  public width: number = 0;
  public height: number = 0;
}

export class BoundingBoxPosition {
  public x: number = 0;
  public y: number = 0;
  public width: number = 0;
  public height: number = 0;
}

export interface ICanvasProps {
  width: number;
  height: number;
}

export interface IWidgetProps {
  x: number;
  y: number;
  width: number;
  height: number;
  style: any;
}

export interface IWidget {
  shapeName: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotateAngle: number;
  style: any;
  points: Point[];

  /**
   * 每个部件自主实现的绘制方法
   */
  render(ctx: CanvasRenderingContext2D): void;

  /**
   * 部件的更新方法
   */
  update(props: any): void;

  /**
   * 获取顶点数组
   */
  getPoints(): Point[];

  /**
   * 获取包围盒位置信息
   */
  getBoundingBoxPosition(): BoundingBoxPosition;
}

export const EventWidgetStyle = {
  hoveringFlagRectStyle: { fillStyle: "rgba(0, 0, 255, 0.3)" },
  boxSelectFlagRectStyle: { fillStyle: "rgba(0, 0, 245, 0.2)" },
};

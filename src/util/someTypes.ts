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

export interface IWidget {
  /**
   * 每个部件自主实现的绘制方法
   */
  render(ctx: CanvasRenderingContext2D): void;

  /**
   * 每个部件的更新方法
   */
  update(props: any): void;

  /**
   * 获取部件ID
   */
  getWidgetId(): string;

  /**
   * 获取顶点数组
   */
  getPoints(): Point[];

  getBoundingBoxPosition(): BoundingBoxPosition;
}

export const EventWidgetStyle = {
  hoveringFlagRectStyle: { fillStyle: "rgba(0, 0, 255, 0.3)" },
  boxSelectFlagRectStyle: { fillStyle: "rgba(0, 0, 245, 0.2)" },
};

export class Point {
  public x: number = 0;
  public y: number = 0;
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
}

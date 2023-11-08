import { getWidgetId } from "../util/calculate.js";
import { IWidget, Point } from "../util/someTypes.js";

export class Rect implements IWidget {
  private widgetId: string = "";
  private x: number = 0;
  private y: number = 0;
  private width: number = 0;
  private height: number = 0;
  private style: any;

  constructor(props: any) {
    this.widgetId = getWidgetId();
    this.x = props.x;
    this.y = props.y;
    this.width = props.width;
    this.height = props.height;
    this.style = props.style;
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update(props: any): void {}

  getWidgetId(): string {
    return this.widgetId;
  }

  getPoints(): Point[] {
    return [];
  }
}

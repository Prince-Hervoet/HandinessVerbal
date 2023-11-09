import {
  BaseBoxPosition,
  IWidget,
  IWidgetProps,
  Point,
} from "../util/someTypes.js";
import { BaseWidget } from "./baseWidget.js";

type WidgetGroupPropsType = {
  x: number;
  y: number;
  width: number;
  height: number;
  widgets: IWidget[];
};

export class WidgetGroup extends BaseWidget {
  public shapeName: string = "widgetGroup";
  public widgets: IWidget[] = [];

  constructor(props: WidgetGroupPropsType) {
    super();
    this.x = props.x;
    this.y = props.y;
    this.width = props.width;
    this.height = props.height;
    this.widgets = props.widgets;
    this.calPoints();
  }

  private calPoints() {
    this.points = [];
    this.points.push({ x: this.x, y: this.y });
    this.points.push({ x: this.x + this.width, y: this.y });
    this.points.push({ x: this.x + this.width, y: this.y + this.height });
    this.points.push({ x: this.x, y: this.y + this.height });
  }

  /**
   * 通过偏移量来更新组内所有部件的位置
   * @param offsetX
   * @param offsetY
   */
  private updateWidgets(offsetX: number, offsetY: number) {
    for (const widget of this.widgets) {
      const { x, y } = widget.getBoundingBoxPosition();
      widget.update({ x: x + offsetX, y: y + offsetY });
    }
  }

  render(ctx: CanvasRenderingContext2D): void {}

  update(props: any): void {
    const offsetX = props.x - this.x; // 新的x比原来的x偏离了多少
    const offsetY = props.y - this.y;
    this.x = props.x ?? this.x;
    this.y = props.y ?? this.y;
    this.calPoints();
    this.updateWidgets(offsetX, offsetY);
  }

  getPoints(): Point[] {
    return this.points;
  }

  getBoundingBoxPosition(): BaseBoxPosition {
    return { x: this.x, y: this.y, width: this.width, height: this.height };
  }
}

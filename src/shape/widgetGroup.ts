import { BaseBoxPosition, IWidget, Point } from "../util/someTypes.js";
import { BaseWidget } from "./baseWidget.js";

export class WidgetGroup extends BaseWidget {
  public widgets: IWidget[] = [];

  constructor(props: any) {
    super();
    this.x = props.x;
    this.y = props.y;
    this.width = props.width;
    this.height = props.height;
    this.widgets = props.widgets;
    this.calPoints();
  }

  private calPoints() {
    this.points.push({ x: this.x, y: this.y });
    this.points.push({ x: this.x + this.width, y: this.y });
    this.points.push({ x: this.x + this.width, y: this.y + this.height });
    this.points.push({ x: this.x, y: this.y + this.height });
  }

  render(ctx: CanvasRenderingContext2D): void {
    throw new Error("Method not implemented.");
  }

  update(props: any): void {
    this.x = props.x ?? this.x;
    this.y = props.y ?? this.y;
    this.width = props.width ?? this.width;
    this.height = props.height ?? this.height;
    this.widgets = props.widgets ?? [];
    this.calPoints();
  }

  getPoints(): Point[] {
    return this.points;
  }

  getBoundingBoxPosition(): BaseBoxPosition {
    throw new Error("Method not implemented.");
  }
}

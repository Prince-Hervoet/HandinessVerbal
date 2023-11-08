import { getWidgetId } from "../util/calculate.js";
import { IWidget } from "../util/someTypes.js";

class Rect implements IWidget {
  private widgetId: string = "";

  constructor(props: any) {
    this.widgetId = getWidgetId();
  }

  render(ctx: CanvasRenderingContext2D): void {}

  update(props: any): void {}

  getWidgetId(): string {
    return this.widgetId;
  }
}

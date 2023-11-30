import { EventCenter } from "../event/eventCenter";
import { CanvasImage } from "../widget/canvasImage";
import { Ellipse } from "../widget/ellipse";
import { Rectangle } from "../widget/rectangle";
import { VerbalWidget } from "../widget/verbalWidget";
import { VerbalCanvas } from "./verbalCanvas";
import { Triangle } from "../widget/triangle";

export class VerbalManager {
  private renderCanvas: VerbalCanvas;
  private eventCanvas: VerbalCanvas;
  private eventCenter: EventCenter;

  constructor(
    renderCanvas: VerbalCanvas,
    eventCanvas: VerbalCanvas,
    eventCenter: EventCenter
  ) {
    this.renderCanvas = renderCanvas;
    this.eventCanvas = eventCanvas;
    this.eventCenter = eventCenter;
  }

  place(...widgets: VerbalWidget[]) {
    for (const widget of widgets) {
      if (!widget) continue;
      EventCenter.bindUpdateWatchEvent(widget, this.eventCenter);
    }
    this.renderCanvas.place(...widgets);
  }

  add(...widgets: VerbalWidget[]) {
    this.renderCanvas.add(...widgets);
  }

  remove(...widgets: VerbalWidget[]) {
    this.renderCanvas.remove(...widgets);
    this.eventCanvas.remove(...widgets);
  }

  size() {
    return this.renderCanvas.size();
  }

  setIsBoxSelect(isBoxSelect: boolean) {
    this.eventCenter.getActionConfig().isBoxSelect = isBoxSelect;
  }

  getRenderCanvas() {
    return this.renderCanvas;
  }

  getEventCanvas() {
    return this.eventCanvas;
  }

  rectangle(data: any) {
    return new Rectangle(data);
  }

  canvasImage(data: any) {
    return new CanvasImage(data);
  }

  ellipse(data: any) {
    return new Ellipse(data);
  }

  triangle(data: any) {
    return new Triangle(data);
  }
}

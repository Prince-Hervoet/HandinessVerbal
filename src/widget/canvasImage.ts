import { Renderer } from "../core/renderer";
import { rayMethod } from "../util/math";
import { VerbalWidget } from "./verbalWidget";

export class CanvasImage extends VerbalWidget {
  shapeType: string = "image";
  imageCache: HTMLImageElement | null = null;
  src: string = "";

  constructor(data: any) {
    super(data);
    this.src = data.src ?? "";
  }

  update(data: any) {
    const oldSrc = this.src;
    this.initData(data);
    this.calPointsInfo();
    this.updateTransformer();
    if (data.src && data.src !== oldSrc) this.imageCache = null;
    this.emit("_update_watch_", {
      target: this,
      eventType: "_update_watch_",
    });
  }

  protected _render(renderer: Renderer): void {
    const ctx = renderer.getCanvasCtx();
    if (this.imageCache) {
      ctx.drawImage(this.imageCache, 0, 0, this.width, this.height);
      return;
    }
    const image = new Image();
    image.src = this.src;
    image.onload = () => {
      ctx.drawImage(image, this.x, this.y, this.width, this.height);
      this.imageCache = image;
    };
  }

  protected updatePathPoints(): void {
    this.pathPoints = [
      { x: this.x, y: this.y },
      { x: this.x + this.width, y: this.y },
      { x: this.x + this.width, y: this.y + this.height },
      { x: this.x, y: this.y + this.height },
    ];
  }

  isPointOnWidget(x: number, y: number): boolean {
    return rayMethod({ x, y }, this.pathPoints);
  }
}

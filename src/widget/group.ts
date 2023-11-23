import { rayMethod } from "../util/math";
import { VerbalWidget } from "./verbalWidget";

export class Group extends VerbalWidget {
  shapeType: string = "group";
  members: VerbalWidget[] = [];

  constructor(data: any) {
    super(data);
    this.members = data.members ?? [];
  }

  update(data: any): void {
    const oldX = this.x;
    const oldY = this.y;
    this.initData(data);
    this.calPointsInfo();
    this.updateTransformer();
    const nxOffset = this.x - oldX;
    const nyOffset = this.y - oldY;
    this.members.forEach((member: VerbalWidget) => {
      member.updatePosition({
        x: member.get("x") + nxOffset,
        y: member.get("y") + nyOffset,
      });
    });
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

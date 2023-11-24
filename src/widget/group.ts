import { rayMethod } from "../util/math";
import { VerbalWidget } from "./verbalWidget";

/**
 * 部件组
 */
export class Group extends VerbalWidget {
  shapeType: string = "group";
  members: VerbalWidget[] = []; // 存放成员部件

  constructor(data: any) {
    super(data);
    this.members = data.members ?? [];
    this.updateMembersInfo();
  }

  private updateMembersInfo() {
    this.members.forEach((member: VerbalWidget) => {
      member.set("x", member.get("x") - this.x);
      member.set("y", member.get("y") - this.y);
    });
  }

  recoverMembersInfo() {
    this.members.forEach((member: VerbalWidget) => {
      member.update({
        x: member.get("x") + this.x,
        y: member.get("y") + this.y,
      });
    });
  }

  /**
   * 组更新时，需要将组内成员进行相应的更新
   * @param data
   */
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

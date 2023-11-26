import { degreeToRadian, rayMethod, rotatePoint } from "../util/math";
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
    this.updateMembersCoord();
  }

  private updateMembersCoord() {
    this.members.forEach((member: VerbalWidget) => {
      member.set("x", member.get("x") - this.x);
      member.set("y", member.get("y") - this.y);
      member.set("basePoint", {
        x: member.get("x") + (member.get("scaleWidth") >> 1),
        y: member.get("y") + (member.get("scaleHeight") >> 1),
      });
      member.set("groupWidget", this);
      member.set("isEventActive", false);
    });
  }

  recoverMembersInfo() {
    this.members.forEach((member: VerbalWidget) => {
      const nScaleX = this.scaleX * member.get("scaleX");
      const nScaleY = this.scaleY * member.get("scaleY");
      const nDegree = this.degree + member.get("degree");
      const nScaleWidth = member.get("width") * nScaleX;
      const nScaleHeight = member.get("height") * nScaleY;
      const mx = member.get("x");
      const my = member.get("y");
      const nBasePoint = {
        x: this.basePoint.x - this.x,
        y: this.basePoint.y - this.y,
      };
      const oldMemberBasePoint = {
        x: mx + (nScaleWidth >> 1),
        y: my + (nScaleHeight >> 1),
      };
      const nMemberBasePoint = rotatePoint(
        oldMemberBasePoint,
        nBasePoint,
        this.degree
      );
      const nx =
        (nMemberBasePoint.x - (nScaleWidth >> 1)) * this.scaleX + this.x;
      const ny =
        (nMemberBasePoint.y - (nScaleHeight >> 1)) * this.scaleY + this.y;
      member.set("groupWidget", null);
      member.set("basePoint", {
        x: nx + (nScaleWidth >> 1),
        y: ny + (nScaleHeight >> 1),
      });
      member.set("isEventActive", true);
      member.updateNoNotify({
        x: nx,
        y: ny,
        scaleX: nScaleX,
        scaleY: nScaleY,
        degree: nDegree,
      });
    });
  }

  setCtxGroupTransform(ctx: CanvasRenderingContext2D) {
    this.transform(ctx);
  }

  protected updatePathPoints(): void {
    this.pathPoints = [
      { x: this.x, y: this.y },
      { x: this.x + this.scaleWidth, y: this.y },
      { x: this.x + this.scaleWidth, y: this.y + this.scaleHeight },
      { x: this.x, y: this.y + this.scaleHeight },
    ];
  }

  isPointOnWidget(x: number, y: number): boolean {
    return rayMethod({ x, y }, this.pathPoints);
  }
}

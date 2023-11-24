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

  /**
   * 组的更新方式 -- 等比
   * @param data
   */
  update(data: any) {
    this.initData(data);
    this.calPointsInfo();
    this.updateTransformer();
    this.emit("_update_watch_", {
      target: this,
      eventType: "_update_watch_",
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
      const nPoint1 = rotatePoint({ x: mx, y: my }, nBasePoint, this.degree);
      const nPoint2 = rotatePoint(
        { x: mx + nScaleWidth, y: my + nScaleHeight },
        nBasePoint,
        this.degree
      );
      const middlePoint = {
        x: (nPoint1.x + nPoint2.x) >> 1,
        y: (nPoint1.y + nPoint2.y) >> 1,
      };
      const nx = (middlePoint.x - (nScaleWidth >> 1)) * this.scaleX + this.x;
      const ny = (middlePoint.y - (nScaleHeight >> 1)) * this.scaleY + this.y;
      member.set("groupWidget", null);
      member.set("isEventActive", true);
      member.updateNoAmend({
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

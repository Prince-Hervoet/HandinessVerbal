import { Renderer } from "../core/renderer";
import { rotatePoint } from "../util/math";
import { VerbalWidget } from "./verbalWidget";

/**
 * 部件组
 */
export class Group extends VerbalWidget {
  shapeType: string = "group";
  members: VerbalWidget[] = []; // 存放成员部件
  records: any = [];

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
      this.records.push({
        x: member.get("x"),
        y: member.get("y"),
        scaleWidth: member.get("scaleWidth"),
        scaleHeight: member.get("scaleHeight"),
      });
    });
  }

  recoverMembersInfo() {
    this.members.forEach((member: VerbalWidget) => {
      member.set("groupWidget", null);
      member.set("isEventActive", true);
      const currentBasePoint = member.get("basePoint");
      const groupBasePoint = {
        x: this.basePoint.x - this.x,
        y: this.basePoint.y - this.y,
      };
      const nBasePoint = rotatePoint(
        currentBasePoint,
        groupBasePoint,
        this.degree
      );
      const nx = nBasePoint.x - (member.get("scaleWidth") >> 1);
      const ny = nBasePoint.y - (member.get("scaleHeight") >> 1);
      member.updateNoAmend({
        x: nx + this.x,
        y: ny + this.y,
        scaleX: this.scaleX * member.get("scaleX"),
        scaleY: this.scaleY * member.get("scaleY"),
        degree: this.degree + member.get("degree"),
      });
    });
  }

  render(renderer: Renderer): void {}

  update(data: any) {
    this.initData(data);
    this.amendBasePoint(data);
    this.calPointsInfo();
    this.updateTransformer();
    this.updateMembers();
    this.emit("_update_watch_", {
      target: this,
      eventType: "_update_watch_",
    });
  }

  updateMembers() {
    const scaleX = this.scaleX;
    const scaleY = this.scaleY;
    this.members.forEach((member, index) => {
      member.set("x", this.records[index].x * scaleX);
      member.set("y", this.records[index].y * scaleY);
      member.set("scaleWidth", this.records[index].scaleWidth * scaleX);
      member.set("scaleHeight", this.records[index].scaleHeight * scaleY);
      member.set("basePoint", {
        x: member.get("x") + (member.get("scaleWidth") >> 1),
        y: member.get("y") + (member.get("scaleHeight") >> 1),
      });
    });
  }

  setCtxGroupTransform = (ctx: CanvasRenderingContext2D) => {
    this.transform(ctx);
  };
}

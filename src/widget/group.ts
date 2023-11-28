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
  originWidth: number = 0;
  originHeight: number = 0;

  constructor(data: any) {
    super(data);
    this.members = data.members ?? [];
    this.updateMembersCoord();
    this.originWidth = this.width;
    this.originHeight = this.height;
  }

  private updateMembersCoord() {
    this.members.forEach((member: VerbalWidget) => {
      member.set("x", member.get("x") - this.x);
      member.set("y", member.get("y") - this.y);
      member.set("basePoint", {
        x: member.get("x") + (member.get("width") >> 1),
        y: member.get("y") + (member.get("height") >> 1),
      });
      member.set("groupWidget", this);
      member.set("isEventActive", false);
      this.records.push({
        x: member.get("x"),
        y: member.get("y"),
        width: member.get("width"),
        height: member.get("height"),
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
      const nx = nBasePoint.x - (member.get("width") >> 1);
      const ny = nBasePoint.y - (member.get("height") >> 1);
      member.updateNoAmend({
        x: nx + this.x,
        y: ny + this.y,
        degree: this.degree + member.get("degree"),
      });
    });
  }

  render(renderer: Renderer): void {}

  update(data: any) {
    this.initData(data);
    const scaleX = this.width / this.originWidth;
    const scaleY = this.height / this.originHeight;
    this.amendBasePoint(data);
    this.calPointsInfo();
    this.updateTransformer();
    this.updateMembers(scaleX, scaleY);
    this.emit("_update_watch_", {
      target: this,
      eventType: "_update_watch_",
    });
  }

  updateMembers(scaleX: number, scaleY: number) {
    this.members.forEach((member, index) => {
      member.set("x", this.records[index].x * scaleX);
      member.set("y", this.records[index].y * scaleY);
      member.set("width", this.records[index].width * scaleX);
      member.set("height", this.records[index].height * scaleY);
      member.set("basePoint", {
        x: member.get("x") + (member.get("width") >> 1),
        y: member.get("y") + (member.get("height") >> 1),
      });
    });
  }

  setCtxGroupTransform = (ctx: CanvasRenderingContext2D) => {
    this.transform(ctx);
  };
}

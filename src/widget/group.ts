import { VerbalWidget } from "./verbalWidget";

export class Group extends VerbalWidget {
  shapeType: string = "group";
  members: VerbalWidget[] = [];

  update(data: any): void {
    this.initData(data);
  }
}

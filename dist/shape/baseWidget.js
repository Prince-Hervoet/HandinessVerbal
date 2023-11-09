export class BaseWidget {
    constructor() {
        this.shapeName = ""; // 图形名称
        this.x = 0; // left
        this.y = 0; // top
        this.width = 0; // 宽 （矩形）
        this.height = 0; // 高 （矩形）
        this.rotateAngle = 0; // 旋转角度
        this.points = []; // 顶点信息 （闭合图形）
    }
    render(ctx) {
        throw new Error("Method not implemented.");
    }
    update(props) {
        throw new Error("Method not implemented.");
    }
    getPoints() {
        throw new Error("Method not implemented.");
    }
    getBoundingBoxPosition() {
        throw new Error("Method not implemented.");
    }
}

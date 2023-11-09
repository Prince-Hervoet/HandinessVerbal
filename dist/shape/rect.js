import { setCtxStyle } from "../util/calculate.js";
import { BaseWidget } from "./baseWidget.js";
export class Rect extends BaseWidget {
    constructor(props) {
        super();
        this.x = props.x;
        this.y = props.y;
        this.width = props.width;
        this.height = props.height;
        this.style = props.style;
        this.calPoints();
    }
    calPoints() {
        this.points = [];
        this.points.push({ x: this.x, y: this.y });
        this.points.push({ x: this.x + this.width, y: this.y });
        this.points.push({ x: this.x + this.width, y: this.y + this.height });
        this.points.push({ x: this.x, y: this.y + this.height });
    }
    render(ctx) {
        setCtxStyle(ctx, this.style);
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    update(props) {
        var _a, _b, _c, _d, _e;
        this.x = (_a = props.x) !== null && _a !== void 0 ? _a : this.x;
        this.y = (_b = props.y) !== null && _b !== void 0 ? _b : this.y;
        this.width = (_c = props.width) !== null && _c !== void 0 ? _c : this.width;
        this.height = (_d = props.height) !== null && _d !== void 0 ? _d : this.height;
        this.style = (_e = props.style) !== null && _e !== void 0 ? _e : this.style;
        this.calPoints();
    }
    getPoints() {
        return this.points;
    }
    getBoundingBoxPosition() {
        return { x: this.x, y: this.y, width: this.width, height: this.height };
    }
}

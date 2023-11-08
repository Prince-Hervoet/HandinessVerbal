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
        this.x = props.x;
        this.y = props.y;
        this.width = props.width;
        this.height = props.height;
        this.style = props.style;
        this.calPoints();
    }
    getPoints() {
        return this.points;
    }
    getBoundingBoxPosition() {
        return { x: this.x, y: this.y, width: this.width, height: this.height };
    }
}

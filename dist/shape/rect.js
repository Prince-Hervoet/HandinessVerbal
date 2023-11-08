import { getWidgetId, setCtxStyle } from "../util/calculate.js";
export class Rect {
    constructor(props) {
        this.widgetId = "";
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.points = [];
        this.widgetId = getWidgetId();
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
        // 设置风格
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
    getWidgetId() {
        return this.widgetId;
    }
    getPoints() {
        return this.points;
    }
    getBoundingBoxPosition() {
        return { x: this.x, y: this.y, width: this.width, height: this.height };
    }
}

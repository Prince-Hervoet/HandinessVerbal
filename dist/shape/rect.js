import { getWidgetId } from "../util/calculate.js";
export class Rect {
    constructor(props) {
        this.widgetId = "";
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.widgetId = getWidgetId();
        this.x = props.x;
        this.y = props.y;
        this.width = props.width;
        this.height = props.height;
        this.style = props.style;
    }
    render(ctx) {
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    update(props) { }
    getWidgetId() {
        return this.widgetId;
    }
    getPoints() {
        return [];
    }
}

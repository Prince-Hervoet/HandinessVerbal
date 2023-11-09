import { BaseWidget } from "./baseWidget.js";
export class WidgetGroup extends BaseWidget {
    constructor(props) {
        super();
        this.widgets = [];
        this.x = props.x;
        this.y = props.y;
        this.width = props.width;
        this.height = props.height;
        this.widgets = props.widgets;
        this.calPoints();
    }
    calPoints() {
        this.points.push({ x: this.x, y: this.y });
        this.points.push({ x: this.x + this.width, y: this.y });
        this.points.push({ x: this.x + this.width, y: this.y + this.height });
        this.points.push({ x: this.x, y: this.y + this.height });
    }
    render(ctx) {
        throw new Error("Method not implemented.");
    }
    update(props) {
        var _a, _b, _c, _d, _e;
        this.x = (_a = props.x) !== null && _a !== void 0 ? _a : this.x;
        this.y = (_b = props.y) !== null && _b !== void 0 ? _b : this.y;
        this.width = (_c = props.width) !== null && _c !== void 0 ? _c : this.width;
        this.height = (_d = props.height) !== null && _d !== void 0 ? _d : this.height;
        this.widgets = (_e = props.widgets) !== null && _e !== void 0 ? _e : [];
        this.calPoints();
    }
    getPoints() {
        return this.points;
    }
    getBoundingBoxPosition() {
        throw new Error("Method not implemented.");
    }
}

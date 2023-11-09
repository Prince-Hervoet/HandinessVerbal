import { BaseWidget } from "./baseWidget.js";
export class WidgetGroup extends BaseWidget {
    constructor(props) {
        super();
        this.shapeName = "widgetGroup";
        this.widgets = [];
        this.x = props.x;
        this.y = props.y;
        this.width = props.width;
        this.height = props.height;
        this.widgets = props.widgets;
        this.calPoints();
    }
    calPoints() {
        this.points = [];
        this.points.push({ x: this.x, y: this.y });
        this.points.push({ x: this.x + this.width, y: this.y });
        this.points.push({ x: this.x + this.width, y: this.y + this.height });
        this.points.push({ x: this.x, y: this.y + this.height });
    }
    /**
     * 通过偏移量来更新组内所有部件的位置
     * @param offsetX
     * @param offsetY
     */
    updateWidgets(offsetX, offsetY) {
        for (const widget of this.widgets) {
            const { x, y } = widget.getBoundingBoxPosition();
            widget.update({ x: x + offsetX, y: y + offsetY });
        }
    }
    render(ctx) { }
    update(props) {
        var _a, _b;
        const offsetX = props.x - this.x; // 新的x比原来的x偏离了多少
        const offsetY = props.y - this.y;
        this.x = (_a = props.x) !== null && _a !== void 0 ? _a : this.x;
        this.y = (_b = props.y) !== null && _b !== void 0 ? _b : this.y;
        this.calPoints();
        this.updateWidgets(offsetX, offsetY);
    }
    getPoints() {
        return this.points;
    }
    getBoundingBoxPosition() {
        return { x: this.x, y: this.y, width: this.width, height: this.height };
    }
}

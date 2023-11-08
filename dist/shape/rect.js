import { getWidgetId } from "../util/calculate.js";
class Rect {
    constructor(props) {
        this.widgetId = "";
        this.widgetId = getWidgetId();
    }
    render(ctx) { }
    update(props) { }
    getWidgetId() {
        return this.widgetId;
    }
    getPoints() {
        return [];
    }
}

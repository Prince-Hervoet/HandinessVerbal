import { nanoid } from "../../node_modules/nanoid/index.js";
/**
 * 获取一个部件随机id
 * @returns
 */
export function getWidgetId() {
    return Date.now() + "_" + nanoid();
}
/**
 * 判断坐标是否在图形中
 * @param x
 * @param y
 * @param widget
 */
export function judgePositionInWidget(x, y, widget) {
    const points = widget.getPoints();
    let count = 0;
    for (let i = 1; i < points.length; ++i) {
        if (points[i].x < x && points[i - 1].x < x)
            continue;
        if ((points[i].y <= y && points[i - 1].y >= y) ||
            (points[i].y >= y && points[i - 1].y <= y))
            ++count;
    }
    if (points[0].x >= x && points[points.length - 1].x >= x) {
        if ((points[0].y <= y && points[points.length - 1].y >= y) ||
            (points[0].y >= y && points[points.length - 1].y <= y))
            ++count;
    }
    return (count & 1) === 1;
}

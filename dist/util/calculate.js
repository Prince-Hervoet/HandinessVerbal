/**
 * 获取一个部件随机id
 * @returns
 */
export function getWidgetId() {
    return Date.now() + "_" + Math.random();
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
/**
 * 设置ctx的风格
 * @param ctx
 * @param style
 */
export function setCtxStyle(ctx, style) {
    ctx.fillStyle = style.fillStyle;
    ctx.strokeStyle = style.strokeStyle;
    ctx.font = style.font;
}
/**
 * 将当前鼠标坐标和最后一次鼠标按下的坐标转化成canvas画矩形的左上角的坐标
 * @param mouseX
 * @param mouseY
 * @param mouseDownX
 * @param mouseDownY
 */
export function boxSelectRectPositionCal(mouseX, mouseY, mouseDownX, mouseDownY) {
    const x = Math.min(mouseX, mouseDownX);
    const y = Math.min(mouseY, mouseDownY);
    const mx = Math.max(mouseX, mouseDownX);
    const my = Math.max(mouseY, mouseDownY);
    return { x, y, width: mx - x, height: my - y };
}

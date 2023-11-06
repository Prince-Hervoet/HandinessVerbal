/**
 * 设置上下文样式
 * @param {*} ctx
 * @param {object} style
 */
export function setStyle(ctx, style) {
  const {
    shadowColor,
    shadowBlur,
    lineJoin,
    lineWidth,
    strokeStyle,
    fillStyle,
  } = style;
  ctx.shadowColor = shadowColor;
  ctx.shadowBlur = shadowBlur;
  ctx.lineJoin = lineJoin;
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = strokeStyle;
  ctx.fillStyle = fillStyle;
}

import { judgeMouseOnWidget } from "../util/calculation";
import { stateControllerNames } from "../util/someConst";

/**
 * 画板状态机
 */
const eventStatesController = {
  currentBoardState: stateControllerNames.COMMON, // 画板状态
  currentHittingWidget: null, // 当前选中的元素
  currentHoveringWidget: null, // 当前悬停的元素
};

/**
 * 浏览器鼠标移动事件函数
 * @param {object} event
 */
function mouseMoveHandler(event) {
  const { clientX, clientY } = event;
  switch (eventStatesController.currentBoardState) {
    case stateControllerNames.COMMON:
      // 判断是否需要悬停状态
      break;
    case stateControllerNames.HITTING:
      // 判断是否需要悬停状态
      break;
    case stateControllerNames.DRAGGING:
      // 更新坐标即可
      break;
    case stateControllerNames.HOVERING:
      // 判断是否需要悬停状态
      break;
    case stateControllerNames.CATCHING:
      // 开始拖拽
      break;
  }
}

/**
 *
 * @param {object} event
 */
function mouseDownHandler(event) {
  const { clientX, clientY } = event;
  // 判断当前点击的地方是否是已经选中的那个元素
  const res = judgeMouseOnWidget(
    clientX,
    clientY,
    eventStatesController.currentHittingWidget
  );
  if (res) return;

  res = judgeMouseOnWidget(
    clientX,
    clientY,
    eventStatesController.currentHoveringWidget
  );

  if (res) {
    // 去除之前选中的元素的选中状态
    // 更新此元素为选中的元素
    return;
  }

  // 遍历
}

/**
 *
 * @param {object} event
 */
function mouseUpHandler(event) {}

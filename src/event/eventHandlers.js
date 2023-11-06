import { judgeMouseOnWidget } from "../util/calculation.js";
import { stateControllerNames } from "../util/someConst.js";

/**
 * 浏览器鼠标移动事件函数
 * @param {object} event
 * @param {Board} board
 */
export function mouseMoveHandler(event, board) {
  const { clientX, clientY } = event;
  switch (board.currentBoardState) {
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
 * 浏览器鼠标按下事件处理器
 * @param {object} event
 * @param {Board} board
 */
export function mouseDownHandler(event, board) {
  const { clientX, clientY } = event;
  console.log("按下了");
}

/**
 * 浏览器鼠标抬起事件处理器
 * @param {object} event
 * @param {Board} board
 */
export function mouseUpHandler(event, board) {}

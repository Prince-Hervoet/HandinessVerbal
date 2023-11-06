import { Board } from "../board/board.js";
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
  switch (board.boardState) {
    // 如果是悬停状态，则变成抓取
    case stateControllerNames.HOVERING:
      board.boardState = stateControllerNames.CATCHING;
      break;
    // 如果是选中状态，则判断之前选中的是不是当前点击的这个
    case stateControllerNames.HITTING:
      board.boardState = stateControllerNames.CATCHING;
      break;
  }
}

/**
 * 浏览器鼠标抬起事件处理器
 * @param {object} event
 * @param {Board} board
 */
export function mouseUpHandler(event, board) {
  switch (board.boardState) {
    // 如果是拖拽状态，则变成选中
    case stateControllerNames.DRAGGING:
      board.boardState = stateControllerNames.HITTING;
      break;
    // 如果是抓取状态，则变成选中
    case stateControllerNames.CATCHING:
      board.boardState = stateControllerNames.HITTING;
      break;
  }
}

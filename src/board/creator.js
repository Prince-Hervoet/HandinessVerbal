import {
  mouseDownHandler,
  mouseMoveHandler,
  mouseUpHandler,
} from "../event/eventHandlers.js";
import { Board, BoardController } from "./board.js";

/**
 * 在给定的dom下创建canvas画布
 * @param {HTMLDivElement} containerDom
 * @param {object} attr
 * @returns
 */
export function createBoardController(containerDom, attr) {
  if (!containerDom) return;
  const canvasDomParentDom = document.createElement("div");
  canvasDomParentDom.setAttribute(
    "style",
    `position: relative; width: ${attr.width}px; height: ${attr.height}px;padding: 0; margin: 0;`
  );

  // 创建事件画布DOM
  const eventCanvasDom = document.createElement("canvas");
  eventCanvasDom.setAttribute("width", attr.width);
  eventCanvasDom.setAttribute("height", attr.height);
  eventCanvasDom.setAttribute("style", "position: absolute; left: 0; top: 0;");
  const eventCanvasContext = eventCanvasDom.getContext("2d");

  // 创建渲染画布DOM
  const renderCanvasDom = document.createElement("canvas");
  renderCanvasDom.setAttribute("width", attr.width);
  renderCanvasDom.setAttribute("height", attr.height);
  const renderCanvasContext = renderCanvasDom.getContext("2d");

  canvasDomParentDom.appendChild(renderCanvasDom);
  canvasDomParentDom.appendChild(eventCanvasDom);

  const eventBoard = new Board(eventCanvasDom, eventCanvasContext);
  const renderBoard = new Board(renderCanvasDom, renderCanvasContext);

  // 创建画板控制器
  const bc = new BoardController(eventBoard, renderBoard);

  // 绑定事件
  bindEventHandler(canvasDomParentDom, eventBoard);

  containerDom.appendChild(canvasDomParentDom);
  return bc;
}

/**
 * 绑定事件处理器
 * @param {HTMLDivElement} dom
 */
function bindEventHandler(dom, board) {
  dom.addEventListener("mousemove", (event) => {
    mouseMoveHandler(event, board);
  });

  dom.addEventListener("mousedown", (event) => {
    mouseDownHandler(event, board);
  });

  dom.addEventListener("mouseup", (event) => {
    mouseUpHandler(event, board);
  });
}

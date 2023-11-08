import { BoardController } from "./board/boardController.js";
import { ICanvasProps } from "./util/someTypes.js";

/**
 * 获取基础版canvas
 */
export function getVerbalCanvas(
  containerDom: HTMLDivElement,
  props: ICanvasProps
): BoardController | null {
  return null;
}

/**
 * 获取静态的canvas
 */
export function getStaticVerbalCanvas() {}

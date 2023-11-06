import { createBoardController } from "./board/creator.js";

export function getVerbal(containerDom, width, height) {
  return createBoardController(containerDom, { width, height });
}

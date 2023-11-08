import { BoardController } from "./board/boardController.js";
import { BoardEventController } from "./board/boardEventController.js";
import { Rect } from "./shape/rect.js";
import { ICanvasProps, IWidget } from "./util/someTypes.js";

class Verbal {
  private boardController: BoardController | null = null;
  private boardEventController: BoardEventController | null = null;

  constructor(
    containerDom: HTMLDivElement,
    renderCanvasDom: HTMLCanvasElement,
    eventCanvasDom: HTMLCanvasElement
  ) {
    this.boardController = new BoardController(
      containerDom,
      renderCanvasDom,
      eventCanvasDom
    );
    this.boardEventController = new BoardEventController(this.boardController);
  }

  place(widget: IWidget) {
    this.boardController!.place(widget);
  }

  remove(widget: IWidget) {
    this.boardController!.remove(widget);
  }

  rect(props: any): IWidget {
    return new Rect(props);
  }
}

/**
 * 获取基础版canvas
 */
export function getVerbalCanvas(
  containerDom: HTMLDivElement,
  props: ICanvasProps
): Verbal | null {
  if (!containerDom) return null;
  const { width, height } = props;
  const eventBoardDom = document.createElement("canvas");
  const renderBoardDom = document.createElement("canvas");
  eventBoardDom.setAttribute("width", width + "");
  eventBoardDom.setAttribute("height", height + "");
  renderBoardDom.setAttribute("width", width + "");
  renderBoardDom.setAttribute("height", height + "");

  containerDom.setAttribute(
    "style",
    `position: relative; height: ${height}px;`
  );
  eventBoardDom.setAttribute("style", `position: absolute; left: 0; top: 0;`);

  containerDom.appendChild(renderBoardDom);
  containerDom.appendChild(eventBoardDom);

  const verbal = new Verbal(containerDom, renderBoardDom, eventBoardDom);
  return verbal;
}

/**
 * 获取静态的canvas
 */
export function getStaticVerbalCanvas() {}

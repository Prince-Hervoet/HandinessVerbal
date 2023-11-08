import { BoardController } from "./board/boardController.js";
import { BoardEventController } from "./board/boardEventController.js";
import { Rect } from "./shape/rect.js";
class Verbal {
    constructor(containerDom, renderCanvasDom, eventCanvasDom) {
        this.boardController = null;
        this.boardEventController = null;
        this.boardController = new BoardController(containerDom, renderCanvasDom, eventCanvasDom);
        this.boardEventController = new BoardEventController(this.boardController);
    }
    place(widget) {
        this.boardController.place(widget);
    }
    remove(widget) {
        this.boardController.remove(widget);
    }
    rect(props) {
        return new Rect(props);
    }
}
/**
 * 获取基础版canvas
 */
export function getVerbalCanvas(containerDom, props) {
    if (!containerDom)
        return null;
    const { width, height } = props;
    const eventBoardDom = document.createElement("canvas");
    const renderBoardDom = document.createElement("canvas");
    eventBoardDom.setAttribute("width", width + "");
    eventBoardDom.setAttribute("height", height + "");
    renderBoardDom.setAttribute("width", width + "");
    renderBoardDom.setAttribute("height", height + "");
    containerDom.setAttribute("style", `position: relative; height: ${height}px;`);
    eventBoardDom.setAttribute("style", `position: absolute; left: 0; top: 0;`);
    containerDom.appendChild(renderBoardDom);
    containerDom.appendChild(eventBoardDom);
    const verbal = new Verbal(containerDom, renderBoardDom, eventBoardDom);
    return verbal;
}
/**
 * 获取静态的canvas
 */
export function getStaticVerbalCanvas() { }

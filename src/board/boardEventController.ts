import { IWidget } from "../util/someTypes.js";
import { BoardController } from "./boardController.js";

/**
 * 事件类型
 */
export const EventStateEnum = {
  COMMON: 1,
  HOVERING: 2,
  HITTING: 3,
  CATCHING: 4,
  DRAGGING: 5,
};

/**
 * 事件控制器 -- 接收浏览器各种事件
 */
export class BoardEventController {
  public boardController: BoardController | null = null;
  public eventState: number = 0; // 当前控制器的事件状态
  public hittingWidgets: IWidget[] = [];
  public hoveringWidget: IWidget | null = null;
  public catchingWidget: IWidget | null = null;
  public draggingWidget: IWidget | null = null;

  constructor(boardController: BoardController) {
    this.boardController = boardController;
    this.bindEvent();
  }

  private bindEvent() {
    const dom = this.boardController!.getContainerDom()!;
    dom.addEventListener("mousemove", (event) => {
      mouseMoveHandler(event, this);
    });
  }
}

/**
 * 鼠标按下函数
 * @param event
 * @param boardEventController
 */
function mouseMoveHandler(
  event: MouseEvent,
  boardEventController: BoardEventController
) {
  const { clientX, clientY } = event;
  //   console.log(clientX + " " + clientY);
}

import { Rect } from "../shape/rect.js";
import { IWidget } from "../util/someTypes.js";
import { BoardController } from "./boardController.js";

/**
 * 事件类型
 */
export const EventStateEnum = {
  COMMON: 1, // 普通状态
  HOVERING: 2, // 悬停状态
  HITTING: 3, // 选中状态
  CATCHING: 4, // 抓取状态
  DRAGGING: 5, // 拖拽状态
};

/**
 * 事件控制器 -- 接收浏览器各种事件
 */
export class BoardEventController {
  public boardController: BoardController | null = null;
  public eventState: number = EventStateEnum.COMMON; // 当前控制器的事件状态
  public hittingWidgets: IWidget[] = []; // 当前选中的部件 -- 可能多个
  public hoveringWidget: IWidget | null = null; // 当前悬停的部件 -- 只有一个
  public catchingWidget: IWidget[] = []; // 当前抓取的部件 -- 可能多个
  public draggingWidget: IWidget[] = []; // 当前拖拽的部件 -- 可能多个

  static hoveringFlagRect: IWidget = new Rect({}); // 悬停标识

  constructor(boardController: BoardController) {
    this.boardController = boardController;
    this.bindEvent();
  }

  /**
   * 对传入的dom进行事件绑定
   */
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
  switch (boardEventController.eventState) {
    case EventStateEnum.COMMON:
      mouseMoveCommonHandler(event, boardEventController);
      break;
    case EventStateEnum.HOVERING:
      mouseMoveHoveringHandler(event, boardEventController);
      break;
  }
}

function mouseMoveCommonHandler(
  event: MouseEvent,
  boardEventController: BoardEventController
) {
  const { clientX, clientY } = event;
  const boardController = boardEventController.boardController!;
  const widget = boardController.checkPositionOnRenderBoard(clientX, clientY);
  if (!widget) return;
  boardEventController.hoveringWidget = widget;
  boardEventController.eventState = EventStateEnum.HOVERING;
  // 画出悬停标识
  const hoveringFlag = BoardEventController.hoveringFlagRect;
  const nPosition = widget.getBoundingBoxPosition();
  hoveringFlag.update({
    x: nPosition.x,
    y: nPosition.y,
    width: nPosition.width,
    height: nPosition.height,
    style: { fillStyle: "rgba(0, 0, 255, 0.5)" },
  });
  boardController.placeEventBoard(hoveringFlag);
}

function mouseMoveHoveringHandler(
  event: MouseEvent,
  boardEventController: BoardEventController
) {
  const { clientX, clientY } = event;
  const boardController = boardEventController.boardController!;
  const widget = boardController.checkPositionOnRenderBoard(clientX, clientY);
  if (widget) {
    boardEventController.hoveringWidget = widget;
  } else {
    boardEventController.hoveringWidget = null;
    boardEventController.eventState = EventStateEnum.COMMON;
    boardController.removeFromEventBoard(BoardEventController.hoveringFlagRect);
  }
}

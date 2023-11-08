import { Rect } from "../shape/rect.js";
import { RectFrame } from "../shape/rectFrame.js";
import {
  boxSelectRectPositionCal,
  judgePositionInWidget,
} from "../util/calculate.js";
import { IWidget } from "../util/someTypes.js";
import { BoardController } from "./boardController.js";

const hoveringFlagRectStyle = { fillStyle: "rgba(0, 0, 255, 0.3)" };
const hittingFlagStyle = {
  strokeStyle: "blue",
  lineWidth: 3,
  shadowBlur: 6,
  shadowColor: "blue",
};
const boxSelectFlagRectStyle = { fillStyle: "rgba(0, 0, 245, 0.2)" };

/**
 * 事件类型
 */
export const EventStateEnum = {
  COMMON: 1, // 普通状态
  HOVERING: 2, // 悬停状态
  HITTING: 3, // 选中状态
  CATCHING: 4, // 抓取状态
  DRAGGING: 5, // 拖拽状态
  BOXSELECT: 6, // 框选状态
};

/**
 * 事件控制器 -- 接收浏览器各种事件
 */
export class BoardEventController {
  public boardController: BoardController | null = null;
  public eventState: number = EventStateEnum.COMMON; // 当前控制器的事件状态

  // =========================================================================
  public mouseDownPosition: number[] = [0, 0]; // 鼠标最后一次按下的坐标 [x, y]
  public mouseDownOffset: number[] = [0, 0]; // 鼠标在部件上按下的位置到部件左上角的偏移量 [x, y]
  //! =========================================================================

  // =========================================================================
  public hittingWidget: IWidget | null = null; // 当前选中的部件 -- 可能多个
  public hoveringWidget: IWidget | null = null; // 当前悬停的部件 -- 只有一个
  public catchingWidget: IWidget | null = null; // 当前抓取的部件 -- 可能多个
  public draggingWidget: IWidget | null = null; // 当前拖拽的部件 -- 可能多个
  //！ =========================================================================

  // =========================================================================
  static hoveringFlagRect: IWidget = new Rect({}); // 悬停标识
  static hittingFlagRectFrame: IWidget = new RectFrame({}); // 选中标识
  static boxSelectFlagRect: IWidget = new Rect({}); // 框选标识
  //! =========================================================================

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

    dom.addEventListener("mousedown", (event) => {
      mouseDownHandler(event, this);
    });

    dom.addEventListener("mouseup", (event) => {
      mouseUpHandler(event, this);
    });
  }
}

// =============================================================================
/**
 * 鼠标移动函数
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
    case EventStateEnum.BOXSELECT:
      mouseMoveBoxSelectHandler(event, boardEventController);
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
  const { x, y, width, height } = widget.getBoundingBoxPosition();
  hoveringFlag.update({
    x,
    y,
    width,
    height,
    style: hoveringFlagRectStyle,
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

function mouseMoveBoxSelectHandler(
  event: MouseEvent,
  boardEventController: BoardEventController
) {
  // 框选 + 移动 --> 拉出一个框选矩形
  const { clientX, clientY } = event;
  const boardController = boardEventController.boardController!;
  const mouseDownPos = boardEventController.mouseDownPosition!;
  const { x, y, width, height } = boxSelectRectPositionCal(
    clientX,
    clientY,
    mouseDownPos[0],
    mouseDownPos[1]
  );
  // 画出框选矩形
  BoardEventController.boxSelectFlagRect.update({
    x,
    y,
    width,
    height,
    style: boxSelectFlagRectStyle,
  });
  boardController.placeEventBoard(BoardEventController.boxSelectFlagRect);
}

function mouseMoveDraggingHandler(
  event: MouseEvent,
  boardEventController: BoardEventController
) {
  // 拖拽，当鼠标移动时，保持部件和鼠标的偏移量不变
  const { clientX, clientY } = event;
  const boardController = boardEventController.boardController!;
}

//! =============================================================================

// =============================================================================
/**
 * 鼠标按下函数
 * @param event
 * @param boardEventController
 */
function mouseDownHandler(
  event: MouseEvent,
  boardEventController: BoardEventController
) {
  switch (boardEventController.eventState) {
    case EventStateEnum.COMMON:
      mouseDownCommonHandler(event, boardEventController);
      break;
    case EventStateEnum.HOVERING:
      mouseDownHoveringHandler(event, boardEventController);
      break;
    case EventStateEnum.HITTING:
      mouseDownHittingHandler(event, boardEventController);
      break;
  }
}

function mouseDownCommonHandler(
  event: MouseEvent,
  boardEventController: BoardEventController
) {
  // 当前状态是普通，鼠标按下将变成框选
  // 记录鼠标最后一次按下的位置信息
  const { clientX, clientY } = event;
  boardEventController.mouseDownPosition = [clientX, clientY];
  boardEventController.eventState = EventStateEnum.BOXSELECT;
}

function mouseDownHoveringHandler(
  event: MouseEvent,
  boardEventController: BoardEventController
) {
  // 将当前悬停的部件变成抓取
  const boardController = boardEventController.boardController!;
  boardEventController.catchingWidget = boardEventController.hoveringWidget;
  boardEventController.hoveringWidget = null;
  boardEventController.eventState = EventStateEnum.CATCHING; // 控制器状态变成抓取
  // 去掉悬停标识，画出选中标识
  boardController.removeFromEventBoard(BoardEventController.hoveringFlagRect);
  const { x, y, width, height } =
    boardEventController.catchingWidget!.getBoundingBoxPosition();
  const hittingFlagRectFrame = BoardEventController.hittingFlagRectFrame;
  hittingFlagRectFrame.update({
    x,
    y,
    width,
    height,
    style: hittingFlagStyle,
  });
  boardController.placeEventBoard(BoardEventController.hittingFlagRectFrame);
}

function mouseDownHittingHandler(
  event: MouseEvent,
  boardEventController: BoardEventController
) {
  // 判断当前按下的地方是否是当前选中的部件，如果是则直接变成抓取
  // 如果按下了其他地方，则抓取新的部件或者变成普通
  const { clientX, clientY } = event;
  const boardController = boardEventController.boardController!;
  if (
    judgePositionInWidget(clientX, clientY, boardEventController.hittingWidget!)
  ) {
    boardEventController.catchingWidget = boardEventController.hittingWidget;
    boardEventController.hittingWidget = null;
    boardEventController.eventState = EventStateEnum.CATCHING;
  } else {
    // 如果不是按到当前选中的部件，则检查是否按到了其他部件
    const widget = boardController.checkPositionOnRenderBoard(clientX, clientY);
    if (widget) {
      // 如果按到了其他的部件，则将那个部件更新为当前抓取的
      boardEventController.catchingWidget = widget;
      boardEventController.hittingWidget = null;
      boardEventController.eventState = EventStateEnum.CATCHING;
    } else {
      // 如果没有按到任何部件，则变成框选
      boardEventController.hittingWidget = null;
      boardEventController.mouseDownPosition = [clientX, clientY];
      boardEventController.eventState = EventStateEnum.BOXSELECT;
    }
  }
}

//! =============================================================================

// =============================================================================
function mouseUpHandler(
  event: MouseEvent,
  boardEventController: BoardEventController
) {
  switch (boardEventController.eventState) {
    case EventStateEnum.COMMON:
      mouseUpCommonHandler(event, boardEventController);
      break;
    case EventStateEnum.HITTING:
      mouseUpHittingHandler(event, boardEventController);
      break;
    case EventStateEnum.CATCHING:
      mouseUpCatchingHandler(event, boardEventController);
      break;
    case EventStateEnum.BOXSELECT:
      mouseUpBoxSelectHandler(event, boardEventController);
      break;
  }
}

function mouseUpCommonHandler(
  event: MouseEvent,
  boardEventController: BoardEventController
) {
  // 将所有状态清除
  const boardController = boardEventController.boardController!;
  boardEventController.eventState = EventStateEnum.COMMON;
  boardEventController.catchingWidget = null;
  boardEventController.hoveringWidget = null;
  boardEventController.hittingWidget = null;
  boardEventController.draggingWidget = null;
  boardController.clearEventBoard();
}

function mouseUpHittingHandler(
  event: MouseEvent,
  boardEventController: BoardEventController
) {}

function mouseUpCatchingHandler(
  event: MouseEvent,
  boardEventController: BoardEventController
) {
  // 将抓取的部件变成选中
  boardEventController.hittingWidget = boardEventController.catchingWidget;
  boardEventController.catchingWidget = null;
  boardEventController.eventState = EventStateEnum.HITTING;
}

function mouseUpBoxSelectHandler(
  event: MouseEvent,
  boardEventController: BoardEventController
) {
  // 在框选状态下，鼠标放起将结束这个框选状态，清除框选框
  // todo：多选
  const { clientX, clientY } = event;
  const boardController = boardEventController.boardController!;
  boardEventController.eventState = EventStateEnum.COMMON;
  const widgets = boardController.checkRectOverlapOnRenderBoard(
    boxSelectRectPositionCal(
      clientX,
      clientY,
      boardEventController.mouseDownPosition[0],
      boardEventController.mouseDownPosition[1]
    )
  );
  boardEventController.mouseDownPosition = [];
  console.log(widgets);
  boardController.clearEventBoard();
}
//! =============================================================================

import { Rect } from "../shape/rect.js";
import { RectFrame } from "../shape/rectFrame.js";
import { WidgetGroup } from "../shape/widgetGroup.js";
import { boxSelectHittingFlagPosCal as boxSelectHittingPositionCal, boxSelectRectPositionCal, judgePositionInWidget, } from "../util/calculate.js";
const hoveringFlagRectStyle = { fillStyle: "rgba(0, 0, 255, 0.3)" };
const hittingFlagStyle = {
    strokeStyle: "blue",
    lineWidth: 1,
    shadowBlur: 6,
    shadowColor: "blue",
};
const boxSelectFlagRectStyle = { fillStyle: "rgba(0, 0, 245, 0.2)" };
/**
 * 事件类型
 */
export const EventStateEnum = {
    COMMON: 1,
    HOVERING: 2,
    HITTING: 3,
    CATCHING: 4,
    DRAGGING: 5,
    BOXSELECT: 6, // 框选状态
};
/**
 * 事件控制器 -- 接收浏览器各种事件
 */
export class BoardEventController {
    //! =========================================================================
    constructor(boardController) {
        this.boardController = null;
        this.eventState = EventStateEnum.COMMON; // 当前控制器的事件状态
        // =========================================================================
        this.mouseDownPosition = [0, 0]; // 鼠标最后一次按下的坐标 [x, y]
        this.mouseDownOffset = [0, 0]; // 鼠标在部件上按下的位置到部件左上角的偏移量 [x, y]
        //! =========================================================================
        // =========================================================================
        this.hittingWidget = null; // 当前选中的部件 -- 可能多个
        this.hoveringWidget = null; // 当前悬停的部件 -- 只有一个
        this.catchingWidget = null; // 当前抓取的部件 -- 可能多个
        this.draggingWidget = null; // 当前拖拽的部件 -- 可能多个
        this.boardController = boardController;
        this.bindEvent();
    }
    /**
     * 清除记录的部件
     */
    clearRemarkWidgets() {
        this.hittingWidget = null;
        this.hoveringWidget = null;
        this.catchingWidget = null;
        this.draggingWidget = null;
    }
    /**
     * 对传入的dom进行事件绑定
     */
    bindEvent() {
        const dom = this.boardController.getContainerDom();
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
//！ =========================================================================
// =========================================================================
BoardEventController.hoveringFlag = new Rect({ style: hoveringFlagRectStyle }); // 悬停标识
BoardEventController.hittingFlag = new RectFrame({
    style: hittingFlagStyle,
}); // 选中标识
BoardEventController.boxSelectFlagRect = new Rect({}); // 框选标识
// mouseMove
// =============================================================================
/**
 * 鼠标移动函数
 * @param event
 * @param boardEventController
 */
function mouseMoveHandler(event, boardEventController) {
    switch (boardEventController.eventState) {
        case EventStateEnum.COMMON:
            mouseMoveCommonHandler(event, boardEventController);
            break;
        case EventStateEnum.HOVERING:
            mouseMoveHoveringHandler(event, boardEventController);
            break;
        case EventStateEnum.HITTING:
            mouseMoveHittingHandler(event, boardEventController);
            break;
        case EventStateEnum.CATCHING:
            mouseMoveCatchingHandler(event, boardEventController);
            break;
        case EventStateEnum.DRAGGING:
            mouseMoveDraggingHandler(event, boardEventController);
            break;
        case EventStateEnum.BOXSELECT:
            mouseMoveBoxSelectHandler(event, boardEventController);
            break;
    }
}
function mouseMoveCommonHandler(event, boardEventController) {
    const { clientX, clientY } = event;
    const boardController = boardEventController.boardController;
    const widget = boardController.checkPositionOnRenderBoard(clientX, clientY);
    if (!widget)
        return;
    boardEventController.hoveringWidget = widget;
    boardEventController.eventState = EventStateEnum.HOVERING;
    // 画出悬停标识
    const hoveringFlag = BoardEventController.hoveringFlag;
    const { x, y, width, height } = widget.getBoundingBoxPosition();
    hoveringFlag.update({ x, y, width, height });
    boardController.placeEventBoard(hoveringFlag);
}
function mouseMoveHoveringHandler(event, boardEventController) {
    const { clientX, clientY } = event;
    const boardController = boardEventController.boardController;
    const widget = boardController.checkPositionOnRenderBoard(clientX, clientY);
    if (widget) {
        boardEventController.hoveringWidget = widget;
        const hoveringFlag = BoardEventController.hoveringFlag;
        const { x, y, width, height } = widget.getBoundingBoxPosition();
        hoveringFlag.update({ x, y, width, height });
        boardController.clearEventBoard();
        boardController.placeEventBoard(hoveringFlag);
    }
    else {
        boardEventController.hoveringWidget = null;
        boardEventController.eventState = EventStateEnum.COMMON;
        boardController.removeFromEventBoard(BoardEventController.hoveringFlag);
    }
}
function mouseMoveHittingHandler(event, boardEventController) {
    // 选中状态下鼠标移动，继续检测是否需要悬停
    const { clientX, clientY } = event;
}
function mouseMoveCatchingHandler(event, boardEventController) {
    // 在抓住状态下移动 --> 开始拖拽
    // 将部件从渲染层转移至事件层
    const { clientX, clientY } = event;
    const boardController = boardEventController.boardController;
    const target = boardEventController.catchingWidget;
    boardEventController.catchingWidget = null;
    boardEventController.draggingWidget = target;
    boardEventController.eventState = EventStateEnum.DRAGGING;
    const { x, y } = target.getBoundingBoxPosition();
    boardEventController.mouseDownOffset = [clientX - x, clientY - y];
    boardController.clearEventBoard();
    if (target.shapeName === "widgetGroup") {
        // 如果是部件组，则需要另外处理
        boardController.transferWidgetsToEventBoard(target.widgets);
    }
    else {
        boardController.transferToEventBoard(target);
    }
}
function mouseMoveBoxSelectHandler(event, boardEventController) {
    // 框选 + 移动 --> 拉出一个框选矩形
    const { clientX, clientY } = event;
    const boardController = boardEventController.boardController;
    const mouseDownPos = boardEventController.mouseDownPosition;
    const { x, y, width, height } = boxSelectRectPositionCal(clientX, clientY, mouseDownPos[0], mouseDownPos[1]);
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
function mouseMoveDraggingHandler(event, boardEventController) {
    // 拖拽，当鼠标移动时，保持部件和鼠标的偏移量不变
    const { clientX, clientY } = event;
    const boardController = boardEventController.boardController;
    const target = boardEventController.draggingWidget;
    target.update({
        x: clientX - boardEventController.mouseDownOffset[0],
        y: clientY - boardEventController.mouseDownOffset[1],
    });
    boardController.eventBoardRenderAll();
}
//! =============================================================================
// mouseDown
// =============================================================================
/**
 * 鼠标按下函数
 * @param event
 * @param boardEventController
 */
function mouseDownHandler(event, boardEventController) {
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
function mouseDownCommonHandler(event, boardEventController) {
    // 当前状态是普通，鼠标按下将变成框选
    // 记录鼠标最后一次按下的位置信息
    const { clientX, clientY } = event;
    boardEventController.mouseDownPosition = [clientX, clientY];
    boardEventController.eventState = EventStateEnum.BOXSELECT;
}
function mouseDownHoveringHandler(event, boardEventController) {
    // 将当前悬停的部件变成抓取
    const boardController = boardEventController.boardController;
    boardEventController.catchingWidget = boardEventController.hoveringWidget;
    boardEventController.hoveringWidget = null;
    boardEventController.eventState = EventStateEnum.CATCHING; // 控制器状态变成抓取
    // 去掉悬停标识，画出选中标识
    boardController.removeFromEventBoard(BoardEventController.hoveringFlag);
    const { x, y, width, height } = boardEventController.catchingWidget.getBoundingBoxPosition();
    const hittingFlag = BoardEventController.hittingFlag;
    hittingFlag.update({ x, y, width, height });
    boardController.placeEventBoard(BoardEventController.hittingFlag);
}
function mouseDownHittingHandler(event, boardEventController) {
    // 判断当前按下的地方是否是当前选中的部件，如果是则直接变成抓取
    // 如果按下了其他地方，则抓取新的部件或者变成普通
    const { clientX, clientY } = event;
    const boardController = boardEventController.boardController;
    if (judgePositionInWidget(clientX, clientY, boardEventController.hittingWidget)) {
        boardEventController.catchingWidget = boardEventController.hittingWidget;
        boardEventController.hittingWidget = null;
        boardEventController.eventState = EventStateEnum.CATCHING;
    }
    else {
        // 如果不是按到当前选中的部件，则检查是否按到了其他部件
        const widget = boardController.checkPositionOnRenderBoard(clientX, clientY);
        if (widget) {
            // 如果按到了其他的部件，则将那个部件更新为当前抓取的
            boardEventController.catchingWidget = widget;
            boardEventController.hittingWidget = null;
            boardEventController.eventState = EventStateEnum.CATCHING;
            boardController.clearEventBoard();
            const hittingFlag = BoardEventController.hittingFlag;
            const { x, y, width, height } = widget.getBoundingBoxPosition();
            hittingFlag.update({ x, y, width, height });
            boardController.placeEventBoard(hittingFlag);
        }
        else {
            // 如果没有按到任何部件，则变成框选
            boardEventController.hittingWidget = null;
            boardEventController.mouseDownPosition = [clientX, clientY];
            boardEventController.eventState = EventStateEnum.BOXSELECT;
        }
    }
}
//! =============================================================================
// mouseUp
// =============================================================================
function mouseUpHandler(event, boardEventController) {
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
        case EventStateEnum.DRAGGING:
            mouseUpDraggingHandler(event, boardEventController);
            break;
        case EventStateEnum.BOXSELECT:
            mouseUpBoxSelectHandler(event, boardEventController);
            break;
    }
}
function mouseUpCommonHandler(event, boardEventController) {
    // 将所有状态清除
    const boardController = boardEventController.boardController;
    boardEventController.eventState = EventStateEnum.COMMON;
    boardEventController.clearRemarkWidgets();
    boardController.clearEventBoard();
}
function mouseUpHittingHandler(event, boardEventController) { }
function mouseUpCatchingHandler(event, boardEventController) {
    // 将抓取的部件变成选中
    boardEventController.hittingWidget = boardEventController.catchingWidget;
    boardEventController.catchingWidget = null;
    boardEventController.eventState = EventStateEnum.HITTING;
}
function mouseUpDraggingHandler(event, boardEventController) {
    // 拖拽完放开鼠标，要将部件从事件层转移到渲染层上
    const { clientX, clientY } = event;
    const boardController = boardEventController.boardController;
    const target = boardEventController.draggingWidget;
    boardEventController.draggingWidget = null;
    boardEventController.eventState = EventStateEnum.HITTING;
    boardEventController.hittingWidget = target;
    if (target.shapeName === "widgetGroup") {
        boardController.transferWidgetsToRenderBoard(target.widgets);
    }
    else {
        boardController.transferToRenderBoard(target);
    }
    const hittingFlag = BoardEventController.hittingFlag;
    const { x, y, width, height } = target.getBoundingBoxPosition();
    hittingFlag.update({ x, y, width, height });
    boardController.placeEventBoard(hittingFlag);
}
function mouseUpBoxSelectHandler(event, boardEventController) {
    // 在框选状态下，鼠标放起将结束这个框选状态，清除框选框
    // todo：多选
    const { clientX, clientY } = event;
    const boardController = boardEventController.boardController;
    // 检测框选矩形和渲染层上的部件是否有重叠，返回一个数组
    const widgets = boardController.checkRectOverlapOnRenderBoard(boxSelectRectPositionCal(clientX, clientY, boardEventController.mouseDownPosition[0], boardEventController.mouseDownPosition[1]));
    boardEventController.mouseDownPosition = [];
    boardController.clearEventBoard();
    if (widgets.length === 0) {
        // 如果没有框选到任何东西，直接变成普通状态，并清空事件层
        boardEventController.eventState = EventStateEnum.COMMON;
    }
    else if (widgets.length === 1) {
        // 如果框选到一个部件，则变成一个部件的选中情况
        // 画出新的选中框
        boardEventController.hittingWidget = widgets[0];
        boardEventController.eventState = EventStateEnum.HITTING;
        const hittingFlag = BoardEventController.hittingFlag;
        const { x, y, width, height } = widgets[0].getBoundingBoxPosition();
        hittingFlag.update({ x, y, width, height });
        boardController.placeEventBoard(hittingFlag);
    }
    else if (widgets.length > 1) {
        // 如果框选到不止一个部件，就生成widgetGroup
        // widgetGroup 不需要放置到渲染层上，只需要临时记录即可
        boardEventController.eventState = EventStateEnum.HITTING;
        const { x, y, width, height } = boxSelectHittingPositionCal(widgets);
        const widgetGroup = new WidgetGroup({
            x,
            y,
            width,
            height,
            widgets,
        });
        boardEventController.hittingWidget = widgetGroup;
        const hittingFlag = BoardEventController.hittingFlag;
        hittingFlag.update({ x, y, width, height });
        boardController.placeEventBoard(hittingFlag);
    }
}
//! =============================================================================

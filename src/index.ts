import { initCanvas } from "./core/initCanvas";
import { HoveringFlag } from "./widget/hoveringFlag";

const dom = document.getElementById("app")!;
const canvas = initCanvas(dom, 1000, 1000);
const rect = canvas.rectangle({
  x: 100,
  y: 200,
  width: 200,
  height: 200,
  style: { fill: "red" },
});

const rect2 = canvas.rectangle({
  x: 500,
  y: 200,
  width: 200,
  height: 200,
  style: { fill: "blue" },
});

const hoveringTest = new HoveringFlag({
  x: 100,
  y: 200,
  width: 200,
  height: 200,
});

canvas.place(rect, rect2);

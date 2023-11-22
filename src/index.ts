import { initCanvas } from "./core/initCanvas";
import { HittingFlag } from "./widget/hittingFlag";
import { HoveringFlag } from "./widget/hoveringFlag";

const dom = document.getElementById("app")!;
const canvas = initCanvas(dom, 1000, 1000);
const rect = canvas.rectangle({
  x: 100,
  y: 200,
  width: 200,
  height: 200,

  style: { fill: "red", roughness: 1, seed: 1, fillStyle: "solid" },
});

const rect2 = canvas.rectangle({
  x: 500,
  y: 200,
  width: 200,
  height: 200,
  style: { fill: "blue", seed: 1, fillStyle: "hachure" },
});

const hoveringTest = new HoveringFlag({
  x: 100,
  y: 200,
  width: 200,
  height: 200,
});

const hittingTest = new HittingFlag({
  x: 100,
  y: 200,
  width: 200,
  height: 200,
});

canvas.place(rect, rect2);
console.log(rect);

// rect.update({ x: 200, y: 200 });

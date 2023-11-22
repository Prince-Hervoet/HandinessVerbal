import { initCanvas } from "./core/initCanvas";
import { CanvasImage } from "./widget/canvasImage";
import { Ellipse } from "./widget/ellipse";
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

const imgTest = new CanvasImage({
  x: 300,
  y: 300,
  width: 500,
  height: 300,
  src: "https://t7.baidu.com/it/u=963301259,1982396977&fm=193&f=GIF",
});

const ellTest = new Ellipse({
  x: 500,
  y: 300,
  width: 500,
  height: 300,
  style: { fill: "green", seed: 4, fillStyle: "hachure" },
});

canvas.place(rect);
console.log(rect);

// rect.update({ x: 200, y: 200 });

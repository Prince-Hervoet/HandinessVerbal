import { initCanvas } from "./core/initCanvas";
import { CanvasImage } from "./widget/canvasImage";
import { Ellipse } from "./widget/ellipse";
import { UtilTransformer } from "./widget/utilWidgets/utilTransformer";
import { HoveringFlag } from "./widget/utilWidgets/hoveringFlag";
import { Triangle } from "./widget/triangle";
import { Rhombus } from "./widget/rhombus";
import { Line } from "./widget/line";

const dom = document.getElementById("app")!;
const canvas = initCanvas(dom, 4000, 2000, { "background-color": "#eee" });
const rect = canvas.rectangle({
  x: 100,
  y: 200,
  width: 400,
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

const hittingTest = new UtilTransformer({
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
  width: 400,
  height: 100,
  style: { fill: "blue", seed: 4, fillStyle: "solid" },
});

const triangle = new Triangle({
  x: 400,
  y: 600,
  width: 200,
  height: 300,
  style: { fill: "green", seed: 4, fillStyle: "solid" },
});

const rhoTest = new Rhombus({
  x: 400,
  y: 800,
  width: 200,
  height: 300,
  style: { fill: "orange", seed: 4, fillStyle: "solid" },
});

const lineTest = new Line({
  x1: 300,
  y1: 300,
  x2: 600,
  y2: 300,
});

const ans: any[] = [];
for (let i = 0; i < 2; i++) {
  const rect = canvas.rectangle({
    x: 100,
    y: 200,
    width: 200,
    height: 200,
    style: { fill: "red", roughness: 1, seed: 1, fillStyle: "solid" },
  });
  ans.push(rect);
}

canvas.place(...ans, imgTest, ellTest, triangle, rhoTest, lineTest);
setTimeout(() => {
  canvas.remove(...ans);

  console.log(canvas.size());
}, 2000);

// canvas.place(rect);
// console.log(rect.stringify());

// rect.update({ x: 200, y: 200 });

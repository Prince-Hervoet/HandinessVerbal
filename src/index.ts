import { initCanvas } from "./core/initCanvas";

const dom = document.getElementById("app")!;
const canvas = initCanvas(dom, 1000, 1000);
const rect = canvas.rectangle({
  x: 100,
  y: 200,
  width: 200,
  height: 200,
  style: { fill: "red" },
});
console.log(rect);

canvas.place(rect);

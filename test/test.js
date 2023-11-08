import { getVerbalCanvas } from "../dist/index.js";

const dom = document.getElementById("gogogo");

const verbal = getVerbalCanvas(dom, { width: 1000, height: 500 });
const rectWidget = verbal.rect({
  x: 100,
  y: 100,
  width: 200,
  height: 200,
  style: { fillStyle: "red" },
});
console.log(rectWidget);
verbal.place(rectWidget);

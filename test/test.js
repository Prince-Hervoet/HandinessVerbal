import { getVerbalCanvas } from "../dist/index.js";

const dom = document.getElementById("gogogo");

const verbal = getVerbalCanvas(dom, { width: 1500, height: 1200 });
// const cb = verbal.controlBox({
//   x: 100,
//   y: 100,
//   width: 150,
//   height: 150,
//   style: { fillStyle: "blue", strokeStyle: "blue" },
// });
// verbal.place(cb);

const rectWidget = verbal.rect({
  x: 100,
  y: 100,
  width: 150,
  height: 150,
  style: { fillStyle: "red" },
});
verbal.place(rectWidget);

const rectWidget2 = verbal.rect({
  x: 300,
  y: 300,
  width: 100,
  height: 100,
  style: { fillStyle: "green" },
});
verbal.place(rectWidget2);

// const rectWidget3 = verbal.rect({
//   x: 400,
//   y: 400,
//   width: 100,
//   height: 100,
//   style: { fillStyle: "green" },
// });
// verbal.place(rectWidget3);

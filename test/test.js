import { getVerbal } from "../src/index.js";

const dom = document.getElementById("gogogo");

const bc = getVerbal(dom, 1000, 500);
bc.createRectangle(100, 100, 300, 300, { fillStyle: "green" });

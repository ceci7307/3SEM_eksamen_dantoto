"use strict";

window.addEventListener("DOMContentLoaded", init);
let txt = document.querySelector(".write").textContent;
let counter;
let speed = 100;

console.log(txt);

function init() {
  document.querySelector(".write").textContent = " ";
  document.querySelector(".igen").onclick = function() {
    location.href = "index.html";
  };
  document.querySelector(".dantoto").onclick = function() {
    location.href =
      "https://danskespil.dk/dantoto?utm_source=google&utm_medium=cpc&utm_campaign=dli_dan_ppc_brand";
  };
  counter = 0;
  loop();
}

function loop() {
  console.log("loop");
  const part = txt.slice(0, counter);
  document.querySelector(".write").textContent = part;
  counter++;
  setTimeout(loop, speed);
}

import { drawSmiley } from './smiley.js';

function load() {
  const ctx = document.getElementById('canvas')?.getContext('2d');

  drawSmiley(ctx);

  const soapbox = document.getElementById('soapbox');
  soapbox.innerHTML = `The canvas is ${ctx.canvas.width} by ${ctx.canvas.height} pixels wide.`;
}

window.addEventListener('DOMContentLoaded', load);

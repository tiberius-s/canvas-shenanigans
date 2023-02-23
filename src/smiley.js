export function drawSmiley(ctx) {
  const centerX = ctx.canvas.width / 2;
  const centerY = ctx.canvas.height / 2;
  const radius = 100;
  const mouthOffset = 80;

  // head
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.fillStyle = 'yellow';
  ctx.fill();
  ctx.stroke();

  // mouth
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius - 20, 0, Math.PI);
  ctx.moveTo(centerX - mouthOffset, centerY);
  ctx.quadraticCurveTo(centerX, centerY + 30, centerX + 80, centerY);
  ctx.fillStyle = 'red';
  ctx.fill();
  ctx.stroke();

  // left eye
  ctx.beginPath();
  ctx.arc(centerX - 25, centerY - 25, 5, 0, Math.PI * 2);
  ctx.fillStyle = 'black';
  ctx.fill();

  // right eye
  ctx.beginPath();
  ctx.arc(centerX + 25, centerY - 25, 5, 0, Math.PI * 2);
  ctx.fill();
}

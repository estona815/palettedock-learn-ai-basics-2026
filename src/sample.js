export function drawSample(canvas) {
  const ctx = canvas.getContext('2d');
  const { width: w, height: h } = canvas;
  ctx.fillStyle = '#E9D8B4'; ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = '#E5A969'; ctx.beginPath(); ctx.arc(520, 110, 63, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#789190'; ctx.beginPath(); ctx.moveTo(0, 295); ctx.lineTo(175, 100); ctx.lineTo(390, 310); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#3F6473'; ctx.beginPath(); ctx.moveTo(160, 330); ctx.lineTo(410, 135); ctx.lineTo(720, 350); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#BCC9AE'; ctx.beginPath(); ctx.moveTo(0, 345); ctx.quadraticCurveTo(340, 245, 720, 360); ctx.lineTo(720, 440); ctx.lineTo(0, 440); ctx.fill();
  ctx.fillStyle = '#314A48'; ctx.beginPath(); ctx.moveTo(0, 405); ctx.quadraticCurveTo(300, 300, 720, 385); ctx.lineTo(720, 440); ctx.lineTo(0, 440); ctx.fill();
  ctx.fillStyle = '#D9C296'; ctx.beginPath(); ctx.moveTo(335, 440); ctx.quadraticCurveTo(400, 360, 440, 345); ctx.quadraticCurveTo(450, 400, 500, 440); ctx.fill();
}

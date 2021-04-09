function drawFractal(x1, y1, h, angle) {
  console.log("Draw fractal");
  const canvas = document.getElementById('drawArea');
  const ctx = canvas.getContext("2d");

  let z = 2;
  let xc = x1;
  let yc = y1;
  let xa = 0;
  let ya = 0;
  do {
    const x2 = Math.abs(xa);
    const y2 = Math.abs(ya);
    const xn = x2 - y2 - xc;
    ya = xa * ya;
    ya = ya + ya - yc;
    xa = xn;
    z = z - 0.05;
    if (z < 0) {
      break;
    }
    if ((x2 + y2)> 400) {
      break;
    }
  } while (true)

  angle=angle*Math.PI/180;
  const si=Math.sin(angle);
  const co=Math.cos(angle);

  fillBackground(ctx, canvas.width, canvas.height);
  drawClouds(ctx);
  drawLine(ctx,0, 98, 320, 98, getColor(2), 1);

  // draw fractal
  for (let v = 1; v <= 600; v += 2) {
    const e = h / v * 10;
    let ca = 0;
    let za = 0;
    for (let h0 = -160; h0 <= 160; h0++) {
      let fa = 1;
      z = 2;
      const hc = e * h0 * 0.00935;
      xa = 0;
      ya = 0;
      xc = x1 + hc * co + e * si;
      yc = y1 - hc * si + e * co;
      do {
        const x2 = Math.abs(xa);
        const y2 = Math.abs(ya);
        const xn = x2 - y2 - xc;
        ya = xa * ya;
        ya = ya + ya - yc;
        xa = xn;
        z = z - 0.05;
        if (z < 0) {
          break;
        }
        if (x2 + y2 > 400) {
          break;
        }
      } while (true)

      if (h0 > -160) {
        z = za * 0.7 + z * 0.3;
      }
      if (z < 0) {
        fa = 0;
        z = -0.0001;
      }
      let c = z - h;
      c = c * v / h;
      za = z;

      // do something
      if (Math.abs(c) > 102) {
        c = 102 * Math.sign(c);
      }
      const m1 = 161 + h0;
      const m0 = 160 + h0;
      const d8 = 98 - c;
      const d9 = 99 - c;
      drawLine(ctx, m1, 200, m1, d8, getColor(2), 1);
      drawLine(ctx, m0, 200, m0, d9, getColor(3), 1);

      if (c < 0) {
        drawPixel(ctx, m0, d9, getColor(fa));
      }
      if (c > ca + 0.5) {
        drawLine(ctx, m0, 99 - ca, m0, d9, getColor(0), 1);
      }
      drawPixel(ctx, m0, d8, getColor(fa));
      // end of do something
      ca = c;
    }
  }
  console.log("Finished fractal");
}

function getColor(idx) {
  switch (idx) {
    case 0:
      return "#00aaaa";
    case 1:
      return "#00aa00";
    case 2:
      return "#aa0000";
    case 3:
      return "#aa5500";
    default:
      return "#ffffff";
  }
}

function drawClouds(ctx) {
  for (let i = 8; i <= 192; i += 4) {
    let j = Math.pow(i / 192, 6.6);
    j = j * 90;
    let br = Math.random() + 0.7;
    br = br * i * .1;
    let as = Math.random() * Math.random() * 520 - 100;
    let hr = br * (2 - Math.random() * 0.8) * 2;
    for (let h0 = -br; h0 <= br; h0++) {
      let xb = h0 + as;
      if (Math.abs(xb - 160) > 160) {
        continue;
      }
      let c1 = br * br - h0 * h0;
      c1 = c1 / hr;
      if (c1 + j > 90) {
        c1 = 90 - j;
      }
      let yb = c1 * j * 0.006;
      let yc = 90 - j;

      drawLine(ctx, xb, yc - c1, xb, yc + yb, "#aa0000", 1);
      drawPixel(ctx, xb, yc - yb, "#00aaaa")
    }
  }
}

function fillBackground(ctx, width, height) {
  ctx.fillStyle = "#00aaaa";
  ctx.fillRect(0, 0, width, height);
}

function drawLine(ctx, x1, y1, x2, y2, color, width) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.stroke();
}

/* function drawLine(ctx, x1, y1, x2, y2, color, width) {
  ctx.beginPath();
  ctx.moveTo(Math.round(x1) + 0.5, Math.round(y1) + 0.5);
  ctx.lineTo(Math.round(x2) + 0.5, Math.round(y2) + 0.5);
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.stroke();
} */

function drawPixel(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, 1, 1 );
}

/* function drawPixel(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(Math.round(x) + 0.5, Math.round(y) + 0.5, 1, 1 );
} */
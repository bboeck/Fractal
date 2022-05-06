function drawFractal(x1, y1, h, angle, scaleFactor) {
  console.log(`Draw fractal ${x1} ${y1} ${h} ${angle} ${scaleFactor} ` );
  const canvas = document.getElementById('drawArea');
  const ctx = canvas.getContext("2d");

  // Original CGA resolution.
  const width = 320
  const height = 200

  let xa = 0;
  let ya = 0;

  angle=angle*Math.PI/180;
  const si=Math.sin(angle);
  const co=Math.cos(angle);

  fillBackground(ctx, width, height, scaleFactor);
  drawClouds(ctx, width, height, scaleFactor);
  drawLine(ctx,0, height / 2 - 1, width, height / 2 - 1, getColor(2), scaleFactor);

  // draw fractal
  for (let v = 1; v <= 200; v += 2) {
    const e = h / v * 10;
    let ca = 0.0;
    let za = 0.0;
    for (let h0 = -width / 2; h0 <= width / 2; h0++) {
      let fa = 1;
      let z = 2.0;
      const hc = e * h0 * 0.00935;
      xa = 0;
      ya = 0;
      let xc = x1 + hc * co + e * si;
      let yc = y1 - hc * si + e * co;
      do {
        const x2 = Math.abs(xa);
        const y2 = Math.abs(ya);
        const xn = x2 - y2 - xc;
        ya = xa * ya;
        ya = ya + ya - yc;
        xa = xn;
        z = z - 0.035;
        if (z < 0) {
          break;
        }
        if (x2 + y2 > 400) {
          break;
        }
      } while (true)

      if (h0 > -width / 2) {
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
      if (Math.abs(c) > height / 2 + 2) {
        c = (height / 2 + 2) * Math.sign(c);
      }
      const m1 = width / 2 + 1 + h0;
      const m0 = width / 2 + h0;
      const d8 = height / 2 - 2 - c;
      const d9 = height / 2 - 1 - c;
      drawLine(ctx, m1, height, m1, d8, getColor(2), scaleFactor);
      drawLine(ctx, m0, height, m0, d9, getColor(3), scaleFactor);

      if (c < 0) {
        drawPixel(ctx, m0, d9, getColor(fa), scaleFactor);
      }
      if (c > ca + 0.5) {
        drawLine(ctx, m0, height / 2 - 1 - ca, m0, d9, getColor(0), scaleFactor);
      }
      drawPixel(ctx, m0, d8, getColor(fa), scaleFactor);
      // end of do something
      ca = c;
    }
  }

  console.log("Finished fractal");
}

function getColor(idx) {
  switch (idx) {
    case 0:
      return "#00aaaaff";
    case 1:
      return "#00aa00ff";
    case 2:
      return "#aa0000ff";
    case 3:
      return "#aa5500ff";
    default:
      return "#ffffffff";
  }
}

function drawClouds(ctx, width, height, scaleFactor) {
    for (let i = 8; i <= (height / 2 - 8); i += 4) {
    let j = Math.pow(i / (height / 2 - 8), 6.6);
    j = j * (height / 2 * 0.9);
    let br = Math.random() + 0.7;
    br = br * i * .1;
    let as = Math.random() * (width + height) - 100;
    let hr = br * (2 - Math.random() * 0.8) * 2;
    for (let h0 = -br; h0 <= br; h0++) {
      let xb = h0 + as;
      if (Math.abs(xb - (width / 2)) > (width / 2)) {
        continue;
      }
      let c1 = br * br - h0 * h0;
      c1 = c1 / hr;
      if (c1 + j > (height / 2 * 0.9)) {
        c1 = (height / 2 * 0.9) - j;
      }
      let yb = c1 * j * 0.006;
      let yc = (height / 2 * 0.9) - j;

      drawLine(ctx, xb, yc - c1, xb, yc + yb, getColor(3), scaleFactor);
      drawPixel(ctx, xb, yc - yb, getColor(0), scaleFactor)
    }
  }
}

function fillBackground(ctx, width, height, scaleFactor) {
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      drawPixel(ctx, x, y, getColor(0), scaleFactor)
    }
  }
}

function drawLine(ctx, rawx1, rawy1, rawx2, rawy2, color, scaleFactor) {
  const x1 = Math.round(rawx1 * scaleFactor)
  const x2 = Math.round(rawx2 * scaleFactor)
  const y1 = Math.round(rawy1 * scaleFactor)
  const y2 = Math.round(rawy2 * scaleFactor)
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2+scaleFactor);
  ctx.strokeStyle = color;
  ctx.lineWidth = scaleFactor;
  ctx.stroke();
}

function drawPixel(ctx, rawx, rawy, color, scaleFactor) {
  const x = Math.round(rawx)
  const y = Math.round(rawy)
  ctx.fillStyle = color;
  ctx.fillRect(x * scaleFactor, y * scaleFactor, scaleFactor, scaleFactor);
}
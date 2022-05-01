function drawFractal(x1, y1, h, angle) {
  console.log("Draw fractal");
  const canvas = document.getElementById('drawArea');
  const context = canvas.getContext("2d");
  const drawCtx = context.createImageData(320, 200);

  let xc = x1;
  let yc = y1;
  let xa = 0;
  let ya = 0;

  angle=angle*Math.PI/180;
  const si=Math.sin(angle);
  const co=Math.cos(angle);

  fillBackground(drawCtx, canvas.width, canvas.height);
  drawClouds(drawCtx);
  drawLine(drawCtx,0, 98, 320, 98, getColor(2));

  // draw fractal
  for (let v = 1; v <= 600; v += 2) {
    const e = h / v * 10;
    let ca = 0.0;
    let za = 0.0;
    for (let h0 = -160; h0 <= 160; h0++) {
      let fa = 1;
      let z = 2.0;
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
        z = z - 0.035;
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
      drawLine(drawCtx, m1, 200, m1, d8, getColor(2));
      drawLine(drawCtx, m0, 200, m0, d9, getColor(3));

      if (c < 0) {
        drawPixel(drawCtx, m0, d9, getColor(fa));
      }
      if (c > ca + 0.5) {
        drawLine(drawCtx, m0, 99 - ca, m0, d9, getColor(0));
      }
      drawPixel(drawCtx, m0, d8, getColor(fa));
      // end of do something
      ca = c;
    }
  }

  context.putImageData(drawCtx, 0, 0)
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

      drawLine(ctx, xb, yc - c1, xb, yc + yb, getColor(3));
      drawPixel(ctx, xb, yc - yb, getColor(0))
    }
  }
}

function fillBackground(ctx, width, height) {
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      drawPixel(ctx, x, y, getColor(0))
    }
  }
}

function drawLine(ctx, rawx1, rawy1, rawx2, rawy2, color) {
  const x1 = Math.round(rawx1)
  const x2 = Math.round(rawx2)
  const y1 = Math.round(rawy1)
  const y2 = Math.round(rawy2)

  if ( x1 === x2) {
    // vertical line
    for (let y = Math.min(y1,y2); y <= Math.max(y1,y2); y++) {
      drawPixel(ctx, x1, y, color)
    }
  } else {
    // horizontal line
    for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
      drawPixel(ctx, x, y1, color)
    }
  }
}

function drawPixel(ctx, rawx, rawy, color) {
  const x = Math.round(rawx)
  const y = Math.round(rawy)

  ctx.data[x*4 + 320*4*y + 0] = parseInt(color.substring(1,3), 16)
  ctx.data[x*4 + 320*4*y + 1] = parseInt(color.substring(3,5), 16)
  ctx.data[x*4 + 320*4*y + 2] = parseInt(color.substring(5,7), 16)
  ctx.data[x*4 + 320*4*y + 3] = 255
}
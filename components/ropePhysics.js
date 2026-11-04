// Fisika tali (Verlet) + nametag yang menggantung di ujungnya.
// Tidak ada gaya penarik ke titik tertentu: hanya gravitasi, tali, dan tangan pengguna.
export const SEGMENTS = 14;

export function createRope({ ax, ay, len, stick, W, drop = true, rnd = Math.random }) {
  const pts = [];
  const seg = len / SEGMENTS;
  for (let i = 0; i <= SEGMENTS; i++) {
    const x = drop ? ax + rnd() * 6 - 3 : ax;
    const y = drop ? ay + i * 0.5 : ay + i * seg;
    pts.push({ x, y, ox: x, oy: y, inv: i === 0 ? 0 : 1 });
  }
  const a = pts[SEGMENTS];
  a.inv = 0.35;
  let bx, by;
  if (drop) {
    // nametag mulai terbalik di atas layar, lalu terjun dan terbalik sendiri saat tali menegang
    a.x = a.ox = ax + 14; a.y = a.oy = ay + 4;
    bx = a.x + (rnd() * 2 - 1) * 40; by = a.y - stick * 0.97;
  } else { bx = a.x; by = a.y + stick; }
  pts.push({ x: bx, y: by, ox: bx, oy: by, inv: 0.35 });
  const vx = drop ? (rnd() * 2 - 1) * 5 : 0;
  pts.forEach((p, i) => { if (i && drop) p.ox -= vx; });
  return { pts, seg, stick, ax, ay, W };
}

export function stepRope(r, dt, bounds, grab) {
  const { pts, seg, stick } = r;
  const n = SEGMENTS, g = 2300 * dt * dt, damp = 0.9945;
  for (let i = 1; i < pts.length; i++) {
    const p = pts[i];
    const vx = (p.x - p.ox) * damp, vy = (p.y - p.oy) * damp;
    p.ox = p.x; p.oy = p.y;
    p.x += vx; p.y += vy + g;
  }
  if (grab) {                         // tangan: geser kartu menuju pointer, kecepatan tercipta natural
    const A = pts[n], B = pts[n + 1];
    const c = Math.cos(grab.a), s = Math.sin(grab.a);
    const gx = A.x + (grab.lx * c - grab.ly * s), gy = A.y + (grab.lx * s + grab.ly * c);
    const dx = (grab.tx - gx) * 0.35, dy = (grab.ty - gy) * 0.35;
    A.x += dx; A.y += dy; B.x += dx; B.y += dy;
  }
  for (let it = 0; it < 14; it++) {
    for (let i = 0; i < n; i++) {                  // tali: hanya menahan saat meregang, boleh kendur
      const a = pts[i], b = pts[i + 1];
      const dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) || 1e-6;
      if (d <= seg) continue;
      const w = a.inv + b.inv, k = ((d - seg) / d) * 0.62 / w;
      a.x += dx * k * a.inv; a.y += dy * k * a.inv;
      b.x -= dx * k * b.inv; b.y -= dy * k * b.inv;
    }
    const A = pts[n], B = pts[n + 1];               // kartu: kaku
    const dx = B.x - A.x, dy = B.y - A.y, d = Math.hypot(dx, dy) || 1e-6;
    const k = ((d - stick) / d) / (A.inv + B.inv);
    A.x += dx * k * A.inv; A.y += dy * k * A.inv;
    B.x -= dx * k * B.inv; B.y -= dy * k * B.inv;
    for (let i = n; i <= n + 1; i++) {              // tepi layar
      const p = pts[i];
      if (p.x < bounds.l) p.x = bounds.l; else if (p.x > bounds.r) p.x = bounds.r;
      if (p.y > bounds.b) { const v = p.y - p.oy; p.y = bounds.b; p.oy = p.y + v * 0.3; }
    }
  }
}

export function badgePose(r) {
  const A = r.pts[SEGMENTS], B = r.pts[SEGMENTS + 1];
  const dx = B.x - A.x, dy = B.y - A.y;
  return { x: A.x, y: A.y, a: Math.atan2(-dx, dy) };
}

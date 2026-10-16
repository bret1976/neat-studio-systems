import sharp from "sharp";
import { readdir, writeFile } from "node:fs/promises";
const dir = "output/reference/full-rate";
const files = (await readdir(dir)).filter((n) => n.endsWith(".jpg")).sort();
const rows = [];
const colors = new Map();
let previous;
for (let i = 0; i < files.length; i++) {
  const raw = await sharp(`${dir}/${files[i]}`)
    .resize(192, 96, { fit: "fill" })
    .removeAlpha()
    .raw()
    .toBuffer();
  let red = 0,
    rx = 0,
    ry = 0,
    mad = 0;
  for (let p = 0; p < raw.length; p += 3) {
    const r = raw[p],
      g = raw[p + 1],
      b = raw[p + 2];
    if (previous)
      mad +=
        (Math.abs(r - previous[p]) +
          Math.abs(g - previous[p + 1]) +
          Math.abs(b - previous[p + 2])) /
        3;
    if (r > 155 && g < 140 && b < 105 && r > g * 1.5) {
      const x = (p / 3) % 192,
        y = Math.floor(p / 3 / 192);
      red++;
      rx += x;
      ry += y;
      const k = [r >> 3, g >> 3, b >> 3].join(",");
      colors.set(k, (colors.get(k) || 0) + 1);
    }
  }
  rows.push({
    frame: i + 1,
    time: Number((i / 60).toFixed(4)),
    redPixels: red,
    redX: red ? Number((rx / red / 192).toFixed(4)) : null,
    redY: red ? Number((ry / red / 96).toFixed(4)) : null,
    motion: previous ? Number((mad / (192 * 96)).toFixed(4)) : 0,
  });
  previous = raw;
}
const peaks = [];
for (let t = 0; t < 85; t += 5) {
  const r = rows
    .filter((r) => r.time >= t && r.time < t + 5)
    .sort((a, b) => b.motion - a.motion)[0];
  if (r) peaks.push(r);
}
const dominant = [...colors]
  .sort((a, b) => b[1] - a[1])
  .slice(0, 8)
  .map(([color, count]) => ({
    rgb: color.split(",").map((x) => Number(x) * 8 + 4),
    count,
  }));
await writeFile(
  "output/reference/full-rate-analysis.json",
  JSON.stringify({ fps: 60, frames: files.length, dominant, peaks, rows }),
);
console.log(JSON.stringify({ frames: files.length, dominant, peaks }));

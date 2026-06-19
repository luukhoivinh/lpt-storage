import * as THREE from "https://unpkg.com/three@0.160.1/build/three.module.js";

export const bgCanvas = document.createElement("canvas");
const bgCtx = bgCanvas.getContext("2d");
export const bgTexture = new THREE.CanvasTexture(bgCanvas);
bgTexture.minFilter = THREE.LinearFilter;
bgTexture.magFilter = THREE.LinearFilter;

export function drawBackground(renderer) {
  const w = renderer.domElement.width;
  const h = renderer.domElement.height;
  bgCanvas.width = w;
  bgCanvas.height = h;

  /* Gradient background */
  const grd = bgCtx.createLinearGradient(0, 0, w * 0.6, h);
  grd.addColorStop(0, "#e8dbc8");
  grd.addColorStop(0.35, "#5b8cdb");
  grd.addColorStop(0.6, "#2d6fd4");
  grd.addColorStop(1, "#1a3fa0");
  bgCtx.fillStyle = grd;
  bgCtx.fillRect(0, 0, w, h);

  /* Decorative colour waves */
  bgCtx.save();
  bgCtx.globalAlpha = 0.35;
  for (let i = 0; i < 5; i++) {
    const cx = w * (0.2 + i * 0.18);
    const cy = h * (0.3 + Math.sin(i * 1.3) * 0.25);
    const rg = bgCtx.createRadialGradient(cx, cy, 0, cx, cy, w * 0.35);
    const hue = 200 + i * 25;
    rg.addColorStop(0, `hsla(${hue}, 80%, 65%, 0.6)`);
    rg.addColorStop(1, `hsla(${hue}, 60%, 40%, 0)`);
    bgCtx.fillStyle = rg;
    bgCtx.fillRect(0, 0, w, h);
  }
  bgCtx.restore();

  /* Main title */
  bgCtx.fillStyle = "#ffffff";
  bgCtx.textAlign = "center";
  bgCtx.textBaseline = "middle";

  const titleSize = Math.round(w * 0.13);
  bgCtx.font = `700 ${titleSize}px 'Space Grotesk', sans-serif`;
  bgCtx.fillText("Liquid", w * 0.5, h * 0.38);
  bgCtx.fillText("Glass", w * 0.5, h * 0.38 + titleSize * 1.05);

  /* Subtitle */
  const subSize = Math.round(w * 0.022);
  bgCtx.font = `500 ${subSize}px 'Space Grotesk', sans-serif`;
  bgCtx.globalAlpha = 0.55;
  bgCtx.fillText("Metaball Refraction Demo", w * 0.5, h * 0.38 + titleSize * 2.3);
  bgCtx.globalAlpha = 1;

  /* Scattered small text */
  const words = ["physics", "refraction", "merge", "split", "surface tension", "metaball", "IOR", "glass", "droplet"];
  bgCtx.globalAlpha = 0.08;
  const scatterSize = Math.round(w * 0.018);
  bgCtx.font = `500 ${scatterSize}px 'Space Grotesk', sans-serif`;
  for (let i = 0; i < words.length; i++) {
    bgCtx.fillText(
      words[i],
      w * (0.12 + (i % 4) * 0.25),
      h * (0.08 + Math.floor(i / 4) * 0.35 + (i % 3) * 0.12)
    );
  }
  bgCtx.globalAlpha = 1;

  bgTexture.needsUpdate = true;
}
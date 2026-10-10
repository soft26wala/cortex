import * as THREE from "three";

/**
 * Generates procedural canvas textures for Three.js materials
 * without relying on external image files.
 */
export function createProceduralTexture(
  type: "none" | "checker" | "grid" | "dots" | "noise" | "stripes",
  primaryColor: string = "#ffffff",
  secondaryColor: string = "#1e293b"
): THREE.CanvasTexture | null {
  if (type === "none") return null;

  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Background fill
  ctx.fillStyle = secondaryColor;
  ctx.fillRect(0, 0, 512, 512);

  if (type === "checker") {
    const size = 64;
    ctx.fillStyle = primaryColor;
    for (let y = 0; y < 512; y += size) {
      for (let x = 0; x < 512; x += size) {
        if ((x / size + y / size) % 2 === 0) {
          ctx.fillRect(x, y, size, size);
        }
      }
    }
  } else if (type === "grid") {
    ctx.strokeStyle = primaryColor;
    ctx.lineWidth = 8;
    const step = 64;
    for (let i = 0; i <= 512; i += step) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 512);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(512, i);
      ctx.stroke();
    }
  } else if (type === "dots") {
    ctx.fillStyle = primaryColor;
    const radius = 14;
    const step = 64;
    for (let y = step / 2; y < 512; y += step) {
      for (let x = step / 2; x < 512; x += step) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  } else if (type === "stripes") {
    ctx.fillStyle = primaryColor;
    const stripeWidth = 32;
    for (let i = -512; i < 1024; i += stripeWidth * 2) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + 512, 512);
      ctx.lineTo(i + 512 + stripeWidth, 512);
      ctx.lineTo(i + stripeWidth, 0);
      ctx.closePath();
      ctx.fill();
    }
  } else if (type === "noise") {
    const imgData = ctx.getImageData(0, 0, 512, 512);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      const val = Math.floor(Math.random() * 255);
      data[i] = val;
      data[i + 1] = val;
      data[i + 2] = val;
      data[i + 3] = 255;
    }
    ctx.putImageData(imgData, 0, 0);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 1);
  texture.needsUpdate = true;
  return texture;
}

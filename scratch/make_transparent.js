const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const decorDir = path.join(__dirname, '../../public/decor');
if (!fs.existsSync(decorDir)) {
  fs.mkdirSync(decorDir, { recursive: true });
}

async function removeWhiteBg(inputPath, outputPath, threshold = 238) {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  // channels should be 4 (RGBA)

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Check if pixel is close to white
    if (r >= threshold && g >= threshold && b >= threshold) {
      // Linear falloff for edge smoothing
      const minVal = Math.min(r, g, b);
      if (minVal > 250) {
        data[i + 3] = 0; // completely transparent
      } else {
        const factor = (255 - minVal) / (255 - threshold);
        data[i + 3] = Math.round(255 * factor);
      }
    }
  }

  await sharp(data, {
    raw: {
      width,
      height,
      channels: 4,
    }
  })
  .png()
  .toFile(outputPath);

  console.log(`Saved transparent PNG to ${outputPath}`);
}

async function run() {
  const brigadeiroSrc = 'C:/Users/eduar/.gemini/antigravity-ide/brain/d05b9b5f-59eb-413b-99a2-2d411b409d6a/floating_brigadeiro_1790044851888.jpg';
  const strawberrySrc = 'C:/Users/eduar/.gemini/antigravity-ide/brain/d05b9b5f-59eb-413b-99a2-2d411b409d6a/floating_strawberry_1790044870091.jpg';

  await removeWhiteBg(brigadeiroSrc, path.join(decorDir, 'brigadeiro.png'), 235);
  await removeWhiteBg(strawberrySrc, path.join(decorDir, 'morango.png'), 235);
}

run().catch(console.error);

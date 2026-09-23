const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '../public/decorations');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function convertToTransparentWebp(inputPath, outputFileName, threshold = 238, resize = 280) {
  const { data, info } = await sharp(inputPath)
    .resize(resize, resize, { fit: 'inside' })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    if (r >= threshold && g >= threshold && b >= threshold) {
      const minVal = Math.min(r, g, b);
      if (minVal > 250) {
        data[i + 3] = 0;
      } else {
        const factor = (255 - minVal) / (255 - threshold);
        data[i + 3] = Math.round(255 * factor);
      }
    }
  }

  const outputPath = path.join(outputDir, outputFileName);
  await sharp(data, {
    raw: {
      width,
      height,
      channels: 4,
    }
  })
  .webp({ quality: 90, alphaQuality: 100, lossless: false })
  .toFile(outputPath);

  console.log(`Saved transparent WebP: ${outputFileName}`);
}

async function main() {
  const brigadeiroSrc = 'C:/Users/eduar/.gemini/antigravity-ide/brain/d05b9b5f-59eb-413b-99a2-2d411b409d6a/floating_brigadeiro_1790044851888.jpg';
  const strawberrySrc = 'C:/Users/eduar/.gemini/antigravity-ide/brain/d05b9b5f-59eb-413b-99a2-2d411b409d6a/floating_strawberry_1790044870091.jpg';
  const mintLeafSrc = 'C:/Users/eduar/.gemini/antigravity-ide/brain/d05b9b5f-59eb-413b-99a2-2d411b409d6a/decor_mint_leaf_1790045239902.jpg';
  const macaronSrc = 'C:/Users/eduar/.gemini/antigravity-ide/brain/d05b9b5f-59eb-413b-99a2-2d411b409d6a/decor_macaron_1790045262596.jpg';
  const raspberrySrc = 'C:/Users/eduar/.gemini/antigravity-ide/brain/d05b9b5f-59eb-413b-99a2-2d411b409d6a/decor_raspberry_1790045287063.jpg';

  await convertToTransparentWebp(brigadeiroSrc, 'brigadeiro.webp', 235);
  await convertToTransparentWebp(strawberrySrc, 'strawberry.webp', 235);
  await convertToTransparentWebp(mintLeafSrc, 'leaf-01.webp', 235);
  await convertToTransparentWebp(macaronSrc, 'macaron.webp', 235);
  await convertToTransparentWebp(raspberrySrc, 'raspberry.webp', 235);
}

main().catch(console.error);

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'images');
const favicons = [
    'favicon blue.png',
    'favicon digit.png',
    'favicon fiduc.png'
];

async function resizeFavicon(filename) {
    const inputPath = path.join(imagesDir, filename);
    
    if (!fs.existsSync(inputPath)) {
        console.log(`⚠ ${filename} non trouvé`);
        return;
    }
    
    try {
        const metadata = await sharp(inputPath).metadata();
        console.log(`${filename}: ${metadata.width}x${metadata.height} pixels (avant)`);
        
        const tempPath = path.join(imagesDir, filename + '.tmp');
        
        // Redimensionner à 8x8 pixels
        await sharp(inputPath)
            .resize(8, 8, {
                kernel: sharp.kernel.lanczos3,
                fit: 'contain',
                background: { r: 0, g: 0, b: 0, alpha: 0 }
            })
            .toFile(tempPath);
        
        // Remplacer l'original
        fs.unlinkSync(inputPath);
        fs.renameSync(tempPath, inputPath);
        
        console.log(`✓ ${filename} redimensionné à 8x8 pixels`);
    } catch (error) {
        console.error(`Erreur avec ${filename}:`, error.message);
    }
}

async function main() {
    console.log('Redimensionnement des favicons à 8x8 pixels...\n');
    
    for (const favicon of favicons) {
        await resizeFavicon(favicon);
    }
    
    console.log('\n✓ Terminé !');
}

main().catch(console.error);

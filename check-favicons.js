const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'images');
const favicons = [
    'favicon blue.png',
    'favicon digit.png',
    'favicon fiduc.png'
];

async function checkAndResizeFavicon(filename) {
    const inputPath = path.join(imagesDir, filename);
    
    if (!fs.existsSync(inputPath)) {
        console.log(`⚠ ${filename} non trouvé`);
        return;
    }
    
    try {
        const metadata = await sharp(inputPath).metadata();
        console.log(`${filename}: ${metadata.width}x${metadata.height} pixels`);
        
        // Si ce n'est pas 33x33, créer une version 33x33
        if (metadata.width !== 33 || metadata.height !== 33) {
            const outputPath = path.join(imagesDir, filename);
            const tempPath = path.join(imagesDir, filename + '.tmp');
            
            await sharp(inputPath)
                .resize(33, 33, {
                    kernel: sharp.kernel.lanczos3,
                    fit: 'contain',
                    background: { r: 0, g: 0, b: 0, alpha: 0 }
                })
                .toFile(tempPath);
            
            fs.unlinkSync(inputPath);
            fs.renameSync(tempPath, outputPath);
            
            console.log(`✓ ${filename} redimensionné à 33x33 pixels`);
        } else {
            console.log(`✓ ${filename} est déjà en 33x33 pixels`);
        }
    } catch (error) {
        console.error(`Erreur avec ${filename}:`, error.message);
    }
}

async function main() {
    console.log('Vérification et redimensionnement des favicons à 33x33 pixels...\n');
    
    for (const favicon of favicons) {
        await checkAndResizeFavicon(favicon);
    }
    
    console.log('\n✓ Terminé !');
}

main().catch(console.error);

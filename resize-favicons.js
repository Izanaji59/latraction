const fs = require('fs');
const path = require('path');

// Vérifier si sharp est disponible, sinon utiliser une méthode alternative
let sharp;
try {
    sharp = require('sharp');
} catch (e) {
    console.log('Sharp n\'est pas installé. Installation...');
    console.log('Veuillez exécuter: npm install sharp');
    process.exit(1);
}

const imagesDir = path.join(__dirname, 'images');
const favicons = [
    'favicon blue.png',
    'favicon digit.png',
    'favicon fiduc.png'
];

async function resizeFavicon(filename) {
    const inputPath = path.join(imagesDir, filename);
    const tempPath = path.join(imagesDir, filename + '.tmp');
    
    try {
        // Lire l'image actuelle
        const metadata = await sharp(inputPath).metadata();
        console.log(`${filename}: ${metadata.width}x${metadata.height} pixels`);
        
        // Doubler la taille
        const newWidth = metadata.width * 2;
        const newHeight = metadata.height * 2;
        
        // Redimensionner et sauvegarder dans un fichier temporaire
        await sharp(inputPath)
            .resize(newWidth, newHeight, {
                kernel: sharp.kernel.lanczos3
            })
            .toFile(tempPath);
        
        // Remplacer l'original par le redimensionné
        fs.unlinkSync(inputPath);
        fs.renameSync(tempPath, inputPath);
        
        console.log(`✓ ${filename} redimensionné à ${newWidth}x${newHeight} pixels`);
    } catch (error) {
        console.error(`Erreur lors du redimensionnement de ${filename}:`, error.message);
        // Nettoyer le fichier temporaire en cas d'erreur
        if (fs.existsSync(tempPath)) {
            fs.unlinkSync(tempPath);
        }
    }
}

async function main() {
    console.log('Redimensionnement des favicons (x2)...\n');
    
    for (const favicon of favicons) {
        const filePath = path.join(imagesDir, favicon);
        if (fs.existsSync(filePath)) {
            await resizeFavicon(favicon);
        } else {
            console.log(`⚠ ${favicon} non trouvé`);
        }
    }
    
    console.log('\n✓ Redimensionnement terminé !');
}

main().catch(console.error);

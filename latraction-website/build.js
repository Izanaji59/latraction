/**
 * Script de build pour générer les pages statiques
 * Utilise config.json et les templates pour créer toutes les pages
 */

const fs = require('fs-extra');
const path = require('path');

const CONFIG_FILE = path.join(__dirname, 'config.json');
const TEMPLATE_DIR = path.join(__dirname, 'templates');
const DIST_DIR = path.join(__dirname, 'dist');
const PAGES_DIR = path.join(__dirname, 'pages');

// Charger la configuration
function loadConfig() {
    return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
}

// Remplacer les placeholders dans un template
function replacePlaceholders(template, data) {
    let result = template;
    for (const [key, value] of Object.entries(data)) {
        const regex = new RegExp(`{{${key}}}`, 'g');
        result = result.replace(regex, value || '');
    }
    return result;
}

// Générer une page depuis un template
function generatePage(templatePath, outputPath, data) {
    const template = fs.readFileSync(templatePath, 'utf8');
    const content = replacePlaceholders(template, data);
    fs.ensureDirSync(path.dirname(outputPath));
    fs.writeFileSync(outputPath, content, 'utf8');
    console.log(`✓ Généré: ${outputPath}`);
}

// Copier les fichiers statiques
function copyStaticFiles() {
    const staticFiles = [
        { src: 'styles.css', dest: 'styles.css' },
        { src: 'script.js', dest: 'script.js' },
        { src: 'images', dest: 'images' },
        { src: 'js', dest: 'js' }
    ];

    staticFiles.forEach(({ src, dest }) => {
        const srcPath = path.join(__dirname, src);
        const destPath = path.join(DIST_DIR, dest);
        
        if (fs.existsSync(srcPath)) {
            if (fs.statSync(srcPath).isDirectory()) {
                fs.copySync(srcPath, destPath);
            } else {
                fs.copySync(srcPath, destPath);
            }
            console.log(`✓ Copié: ${src} → ${dest}`);
        }
    });
}

// Générer toutes les pages
function buildPages() {
    const config = loadConfig();
    const templatePath = path.join(TEMPLATE_DIR, 'page-template.html');
    
    // Copier index.html principal
    const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
    fs.writeFileSync(path.join(DIST_DIR, 'index.html'), indexHtml);
    console.log('✓ Copié: index.html');
    
    // Générer les autres pages depuis la navigation
    config.navigation.forEach((navItem, index) => {
        if (navItem.href !== '/') {
            const slug = navItem.href.replace('/', '');
            const pageData = {
                PAGE_TITLE: navItem.label,
                PAGE_DESCRIPTION: `${navItem.label} - LATRACTION`,
                PAGE_CONTENT: `<section class="container" style="padding: 80px 0;">
                    <h1>${navItem.label}</h1>
                    <p>Contenu de la page ${navItem.label}</p>
                </section>`
            };
            
            const outputPath = path.join(DIST_DIR, slug, 'index.html');
            generatePage(templatePath, outputPath, pageData);
        }
    });
}

// Fonction principale de build
function build() {
    console.log('🚀 Démarrage du build...\n');
    
    // Nettoyer le dossier dist
    if (fs.existsSync(DIST_DIR)) {
        fs.removeSync(DIST_DIR);
    }
    fs.ensureDirSync(DIST_DIR);
    
    // Copier les fichiers statiques
    copyStaticFiles();
    
    // Générer les pages
    buildPages();
    
    // Copier config.json pour l'API
    fs.copySync(CONFIG_FILE, path.join(DIST_DIR, 'config.json'));
    
    console.log('\n✅ Build terminé avec succès!');
    console.log(`📦 Fichiers générés dans: ${DIST_DIR}`);
}

// Exécuter le build
if (require.main === module) {
    build();
}

module.exports = { build };







Write-Host "====================================" -ForegroundColor Cyan
Write-Host "Serveur LATRACTION" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Le site sera accessible sur : http://localhost:8000" -ForegroundColor Green
Write-Host ""
Write-Host "Appuyez sur Ctrl+C pour arreter le serveur" -ForegroundColor Yellow
Write-Host ""

# Vérifier si Python est installé
try {
    python -m http.server 8000
} catch {
    Write-Host "Python n'est pas installe. Tentative avec Node.js..." -ForegroundColor Yellow
    try {
        npx http-server -p 8000
    } catch {
        Write-Host "Erreur : Aucun serveur HTTP trouve." -ForegroundColor Red
        Write-Host "Installez Python ou Node.js pour continuer." -ForegroundColor Red
        pause
    }
}


Write-Host "Serveur LATRACTION" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Le site sera accessible sur : http://localhost:8000" -ForegroundColor Green
Write-Host ""
Write-Host "Appuyez sur Ctrl+C pour arreter le serveur" -ForegroundColor Yellow
Write-Host ""

# Vérifier si Python est installé
try {
    python -m http.server 8000
} catch {
    Write-Host "Python n'est pas installe. Tentative avec Node.js..." -ForegroundColor Yellow
    try {
        npx http-server -p 8000
    } catch {
        Write-Host "Erreur : Aucun serveur HTTP trouve." -ForegroundColor Red
        Write-Host "Installez Python ou Node.js pour continuer." -ForegroundColor Red
        pause
    }
}




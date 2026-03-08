# Déploiement Netlify - LATRACTION

## ✅ Modifications effectuées

### 1. Formulaires Netlify Forms
- ✅ Ajout de l'attribut `netlify` sur tous les formulaires (5 pages)
- ✅ Modification de `script.js` pour utiliser Netlify Forms au lieu de PHP

### 2. Configuration Netlify
- ✅ Création de `netlify.toml` pour la configuration du déploiement
- ✅ Création de `_redirects` pour le routing SPA

## 📋 Instructions de déploiement

### Option 1 : Déploiement via Git (Recommandé)

1. **Initialiser Git** (si pas déjà fait) :
   ```bash
   git init
   git add .
   git commit -m "Préparation déploiement Netlify"
   ```

2. **Créer un dépôt GitHub/GitLab/Bitbucket**

3. **Connecter à Netlify** :
   - Allez sur [netlify.com](https://netlify.com)
   - Cliquez sur "New site from Git"
   - Connectez votre dépôt
   - Netlify détectera automatiquement la configuration

### Option 2 : Déploiement manuel (Drag & Drop)

1. **Aller sur Netlify** :
   - Allez sur [app.netlify.com](https://app.netlify.com)
   - Cliquez sur "Add new site" > "Deploy manually"

2. **Glisser-déposer le dossier** :
   - Glissez le dossier `latraction-website` dans la zone de déploiement
   - Netlify déploiera automatiquement

## 🔧 Configuration des formulaires

### Accéder aux soumissions

1. **Dashboard Netlify** :
   - Allez sur votre site dans Netlify
   - Cliquez sur "Forms" dans le menu
   - Toutes les soumissions seront listées

2. **Notifications email** :
   - Allez dans "Forms" > "Form notifications"
   - Ajoutez votre email pour recevoir les notifications

3. **Webhooks** (optionnel) :
   - Configurez un webhook pour envoyer les données à une base de données externe
   - Documentation : https://docs.netlify.com/forms/setup/#webhooks

## 📝 Fichiers modifiés

### HTML (5 fichiers)
- `nettoyage-professionnel/index.html` - Ajout `netlify` au formulaire
- `services-digitaux/index.html` - Ajout `netlify` au formulaire
- `services-digitaux/music/index.html` - Ajout `netlify` au formulaire
- `services-digitaux/graphismes/index.html` - Ajout `netlify` au formulaire
- `fiduciaire/index.html` - Ajout `netlify` au formulaire

### JavaScript
- `script.js` - Modification pour utiliser Netlify Forms (lignes 79-102)

### Configuration Netlify
- `netlify.toml` - Configuration du déploiement (nouveau fichier)
- `_redirects` - Redirections pour le routing SPA (nouveau fichier)

## ⚠️ Notes importantes

1. **PHP non supporté** :
   - Le fichier `submit_form.php` ne fonctionnera pas sur Netlify
   - Il peut être supprimé ou conservé pour référence locale

2. **Limite gratuite Netlify Forms** :
   - 100 soumissions/mois en version gratuite
   - Au-delà, nécessite un plan payant

3. **Base de données externe** :
   - Si vous avez besoin d'une base de données, utilisez Netlify Functions
   - Voir : https://docs.netlify.com/functions/overview/

## 🧪 Test local

Pour tester les formulaires localement avant le déploiement :

```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Lancer le serveur de développement
netlify dev
```

## 📚 Ressources

- [Documentation Netlify Forms](https://docs.netlify.com/forms/setup/)
- [Netlify Functions](https://docs.netlify.com/functions/overview/)
- [Configuration netlify.toml](https://docs.netlify.com/configure-builds/file-based-configuration/)






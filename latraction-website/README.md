<<<<<<< Current (Your changes)
# Site Web LATRACTION - Nettoyage Professionnel

Site web professionnel pour LATRACTION, société de nettoyage professionnel polyvalente et écoresponsable.

## 🏗️ Architecture

Ce site utilise une architecture hybride permettant de :
- ✅ Gérer le contenu via **GitHub** (structure, design, nouvelles pages)
- ✅ Synchroniser avec une **base de données** (contenu dynamique, formulaires)
- ✅ Déployer automatiquement sur **GitHub Pages** ou votre serveur

## 📁 Structure du projet

```
latraction-website/
├── config.json              # ⚙️ Configuration centralisée
├── index.html               # Page d'accueil
├── styles.css               # Styles globaux
├── script.js                # Scripts principaux
├── submit_form.php          # API formulaire de contact
├── package.json             # Configuration Node.js
├── build.js                 # Script de build
├── images/                  # Images et assets
│   ├── testing123-removebg-preview.png
│   ├── cursor.svg
│   └── cursor-hover.svg
├── js/                      # Scripts modulaires
│   ├── config.js            # Configuration JS
│   └── navigation.js         # Navigation dynamique
├── templates/               # Templates pour nouvelles pages
│   └── page-template.html
├── api/                     # API PHP
│   └── config.php           # API de configuration
├── database/                 # Schémas SQL
│   └── schema.sql           # Structure de la DB
├── .github/
│   └── workflows/
│       └── deploy.yml       # Déploiement automatique
└── DEPLOY.md                # 📖 Guide complet de déploiement
```

## 🚀 Démarrage rapide

### 1. Installation

```bash
# Cloner le repository
git clone https://github.com/votre-username/latraction-website.git
cd latraction-website

# Installer les dépendances
npm install
```

### 2. Configuration

Éditez `config.json` avec vos informations :
```json
{
  "site": {
    "name": "LATRACTION",
    "url": "https://latraction.net"
  },
  "contact": {
    "phone": "07 58 45 59 64",
    "email": "contact@latraction.fr",
    "zone": "Lille/Nord"
  }
}
```

### 3. Build local (optionnel)

```bash
npm run build
# Les fichiers générés seront dans dist/
```

### 4. Déploiement

Voir le guide complet dans **[DEPLOY.md](DEPLOY.md)**

## 📝 Ajouter une nouvelle page

### Méthode simple (via config.json)

1. Éditez `config.json` :
```json
{
  "navigation": [
    ...
    {
      "label": "Nouvelle Page",
      "href": "/nouvelle-page",
      "id": "nouvelle-page"
    }
  ]
}
```

2. Créez le contenu dans `pages/nouvelle-page.html`

3. Build et push :
```bash
npm run build
git add .
git commit -m "Ajout nouvelle page"
git push
```

## 🗄️ Base de données (optionnel)

### Installation

```bash
mysql -u root -p < database/schema.sql
```

### Configuration

Éditez `config.json` :
```json
{
  "database": {
    "host": "votre-serveur.com",
    "name": "latraction_db",
    "user": "votre_user",
    "password": "votre_password"
  }
}
```

### Tables disponibles

- **pages** : Gestion des pages du site
- **prestations** : Catalogue des prestations
- **contacts** : Soumissions de formulaires
- **tarifs** : Gestion des tarifs

## 🔄 Workflow GitHub ↔ Base de données

### Modifications de contenu
→ **Base de données** (via admin panel ou SQL)

### Modifications de structure
→ **GitHub** (config.json, templates, CSS)

### Nouvelles pages
→ **Les deux** :
- DB pour le contenu dynamique
- GitHub pour la structure HTML/CSS

## 🎨 Personnalisation

### Couleurs

Modifiez dans `styles.css` (section `:root`) :
```css
:root {
    --primary-color: #2563eb;    /* Bleu principal */
    --secondary-color: #10b981;  /* Vert */
    --accent-color: #f59e0b;     /* Orange */
}
```

### Contact

Toutes les informations de contact sont centralisées dans `config.json` et se mettent à jour automatiquement.

## 📱 Responsive Design

Le site est entièrement responsive et s'adapte à :
- 📱 Smartphones
- 📱 Tablettes
- 💻 Ordinateurs de bureau

## 🔧 Technologies utilisées

- **HTML5** : Structure sémantique
- **CSS3** : Variables CSS, Flexbox, Grid
- **JavaScript** : ES6+, Intersection Observer
- **PHP** : API backend (optionnel)
- **MySQL** : Base de données (optionnel)
- **Node.js** : Build system
- **GitHub Actions** : CI/CD

## 📚 Documentation

- **[DEPLOY.md](DEPLOY.md)** : Guide complet de déploiement
- **config.json** : Configuration centralisée
- **database/schema.sql** : Structure de la base de données

## 🐛 Dépannage

### Le site ne se met pas à jour
1. Vérifiez les Actions GitHub (onglet Actions)
2. Vérifiez que le workflow s'est exécuté sans erreur
3. Attendez quelques minutes (cache)

### Erreur de build
```bash
npm run build
# Vérifiez les erreurs dans la console
```

### Problème de base de données
1. Vérifiez les credentials dans `config.json`
2. Vérifiez que la base existe
3. Vérifiez les permissions utilisateur

## 🎯 Prochaines étapes

- [ ] Configurer GitHub Pages
- [ ] Créer la base de données (si nécessaire)
- [ ] Personnaliser les couleurs/branding
- [ ] Ajouter vos images
- [ ] Tester le formulaire de contact
- [ ] Configurer le domaine latraction.net

## 📞 Support

Pour toute question :
- 📧 Email : contact@latraction.fr
- 🐛 Issues : Créer une issue sur GitHub
- 📖 Documentation : Voir [DEPLOY.md](DEPLOY.md)

---

**Dernière mise à jour :** 2025  
**Version :** 2.0.0 (Architecture GitHub + DB)
=======
>>>>>>> Incoming (Background Agent changes)

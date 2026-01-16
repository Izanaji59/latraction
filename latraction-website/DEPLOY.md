# Guide de Déploiement - LATRACTION

## 🚀 Déploiement sur GitHub Pages

### Prérequis
1. Compte GitHub
2. Repository GitHub créé
3. Node.js installé (pour le build)

### Étapes de déploiement

#### 1. Configuration initiale

```bash
# Cloner le repository
git clone https://github.com/votre-username/latraction-website.git
cd latraction-website

# Installer les dépendances
npm install
```

#### 2. Configuration GitHub Pages

1. Allez dans **Settings** > **Pages** de votre repository
2. Source: **GitHub Actions**
3. Le workflow `.github/workflows/deploy.yml` sera utilisé automatiquement

#### 3. Build local (optionnel)

```bash
# Générer les pages statiques
npm run build

# Les fichiers seront dans le dossier dist/
```

#### 4. Push vers GitHub

```bash
# Ajouter tous les fichiers
git add .

# Commit
git commit -m "Initial commit - Site LATRACTION"

# Push vers main
git push origin main
```

Le workflow GitHub Actions va automatiquement:
- Builder le site
- Déployer sur GitHub Pages
- Mettre à jour latraction.net (si configuré)

---

## 📝 Ajouter une nouvelle page

### Méthode 1: Via config.json (recommandé)

1. Éditez `config.json`:
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

3. Build et push:
```bash
npm run build
git add .
git commit -m "Ajout nouvelle page"
git push
```

### Méthode 2: Via base de données

1. Ajoutez la page dans la table `pages` de votre base de données
2. L'API `/api/config.php` récupérera automatiquement les nouvelles pages
3. La navigation sera mise à jour dynamiquement

---

## 🗄️ Configuration de la base de données

### 1. Créer la base de données

```bash
mysql -u root -p < database/schema.sql
```

### 2. Configurer config.json

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

### 3. Synchronisation GitHub ↔ Base de données

**Workflow recommandé:**

1. **Modifications de contenu** → Base de données (via admin panel)
2. **Modifications de structure** → GitHub (config.json, templates)
3. **Nouvelles pages** → Les deux (DB pour contenu, GitHub pour structure)

---

## 🔄 Workflow de développement

### Branches recommandées:
- `main` → Production (déploie automatiquement)
- `develop` → Développement
- `feature/*` → Nouvelles fonctionnalités

### Processus:

```bash
# 1. Créer une branche
git checkout -b feature/nouvelle-fonctionnalite

# 2. Faire les modifications
# ... éditer les fichiers ...

# 3. Tester localement
npm run build
# Ouvrir dist/index.html dans le navigateur

# 4. Commit et push
git add .
git commit -m "Description des modifications"
git push origin feature/nouvelle-fonctionnalite

# 5. Créer une Pull Request sur GitHub
# 6. Après review, merger dans main
```

---

## 📦 Structure des fichiers

```
latraction-website/
├── config.json          # Configuration centralisée
├── index.html           # Page d'accueil
├── styles.css           # Styles globaux
├── script.js            # Scripts principaux
├── images/              # Images et assets
├── js/                  # Scripts modulaires
│   ├── config.js        # Configuration JS
│   └── navigation.js    # Navigation dynamique
├── templates/           # Templates pour nouvelles pages
├── pages/               # Pages statiques additionnelles
├── api/                 # API PHP (si serveur)
│   └── config.php       # API de configuration
├── database/            # Schémas SQL
│   └── schema.sql       # Structure de la DB
├── dist/                # Build output (généré)
└── .github/
    └── workflows/
        └── deploy.yml   # Workflow de déploiement
```

---

## 🔧 Maintenance

### Mettre à jour les informations de contact

Éditez `config.json`:
```json
{
  "contact": {
    "phone": "07 XX XX XX XX",
    "email": "nouveau@email.fr"
  }
}
```

Puis rebuild et push.

### Ajouter une prestation

**Option 1:** Via base de données
```sql
INSERT INTO prestations (title, description, icon, category) 
VALUES ('Nouvelle prestation', 'Description...', '🎯', 'autre');
```

**Option 2:** Via config.json (si pas de DB)
Ajoutez dans la section appropriée du HTML.

---

## 🐛 Dépannage

### Le site ne se met pas à jour après push

1. Vérifiez les Actions GitHub (onglet Actions)
2. Vérifiez que le workflow s'est exécuté sans erreur
3. Attendez quelques minutes (cache GitHub Pages)

### Erreur de build

```bash
# Vérifier les logs
npm run build

# Vérifier Node.js version
node --version  # Doit être >= 18
```

### Problème de base de données

1. Vérifiez les credentials dans `config.json`
2. Vérifiez que la base existe: `mysql -u root -p -e "SHOW DATABASES;"`
3. Vérifiez les permissions utilisateur

---

## 📞 Support

Pour toute question:
- Email: contact@latraction.fr
- GitHub Issues: Créer une issue sur le repository

---

**Dernière mise à jour:** 2025







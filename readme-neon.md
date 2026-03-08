# Intégration Neon avec Netlify Functions

## ✅ Fichiers créés/modifiés

### Nouveaux fichiers
- `netlify/functions/submit-form.js` - Netlify Function qui sauvegarde dans Neon
- `database/schema-neon.sql` - Schéma PostgreSQL pour Neon
- `README-NEON.md` - Ce fichier

### Fichiers modifiés
- `script.js` - Modifié pour appeler `/.netlify/functions/submit-form`
- `package.json` - Ajout de la dépendance `@netlify/neon`

## 📋 Configuration requise

### 1. Créer la table dans Neon

1. Connectez-vous à votre dashboard Neon : https://console.neon.tech
2. Sélectionnez votre projet
3. Ouvrez l'onglet "SQL Editor"
4. Copiez-collez le contenu de `database/schema-neon.sql`
5. Exécutez le script

### 2. Configurer la variable d'environnement dans Netlify

1. Allez sur votre site dans Netlify Dashboard
2. **Site settings** → **Environment variables**
3. Ajoutez une nouvelle variable :
   - **Key**: `NETLIFY_DATABASE_URL`
   - **Value**: Votre URL de connexion Neon
     - Format: `postgresql://user:password@host/database?sslmode=require`
     - Vous la trouvez dans Neon Dashboard → Connection Details

### 3. Installer les dépendances

Si vous déployez via Git, Netlify installera automatiquement les dépendances.
Sinon, localement :

```bash
npm install
```

## 🧪 Test

### Test local (optionnel)

```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Configurer la variable d'environnement localement
export NETLIFY_DATABASE_URL="votre-url-neon"

# Lancer le serveur de développement
netlify dev
```

### Test après déploiement

1. Soumettez un formulaire sur votre site déployé
2. Vérifiez dans Neon que la ligne apparaît dans la table `contacts`
3. Vérifiez les logs Netlify Functions en cas d'erreur :
   - Netlify Dashboard → Functions → View logs

## 🔍 Vérification des données

### Dans Neon

```sql
-- Voir toutes les soumissions
SELECT * FROM contacts ORDER BY created_at DESC;

-- Compter les nouvelles soumissions
SELECT COUNT(*) FROM contacts WHERE status = 'new';

-- Voir les soumissions d'un service spécifique
SELECT * FROM contacts WHERE service = 'nettoyage';
```

## ⚠️ Notes importantes

1. **Sécurité** : La variable `NETLIFY_DATABASE_URL` est automatiquement utilisée par `@netlify/neon`
2. **Limites** : Vérifiez les limites de votre plan Neon (requêtes/seconde, stockage)
3. **Backup** : Configurez des backups automatiques dans Neon Dashboard
4. **Performance** : Les index ont été créés pour optimiser les requêtes

## 🐛 Dépannage

### Erreur "Cannot find module '@netlify/neon'"
- Vérifiez que `package.json` contient la dépendance
- Redéployez le site (Netlify réinstallera les dépendances)

### Erreur "relation 'contacts' does not exist"
- Exécutez le script `database/schema-neon.sql` dans Neon

### Erreur de connexion à la base de données
- Vérifiez que `NETLIFY_DATABASE_URL` est correctement configurée
- Vérifiez que l'URL inclut `?sslmode=require` pour SSL
- Vérifiez les logs Netlify Functions pour plus de détails

## 📚 Ressources

- [Documentation Neon](https://neon.tech/docs)
- [Netlify Functions](https://docs.netlify.com/functions/overview/)
- [@netlify/neon Package](https://www.npmjs.com/package/@netlify/neon)






# Site Web LATRACTION - Nettoyage Professionnel

Site web professionnel pour LATRACTION, société de nettoyage professionnel polyvalente et écoresponsable.

## 📁 Structure du projet

```
latraction-website/
├── index.html      # Page principale
├── styles.css      # Styles CSS
├── script.js       # JavaScript pour l'interactivité
└── README.md       # Ce fichier
```

## 🚀 Déploiement

### Option 1 : Hébergement statique simple

1. **Netlify** (Recommandé - Gratuit)
   - Allez sur [netlify.com](https://www.netlify.com)
   - Glissez-déposez le dossier `latraction-website` dans Netlify
   - Votre site sera en ligne en quelques secondes
   - Vous pouvez connecter votre nom de domaine

2. **Vercel** (Gratuit)
   - Allez sur [vercel.com](https://vercel.com)
   - Importez le projet
   - Déployez en un clic

3. **GitHub Pages** (Gratuit)
   - Créez un repository GitHub
   - Uploadez les fichiers
   - Activez GitHub Pages dans les paramètres

### Option 2 : Hébergement traditionnel

1. Uploadez tous les fichiers dans le répertoire public de votre hébergeur (via FTP)
2. Assurez-vous que `index.html` est à la racine
3. Configurez votre nom de domaine pour pointer vers votre hébergeur

## ✏️ Personnalisation

### Informations de contact

Modifiez dans `index.html` :
- **Téléphone** : Remplacez `07 XX XX XX XX` par votre numéro réel
- **Email** : Remplacez `contact@latraction.fr` par votre email
- **Zone d'intervention** : Remplacez `[Votre ville / Région]` par votre zone

### Couleurs

Les couleurs principales sont définies dans `styles.css` (section `:root`) :
- `--primary-color` : Couleur principale (bleu)
- `--secondary-color` : Couleur secondaire (vert)
- `--accent-color` : Couleur d'accent (orange)

### Formulaire de contact

Le formulaire de contact est actuellement configuré pour afficher une alerte. Pour le rendre fonctionnel :

1. **Option A - Service d'email** (Recommandé)
   - Utilisez un service comme [Formspree](https://formspree.io), [EmailJS](https://www.emailjs.com), ou [Web3Forms](https://web3forms.com)
   - Remplacez l'action du formulaire dans `script.js`

2. **Option B - Backend personnalisé**
   - Créez un endpoint backend pour recevoir les données
   - Modifiez la fonction de soumission dans `script.js`

## 📱 Responsive Design

Le site est entièrement responsive et s'adapte à :
- Ordinateurs de bureau
- Tablettes
- Smartphones

## 🔧 Technologies utilisées

- **HTML5** : Structure sémantique
- **CSS3** : Styles modernes avec variables CSS
- **JavaScript** : Interactivité et animations
- **Google Fonts** : Police Inter

## 📝 Notes importantes

- Le site est prêt à être déployé tel quel
- Tous les contenus de la fiche commerciale sont inclus
- Le design est moderne et professionnel
- Compatible avec tous les navigateurs modernes

## 🎨 Améliorations possibles

- Ajouter des images/photos de vos prestations
- Intégrer Google Maps pour la zone d'intervention
- Ajouter une section témoignages/clients
- Intégrer les réseaux sociaux
- Ajouter un blog/actualités
- Optimiser les images (si vous en ajoutez)

## 📞 Support

Pour toute question concernant le déploiement ou la personnalisation, n'hésitez pas à consulter la documentation de votre hébergeur.

---

**Bonne chance avec votre site web ! 🚀**


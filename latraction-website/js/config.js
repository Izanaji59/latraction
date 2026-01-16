// Configuration centralisée du site
// Ce fichier est généré automatiquement depuis config.json
// Ne pas modifier manuellement - utiliser config.json à la place

const SITE_CONFIG = {
    site: {
        name: "LATRACTION",
        title: "LATRACTION - Nettoyage Professionnel",
        description: "LATRACTION - Nettoyage professionnel polyvalent et écoresponsable. Bureaux, commerces, restaurants, Airbnb, copropriétés et fin de chantier.",
        url: "https://latraction.net",
        logo: "images/testing123-removebg-preview.png"
    },
    contact: {
        phone: "07 83 41 65 11",
        phoneLink: "0783416511",
        email: "latraction.inc@gmail.com",
        zone: "Lille/Nord"
    },
    navigation: [
        { label: "Accueil", href: "/", id: "accueil" },
        { label: "Prestations", href: "/prestations", id: "prestations" },
        { label: "Fin de Chantier", href: "/chantier", id: "chantier" },
        { label: "Tarifs", href: "/tarifs", id: "tarifs" },
        { label: "Contact", href: "/contact", id: "contact" }
    ]
};

// Fonction pour charger la configuration depuis l'API si disponible
async function loadConfig() {
    try {
        const response = await fetch('/api/config');
        if (response.ok) {
            const apiConfig = await response.json();
            return { ...SITE_CONFIG, ...apiConfig };
        }
    } catch (error) {
        console.log('Configuration locale utilisée');
    }
    return SITE_CONFIG;
}

// Export pour utilisation dans d'autres scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SITE_CONFIG, loadConfig };
}





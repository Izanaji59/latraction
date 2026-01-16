// Gestion dynamique de la navigation
// Charge la navigation depuis config.json ou l'API

async function initNavigation() {
    const config = await loadConfig();
    const navMenu = document.getElementById('navMenu');
    
    if (!navMenu) return;
    
    // Générer les liens de navigation dynamiquement
    navMenu.innerHTML = config.navigation.map(item => {
        const isActive = window.location.pathname === item.href || 
                        (item.href === '/' && window.location.pathname === '/index.html');
        return `
            <li>
                <a href="${item.href}" 
                   ${item.id ? `data-section="${item.id}"` : ''}
                   ${isActive ? 'class="active"' : ''}>
                    ${item.label}
                </a>
            </li>
        `;
    }).join('');
    
    // Mettre à jour le logo si nécessaire
    const logoImg = document.querySelector('.logo-img');
    if (logoImg && config.site.logo) {
        logoImg.src = config.site.logo;
        logoImg.alt = `${config.site.name} - ${config.site.title}`;
    }
    
    // Mettre à jour les informations de contact
    updateContactInfo(config.contact);
}

function updateContactInfo(contact) {
    // Mettre à jour les liens de contact dans la page
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.href = `tel:${contact.phoneLink}`;
        link.textContent = contact.phone;
    });
    
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.href = `mailto:${contact.email}`;
        if (link.textContent.includes('@')) {
            link.textContent = contact.email;
        }
    });
    
    const zoneElements = document.querySelectorAll('[data-zone]');
    zoneElements.forEach(el => {
        el.textContent = contact.zone;
    });
}

// Initialiser la navigation au chargement
document.addEventListener('DOMContentLoaded', initNavigation);







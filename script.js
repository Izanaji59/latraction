// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

function resetMenuToggleIcon() {
    if (!menuToggle) {
        return;
    }
    const spans = menuToggle.querySelectorAll('span');
    if (spans.length < 3) {
        return;
    }
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
}

function setMenuToggleIconOpenState(isOpen) {
    if (!menuToggle) {
        return;
    }
    const spans = menuToggle.querySelectorAll('span');
    if (spans.length < 3) {
        return;
    }
    if (isOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        resetMenuToggleIcon();
    }
}

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        setMenuToggleIconOpenState(navMenu.classList.contains('active'));
    });

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            resetMenuToggleIcon();
        });
    });
}

// Navigation dropdown: desktop (hover + click) and mobile (accordion)
const servicesDropdown = document.querySelector('.nav-dropdown');
const servicesDropdownToggle = servicesDropdown?.querySelector('.nav-dropdown-toggle');
const servicesDropdownMenu = servicesDropdown?.querySelector('.nav-dropdown-menu');

if (servicesDropdown && servicesDropdownToggle && servicesDropdownMenu) {
    const closeServicesDropdown = () => {
        servicesDropdown.classList.remove('is-open');
        servicesDropdownToggle.setAttribute('aria-expanded', 'false');
    };

    const openServicesDropdown = () => {
        servicesDropdown.classList.add('is-open');
        servicesDropdownToggle.setAttribute('aria-expanded', 'true');
    };

    const toggleServicesDropdown = () => {
        const isOpen = servicesDropdown.classList.contains('is-open');
        if (isOpen) {
            closeServicesDropdown();
        } else {
            openServicesDropdown();
        }
    };

    servicesDropdownToggle.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleServicesDropdown();
    });

    servicesDropdownToggle.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleServicesDropdown();
        }

        if (event.key === 'ArrowDown') {
            event.preventDefault();
            openServicesDropdown();
            const firstLink = servicesDropdownMenu.querySelector('.nav-dropdown-link');
            if (firstLink) {
                firstLink.focus();
            }
        }

        if (event.key === 'Escape') {
            closeServicesDropdown();
            servicesDropdownToggle.focus();
        }
    });

    servicesDropdownMenu.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeServicesDropdown();
            servicesDropdownToggle.focus();
        }
    });

    document.addEventListener('click', (event) => {
        if (!servicesDropdown.contains(event.target)) {
            closeServicesDropdown();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeServicesDropdown();
        }
    });

    if (navMenu) {
        const mobileDropdownLinks = servicesDropdownMenu.querySelectorAll('a');
        mobileDropdownLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeServicesDropdown();
            });
        });
    }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// Form submission handler
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Désactiver le bouton pour éviter les soumissions multiples
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Envoi en cours...';
        
        try {
            // Récupérer les données du formulaire
            const formData = new FormData(this);
            
            // Convertir FormData en URLSearchParams
            const params = new URLSearchParams();
            for (const [key, value] of formData.entries()) {
                params.append(key, value);
            }
            
            // Envoyer les données à la Netlify Function (qui sauvegarde dans Neon)
            const response = await fetch('/.netlify/functions/submit-form', {
                method: 'POST',
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: params.toString()
            });
            
            const result = await response.json();
            
            if (result.success) {
                // Afficher un message de succès
                showNotification(result.message || 'Votre demande a été enregistrée avec succès. Nous vous contacterons sous 24h.', 'success');
                // Réinitialiser le formulaire
                this.reset();
            } else {
                throw new Error(result.message || 'Une erreur est survenue');
            }
        } catch (error) {
            console.error('Erreur lors de l\'envoi du formulaire:', error);
            showNotification('Une erreur est survenue lors de l\'envoi du formulaire. Veuillez réessayer plus tard.', 'error');
        } finally {
            // Réactiver le bouton
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
}

// Fonction pour afficher les notifications
function showNotification(message, type = 'info') {
    // Créer l'élément de notification s'il n'existe pas
    let notification = document.getElementById('notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        document.body.appendChild(notification);
        
        // Ajouter des styles CSS
        const style = document.createElement('style');
        style.textContent = `
            #notification {
                position: fixed;
                bottom: 20px;
                right: 20px;
                padding: 15px 25px;
                border-radius: 4px;
                color: white;
                font-weight: 500;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                z-index: 1000;
                transform: translateY(100px);
                opacity: 0;
                transition: transform 0.3s ease, opacity 0.3s ease;
                max-width: 400px;
            }
            #notification.show {
                transform: translateY(0);
                opacity: 1;
            }
            #notification.success {
                background-color: #10B981;
            }
            #notification.error {
                background-color: #EF4444;
            }
            #notification.info {
                background-color: #3B82F6;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Mettre à jour le contenu et le style de la notification
    notification.textContent = message;
    notification.className = ''; // Réinitialiser les classes
    notification.classList.add(type);
    
    // Afficher la notification
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Masquer la notification après 5 secondes
    setTimeout(() => {
        notification.classList.remove('show');
    }, 5000);
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.prestation-card, .tarif-card, .engagement-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Masquer l'écran de chargement pour la page Énergie
    const pageLoader = document.getElementById('page-loader');
    if (pageLoader) {
        // Attendre que tout soit chargé
        window.addEventListener('load', () => {
            setTimeout(() => {
                pageLoader.classList.add('hidden');
                // Retirer complètement après la transition
                setTimeout(() => {
                    pageLoader.style.display = 'none';
                }, 500);
            }, 500); // Délai minimum de 500ms pour l'effet
        });
    }
});

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

function updateActiveNavLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// FAQ Accordéon
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const isActive = item.classList.contains('active');
                
                // Fermer tous les autres items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle l'item actuel
                if (isActive) {
                    item.classList.remove('active');
                } else {
                    item.classList.add('active');
                }
            });
        }
    });
});

/* ============================================
   SYSTÈME DE TRANSITION INTER-HUB (immersif)
   - Intercepte uniquement les liens internes vers un autre hub
   - Ignore ancres (#), externe, mailto, tel, download, new tab
   - Durée: min 250ms / max 600ms
   - Respecte prefers-reduced-motion
   ============================================ */
(function () {
    'use strict';

    const HUB_MAP = {
        cleaning: { message: 'Mise en propreté…' },
        digital: { message: 'Initialisation des services…' },
        finance: { message: 'Structuration en cours…' },
        energy: { message: 'Chargement énergétique…' }
    };

    function hubFromPathname(pathname) {
        const p = String(pathname || '').toLowerCase();
        if (p.includes('/nettoyage-professionnel')) return 'cleaning';
        if (p.includes('/services-digitaux')) return 'digital';
        if (p.includes('/fiduciaire')) return 'finance';
        if (p.includes('/energie')) return 'energy';
        return null;
    }

    function getCurrentHub() {
        return document.body.getAttribute('data-hub') || hubFromPathname(window.location.pathname);
    }

    function ensureOverlay() {
        let overlay = document.getElementById('hub-transition-overlay');
        if (overlay) return overlay;

        overlay = document.createElement('div');
        overlay.id = 'hub-transition-overlay';
        overlay.className = 'hub-transition-overlay';
        overlay.innerHTML = `
            <div class="hub-transition-loader"></div>
            <div class="hub-transition-title">LATRACTION</div>
            <div class="hub-transition-message"></div>
        `;
        document.body.appendChild(overlay);
        return overlay;
    }

    function showOverlay(targetHub) {
        const overlay = ensureOverlay();
        overlay.setAttribute('data-hub', targetHub);

        const msg = (HUB_MAP[targetHub] && HUB_MAP[targetHub].message) ? HUB_MAP[targetHub].message : '';
        const msgEl = overlay.querySelector('.hub-transition-message');
        if (msgEl) msgEl.textContent = msg;

        overlay.classList.add('active');
    }

    function hideOverlay() {
        const overlay = document.getElementById('hub-transition-overlay');
        if (!overlay) return;
        overlay.classList.remove('active');
        overlay.removeAttribute('data-hub');
    }

    document.addEventListener('click', (e) => {
        if (e.defaultPrevented) return;
        if (e.button !== 0) return; // clic gauche uniquement
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

        const a = e.target && e.target.closest ? e.target.closest('a') : null;
        if (!a) return;

        if (a.target && a.target !== '_self') return;
        if (a.hasAttribute('download')) return;

        const href = a.getAttribute('href');
        if (!href) return;
        if (href.startsWith('#')) return;
        if (href.startsWith('mailto:') || href.startsWith('tel:')) return;

        let url;
        try {
            url = new URL(href, window.location.href);
        } catch {
            return;
        }

        // Externe: ne rien faire
        if (url.origin !== window.location.origin) return;

        // Ancre sur même page: ne rien faire
        if (url.pathname === window.location.pathname && url.hash) return;

        const currentHub = getCurrentHub();
        const targetHub = hubFromPathname(url.pathname);

        // On ne déclenche que si c'est un autre hub
        if (!targetHub || !currentHub || targetHub === currentHub) return;

        e.preventDefault();

        const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const durationMs = prefersReduced ? 250 : 600;

        showOverlay(targetHub);

        window.setTimeout(() => {
            window.location.href = url.href;
        }, durationMs);
    });

    // Si on revient via cache (bouton retour), s'assurer que l'overlay n'est pas visible
    window.addEventListener('pageshow', () => hideOverlay());
    window.addEventListener('load', () => hideOverlay());
})();


// FAQ Accordéon - Version corrigée (évite la duplication)
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            // Retirer l'ancien listener s'il existe
            const newQuestion = question.cloneNode(true);
            question.parentNode.replaceChild(newQuestion, question);
            
            newQuestion.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const isActive = item.classList.contains('active');
                
                // Fermer tous les autres items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle l'item actuel
                if (isActive) {
                    item.classList.remove('active');
                } else {
                    item.classList.add('active');
                }
            });
        }
    });
});

/* ============================================
   CURSEUR ANIMÉ EN FORME D'ATOME (Toutes les pages)
   ============================================ */
(function () {
    'use strict';

    // Créer le curseur personnalisé (affiché sur toutes les pages)
    const customCursor = document.createElement('div');
    customCursor.id = 'atom-cursor';
    customCursor.innerHTML = `
        <svg width="48" height="48" viewBox="0 0 48 48" class="atom-cursor-svg">
            <!-- Orbites -->
            <ellipse cx="24" cy="24" rx="18" ry="6" class="orbit orbit-1" transform="rotate(0 24 24)"/>
            <ellipse cx="24" cy="24" rx="18" ry="6" class="orbit orbit-2" transform="rotate(60 24 24)"/>
            <ellipse cx="24" cy="24" rx="18" ry="6" class="orbit orbit-3" transform="rotate(120 24 24)"/>
            <!-- Noyau -->
            <circle cx="24" cy="24" r="4" class="nucleus"/>
            <!-- Électrons avec groupes de transformation pour rotation -->
            <g class="electron-group electron-group-1" transform-origin="24 24">
                <circle cx="42" cy="24" r="3" class="electron electron-1"/>
            </g>
            <g class="electron-group electron-group-2" transform-origin="24 24" transform="rotate(60 24 24)">
                <circle cx="42" cy="24" r="3" class="electron electron-2"/>
            </g>
            <g class="electron-group electron-group-3" transform-origin="24 24" transform="rotate(120 24 24)">
                <circle cx="42" cy="24" r="3" class="electron electron-3"/>
            </g>
        </svg>
    `;
    document.body.appendChild(customCursor);

    // Styles CSS pour le curseur
    const style = document.createElement('style');
    style.textContent = `
        #atom-cursor {
            position: fixed;
            width: 48px;
            height: 48px;
            pointer-events: none !important;
            z-index: 99999 !important;
            transform: translate(-50%, -50%);
            opacity: 1;
            transition: opacity 0.2s ease;
            will-change: transform;
            display: block;
            visibility: visible;
        }

        .atom-cursor-svg {
            width: 100%;
            height: 100%;
            pointer-events: none;
        }

        .orbit {
            fill: none;
            stroke: rgba(139, 92, 246, 0.2);
            stroke-width: 1;
        }

        .nucleus {
            fill: #facc15;
            animation: nucleus-pulse 2s ease-in-out infinite;
        }

        .electron-group {
            transform-origin: 24px 24px;
            animation: electron-orbit 3s linear infinite;
        }

        .electron-group-1 {
            animation-delay: 0s;
        }

        .electron-group-2 {
            animation-delay: 1s;
        }

        .electron-group-3 {
            animation-delay: 2s;
        }

        .electron {
            animation: electron-color-change 2s ease-in-out infinite;
        }

        .electron-1 {
            animation-delay: 0s;
        }

        .electron-2 {
            animation-delay: 0.67s;
        }

        .electron-3 {
            animation-delay: 1.33s;
        }

        @keyframes electron-orbit {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        @keyframes electron-color-change {
            0%, 100% { fill: #8b5cf6; }
            25% { fill: #f59e0b; }
            50% { fill: #ec4899; }
            75% { fill: #06b6d4; }
        }

        @keyframes nucleus-pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.1); }
        }

        /* Masquer le curseur par défaut partout */
        body {
            cursor: none !important;
        }

        body * {
            cursor: none !important;
        }
        
        /* S'assurer que le curseur est visible dans les modals et formulaires */
        .energy-modal,
        .energy-modal *,
        input,
        textarea,
        select,
        button,
        form {
            cursor: none !important;
        }

        @media (prefers-reduced-motion: reduce) {
            .electron, .nucleus {
                animation: none;
            }
        }
    `;
    document.head.appendChild(style);

    // Faire suivre le curseur à la souris
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;

    // Initialiser la position du curseur au centre de l'écran
    customCursor.style.left = cursorX + 'px';
    customCursor.style.top = cursorY + 'px';
    customCursor.style.opacity = '1';

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Animation fluide du curseur
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        customCursor.style.left = cursorX + 'px';
        customCursor.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // S'assurer que les clics passent à travers le curseur
    customCursor.style.pointerEvents = 'none';

    // Cacher le curseur quand la souris quitte la page
    document.addEventListener('mouseleave', () => {
        customCursor.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        customCursor.style.opacity = '1';
    });
})();

// Effet hover immersif pour les cartes Graphismes et Music (services-digitaux uniquement)
(function() {
    'use strict';
    
    function initImmersiveCards() {
        console.log('🔍 Initialisation des cartes immersives...');
        
        // Chercher directement les liens Graphismes et Music dans .prestations-grid
        const prestationsGrid = document.querySelector('.prestations-grid');
        if (!prestationsGrid) {
            console.log('❌ .prestations-grid non trouvé');
            return;
        }
        
        const graphismesLink = prestationsGrid.querySelector('a[href*="/graphismes/"]');
        const musicLink = prestationsGrid.querySelector('a[href*="/music/"]');
        
        console.log('📋 Graphismes link:', graphismesLink);
        console.log('📋 Music link:', musicLink);
        
        if (!graphismesLink && !musicLink) {
            console.log('❌ Aucun lien Graphismes ou Music trouvé');
            return;
        }
        
        const hoverMessages = {
            graphismes: 'Cliquez pour en voir davantage',
            music: 'Cliquez pour en voir davantage'
        };
        
        const links = [graphismesLink, musicLink].filter(Boolean);
        
        links.forEach((link) => {
            // Déterminer le type de carte
            let cardType;
            if (link.href.includes('graphismes') || link.getAttribute('data-card-type') === 'graphismes') {
                cardType = 'graphismes';
            } else if (link.href.includes('music') || link.getAttribute('data-card-type') === 'music') {
                cardType = 'music';
            } else {
                return;
            }
            
            console.log(`✅ Traitement de la carte: ${cardType}`);
            
            // Trouver la carte
            const card = link.querySelector('.prestation-card');
            if (!card) {
                console.log(`❌ Carte non trouvée pour ${cardType}`);
                return;
            }
            
            // Vérifier si l'overlay existe déjà
            const existingOverlay = card.querySelector('.immersive-hover-overlay');
            if (existingOverlay) {
                console.log(`⚠️ Overlay déjà présent pour ${cardType}, suppression...`);
                existingOverlay.remove();
            }
            
            // Créer l'overlay
            const overlay = document.createElement('div');
            overlay.className = 'immersive-hover-overlay';
            overlay.textContent = hoverMessages[cardType];
            
            // Styles de l'overlay
            overlay.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(255, 255, 255, 0.95);
                color: var(--primary-color, #8b5cf6);
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 600;
                font-size: 1.2rem;
                opacity: 0;
                transform: scale(0.95);
                transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
                pointer-events: none;
                z-index: 10;
                border-radius: inherit;
                text-align: center;
                padding: 1.5rem;
                backdrop-filter: blur(4px);
            `;
            
            // Styles pour le lien et la carte
            link.style.position = 'relative';
            link.style.display = 'block';
            card.style.position = 'relative';
            card.style.overflow = 'hidden';
            
            // Ajouter l'overlay
            card.appendChild(overlay);
            console.log(`✅ Overlay ajouté pour ${cardType}`);
            
            // Gestion du hover
            link.addEventListener('mouseenter', function() {
                console.log(`🖱️ Hover sur ${cardType}`);
                overlay.style.opacity = '1';
                overlay.style.transform = 'scale(1)';
                card.style.transform = 'scale(1.02)';
                card.style.transition = 'transform 0.3s ease';
            });
            
            link.addEventListener('mouseleave', function() {
                overlay.style.opacity = '0';
                overlay.style.transform = 'scale(0.95)';
                card.style.transform = 'scale(1)';
            });
        });
        
        console.log('✅ Initialisation terminée');
    }
    
    // Appeler après le chargement du DOM
    function tryInit() {
        initImmersiveCards();
        
        // Réessayer après un délai
        setTimeout(() => {
            const overlays = document.querySelectorAll('.immersive-hover-overlay');
            if (overlays.length === 0) {
                console.log('🔄 Réessai de l\'initialisation...');
                initImmersiveCards();
            }
        }, 500);
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', tryInit);
    } else {
        tryInit();
    }
})();

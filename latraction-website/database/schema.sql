-- Schéma de base de données pour LATRACTION
-- Créer cette base de données sur votre serveur

CREATE DATABASE IF NOT EXISTS latraction_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE latraction_db;

-- Table des pages
CREATE TABLE IF NOT EXISTS pages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT,
    description TEXT,
    meta_title VARCHAR(255),
    meta_description TEXT,
    active BOOLEAN DEFAULT TRUE,
    order_index INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_slug (slug),
    INDEX idx_active (active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table des prestations
CREATE TABLE IF NOT EXISTS prestations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    category VARCHAR(100),
    active BOOLEAN DEFAULT TRUE,
    order_index INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_active (active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table des contacts (formulaires soumis)
CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    service VARCHAR(100),
    message TEXT,
    status ENUM('new', 'read', 'replied', 'archived') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table des tarifs
CREATE TABLE IF NOT EXISTS tarifs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    service_name VARCHAR(255) NOT NULL,
    price_min DECIMAL(10,2),
    price_max DECIMAL(10,2),
    unit VARCHAR(50),
    description TEXT,
    active BOOLEAN DEFAULT TRUE,
    order_index INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_active (active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Données initiales
INSERT INTO pages (title, slug, content, description, meta_title, meta_description, active, order_index) VALUES
('Accueil', '/', NULL, 'Page d\'accueil', 'LATRACTION - Nettoyage Professionnel', 'Nettoyage professionnel polyvalent et écoresponsable', TRUE, 1),
('Prestations', '/prestations', NULL, 'Nos prestations de nettoyage', 'Prestations - LATRACTION', 'Découvrez nos prestations de nettoyage professionnel', TRUE, 2),
('Fin de Chantier', '/chantier', NULL, 'Nettoyage de fin de chantier', 'Fin de Chantier - LATRACTION', 'Nettoyage professionnel de fin de chantier', TRUE, 3),
('Tarifs', '/tarifs', NULL, 'Nos tarifs', 'Tarifs - LATRACTION', 'Découvrez nos tarifs de nettoyage professionnel', TRUE, 4),
('Contact', '/contact', NULL, 'Contactez-nous', 'Contact - LATRACTION', 'Contactez LATRACTION pour un devis', TRUE, 5);

INSERT INTO prestations (title, description, icon, category, active, order_index) VALUES
('Entretien régulier', 'Dépoussiérage, désinfection, sols, sanitaires, surfaces sensibles, gestion des consommables.', '🧹', 'entretien', TRUE, 1),
('Bureaux & Commerces', 'Zones d\'accueil, vitrines, salles d\'attente, nettoyage en profondeur adapté à votre activité.', '🏢', 'commercial', TRUE, 2),
('Restaurants', 'Protocole hygiène alimentaire (HACCP), dégraissage, entretien cuisine & salle.', '🍽️', 'restaurant', TRUE, 3),
('Airbnb / Locations meublées', 'Ménage complet, mise en scène hôtelière, literie et linge (option).', '🏠', 'location', TRUE, 4),
('Copropriétés', 'Halls, ascenseurs, escaliers, boîtes aux lettres, sortie & rotation des bacs.', '🏘️', 'copropriete', TRUE, 5),
('Vitres', 'Vitrages, cloisons, verrières, portes vitrées.', '🪟', 'vitres', TRUE, 6);

INSERT INTO tarifs (service_name, price_min, price_max, unit, description, active, order_index) VALUES
('Fin de Chantier', 4.00, 8.00, 'm²', 'Selon état et complexité', TRUE, 1),
('Entretien ponctuel', 18.00, 22.00, 'h', 'Interventions régulières', TRUE, 2),
('Forfait Bureaux', 180.00, NULL, 'mois', 'Forfait mensuel', TRUE, 3),
('Airbnb', 35.00, 55.00, 'passage', 'Ménage complet', TRUE, 4),
('Vitres', 20.00, NULL, 'm²', 'Nettoyage vitres', TRUE, 5);







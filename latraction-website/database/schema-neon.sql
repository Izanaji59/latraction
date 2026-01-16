-- Schéma PostgreSQL pour Neon (LATRACTION)
-- Exécuter ce script dans votre base de données Neon
-- Documentation: https://neon.tech/docs

-- Table des contacts (formulaires soumis)
CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    service VARCHAR(100),
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);

-- Commentaires
COMMENT ON TABLE contacts IS 'Table des soumissions de formulaires de contact';
COMMENT ON COLUMN contacts.status IS 'Statut: new, read, replied, archived';






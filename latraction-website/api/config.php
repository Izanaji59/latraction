<?php
/**
 * API de configuration
 * Retourne la configuration du site depuis la base de données ou config.json
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Charger la configuration depuis config.json
$configFile = __DIR__ . '/../config.json';
$config = json_decode(file_get_contents($configFile), true);

// Si une base de données est configurée, charger les données dynamiques
if (isset($config['database']) && $config['database']['host'] !== 'localhost') {
    try {
        $db = new PDO(
            "mysql:host={$config['database']['host']};dbname={$config['database']['name']};charset={$config['database']['charset']}",
            $config['database']['user'] ?? '',
            $config['database']['password'] ?? '',
            [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
        );
        
        // Charger les pages depuis la base de données
        $stmt = $db->query("SELECT * FROM {$config['database']['tables']['pages']} WHERE active = 1 ORDER BY order_index");
        $pages = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Mettre à jour la navigation avec les pages de la DB
        if (!empty($pages)) {
            $config['navigation'] = array_map(function($page) {
                return [
                    'label' => $page['title'],
                    'href' => $page['slug'],
                    'id' => $page['slug']
                ];
            }, $pages);
        }
        
    } catch (PDOException $e) {
        // En cas d'erreur, utiliser la config par défaut
        error_log("Database error: " . $e->getMessage());
    }
}

echo json_encode($config, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
?>







<?php
/**
 * API de soumission de formulaire de contact
 * Sauvegarde dans la base de données si disponible, sinon dans un fichier JSON
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
    exit;
}

// Charger la configuration
$configFile = __DIR__ . '/config.json';
$config = [];
if (file_exists($configFile)) {
    $config = json_decode(file_get_contents($configFile), true);
}

// Récupérer les données du formulaire
$data = [
    'name' => trim($_POST['name'] ?? ''),
    'email' => trim($_POST['email'] ?? ''),
    'phone' => trim($_POST['phone'] ?? ''),
    'service' => trim($_POST['service'] ?? ''),
    'message' => trim($_POST['message'] ?? '')
];

// Validation basique
if (empty($data['name']) || empty($data['email']) || empty($data['message'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Veuillez remplir tous les champs obligatoires.']);
    exit;
}

// Tenter de sauvegarder dans la base de données
$saved = false;
if (isset($config['database']) && !empty($config['database']['host'])) {
    try {
        $db = new PDO(
            "mysql:host={$config['database']['host']};dbname={$config['database']['name']};charset={$config['database']['charset']}",
            $config['database']['user'] ?? '',
            $config['database']['password'] ?? '',
            [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
        );
        
        $stmt = $db->prepare(
            "INSERT INTO {$config['database']['tables']['contacts']} 
            (name, email, phone, service, message, status) 
            VALUES (:name, :email, :phone, :service, :message, 'new')"
        );
        
        $stmt->execute([
            ':name' => $data['name'],
            ':email' => $data['email'],
            ':phone' => $data['phone'],
            ':service' => $data['service'],
            ':message' => $data['message']
        ]);
        
        $saved = true;
    } catch (PDOException $e) {
        error_log("Database error: " . $e->getMessage());
        // Continuer avec le fallback fichier
    }
}

// Fallback: sauvegarder dans un fichier JSON
if (!$saved) {
    $file = __DIR__ . '/form_submissions.json';
    $current_data = [];
    
    if (file_exists($file)) {
        $current_data = json_decode(file_get_contents($file), true) ?? [];
    }
    
    $data['date'] = date('Y-m-d H:i:s');
    $current_data[] = $data;
    
    file_put_contents($file, json_encode($current_data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

// Envoyer un email de notification (optionnel)
if (isset($config['contact']['email'])) {
    $to = $config['contact']['email'];
    $subject = "Nouveau contact depuis latraction.net";
    $emailMessage = "Nouveau message de contact:\n\n";
    $emailMessage .= "Nom: {$data['name']}\n";
    $emailMessage .= "Email: {$data['email']}\n";
    $emailMessage .= "Téléphone: {$data['phone']}\n";
    $emailMessage .= "Service: {$data['service']}\n";
    $emailMessage .= "Message:\n{$data['message']}\n";
    
    $headers = "From: noreply@latraction.net\r\n";
    $headers .= "Reply-To: {$data['email']}\r\n";
    
    @mail($to, $subject, $emailMessage, $headers);
}

// Répondre avec succès
echo json_encode([
    'success' => true, 
    'message' => 'Votre demande a été enregistrée avec succès. Nous vous contacterons sous 24h.'
]);
?>

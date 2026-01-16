const { Pool } = require('pg');
const querystring = require('querystring');

const pool = new Pool({
  connectionString: process.env.NETLIFY_DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ success: false, message: 'Méthode non autorisée' })
    };
  }

  try {
    const contentType = event.headers['content-type'] || event.headers['Content-Type'] || '';
    let data = {};

    if (contentType.includes('application/json')) {
      data = JSON.parse(event.body || '{}');
    } else {
      // Parser les données URL-encodées avec querystring
      const parsed = querystring.parse(event.body || '');
      data = {
        name: (parsed.name || '').trim(),
        email: (parsed.email || '').trim(),
        phone: (parsed.phone || '').trim() || null,
        service: (parsed.service || '').trim() || null,
        message: (parsed.message || '').trim()
      };
    }

    // Validation
    if (!data.name || !data.email || !data.message) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          success: false,
          message: 'Veuillez remplir tous les champs obligatoires.'
        })
      };
    }

    // Insérer dans la base de données
    const result = await pool.query(
      `INSERT INTO contacts (name, email, phone, service, message, status, created_at)
       VALUES ($1, $2, $3, $4, $5, 'new', NOW())
       RETURNING id`,
      [data.name, data.email, data.phone, data.service, data.message]
    );

    console.log('Données enregistrées avec succès, ID:', result.rows[0].id);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: true,
        message: 'Votre demande a été enregistrée avec succès. Nous vous contacterons sous 24h.'
      })
    };
  } catch (error) {
    console.error('Erreur détaillée:', error);
    console.error('Stack:', error.stack);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: false,
        message: 'Une erreur est survenue lors de l\'envoi du formulaire.',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      })
    };
  }
};
// Envio direto via FCM API (sem Firebase Admin SDK)
const axios = require('axios');

const FCM_SERVER_KEY = 'YOUR_FCM_SERVER_KEY'; // Obter do Firebase Console

async function sendFCMNotification(token, title, body, data = {}) {
  try {
    const response = await axios.post('https://fcm.googleapis.com/fcm/send', {
      to: token,
      notification: { title, body },
      data
    }, {
      headers: {
        'Authorization': `key=${FCM_SERVER_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Erro FCM:', error.response?.data || error.message);
    throw error;
  }
}

module.exports = { sendFCMNotification };
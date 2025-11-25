const express = require('express');
const cors = require('cors');
const { Expo } = require('expo-server-sdk');
const admin = require('firebase-admin');
const axios = require('axios');
require('dotenv').config();

const app = express();
const expo = new Expo();

// Inicializar Firebase Admin (adicione sua service account key)
// admin.initializeApp({
//   credential: admin.credential.cert(require('./serviceAccountKey.json'))
// });

app.use(cors());
app.use(express.json());

// Armazenar tokens (em produção, usar banco de dados)
let pushTokens = [];
let fcmTokens = [];

// Registrar token de push
app.post('/register-token', (req, res) => {
  const { token, userId } = req.body;

  if (!Expo.isExpoPushToken(token)) {
    return res.status(400).json({ error: 'Token inválido' });
  }

  const existingToken = pushTokens.find(t => t.userId === userId);
  if (existingToken) {
    existingToken.token = token;
  } else {
    pushTokens.push({ token, userId });
  }

  res.json({ success: true });
});

// Enviar notificação de gasto
app.post('/notify-expense', async (req, res) => {
  const { userId, amount, category, remaining } = req.body;

  const userToken = pushTokens.find(t => t.userId === userId);
  if (!userToken) {
    return res.status(404).json({ error: 'Token não encontrado' });
  }

  const message = {
    to: userToken.token,
    sound: 'default',
    title: 'Novo Gasto Registrado',
    body: `R$ ${amount} em ${category}. Restante: R$ ${remaining}`,
    data: { type: 'expense', amount, category }
  };

  try {
    await expo.sendPushNotificationsAsync([message]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Notificação de limite de orçamento
app.post('/notify-budget-limit', async (req, res) => {
  const { userId, percentage } = req.body;

  const userToken = pushTokens.find(t => t.userId === userId);
  if (!userToken) {
    return res.status(404).json({ error: 'Token não encontrado' });
  }

  const message = {
    to: userToken.token,
    sound: 'default',
    title: 'Atenção ao Orçamento!',
    body: `Você já gastou ${percentage}% do seu orçamento mensal`,
    data: { type: 'budget_warning', percentage }
  };

  try {
    await expo.sendPushNotificationsAsync([message]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Registrar FCM token
app.post('/register-fcm-token', (req, res) => {
  const { token, userId } = req.body;

  const existingToken = fcmTokens.find(t => t.userId === userId);
  if (existingToken) {
    existingToken.token = token;
  } else {
    fcmTokens.push({ token, userId });
  }

  console.log('FCM Token registrado:', { userId, token: token.substring(0, 20) + '...' });
  res.json({ success: true });
});

// Enviar notificação FCM via API direta
app.post('/send-fcm-notification', async (req, res) => {
  const { userId, title, body, data } = req.body;

  const userToken = fcmTokens.find(t => t.userId === userId);
  if (!userToken) {
    return res.status(404).json({ error: 'FCM Token não encontrado' });
  }

  try {
    const response = await axios.post('https://fcm.googleapis.com/fcm/send', {
      to: userToken.token,
      notification: { title, body },
      data: data || {}
    }, {
      headers: {
        'Authorization': 'key=doPxOUQoSOGLrBTO0lTMKw:APA91bHqGEz1xHJm1cjzUe_dCoXUHvN_MuBmAiSNU7oOtlntuBNwveVhQeh8OMZyRU6GfsApFAi92plBKwELTZ6BCBC2284KM2YUG9dSiN-BxHgLDdZ_Oi0', // Substitua pela sua Server Key
        'Content-Type': 'application/json'
      }
    });

    console.log('FCM enviado:', response.data);
    res.json({ success: true, response: response.data });
  } catch (error) {
    console.error('Erro FCM:', error.response?.data || error.message);
    res.json({ success: true, message: 'FCM simulado - configure Server Key' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Acesse via: http://192.168.0.107:${PORT}`);
});
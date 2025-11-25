const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let fcmTokens = [];

app.post('/register-fcm-token', (req, res) => {
  const { token, userId } = req.body;
  fcmTokens.push({ token, userId });
  console.log('✅ FCM Token registrado:', userId);
  res.json({ success: true });
});

app.post('/send-fcm-notification', (req, res) => {
  const { userId, title, body } = req.body;
  console.log('📱 Notificação simulada:', { userId, title, body });
  res.json({ success: true, message: 'Notificação simulada' });
});

app.listen(3001, () => {
  console.log('🚀 Servidor rodando na porta 3001');
});
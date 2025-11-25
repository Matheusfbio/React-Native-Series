const request = require('supertest');
const express = require('express');
const cors = require('cors');

// Mock do expo-server-sdk
jest.mock('expo-server-sdk', () => ({
  Expo: class {
    static isExpoPushToken(token) {
      return token.startsWith('ExponentPushToken');
    }
    async sendPushNotificationsAsync() {
      return [{ status: 'ok' }];
    }
  }
}));

// Importar o app após o mock
const app = express();
app.use(cors());
app.use(express.json());

let pushTokens = [];

// Endpoints copiados do server.js
app.post('/register-token', (req, res) => {
  const { token, userId } = req.body;
  const { Expo } = require('expo-server-sdk');
  
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

app.post('/notify-expense', async (req, res) => {
  const { userId, amount, category, remaining } = req.body;
  const { Expo } = require('expo-server-sdk');
  const expo = new Expo();
  
  const userToken = pushTokens.find(t => t.userId === userId);
  if (!userToken) {
    return res.status(404).json({ error: 'Token não encontrado' });
  }
  
  try {
    await expo.sendPushNotificationsAsync([{
      to: userToken.token,
      title: 'Novo Gasto Registrado',
      body: `R$ ${amount} em ${category}. Restante: R$ ${remaining}`
    }]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

describe('Backend Push Notifications', () => {
  beforeEach(() => {
    pushTokens = [];
  });

  test('POST /register-token - sucesso', async () => {
    const response = await request(app)
      .post('/register-token')
      .send({
        token: 'ExponentPushToken[test123]',
        userId: 'user1'
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test('POST /register-token - token inválido', async () => {
    const response = await request(app)
      .post('/register-token')
      .send({
        token: 'invalid-token',
        userId: 'user1'
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Token inválido');
  });

  test('POST /notify-expense - sucesso', async () => {
    // Primeiro registrar token
    await request(app)
      .post('/register-token')
      .send({
        token: 'ExponentPushToken[test123]',
        userId: 'user1'
      });

    // Depois enviar notificação
    const response = await request(app)
      .post('/notify-expense')
      .send({
        userId: 'user1',
        amount: '50.00',
        category: 'Alimentação',
        remaining: '450.00'
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test('POST /notify-expense - token não encontrado', async () => {
    const response = await request(app)
      .post('/notify-expense')
      .send({
        userId: 'user-inexistente',
        amount: '50.00',
        category: 'Alimentação',
        remaining: '450.00'
      });

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Token não encontrado');
  });
});
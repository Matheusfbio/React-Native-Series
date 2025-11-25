const axios = require('axios');

const API_URL = 'http://localhost:3001';

async function testarBackend() {
  console.log('🚀 Testando backend na prática...\n');

  try {
    // 1. Registrar token
    console.log('1️⃣ Registrando token...');
    const registerResponse = await axios.post(`${API_URL}/register-token`, {
      token: 'ExponentPushToken[test123456]',
      userId: 'user123'
    });
    console.log('✅ Token registrado:', registerResponse.data);

    // 2. Testar notificação de gasto
    console.log('\n2️⃣ Enviando notificação de gasto...');
    const expenseResponse = await axios.post(`${API_URL}/notify-expense`, {
      userId: 'user123',
      amount: '75.50',
      category: 'Alimentação',
      remaining: '424.50'
    });
    console.log('✅ Notificação enviada:', expenseResponse.data);

    // 3. Testar notificação de limite
    console.log('\n3️⃣ Enviando notificação de limite...');
    const budgetResponse = await axios.post(`${API_URL}/notify-budget-limit`, {
      userId: 'user123',
      percentage: 85
    });
    console.log('✅ Alerta de limite enviado:', budgetResponse.data);

    console.log('\n🎉 Todos os testes passaram!');

  } catch (error) {
    console.error('❌ Erro:', error.response?.data || error.message);
  }
}

testarBackend();
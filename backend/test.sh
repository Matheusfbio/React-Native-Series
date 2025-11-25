#!/bin/bash

echo "🚀 Testando backend na prática..."

# Iniciar servidor
echo "Iniciando servidor..."
node server.js &
SERVER_PID=$!
sleep 3

echo -e "\n1️⃣ Registrando token..."
curl -X POST http://localhost:3001/register-token \
  -H "Content-Type: application/json" \
  -d '{"token":"ExponentPushToken[test123]","userId":"user123"}'

echo -e "\n\n2️⃣ Enviando notificação de gasto..."
curl -X POST http://localhost:3001/notify-expense \
  -H "Content-Type: application/json" \
  -d '{"userId":"user123","amount":"75.50","category":"Alimentação","remaining":"424.50"}'

echo -e "\n\n3️⃣ Enviando notificação de limite..."
curl -X POST http://localhost:3001/notify-budget-limit \
  -H "Content-Type: application/json" \
  -d '{"userId":"user123","percentage":85}'

echo -e "\n\n✅ Testes concluídos!"

# Parar servidor
kill $SERVER_PID
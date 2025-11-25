# Backend - Push Notifications

Backend Node.js para gerenciar push notifications do app de orçamentos.

## Instalação

```bash
cd backend
npm install
```

## Execução

```bash
# Desenvolvimento
npm run dev

# Produção
npm start
```

## Endpoints

### POST /register-token
Registra o token de push notification do usuário.

```json
{
  "token": "ExponentPushToken[xxx]",
  "userId": "user123"
}
```

### POST /notify-expense
Envia notificação quando um gasto é registrado.

```json
{
  "userId": "user123",
  "amount": "50.00",
  "category": "Alimentação",
  "remaining": "450.00"
}
```

### POST /notify-budget-limit
Envia notificação quando o limite do orçamento é atingido.

```json
{
  "userId": "user123",
  "percentage": 80
}
```
import { API_URL } from './config';

export class PushNotificationService {
  static async registerToken(token: string, userId: string) {
    try {
      const response = await fetch(`${API_URL}/register-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, userId })
      });
      return await response.json();
    } catch (error) {
      console.error('Erro ao registrar token:', error);
    }
  }

  static async notifyExpense(userId: string, amount: string, category: string, remaining: string) {
    try {
      const response = await fetch(`${API_URL}/notify-expense`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, amount, category, remaining })
      });
      return await response.json();
    } catch (error) {
      console.error('Erro ao enviar notificação de gasto:', error);
    }
  }

  static async notifyBudgetLimit(userId: string, percentage: number) {
    try {
      const response = await fetch(`${API_URL}/notify-budget-limit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, percentage })
      });
      return await response.json();
    } catch (error) {
      console.error('Erro ao enviar notificação de limite:', error);
    }
  }
}
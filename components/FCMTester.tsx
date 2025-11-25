import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuth } from '@/contexts/auth';
import { API_URL } from '@/utils/networkConfig';

export default function FCMTester() {
  const { user } = useAuth();
  const [status, setStatus] = useState('');

  const sendExpenseNotification = async () => {
    if (!user?.uid) return;
    
    setStatus('Enviando...');
    try {
      const response = await fetch(`${API_URL}/send-fcm-notification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.uid,
          title: '💰 Novo Gasto',
          body: 'R$ 25,00 em Alimentação. Restante: R$ 475,00',
          data: { type: 'expense', amount: '25.00' }
        })
      });
      
      const result = await response.json();
      setStatus(result.success ? '✅ Enviado!' : '❌ Erro');
    } catch (error) {
      setStatus('❌ Erro de rede');
    }
  };

  const sendBudgetAlert = async () => {
    if (!user?.uid) return;
    
    setStatus('Enviando...');
    try {
      const response = await fetch(`${API_URL}/send-fcm-notification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.uid,
          title: '⚠️ Atenção ao Orçamento',
          body: 'Você já gastou 80% do seu orçamento mensal!',
          data: { type: 'budget_warning', percentage: 80 }
        })
      });
      
      const result = await response.json();
      setStatus(result.success ? '✅ Enviado!' : '❌ Erro');
    } catch (error) {
      setStatus('❌ Erro de rede');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Testar Notificações FCM</Text>
      
      <TouchableOpacity style={styles.expenseButton} onPress={sendExpenseNotification}>
        <Text style={styles.buttonText}>💰 Notificar Gasto</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.budgetButton} onPress={sendBudgetAlert}>
        <Text style={styles.buttonText}>⚠️ Alerta Orçamento</Text>
      </TouchableOpacity>
      
      <Text style={styles.status}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 15, alignItems: 'center', backgroundColor: '#f8f9fa', borderRadius: 10, margin: 10 },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  expenseButton: { backgroundColor: '#28a745', padding: 12, borderRadius: 8, marginVertical: 5, width: '100%', alignItems: 'center' },
  budgetButton: { backgroundColor: '#ffc107', padding: 12, borderRadius: 8, marginVertical: 5, width: '100%', alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 14 },
  status: { marginTop: 10, fontSize: 14, fontWeight: '500' },
});
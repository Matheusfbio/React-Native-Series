import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { PushNotificationService } from '@/utils/pushNotificationService';
import { useAuth } from '@/contexts/auth';

export default function TestNotification() {
  const { user } = useAuth();

  const testExpenseNotification = async () => {
    if (!user?.uid) return;
    
    await PushNotificationService.notifyExpense(
      user.uid,
      '50.00',
      'Alimentação',
      '450.00'
    );
  };

  const testBudgetNotification = async () => {
    if (!user?.uid) return;
    
    await PushNotificationService.notifyBudgetLimit(user.uid, 85);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Testar Notificações</Text>
      
      <TouchableOpacity style={styles.button} onPress={testExpenseNotification}>
        <Text style={styles.buttonText}>Testar Gasto</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={testBudgetNotification}>
        <Text style={styles.buttonText}>Testar Limite</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#00D09E',
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
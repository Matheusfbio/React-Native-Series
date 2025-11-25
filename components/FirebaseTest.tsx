import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '@/contexts/auth';
import { useFirebaseNotifications } from '@/hooks/useFirebaseNotifications';

export default function FirebaseTest() {
  const { user } = useAuth();
  const { fcmToken } = useFirebaseNotifications(user?.uid);

  const sendTestNotification = async () => {
    if (!user?.uid) return;
    
    try {
      await fetch('http://10.0.2.2:3001/send-fcm-notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.uid,
          title: 'Teste Firebase',
          body: 'Notificação via FCM funcionando!',
          data: { type: 'test' }
        })
      });
    } catch (error) {
      console.error('Erro ao enviar FCM:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Firebase FCM</Text>
      <Text>Token: {fcmToken ? '✅ Registrado' : '❌ Não registrado'}</Text>
      
      <TouchableOpacity style={styles.button} onPress={sendTestNotification}>
        <Text style={styles.buttonText}>Testar FCM</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10, alignItems: 'center' },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  button: { backgroundColor: '#FF9500', padding: 10, borderRadius: 5, marginTop: 10 },
  buttonText: { color: 'white', fontWeight: 'bold' },
});
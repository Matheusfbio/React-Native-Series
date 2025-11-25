import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import messaging from '@react-native-firebase/messaging';

export default function SimpleNotificationTest() {
  const [status, setStatus] = useState('');

  const testFCM = async () => {
    try {
      setStatus('Obtendo token...');
      const token = await messaging().getToken();
      console.log('FCM Token:', token);
      
      setStatus('Token obtido! ✅');
      
      // Simular notificação local
      setTimeout(() => {
        setStatus('Notificação simulada enviada! 📱');
      }, 1000);
      
    } catch (error) {
      setStatus('Erro: ' + error.message);
      console.error('Erro FCM:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Teste FCM Simples</Text>
      
      <TouchableOpacity style={styles.button} onPress={testFCM}>
        <Text style={styles.buttonText}>Testar FCM</Text>
      </TouchableOpacity>
      
      <Text style={styles.status}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center', backgroundColor: '#f0f0f0', borderRadius: 10, margin: 10 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, marginBottom: 10 },
  buttonText: { color: 'white', fontWeight: 'bold' },
  status: { textAlign: 'center', marginTop: 10, fontSize: 14 },
});
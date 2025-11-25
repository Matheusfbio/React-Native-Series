import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { API_URL } from '@/utils/config';

export default function NetworkTest() {
  const [status, setStatus] = useState('');

  const testConnection = async () => {
    try {
      setStatus('Testando...');
      const response = await fetch(`${API_URL}/register-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          token: 'ExponentPushToken[test]', 
          userId: 'test' 
        })
      });
      
      if (response.ok) {
        setStatus('✅ Conectado!');
      } else {
        setStatus('❌ Erro HTTP: ' + response.status);
      }
    } catch (error) {
      setStatus('❌ Erro: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text>API: {API_URL}</Text>
      <TouchableOpacity style={styles.button} onPress={testConnection}>
        <Text style={styles.buttonText}>Testar Conexão</Text>
      </TouchableOpacity>
      <Text>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10, alignItems: 'center' },
  button: { backgroundColor: '#007AFF', padding: 10, borderRadius: 5, margin: 10 },
  buttonText: { color: 'white' },
});
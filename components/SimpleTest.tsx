import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function SimpleTest() {
  const [result, setResult] = useState('');

  const testUrls = async () => {
    const urls = [
      'http://10.0.2.2:3001',
      'http://192.168.0.107:3001'
    ];

    for (const url of urls) {
      try {
        setResult(`Testando ${url}...`);
        const response = await fetch(`${url}/register-token`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: 'ExponentPushToken[test]', userId: 'test' })
        });
        
        if (response.ok) {
          setResult(`✅ ${url} funcionou!`);
          return;
        }
      } catch (error) {
        console.log(`Erro com ${url}:`, error.message);
      }
    }
    setResult('❌ Nenhuma URL funcionou');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={testUrls}>
        <Text style={styles.buttonText}>Testar URLs</Text>
      </TouchableOpacity>
      <Text>{result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10, alignItems: 'center' },
  button: { backgroundColor: '#FF6B6B', padding: 10, borderRadius: 5 },
  buttonText: { color: 'white', fontWeight: 'bold' },
});
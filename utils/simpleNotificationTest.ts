// Teste simples sem dependências externas
export const testNotificationConnection = async () => {
  const urls = [
    'http://192.168.0.107:3001',
    'http://10.0.2.2:3001',
    'http://localhost:3001'
  ];

  for (const url of urls) {
    try {
      console.log(`Testando: ${url}`);
      const response = await fetch(`${url}/register-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          token: 'ExponentPushToken[test]', 
          userId: 'test' 
        }),
        timeout: 5000
      });
      
      if (response.ok) {
        console.log(`✅ Sucesso com: ${url}`);
        return url;
      }
    } catch (error) {
      console.log(`❌ Falhou: ${url} - ${error.message}`);
    }
  }
  
  throw new Error('Nenhuma URL funcionou');
};
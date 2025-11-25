import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';

export class LocalNotificationService {
  static async initialize() {
    // Solicitar permissão
    const authStatus = await messaging().requestPermission();
    const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                   authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('✅ Permissão de notificação concedida');
      
      // Obter token
      const token = await messaging().getToken();
      console.log('🔥 FCM Token:', token);
      
      // Configurar listeners
      this.setupListeners();
      
      return token;
    } else {
      Alert.alert('Permissão negada', 'Ative as notificações nas configurações');
      return null;
    }
  }

  static setupListeners() {
    // Notificação em foreground
    messaging().onMessage(async remoteMessage => {
      console.log('📱 Notificação recebida:', remoteMessage);
      Alert.alert(
        remoteMessage.notification?.title || 'Notificação',
        remoteMessage.notification?.body || 'Nova mensagem'
      );
    });

    // App aberto via notificação
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('📱 App aberto via notificação:', remoteMessage);
    });
  }

  static async sendTestNotification() {
    // Para teste, vamos simular uma notificação local
    Alert.alert(
      '💰 Novo Gasto',
      'R$ 25,00 em Alimentação. Restante: R$ 475,00',
      [{ text: 'OK' }]
    );
  }
}
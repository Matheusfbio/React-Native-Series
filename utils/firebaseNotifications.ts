import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid, Platform } from 'react-native';

export class FirebaseNotificationService {
  static async requestPermission() {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    }
    
    const authStatus = await messaging().requestPermission();
    return authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
           authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  }

  static async getToken() {
    try {
      const token = await messaging().getToken();
      console.log('🔥 FCM Token:', token);
      return token;
    } catch (error) {
      console.error('Erro ao obter FCM token:', error);
      return null;
    }
  }

  static setupNotificationListeners() {
    // Notificação recebida em foreground
    messaging().onMessage(async remoteMessage => {
      console.log('📱 Notificação em foreground:', remoteMessage);
    });

    // Notificação clicada (app em background)
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('📱 Notificação clicada (background):', remoteMessage);
    });

    // App aberto via notificação (app fechado)
    messaging().getInitialNotification().then(remoteMessage => {
      if (remoteMessage) {
        console.log('📱 App aberto via notificação:', remoteMessage);
      }
    });
  }

  static async registerToken(userId: string) {
    const hasPermission = await this.requestPermission();
    if (!hasPermission) return null;

    const token = await this.getToken();
    if (token && userId) {
      // Salvar token no backend
      try {
        const { API_URL } = require('./networkConfig');
      await fetch(`${API_URL}/register-fcm-token`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token, userId })
        });
      } catch (error) {
        console.error('Erro ao registrar FCM token:', error);
      }
    }
    return token;
  }
}
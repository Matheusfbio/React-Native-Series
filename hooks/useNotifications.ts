import { useEffect, useState } from 'react';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync } from '@/utils/notification';
import { PushNotificationService } from '@/utils/pushNotificationService';

export function useNotifications(userId?: string) {
  const [expoPushToken, setExpoPushToken] = useState<string>();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      setExpoPushToken(token);
      if (token && userId) {
        PushNotificationService.registerToken(token, userId);
      }
    });

    const notificationListener = Notifications.addNotificationReceivedListener(notification => {
      console.log('📱 Notificação recebida:', notification);
    });

    const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('📱 Resposta da notificação:', response);
    });

    return () => {
      notificationListener.remove();
      responseListener.remove();
    };
  }, [userId]);

  return { expoPushToken };
}
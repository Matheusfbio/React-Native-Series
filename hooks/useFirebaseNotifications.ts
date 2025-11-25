import { useEffect, useState } from 'react';
import { FirebaseNotificationService } from '@/utils/firebaseNotifications';

export function useFirebaseNotifications(userId?: string) {
  const [fcmToken, setFcmToken] = useState<string>();

  useEffect(() => {
    if (userId) {
      FirebaseNotificationService.registerToken(userId).then(token => {
        if (token) setFcmToken(token);
      });
      
      FirebaseNotificationService.setupNotificationListeners();
    }
  }, [userId]);

  return { fcmToken };
}
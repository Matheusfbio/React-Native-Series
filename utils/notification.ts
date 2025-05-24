// utils/notifications.ts
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

export async function registerForPushNotificationsAsync(): Promise<
  string | undefined
> {
  let token;

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert("Permissão para notificação negada!");
      return;
    }

    const { data } = await Notifications.getExpoPushTokenAsync();
    token = data;
    console.log("📱 Expo Push Token:", token);
  } else {
    alert("Você precisa de um dispositivo físico para notificações push.");
  }

  return token;
}

// Configura o comportamento da notificação
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

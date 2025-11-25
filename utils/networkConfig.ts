import { Platform } from 'react-native';

export const getApiUrl = () => {
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:3001'; // Emulador Android
  }
  return 'http://192.168.0.107:3001'; // iOS/dispositivo físico
};

export const API_URL = getApiUrl();
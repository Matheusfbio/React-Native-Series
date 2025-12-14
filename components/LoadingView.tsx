import React from 'react';
import { View, ActivityIndicator, StyleSheet, useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';

const LoadingView = () => {
  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors[colorScheme ?? 'light'].tint} />
    </View>
  );
};

const createStyles = (colorScheme: 'light' | 'dark' | null | undefined) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors[colorScheme ?? 'light'].background,
    },
  });

export default LoadingView;

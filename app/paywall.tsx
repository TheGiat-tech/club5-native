import React from 'react';
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function PaywallWeb() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <Text style={{ textAlign: 'center' }}>
        In-app purchases are not available on the web version. Please use the mobile app to manage
        your subscription.
      </Text>
      <View style={{ marginTop: 16 }}>
        <Button title="Back to home" onPress={() => router.push('/')} />
      </View>
    </View>
  );
}

import React, { useCallback } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, Text, View, Button } from 'react-native';
import Constants from 'expo-constants';
import { Linking } from 'expo';

export default function App() {
  const handleRedirect = ({ url }) => {
    if (Constants.platform.ios) {
      WebBrowser.dismissBrowser();
    } else {
      removeLinkingListener();
    }

    let data = Linking.parse(url);
    console.log(data);
  }

  const addLinkingListener = () => {
    Linking.addEventListener('url', handleRedirect);
  }

  const removeLinkingListener = () => {
    Linking.removeEventListener('url', handleRedirect);
  }

  const onPress = useCallback(async () => {
    addLinkingListener();

    try {
      const result = await WebBrowser.openBrowserAsync(
        'https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_HF4KzTyLQxu32PlIbsP1BOyQCHQQmr0f&scope=read_write',
      );
  
      if (Constants.platform.ios) {
        removeLinkingListener();
      }

      console.log(result);
    } catch (err) {
      console.error(err);
    }
  }, [])

  return (
    <View style={styles.container}>
      <Button 
        onPress={onPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

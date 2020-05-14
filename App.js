import React, { useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
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

  const onPressOne = async () => {
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
  };

  const onPressTwo = async () => {
    try {
      const result = await WebBrowser.openAuthSessionAsync(
        'https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_HF4KzTyLQxu32PlIbsP1BOyQCHQQmr0f&scope=read_write',
      );

      console.log(result);
    } catch(err) {
      console.error(err);
    }
  }

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: 'ca_HF4KzTyLQxu32PlIbsP1BOyQCHQQmr0f',
      responseType: 'code',
      scopes: ['read_write'],
      redirectUri: 'https://us-central1-evolve-56e68.cloudfunctions.net/processStripeConnect/stripe/oauth',
    },
    {
      authorizationEndpoint: 'https://connect.stripe.com/oauth/authorize',
    }
  );

  useEffect(() => {
    console.log(request, response);
  }, [request, response]);

  return (
    <View style={styles.container}>
      <Button 
        title="Press Me"
        onPress={promptAsync}
        disabled={!request}
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

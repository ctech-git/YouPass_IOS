
import React, { Component } from 'react';
import {
  SafeAreaView, StyleSheet, ScrollView, View,
  Text, StatusBar
} from 'react-native';

import { Header, LearnMoreLinks, Colors, DebugInstructions, ReloadInstructions } from 'react-native/Libraries/NewAppScreen';
import { LoginButton, GraphRequest, GraphRequestManager, AccessToken } from 'react-native-fbsdk';

export default class Login extends Component {

  _responseInfoCallback(error, result) {
  if (error) {
    console.log('Error fetching data: ' + error);
  } else {
    console.log('Success fetching data: ' + JSON.stringify(result));
  }
}

async getInfo(){
  const currentAccessToken = await AccessToken.getCurrentAccessToken()
  const infoRequest = new GraphRequest(
    '/me',
    {
      accessToken: currentAccessToken.accessToken,
      parameters: {
        fields: {
          string: 'picture.type(large)',
        },
      },
    },
    this._responseInfoCallback,
  );

  new GraphRequestManager().addRequest(infoRequest).start();
}

  render() {
    return (
      <>
        <StatusBar   color="white"
          barStyle="light-content"
          translucent={true}
           />
        <SafeAreaView>
          <ScrollView>
            <View>
              <LoginButton
                publishPermissions={["email"]}
                onLoginFinished={
                  (error, result) => {
                    this.getInfo();
                    console.log(error, result);

                    if (error) {
                      console.log("Login failed with error: " + error.message);
                    } else if (result.isCancelled) {
                      console.log("Login was cancelled");
                    } else {
                      console.log("Login was successful with permissions: " + result.grantedPermissions)
                    }
                  }
                }
                onLogoutFinished={() => console.log("User logged out")} />
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}


const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

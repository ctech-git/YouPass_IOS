import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();
import { Platform, Modal, StyleSheet, TouchableHighlight, Alert, View } from 'react-native';
import { connect } from 'react-redux';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { WebView } from 'react-native-webview';
import Toast from 'react-native-simple-toast';
import dados from '../dados';

const Tab = createMaterialTopTabNavigator();
function ModalCheckout({ token, navigation, modalState, setModalState, dispatch, dadosUser, setdadosUser }) {

  function Geturl(event) {

    if (event.url == 'https://api.youpass.portalctech.com.br/checkout/endpoint.php') {
      dispatch({ type: 'isActive', isActive: 2 });
      setModalState(false);
    } else if (event.url == 'https://api.youpass.portalctech.com.br/checkout/endpoint2.php') {
      Alert.alert('Atenção', 'Finalize Seu Cadastro, Faltam Algumas Informações',
        [{ text: 'OK', onPress: () => aux100() }], { cancelable: false });
    }

  }

  function aux100() {
    setModalState(false);
    //TODO
    navigation.navigate("Dados");
  }

  return (
    <>
      <Modal visible={modalState} animationType="slide" onRequestClose={() => setModalState(false)}>
        <TouchableHighlight style={styles.buttonClose} onPress={() => { setModalState(false) }}>
          <Icon name="close" style={styles.icon} size={32} />
        </TouchableHighlight>
        <WebView
          source={{ uri: 'https://api.youpass.portalctech.com.br/checkout/index.php?token=' + token }}
          onNavigationStateChange={(event) => { Geturl(event) }}
        />
      </Modal >
    </>
  );

}

const styles = StyleSheet.create({
  icon: {
    margin: 15,
    color: "white"
  },
  buttonClose: {
    flexDirection: "row",
    backgroundColor: "#000000",
    justifyContent: "space-between",
    paddingTop: Platform.OS === 'ios' ? 20 : 0
  }, card: {
    width: 50
  }
})


export default connect(state => ({ token: state.token }))(ModalCheckout)

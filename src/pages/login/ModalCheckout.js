import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();
import {
  Image, AppRegistry, Text, View, TextInput, Platform, Modal, Dimensions,
  TabBar, StatusBar, StyleSheet, TouchableWithoutFeedback,
  TouchableHighlight, Alert
} from 'react-native';
import {
  Linha, ButtonStyled, ButtonText2, ButtonText, Container, ContainerCreateAccount, ContainerButtonGoogle,
  ContainerLogin, GoogleButtonText, ImageGoogleIcon, Logo, Logo2, TextTitle3, TextTitle5,
  Busca, Cabecalho, Select, Container2, View2, TextosContainer, TextTitle2, TextTitle4, ButtonPlano,
  Caixa, TextTitle1, TextTituleModal, TextTituleModal2, TextDados5, TextosContainer5, ContainerButtonFacebook,
  TextDados6, TextDados4, TextDados42, COD, COD2, TextosContainer6, TextDados7, TextDados2, TextosContainerRedeSocial, TextDados8
} from './styles2';
import api from '../../services/api';
import { connect } from 'react-redux';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { WebView } from 'react-native-webview';
import Toast from 'react-native-simple-toast';


const Tab = createMaterialTopTabNavigator();
function ModalCheckout({ setModalStateDados, token, init, isActive, setdadosUser, dadosUser, setModalStatus, navigation, modalState, setModalState, dispatch }) {

  function Geturl(event) {
    console.log(event.url);
    if (event.url == 'https://api.youpass.portalctech.com.br/checkout/endpoint.php') {
      dispatch({
        type: 'isActive',
        isActive: 2
      });
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
          <Icon name="close" style={styles.icon} size={25} />
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


export default connect(state => ({ isActive: state.isActive, token: state.token }))(ModalCheckout)

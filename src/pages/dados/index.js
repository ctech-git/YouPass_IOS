import React, { useState, useEffect, useRef } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();
import {
  PixelRatio, Platform, Modal, View, StatusBar, TabBar,
  StyleSheet, Plataform, TouchableHighlight, Text, TouchableWithoutFeedback, Alert
} from 'react-native';
import { TextTituleModal, TextDados, CaixaDados, CaixaPrincipal, TextDados4, InputBusca } from './styles';
import api from '../../services/api';
import { connect } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import Toast from 'react-native-simple-toast';
import TabNavigator from '../../componentes/tabNavigator';
import { cpfCnpjMask } from '../../util/strings';
import ComponentDadosPessoais from './DadosPessoais';
import ComponentEndereco from './Endereco';
import Loader from '../../util/loader';




function ModalDados({ navigation, dispatch, token }) {

  const [checkCPF, setCheckCPF] = useState(false);
  const [check_load, SetCheckLoad] = useState(false);

  const [dados, setDados] = useState({
    nomeAtual: null,
    cpfAtual: null,
    emailAtual: null,
    generoAtual: null,
    nascimentoAtual: null,
    telefoneAtual: null,
    login: null,
  });

  const [endereco, setEndereco] = useState({
    cepAtual: null,
    ruaAtual: null,
    complementoAtual: null,
    bairroAtual: null,
    cidadeAtual: null,
  });




  useEffect(() => {

    async function busca() {
      try {
        const response = await api.get('/busca/buscaUser_New.php', { params: { token: token } })
          .then(data => {

            if (data.data == "0") {
              Toast.show('User Invalido', Toast.LONG);
            } else {

              if (data?.data?.cpf == "NULL" || data?.data?.cpf == null) {
                setCheckCPF(true);
              } else {
                setCheckCPF(false);
              }

              setDados(prev => ({
                ...prev,
                nomeAtual: data?.data?.name,
                cpfAtual: data?.data?.cpf,
                emailAtual: data?.data?.email,
                generoAtual: data?.data?.genero,
                nascimentoAtual: data?.data?.date_birth,
                telefoneAtual: data?.data?.telefone,
                login: data?.data?.type,
              }))
              setEndereco(prev => ({
                ...prev,
                cepAtual: data?.data?.cep,
                ruaAtual: data?.data?.endereco,
                complementoAtual: data?.data?.complemento,
                bairroAtual: data?.data?.bairro,
                cidadeAtual: data?.data?.cidade
              }))

            }
          }).catch(error => {
            console.log(error);
          })
      } catch (error) {
        console.log(error);
      }
    }

    busca();

  }, [token])


  return (
    <>
      {/* <Loader loading={check_load} /> */}
      <View style={styles.header}>
        <TouchableHighlight style={styles.buttonClose} onPress={() => { navigation.navigate("PerfilInterno"); }}>
          <Icon name="arrow-left" style={styles.icon} size={25} />
        </TouchableHighlight>
        <TextTituleModal>Dados Da Conta</TextTituleModal>
      </View>
      <TabNavigator
        NomeTab={["Conta", "Endereço"]}
        ComponenteTab={[
          ComponentDadosPessoais,
          ComponentEndereco
        ]}
        props={{
          'checkCPF': checkCPF,
          'dados': dados,
          'setDados': setDados,
          'token': token
        }}
      />
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
    backgroundColor: "#000",
    justifyContent: "flex-end"
  }, header: {
    flexDirection: "row",
    backgroundColor: "#000",
    justifyContent: "flex-start",
    paddingTop: Platform.OS === 'ios' ? 20 : 10,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10

  }, scene: {
    flex: 1,
  }, menu: {
    backgroundColor: "#000",
    color: "#000",
  }, input_dados: {
    backgroundColor: "#000",
    color: "#fff"
  }, input_dados2: {
    backgroundColor: "#000",
    color: "#808080"
  }, select: {
    color: "#fff",
    backgroundColor: "#fff",
  }, placeholder: {
    color: 'white',
    marginLeft: '10%',
    backgroundColor: 'black',
    maxWidth: 80,
    textAlign: 'center',
    zIndex: 2,
    fontSize: 12
  }
})

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    color: 'white',
    marginLeft: 20, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    color: 'white',
    marginLeft: '4%', // to ensure the text is never behind the icon
    fontSize: 14,
    width: '90%',
    marginTop: -8,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#f8f9fa63',
  }
});

export default connect(state => ({ token: state.token }))(ModalDados)

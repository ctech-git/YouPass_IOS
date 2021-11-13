import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();
import {
  Image, AppRegistry, Text, View, TextInput, Platform, Modal, Dimensions,
  TabBar, StatusBar, StyleSheet, TouchableWithoutFeedback,
  TouchableHighlight, FlatList, Alert
} from 'react-native';
import { ContainerPlano, ButtonStyledCancelar, ContainerX, Container2 } from './styles2';
import api from '../../services/api';
import { connect } from 'react-redux';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage'


const Tab = createMaterialTopTabNavigator();
function ModalStatus({ token, isActive, navigation, dadosCompra, setdadosCompra, modalState, setModalState, dispatch, setModalState2 }) {

  const [compras, setcompras] = useState(false);
  useEffect(() => {
    buscaCompras();
  }, [modalState])


  async function cancelarPlano() {
    var DataDeHoje = new Date();
    var DataDe7Dias = (dadosCompra.data7dias).split(" ")[0];
    DataDe7Dias = new Date(DataDe7Dias);
    var DataPacote = (dadosCompra.tempoPacote).split(" ")[0];
    DataPacote = new Date(DataPacote);

    if (DataDeHoje > DataDe7Dias) {
      var timeDiff = Math.abs(DataPacote.getTime() - DataDe7Dias.getTime());
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

      if (diffDays > 31) {
        ///CANCELAMENTO COM MULTA
        Alert.alert(
          'Você tem certeza? Está sujeito a taxas',
          'Pense bem...',
          [
            { text: 'Não', onPress: () => console.log(""), style: 'cancel' },
            {
              text: 'Sim', onPress: async () => {
                var i = compras.length;
                const response = await api.get('/busca/cancelamento.php',
                  { params: { token: token, id: compras[i - 1].id, pagseguro_token: compras[i - 1].token_pagseguro } }).then(data => {
                    if (data.data == 0) {
                      Toast.show('Não foi Possivel Cancelar', Toast.LONG);
                    } else {
                      Toast.show('Cancelamento Solicitado. Nossa Equipe Entrará em Contato Por Email', Toast.LONG);
                    }
                  })
              }
            },
          ]
        );

      } else {
        ///CANCELAMENTO COM GRATIS NO FIM DO PLANO
        Alert.alert(
          'Você tem certeza?',
          'Pense bem...',
          [
            { text: 'Não', onPress: () => console.log(""), style: 'cancel' },
            {
              text: 'Sim', onPress: async () => {
                var i = compras.length;
                const response = await api.get('/busca/cancelamentoGratis.php',
                  { params: { token: token, id: compras[i - 1].id, pagseguro_token: compras[i - 1].token_pagseguro } }).then(data => {
                    if (data.data == 1) {
                      Toast.show('Não foi Possivel Cancelar', Toast.LONG);
                    } else {
                      dispatch({
                        type: 'isActive',
                        isActive: 0
                      });
                      Toast.show('Cancelada Com Sucesso', Toast.LONG);
                    }
                    pedding_pagseguro(compras[i - 1].id, compras[i - 1].token_pagseguro);
                  })
              }
            },
          ]
        );

      }

    } else {
      ///CANCELAMENTO 7 DIAS
      Alert.alert(
        'Você tem certeza?',
        'Pense bem...',
        [
          { text: 'Não', onPress: () => console.log(""), style: 'cancel' },
          {
            text: 'Sim', onPress: async () => {
              var i = compras.length;
              const response = await api.get('/busca/cancelamentoGratis.php',
                { params: { token: token, id: compras[i - 1].id, pagseguro_token: compras[i - 1].token_pagseguro } }).then(data => {
                  if (data.data == 1) {
                    Toast.show('Não foi Possivel Cancelar', Toast.LONG);
                  } else {
                    dispatch({
                      type: 'isActive',
                      isActive: 0
                    });
                    Toast.show('Cancelada Com Sucesso', Toast.LONG);
                  }
                  pedding_pagseguro(compras[i - 1].id, compras[i - 1].token_pagseguro);
                })
            }
          },
        ]
      );

    }

  }

  async function buscaCompras() {

    const response = await api.get('/busca/buscaUserCompra.php',
      { params: { token: token } }).then(data => {
        setdadosCompra(data.data);
        var aux = data.data.compras;
        aux.reverse()
        setcompras(aux);

        for (var i = 0;i < aux.length;i++) {

          if (aux[i].status == "PENDING" || aux[i].status == "") {
            pedding_pagseguro(aux[i].id, aux[i].token_pagseguro);
          }
        }
      })
  }
  async function pedding_pagseguro(id, pagseguro_token) {
    const response = await api.get('/busca/atualizaStatus.php',
      { params: { token: token, id: id, pagseguro_token: pagseguro_token } }).then(data => {
        buscaCompras();
      })
  }


  function FormataStringData(data) {
    if (data) {
      var dia = data.split("-")[2];
      var dia = dia.split(" ")[0];
      var mes = data.split("-")[1];
      var ano = data.split("-")[0];

      return ("0" + dia).slice(-2) + '/' + ("0" + mes).slice(-2) + '/' + ano;
    }
  }

  function FormataStringData2(data) {
    if (data) {
      var dia2 = data.split("-")[2];
      var dia = dia2.split(" ")[0];
      var horas2 = dia2.split(" ")[1];
      var horas = horas2.split(":")[0];
      var min = horas2.split(":")[1];
      var mes = data.split("-")[1];
      var ano = data.split("-")[0];

      return ("0" + dia).slice(-2) + '/' + ("0" + mes).slice(-2) + '/' + ano + ' às ' + horas + ':' + min;
    }
  }


  return (
    <>
      <Modal visible={modalState} animationType="slide" onRequestClose={() => setModalState(false)}>


        <View style={styles.buttonClose}>
          <TouchableWithoutFeedback >
            <Icon />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => { setModalState(false) }}>
            <Icon name="close" style={styles.icon} size={25} />
          </TouchableWithoutFeedback>
        </View>
        <Container2>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={{ fontSize: 22, color: '#fff', justifyContent: 'center' }}>
              Dados do Plano
            </Text>
          </View>
          <ContainerPlano>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ marginLeft: 5, marginRight: 5, fontSize: 16, color: '#fff' }}>
                Plano Assinado:
              </Text>
              <Text style={{ color: '#fed531', fontSize: 15, marginTop: 2 }}>
                {dadosCompra.plano}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ marginLeft: 5, marginRight: 5, fontSize: 14, color: '#fff' }}>
                Status:
              </Text>
              {isActive == 1 ? (
                <Text style={{ color: '#fed531', fontSize: 14, marginTop: 2 }}>
                  Aguardando Pagamento
                </Text>
              ) : (
                isActive == 2 ? (
                  <Text style={{ color: '#fed531', fontSize: 14, marginTop: 2 }}>
                    Ativo
                  </Text>
                ) : (
                  <Text style={{ color: '#fed531', fontSize: 14, marginTop: 2 }}>
                    Desativado
                  </Text>
                )
              )}

            </View>
          </ContainerPlano>
          <View style={{ flexDirection: 'row', marginLeft: '5%' }}>
            <Text style={{ marginLeft: 5, marginRight: 5, fontSize: 14, color: '#fff' }}>Data de Assinatura: </Text>
            <Text style={{ color: '#fed531', fontSize: 14, marginTop: 2 }}>{FormataStringData(dadosCompra.dataPacote)}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginLeft: '5%' }}>
            <Text style={{ marginLeft: 5, marginRight: 5, fontSize: 14, color: '#fff' }}>Cancelamento Grátis até: </Text>
            <Text style={{ color: '#fed531', fontSize: 14, marginTop: 2 }}>{FormataStringData(dadosCompra.data7dias)}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginLeft: '5%' }}>
            <Text style={{ marginLeft: 5, marginRight: 5, fontSize: 14, color: '#fff' }}>Renovação do Plano: </Text>
            <Text style={{ color: '#fed531', fontSize: 14, marginTop: 2 }}>{FormataStringData(dadosCompra.tempoPacote)}</Text>
          </View>
          <ButtonStyledCancelar onPress={() => { cancelarPlano() }}>
            <Text style={{ fontSize: 18, color: '#000' }}>Cancelar Plano</Text>
          </ButtonStyledCancelar>

          <ContainerX>
            <Text style={{ justifyContent: 'center', fontSize: 14, color: '#fff', marginBottom: 10 }}>
              Historico de Transações: </Text>
            <FlatList
              data={compras}
              ListEmptyComponent={() => (
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                  <Text style={{ textAlign: 'center', fontSize: 18, color: '#fff' }}>Nenhuma Transação</Text>
                </View>
              )}
              renderItem={({ item }) =>
                <View
                  style={{
                    borderColor: '#808080', borderWidth: 1,
                    borderRadius: 5, padding: 5, margin: 2
                  }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ marginLeft: 5, marginRight: 5, fontSize: 12, color: '#fff' }}>Efetuada Em: </Text>
                    <Text style={{ color: '#808080', fontSize: 12 }}>{FormataStringData2(item.data_pedido)}</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ marginLeft: 5, marginRight: 5, fontSize: 12, color: '#fff' }}>Status da Transação: </Text>
                    <Text style={{ color: '#fed531', fontSize: 12 }}>{item.status}</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ marginLeft: 5, marginRight: 5, fontSize: 12, color: '#fff' }}>Id da Transação: </Text>
                    <Text style={{ color: '#808080', fontSize: 12 }}>{item.id}</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ marginLeft: 5, marginRight: 5, fontSize: 12, color: '#fff' }}>Nome do Cartão: </Text>
                    <Text style={{ color: '#808080', fontSize: 12 }}>{item.nome_cartao}</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ marginLeft: 5, marginRight: 5, fontSize: 12, color: '#fff' }}>Bandeira do Cartão: </Text>
                    <Text style={{ color: '#808080', fontSize: 12 }}>{item.forma_pagamento}</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ marginLeft: 5, marginRight: 5, fontSize: 12, color: '#fff' }}>Plano: </Text>
                    <Text style={{ color: '#808080', fontSize: 12 }}>{item.nome_pagseguro}</Text>
                  </View>
                </View>
              }
              keyExtractor={item => item.id}
            />
            <View style={{ marginBottom: 20 }}>

            </View>
          </ContainerX>

        </Container2>
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


export default connect(state => ({ isActive: state.isActive, cod: state.cod, favorito: state.favoritos, name: state.name, surname: state.surname, token: state.token, email: state.email }))(ModalStatus)

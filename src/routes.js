import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Login from './pages/login';
import Profile from './pages/profile';
import Buscar from './pages/buscar';
import Historico from './pages/historico';
import Restaurante from './pages/restaurante';
import Notificacao from './pages/notificacao';
import Dados from './pages/dados';
import AsyncStorage from '@react-native-community/async-storage'
import api from './services/api';
import OneSignal from 'react-native-onesignal';
import PushNotification from './pages/util/pushNotification.js';

function Routes({ dispatch }) {
  const [check, SetCheck] = useState(false);
  const [text, SetText] = useState('');
  const [type, SetType] = useState('');
  const [nome, SetNome] = useState('');
  const [titulo, SetTitulo] = useState('');
  const [url, SetUrl] = useState('');
  const [imagem, SetImagem] = useState('');

  useEffect(() => {

    var token = "";
    var email = "";
    var cidadeDeUso = "";
    var surname = "";
    var name = "";
    console.log("+++++++++++++++++++++++=")

    AsyncStorage.getItem('token').then(value => {
      if (value != null) {
        var array = JSON.parse(value);
        console.log(array)
        token = array[0].token;
        cidadeDeUso = array[0].cidadeDeUso;
        if (token) {
          email = array[0].email;
          surname = array[0].surname;
          codigo = array[0].codigo;
          OneSignal.setExternalUserId(codigo);
          name = array[0].name;
          favoritos = array[0].favoritos;
          picture = array[0].picture;
          dispatch({ type: 'login', name: name, token: token, surname: surname, cod: codigo, email: email, favoritos: favoritos, picture: picture })
          dispatch({ type: 'city', city: cidadeDeUso })
          aux(token);

        } else {
          dispatch({
            type: 'city',
            city: cidadeDeUso
          })
        }

      } else {
        console.log("Dados Vazios no Async Storage")
        dispatch({
          type: 'city',
          city: 2
        })
      }
    });
    /////////////////////////////////////////////////////////////////////
    OneSignal.setLogLevel(6, 0);
    OneSignal.inFocusDisplaying(2);
    // set kOSSettingsKeyAutoPrompt to false prompting manually on iOS
    OneSignal.init("094eadec-eafb-4112-a5a7-a5da2b38bf6e", { kOSSettingsKeyAutoPrompt: true, kOSSettingsKeyInFocusDisplayOption: 2 });
    OneSignal.setSubscription(true);
    OneSignal.addEventListener('received', onReceived);
    OneSignal.addEventListener('ids', onIds);
    OneSignal.addEventListener('opened', onOpened);
    /////////////////////////////////////////////////////////////////////
  }, []);


  //Identifica Notificações que chegam com o aplicativo aberto
  // Serve para atualizar o contador
  function onReceived(Result) {
    dispatch({
      type: 'New_notification'
    })
    if (Result.payload) {


    }
  }

  function onOpened(Result) {

    if (Result.notification.payload) {
      ///////// Ao clicar na notificação executar essa função
      var type = Result.notification.payload.additionalData.type;
      var titulo = Result.notification.payload.body;
      var texto = Result.notification.payload.additionalData.mensage;
      SetText(texto);
      SetTitulo(titulo);
      SetType(type);
      if (type == 1) {
        SetCheck(true);
      } else if (type == 2) {
        SetCheck(true);
        var imagem = Result.notification.payload.additionalData.imagem;
        var url = Result.notification.payload.additionalData.url;
        SetUrl(url);
        SetImagem(imagem);
      } else {
        console.log("error");
      }

    } else {
      console.log("Result is undefined");
    }
  }

  function onIds(device) {
  }

  const Stack = createStackNavigator();
  const Tab = createMaterialBottomTabNavigator();

  async function aux(token) {

    const response = await api.get('/busca/isActive.php',
      { params: { token: token } })
      .then(data => {
        var value = data.data.isActive;

        dispatch({
          type: 'isActive',
          isActive: value
        });
      });

  }
  function InternalRoutesPERFIL() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="PerfilInterno" component={Login} options={{
          headerShown: false,
        }} />
        <Stack.Screen name="Dados" component={Dados} options={{
          headerShown: false,
        }} />
      </Stack.Navigator>
    )
  }

  function InternalRoutes() {
    return (
      <Tab.Navigator
        initialRouteName="Inicio"
        shifting={true}
        activeColor='#fed531'
        activeTintColor='#fed531'
        inactiveColor='#fff'

      >
        <Tab.Screen name="Inicio" component={Profile} options={{
          title: 'Inicio',
          tabBarIcon: (color) => {
            if (color.focused) {
              return (<Icon name='home' color='#fed351' size={28} />);
            } else {
              return (<Icon name='home' color='white' size={28} />);
            }
          },
          tabBarColor: '#000000',
        }} />
        <Tab.Screen name="Buscar" component={Buscar}
          listeners={{
            tabPress: e => {
              dispatch({
                type: 'setCat2',
                value: '0'
              });

            },
          }}
          options={{
            title: 'Buscar',
            tabBarIcon: (color) => {
              if (color.focused) {
                return (<Icon name='search' color='#fed351' size={28} />);
              } else {
                return (<Icon name='search' color='white' size={28} />);
              }
            },
            tabBarColor: '#000000'
          }} />
        <Tab.Screen name="Historico" component={Historico} options={{
          title: 'Historico',

          tabBarIcon: (color) => {
            if (color.focused) {
              return (<Icon name='receipt' color='#fed351' size={28} />);
            } else {
              return (<Icon name='receipt' color='white' size={28} />);
            }
          },
          tabBarColor: '#000000',
        }} />
        <Tab.Screen name="Perfil" component={InternalRoutesPERFIL} options={{
          title: 'Perfil',
          tabBarIcon: (color) => {
            if (color.focused) {
              return (<Icon name='person' color='#fed351' size={28} />);
            } else {
              return (<Icon name='person' color='white' size={28} />);
            }
          },

          tabBarColor: '#000000',
        }} />
      </Tab.Navigator>
    );
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="home" component={InternalRoutes} options={{
            headerShown: false,
          }} />
        </Stack.Navigator>
      </NavigationContainer>
      <PushNotification check={check} text={text} type={type}
        titulo={titulo} SetCheck={SetCheck} url={url} imagem={imagem} nome={nome} />
    </>
  );
}

export default connect()(Routes);

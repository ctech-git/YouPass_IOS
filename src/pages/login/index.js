import React, { useState, useEffect } from 'react';
import {
    Platform, View, Modal, Linking, StyleSheet, TouchableHighlight,
    Alert, TouchableWithoutFeedback, Text
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();
import {
    ButtonStyled2, ButtonText2, ButtonText, Container, ContainerButtonGoogle,
    ContainerLogin, GoogleButtonText, ImageGoogleIcon, Logo,
    Logo2, TextTitle3, Cabecalho, Container2, TextosContainer, TextTitle2, TextTitle4,
    Caixa, TextTitle1, ContainerButtonApple
} from './styles';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import api from '../../services/api';
import Loader from '../../util/loader';
import ModalOutros from './Outros';
import ModalFavoritos from './ModalFavoritos';
import ModalIndique from './ModalIndique';
import ModalCheckout from './ModalCheckout';
import ModalStatus from './ModalStatus';
import ModalFunciona from './ModalFunciona';
import ModalTermo from './ModalTermo';
import ModalInfo from './ModalInfo';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage'
import Toast from 'react-native-simple-toast';

import { appleAuth, AppleAuthError } from '@invertase/react-native-apple-authentication';

GoogleSignin.configure({
    scopes: [],
    webClientId: '471068062752-mcse50gv8tuffbudu6m5vlfirrr3255h.apps.googleusercontent.com' //Criar outro projeto e mudar esse clienteId
});

function Login({ picture, isActive, favorito, cod, navigation, dispatch, token, name, surname, email }) {
    const [modalOutrosState, setModalOutrosState] = useState(false);
    const [modalStatus, setModalStatus] = useState(false);
    const [dadosUser, setdadosUser] = useState([]);
    const [modalFavoritosState, setModalFavoritosState] = useState(false);
    const [modalFuncionaState, setModalFuncionaState] = useState(false);
    const [modalIndiqueState, setModalIndiqueState] = useState(false);
    const [ModalCheckoutState, setModalCheckoutState] = useState(false);
    const [modalTermoState, setModalTermoState] = useState(false);
    const [modalInfoState, setModalInfoState] = useState(false);
    const [dadosCompra, setdadosCompra] = useState(false);
    const [verifica, setVerifica] = useState(false);
    const [check_load, SetCheckLoad] = useState(false);


    useEffect(() => {
        init();
    }, [token, favorito])

    function logout() {
        dispatch({ type: 'logout' });
        AsyncStorage.removeItem('token');
    }

    async function init() {
        SetCheckLoad(true)
        if (token != "" && token != null && token != undefined) {
            setVerifica(true);
            try {
                const response = await api.get('/busca/buscaUser_New.php', { params: { token: token } })
                    .then(data => {
                        if (data.data == "0") {
                            setdadosUser([])
                            SetCheckLoad(false);
                        } else {
                            setdadosUser(data?.data)
                            SetCheckLoad(false);
                        }
                    }).catch(error => {
                        console.log(error);
                        SetCheckLoad(false)
                    })
            } catch (error) {
                console.log(error);
            }
        } else {
            setVerifica(false);
            SetCheckLoad(false)
        }

        console.log("=====")
        console.log(verifica)

    }

    async function Dados() {
        //TODO
        navigation.navigate("Dados");
    }

    function gotoWhatsApp() {
        // window.location.href("wa.me//5594992623788")
        Linking.canOpenURL("whatsapp://send?").then(supported => {
            if (supported) {
                return Linking.openURL(`whatsapp://send?phone=5591991201524`);
            } else {
                return Linking.openURL(`whatsapp://send?phone=5591991201524`);
            }
        })
    }

    async function aux(token) {

        const response = await api.get('/busca/isActive.php',
            { params: { token: token } })
            .then(data => {
                console.log("-------------------");
                console.log(data);
                var value = data.data.isActive;
                console.log("isActive: " + value);
                dispatch({
                    type: 'isActive',
                    isActive: value
                });
            });

    }



    async function onAppleButtonPress() {
        try {
            const appleAuthRequestResponse = await appleAuth.performRequest({
                requestedOperation: appleAuth.Operation.LOGIN,
                requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
            });
            const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
            // use credentialState response to ensure the user is authenticated
            console.log("E=------------------------------------------------------------------------------------------------------")
            console.log(appleAuthRequestResponse);

            if (credentialState === appleAuth.State.AUTHORIZED) {

                /////////////////////////////
                const response = api.get('/login/login.php', {
                    params:
                        { token_id: appleAuthRequestResponse, type: 'apple' }
                })
                    .then(data => {
                        if (data.data == "token_invalido") {
                            Toast.show("Token Invalido", Toast.LONG);
                        } else if (data.data == "email_duplicado") {
                            Toast.show('Email Já Cadastrado', Toast.LONG);
                        } else {
                            var token = data.data.token;
                            var name = data.data.name;
                            var picture = data.data.picture;
                            var surname = data.data.surname;
                            var email = data.data.email;
                            var favoritos = data.data.favoritos;
                            var cidadeDeUso = data.data.cidadeDeUso;
                            var codigo = data.data.id;

                            var array = [];

                            array.push({
                                "codigo": codigo, "token": token, "name": name,
                                "surname": surname, "email": email, "favoritos": favoritos, "cidadeDeUso": cidadeDeUso, "picture": picture
                            });
                            AsyncStorage.setItem('token', JSON.stringify(array));
                            dispatch({
                                type: 'login', name: name,
                                token: token, surname: surname,
                                cod: codigo, email: email,
                                favoritos: favoritos,
                                picture: picture
                            });
                            dispatch({
                                type: 'city',
                                city: cidadeDeUso
                            })
                            aux(token)
                        }

                    })
                    .catch(error => {
                        console.log("E=--------------------------------------------------ERROR 0---------------------------------------------------")
                        console.log(error);
                        alert('Error ao salvar login - erro 500');
                    })

            } else {
                console.log("E=--------------------------------------------------ERROR 1---------------------------------------------------")
                alert("Falha no Login")
            }
        } catch (error) {
            console.log("E=--------------------------------------------------ERROR 2---------------------------------------------------")
            console.log(error)
            if (error.code === AppleAuthError.CANCELED) {
                alert("LOGIN CANCELED")
            }
            if (error.code === AppleAuthError.FAILED) {
                alert("LOGIN FAILED")
            }
            if (error.code === AppleAuthError.INVALID_RESPONSE) {
                alert("LOGIN INVALID_RESPONSE")
            }
            if (error.code === AppleAuthError.NOT_HANDLED) {
                alert("LOGIN NOT_HANDLED")
            }
            if (error.code === AppleAuthError.UNKNOWN) {
                alert("LOGIN UNKNOWN")
            }
        }

    }


    async function signInGoogle() {
        try {
            await GoogleSignin.signOut();
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            const userInfo = await GoogleSignin.signIn();
            var userToken = await GoogleSignin.getTokens();

            const response = await api.get('/login/login.php', { params: { token_id: userToken.idToken, type: 'google' } })
                .then(data => {
                    if (data.data == "token_invalido") {
                        Toast.show("Token Invalido", Toast.LONG);
                    } else if (data.data == "email_duplicado") {
                        Toast.show('Email Já Cadastrado', Toast.LONG);
                    } else {

                        var token = data.data.token;
                        var name = data.data.name;
                        var picture = data.data.picture;
                        var surname = data.data.surname;
                        var email = data.data.email;
                        var favoritos = data.data.favoritos;
                        var cidadeDeUso = data.data.cidadeDeUso;
                        var codigo = data.data.id;

                        var array = [];

                        array.push({
                            "codigo": codigo, "token": token, "name": name,
                            "surname": surname, "email": email, "favoritos": favoritos, "cidadeDeUso": cidadeDeUso, "picture": picture
                        });
                        AsyncStorage.setItem('token', JSON.stringify(array));
                        dispatch({
                            type: 'login', name: name,
                            token: token, surname: surname,
                            cod: codigo, email: email,
                            favoritos: favoritos,
                            picture: picture
                        });
                        dispatch({
                            type: 'city',
                            city: cidadeDeUso
                        })
                        aux(token)
                    }
                }).catch(error => {
                    console.log(error);
                })
        } catch (error) {

            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log(error);
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log(error);
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log(error);
            } else {
                console.log(error);
            }
        }
    }

    function getModalDados() {

        if (dadosUser.cpf == null || dadosUser.cidade == null || dadosUser.bairro == null || dadosUser.genero == null || dadosUser.telefone == null) {
            Alert.alert('Atenção', 'Finalize Seu Cadastro, Faltam Algumas Informações',
                [{ text: 'OK', onPress: () => navigation.navigate("Dados") }], { cancelable: false });
        } else {
            if (isActive == 0) {
                setModalCheckoutState(true)
            } else {
                setModalStatus(true)
            }
        }
    }
    return (
        <>
            <Loader loading={check_load} />

            {verifica ? (
                <>
                    <Container2 style={styles.Teste}>
                        <View style={{ paddingTop: 20, flexDirection: 'row', paddingBottom: 10 }}>
                            <TextosContainer style={{ marginTop: 10 }}>
                                {picture && picture != "NULL" ? (
                                    <Logo2 source={{ uri: picture }} />
                                ) : (
                                    <Logo2 source={require('../../images/person.jpeg')} />
                                )}

                            </TextosContainer>
                            <View style={{ marginTop: 30, marginLeft: 20, justifyContent: 'flex-start' }}>
                                <TextTitle2>{name} {surname}</TextTitle2>
                                <TextTitle3>{email}</TextTitle3>

                            </View>

                        </View>


                        <View style={{ marginTop: 25 }}>
                            <Cabecalho style={{ marginTop: 0 }}>Dados da Conta</Cabecalho>
                            {isActive == 0 ? (
                                <Caixa onPress={() => getModalDados()}>
                                    <Icon name="certificate" color="white" size={25} style={styles.iconCaixa} />
                                    <TextTitle1>Selecionar Plano</TextTitle1>
                                </Caixa>
                            ) : (
                                isActive == 1 ? (
                                    <Caixa onPress={() => getModalDados()}>
                                        <Icon name="certificate" color="white" size={25} style={styles.iconCaixa} />
                                        <TextTitle1>Ver Plano</TextTitle1>
                                    </Caixa>
                                ) : (
                                    isActive == 2 ? (
                                        <Caixa onPress={() => getModalDados()}>
                                            <Icon name="certificate" color="white" size={25} style={styles.iconCaixa} />
                                            <TextTitle1>Ver Plano</TextTitle1>
                                        </Caixa>
                                    ) : (
                                        <>
                                        </>
                                    )
                                )
                            )
                            }
                            <Caixa onPress={() => Dados()}>
                                <Icon name="user" color="white" size={25} style={styles.iconCaixa} />
                                <TextTitle1>Dados Pessoais</TextTitle1>
                            </Caixa>
                            <Caixa onPress={() => setModalFavoritosState(true)}>
                                <Icon name="heart" color="white" size={25} style={styles.iconCaixa} />
                                <TextTitle1>Favoritos</TextTitle1>
                            </Caixa>
                            <Caixa onPress={() => setModalIndiqueState(true)}>
                                <Icon name="angellist" color="white" size={25} style={styles.iconCaixa} />
                                <TextTitle1>Indique Um Amigo</TextTitle1>
                            </Caixa>
                            <Caixa onPress={() => setModalStatus(true)}>
                                <Icon name="money" color="white" size={25} style={styles.iconCaixa} />
                                <TextTitle1>Financeiro</TextTitle1>
                            </Caixa>
                            <Caixa onPress={() => logout()}>
                                <Icon name="share-square" color="white" size={25} style={styles.iconCaixa} />
                                <TextTitle1>Sair</TextTitle1>
                            </Caixa>

                        </View>
                        <View>
                            <Cabecalho>Duvidas e Sugestões</Cabecalho>
                            <Caixa onPress={() => setModalFuncionaState(true)} >
                                <Icon name="cogs" color="white" size={25} style={styles.iconCaixa} />
                                <TextTitle1>Como Funciona</TextTitle1>
                            </Caixa>
                            <Caixa onPress={() => setModalTermoState(true)}>
                                <Icon name="folder" color="white" size={25} style={styles.iconCaixa} />
                                <TextTitle1>Termo de Compromisso</TextTitle1>
                            </Caixa>
                            <Caixa onPress={() => gotoWhatsApp()}>
                                <Icon name="comments" color="white" size={25} style={styles.iconCaixa} />
                                <TextTitle1>Central de Atendimento</TextTitle1>
                            </Caixa>
                            <Caixa onPress={() => setModalInfoState(true)}>
                                <Icon name="info" color="white" size={25} style={styles.iconCaixa2} />
                                <TextTitle1>Sobre o App</TextTitle1>
                            </Caixa>
                        </View>

                        <ModalFavoritos navigation={navigation} modalState={modalFavoritosState} setModalState={setModalFavoritosState} />
                        <ModalFunciona navigation={navigation} modalState={modalFuncionaState} setModalState={setModalFuncionaState} />
                        <ModalIndique cod={cod} navigation={navigation} modalState={modalIndiqueState} setModalState={setModalIndiqueState} />
                        <ModalCheckout dadosUser={dadosUser} setdadosUser={setdadosUser} navigation={navigation} modalState={ModalCheckoutState} setModalState={setModalCheckoutState} />
                        <ModalStatus token={token} setModalState2={setModalCheckoutState} setdadosCompra={setdadosCompra} dadosCompra={dadosCompra} dadosUser={dadosUser} setdadosUser={setdadosUser} navigation={navigation} modalState={modalStatus} setModalState={setModalStatus} />
                        <ModalTermo navigation={navigation} modalState={modalTermoState} setModalState={setModalTermoState} />
                        <ModalInfo navigation={navigation} modalState={modalInfoState} setModalState={setModalInfoState} />
                    </Container2>
                </>
            ) : (

                <ContainerLogin>
                    <Container>
                        <Logo source={require('../../images/youpass.png')} resizeMode="contain" />
                        <TouchableHighlight onPress={() => signInGoogle()}>
                            <ContainerButtonGoogle>
                                <ImageGoogleIcon source={require('../../images/google.png')} resizeMode="contain" />
                                <GoogleButtonText >Fazer login com o Google</GoogleButtonText>
                            </ContainerButtonGoogle>
                        </TouchableHighlight >
                        {Platform.OS === 'ios' ? (
                            <TouchableHighlight onPress={() => onAppleButtonPress()}>
                                <ContainerButtonApple>
                                    <Icon name="apple" color="black" size={30} />
                                    <ButtonText style={{
                                        marginLeft: 20, color: "black", fontSize: 20
                                    }}>Sign in with Apple</ButtonText>
                                </ContainerButtonApple>
                            </TouchableHighlight >


                        ) : (
                            <></>
                        )}
                        <TouchableHighlight onPress={() => setModalOutrosState(true)}>
                            <ButtonStyled2>
                                <ButtonText2>Outros</ButtonText2>
                            </ButtonStyled2>
                        </TouchableHighlight >

                    </Container>

                    <ModalOutros navigation={navigation} modalState={modalOutrosState} setModalState={setModalOutrosState} />

                </ContainerLogin>
            )}


        </>
    );
}

const styles = StyleSheet.create({
    icon: {
        margin: 15,
        color: "black"
    },
    iconCaixa: {
        marginLeft: 10
    },
    iconCaixa2: {
        marginLeft: 20
    },
    buttonClose: {
        flexDirection: "row",
        backgroundColor: "#F5F5F5",
        justifyContent: "flex-end"
    }, Teste: {
        paddingTop: Platform.OS === 'ios' ? 20 : 0
    },
})
export default connect(state => ({ picture: state.picture, isActive: state.isActive, cod: state.cod, favorito: state.favoritos, name: state.name, surname: state.surname, token: state.token, email: state.email }))(Login)

import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'; Icon.loadFont();
import {
    Platform, Modal, StatusBar, StyleSheet, TouchableHighlight,
    View, KeyboardAvoidingView
} from 'react-native';
import {
    ContainerTitle, TextTitle, ButtonStyled2, ButtonStyled,
    ButtonText2, ButtonText, Container, ContainerButtonFacebook,
    ContainerLogin, SignUpLink, SignUpLinkText, Touch, Input,
    InputError, FacebookButtonText, LogoLogin
} from './OutrosStyle';
import api from '../../services/api';
import { AccessToken, GraphRequestManager, GraphRequest, LoginManager } from 'react-native-fbsdk';
import ModalResetPassword from '../resetPassword/index';
import ModalCreateUser from '../createUser/index';
import AsyncStorage from '@react-native-community/async-storage'
import { connect } from 'react-redux';
import { ScrollView, TouchableNativeFeedback } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-simple-toast';

let user = null;

function ModalOutros({ navigation, modalState, setModalState, dispatch }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [modalPasswordState, setModalPasswordState] = useState(false);
    const [modalState2, setModalState2] = useState(false);

    function handleFacebookLogin() {
        LoginManager.logOut();
        if (Platform.OS === "android") {
            LoginManager.setLoginBehavior("web_only")
        }

        LoginManager.logInWithPermissions(['public_profile', 'email']).then(
            function (result) {
                console.log(result)
                if (result.isCancelled) {
                    console.log('Login cancelled')
                } else {
                    getInfo();
                    console.log('Login success with permissions: ' + JSON.stringify(result.grantedPermissions))
                }
            },
            function (error) {
                console.log('Login fail with error: ' + error)
            }
        )
    }

    async function getInfo() {
        const currentAccessToken = await AccessToken.getCurrentAccessToken()
        const infoRequest = new GraphRequest(
            '/me',
            {
                accessToken: currentAccessToken.accessToken,
                parameters: {
                    fields: {
                        string: 'picture.type(large), email, name, first_name, last_name, gender, birthday',
                    },
                },
            },
            facebookResponseInfoCallback,
        );

        new GraphRequestManager().addRequest(infoRequest).start();
    }

    function facebookResponseInfoCallback(error, result) {
        if (error) {
            console.log('Error fetching data: ' + error);
        } else {
            console.log('Success fetching data: ' + JSON.stringify(result));
            var data = {
                name: result.name,
                email: result.email,
                image: result.picture.data?.url
            }

            const response = api.get('/login/login.php', { params: { token_id: result, type: 'facebook' } })
                .then(data => {

                    if (data?.data == "token_invalido") {
                        Toast.show('Token Invalido', Toast.LONG);
                    } else if (data?.data == "email_duplicado") {
                        Toast.show('Email Já Cadastrado', Toast.LONG);
                    } else {
                        ////////////////////////


                        var token = data?.data?.token;
                        var name = data?.data?.name;
                        var surname = data?.data?.surname;
                        var email = data?.data?.email;
                        var cidadeDeUso = data?.data?.cidadeDeUso;
                        var codigo = data?.data?.id;

                        var cpf = data?.data?.cpf;
                        var picture = data?.data?.picture;
                        var array = [];

                        array.push({
                            "codigo": codigo, "token": token, "name": name, "cidadeDeUso": cidadeDeUso,
                            "surname": surname, "email": email, "cpf": cpf, "picture": picture
                        });
                        AsyncStorage.setItem('token', JSON.stringify(array));
                        dispatch({
                            type: 'login',
                            name: name,
                            cod: codigo,
                            token: token,
                            surname: surname,
                            email: email,
                            picture: picture,
                            cpf: cpf
                        });
                        dispatch({
                            type: 'city',
                            city: cidadeDeUso
                        })
                        aux(token)
                    }
                    /////////////////////////
                })
                .catch(error => {
                    console.log(error);
                })

        }
    }


    function nativeLogin() {
        setError(false);
        if (email.length == 0 || password.length == 0) {
            setError('Preencha usuário e senha!');
        } else {
            const response = api.get('/login/login.php', { params: { email, password, type: 'native' } })
                .then(data => {
                    if (data?.data) {

                        var token = data?.data?.token;
                        var name = data?.data?.name;
                        var picture = data?.data?.picture;
                        var surname = data?.data?.surname;
                        var email = data?.data?.email;
                        var cidadeDeUso = data?.data?.cidadeDeUso;
                        var favoritos = data?.data?.favoritos;
                        var codigo = data?.data?.id;

                        var array = [];

                        array.push({
                            "codigo": codigo, "token": token, "name": name, "cidadeDeUso": cidadeDeUso,
                            "surname": surname, "email": email, "favoritos": favoritos, "picture": picture
                        });
                        AsyncStorage.setItem('token', JSON.stringify(array));
                        dispatch({
                            type: 'login',
                            cod: codigo,
                            name: name,
                            token: token,
                            surname: surname,
                            email: email,
                            favoritos: favoritos,
                            picture: picture
                        });
                        dispatch({
                            type: 'city',
                            city: cidadeDeUso
                        })
                        aux(token)
                        setModalState(false);
                    } else {
                        setError('Usuário ou senha incorretos');
                        console.log(data);
                    }
                })
                .catch(error => {
                    console.log(error);
                    setError('Usuário ou senha incorretos');
                })
        }
    }


    return (

        <Modal visible={modalState} animationType="slide" onRequestClose={() => setModalState(false)}>

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                enabled
            >
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ flex: 1 }}
                >
                    <TouchableHighlight style={styles.buttonClose} onPress={() => { setModalState(false) }}>
                        <Icon name="close" style={styles.icon} size={25} />
                    </TouchableHighlight>
                    <LogoLogin source={require('../../images/2.png')} />
                    <ContainerTitle>
                        <TextTitle>Faça login via E-mail</TextTitle>
                    </ContainerTitle>
                    <Input
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="Endereço de e-mail"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <Input
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="Senha"
                        value={password}
                        onChangeText={setPassword} secureTextEntry
                    />
                    {error ? (
                        <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                            <InputError>{error}</InputError>
                        </View>) : (<></>)}
                    <Touch onPress={() => nativeLogin()}>
                        <ButtonStyled>
                            <ButtonText>Entrar</ButtonText>
                        </ButtonStyled>
                    </Touch>
                    {/* <Touch onPress={() => handleFacebookLogin()}>
                        <ContainerButtonFacebook>
                            <Icon name="facebook" color="white" size={30} />
                            <ButtonText style={{
                                marginLeft: 20
                            }}>Facebook</ButtonText>
                        </ContainerButtonFacebook>
                    </Touch> */}
                    <SignUpLink>
                        <SignUpLinkText onPress={() => setModalPasswordState(true)}>
                            Recuperação de Senha!
                        </SignUpLinkText>
                        <SignUpLinkText onPress={() => setModalState2(true)}
                            style={{ textDecorationLine: "underline" }}>
                            Novo Usuário? Cadastre-se
                        </SignUpLinkText>
                    </SignUpLink>
                </ScrollView>
            </KeyboardAvoidingView>
            <ModalResetPassword navigation={navigation} modalState={modalPasswordState} setModalState={setModalPasswordState} />
            <ModalCreateUser navigation={navigation} modalState={modalState2} setModalState={setModalState2} />

        </Modal >

    );
}

const styles = StyleSheet.create({
    icon: {
        margin: 15,
        color: "black"
    },
    buttonClose: {
        flexDirection: "row",
        backgroundColor: "#ffffff",
        justifyContent: "flex-end",
        paddingTop: Platform.OS === 'ios' ? 20 : 0

    }
})

export default connect()(ModalOutros)

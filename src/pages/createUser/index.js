import React, { useState } from 'react';

import {Platform, ActivityIndicator, Modal, StyleSheet, Text, TouchableHighlight, TouchableWithoutFeedback, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';

import { ViewBlack,Touch,ButtonStyled, ButtonText, ButtomTextCode, ButtonContainer, ContainerCreateAccount, ContainerTitle, Input, Logo, TextEmail, TextTitle } from './styles';
import api from '../../services/api';
import { withTheme } from 'react-native-elements';
import Form from './form/index';
import Toast from 'react-native-simple-toast';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

export default function ModalCreateUser({ modalState, navigation, setModalState }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');

    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [nameError, setNameError] = useState('');
    const [surnameError, setSurnameError] = useState('');
    const [isSubmiting, setIsSubmiting] = useState(false);

    const [isChecked, setIsChecked] = useState(false);
    const [isTypingEmail, setTypingEmail] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const CELL_COUNT = 5;

    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });

    async function checkEmail() {

        setIsLoading(true);
        var data = {
            email
        };
        console.log(email);
        var action = 'checkEmail';
        data = JSON.stringify(data);
        const response = await api.post('/login/create.php', { data, action })
            .then(data => {

                data = data.data;
                console.log(data);
                setIsLoading(false);
                if (data == 'already_exists') {
                    Toast.show('Usuario já existe', Toast.LONG);
                } else if (data == true) {
                    setTypingEmail(false);
                } else {
                    console.log("Algum erro");
                }
            })
            .catch(error => {
                setIsLoading(false);
                console.log(error);
            })
    }

    async function checkCode() {
        console.log(value);
        setIsLoading(true);
        var data = {
            email,
            code: value
        };

        var action = 'checkCode';

        data = JSON.stringify(data);

        const response = await api.post('/login/create.php', { data, action })
            .then(data => {
                setIsLoading(false);
                console.log(data);
                if (data.data) {
                    setIsChecked(true)
                } else {
                    Toast.show('Código Inválido');
                }
            })
            .catch(error => {
                console.log(error);

            })
    }

    function validateForm() {
        var valid = true;

        if (password.length < 4) {
            setPasswordError('A senha precisa de pelo menos 4 caracteres')
            valid = false;
        } else {
            setPasswordError('');
        }
        if (confirmpassword != password) {
            setConfirmPasswordError('As senhas não são iguais');
            valid = false;
        } else {
            setConfirmPasswordError('')
        }
        if (name.length < 2) {
            setNameError('Seu nome não parece correto');
            valid = false;
        } else {
            setNameError('')
        }
        if (surname.length < 2) {
            setSurnameError('Seu sobrenome não parece correto');
            valid = false;
        } else {
            setSurnameError('');
        }

        if (valid) {
            finalize();
        }
    }

    async function finalize() {

        setIsSubmiting(true);
        var data = {
            email,
            name,
            surname,
            password
        };

        var action = 'createAccount';
        data = JSON.stringify(data);

         const response = await api.post('/login/create.php', { data, action })
             .then(data => {
                 console.log(data.data);
                 setIsSubmiting(false);
                 setModalState(false);
                 setIsChecked(false);
                 setTypingEmail(true);
                 Toast.show('Conta criada com sucesso', Toast.LONG);
             }).catch(error => {
                 setIsSubmiting(false);
                 console.log(error);
             })
    }

    return (
        <Modal visible={modalState}
            animationType="slide"    onRequestClose={() => setModalState(false)}>
        <ViewBlack>
            {isTypingEmail ? (
                <TouchableHighlight style={styles.buttonClose} onPress={() => { setModalState(false) }}>
                    <Icon name="close" style={styles.icon} size={25} />
                </TouchableHighlight>
            ) : (
                isChecked ? (
                    <TouchableHighlight style={styles.buttonClose}>
                        <>
                            <Icon name="close" onPress={() => { setModalState(false) }} style={styles.icon} size={25} />
                        </>
                    </TouchableHighlight>
                ) : (
                    <TouchableHighlight style={styles.buttonBack}>
                        <>
                            <Icon name="arrow-left" onPress={() => { setTypingEmail(true) }} style={styles.icon} size={25} />
                            <Icon name="close" onPress={() => { setModalState(false) }} style={styles.icon} size={25} />
                        </>
                    </TouchableHighlight>
                )

                )}

            <ContainerTitle>
                <TextTitle>Vamos criar uma conta para você</TextTitle>
            </ContainerTitle>

            <ContainerCreateAccount>


                {!isChecked ? (
                    isTypingEmail ? (
                        <>
                            <TextEmail>Digite seu melhor email.</TextEmail>
                            <Input autoCapitalize="none" autoCorrect={false} placeholder="Digite seu melhor email" value={email} onChangeText={setEmail} />

                            {/* <Input autoCapitalize="none" autoCorrect={false} placeholder="Senha" value={password} onChangeText={setPassword} secureTextEntry />
                                <Input autoCapitalize="none" autoCorrect={false} placeholder="Confirmar Senha" value={confirmpassword} onChangeText={setConfirmPassword} secureTextEntry />  */}

                            <TouchableWithoutFeedback disabled={isLoading} onPress={() => checkEmail()}>
                                <ButtonStyled>
                                    <ButtonText>Enviar Código</ButtonText>
                                </ButtonStyled>
                            </TouchableWithoutFeedback>

                            <ActivityIndicator style={styles.loading} size="large" color="#000" animating={isLoading} />
                        </>
                    ) : (
                            <>
                                <TextEmail>Digite abaixo o código de verificação que enviamos para seu email</TextEmail>
                                <CodeField ref={ref} {...props} value={value} onChangeText={setValue} cellCount={CELL_COUNT}
                                    rootStyle={styles.codeFiledRoot} keyboardType="number-pad"
                                    renderCell={({ index, symbol, isFocused }) => (
                                        <Text
                                            key={index}
                                            style={[styles.cell, isFocused && styles.focusCell]}
                                            onLayout={getCellOnLayoutHandler(index)}>
                                            {symbol || (isFocused ? <Cursor /> : null)}
                                        </Text>
                                    )}
                                />
                                <TouchableWithoutFeedback disabled={value.length != CELL_COUNT} onPress={() => checkCode()}>
                                    <ButtonStyled style={{ marginTop: 30 }}>
                                        <ButtonText>Verificar</ButtonText>
                                    </ButtonStyled>
                                </TouchableWithoutFeedback>

                                <ActivityIndicator style={styles.loading} size="large" color="#000" animating={isLoading} />

                             {/*
                                <ButtonContainer>
                                  <ButtomTextCode>Reenviar Código</ButtomTextCode>
                                </ButtonContainer>
                            */}

                            </>
                        )
                ) : (
                        <View>
                            <Form setPassword={setPassword} setConfirmPassword={setConfirmPassword} setName={setName} setSurname={setSurname}
                                validateForm={validateForm} passwordError={passwordError} confirmPasswordError={confirmPasswordError}
                                nameError={nameError} surnameError={surnameError} isSubmiting={isSubmiting} />
                        </View>
                    )}
            </ContainerCreateAccount>
        </ViewBlack>
        </Modal >
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
        justifyContent: "flex-end",
        paddingTop: Platform.OS === 'ios' ? 20 : 0

    },
    buttonBack: {
        flexDirection: "row",
        backgroundColor: "#000",
        justifyContent: "space-between",
        paddingTop: Platform.OS === 'ios' ? 20 : 0

    },
    root: { flex: 1, padding: 20 },
    title: { textAlign: 'center', fontSize: 30 },
    codeFiledRoot: { marginTop: 20 },
    cell: {
        width: 60,
        height: 60,
        lineHeight: 60,
        fontSize: 24,
        backgroundColor: '#FFF',
        borderColor: 'transparent',
        textAlign: 'center',
        marginLeft: 10
    },
    focusCell: {
        borderColor: '#000',
    },
    loading: {
        marginTop: 20,
        opacity: 0.5,
    },

})

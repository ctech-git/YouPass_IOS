import React, { useState } from 'react';

import { Platform, ActivityIndicator, Modal, StyleSheet, Text, TouchableHighlight, TouchableWithoutFeedback, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; Icon.loadFont();
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';

import { ViewBlack, Touch, ButtonStyled, ButtonText, ButtomTextCode, ButtonContainer, ContainerCreateAccount, ContainerTitle, Input, Logo, TextEmail, TextTitle } from './styles';
import api from '../../services/api';
import { withTheme } from 'react-native-elements';
import FormPassword from './form/index';
import Toast from 'react-native-simple-toast';

export default function ModalResetPassword({ modalState, navigation, setModalState }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');

    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
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

        var action = 'checkEmail';

        data = JSON.stringify(data);

        const response = await api.post('/login/redefine.php', { data, action })
            .then(data => {
                console.log(data);

                data = data.data;
                setIsLoading(false);
                if (data.status == 'success') {
                    setTypingEmail(false);
                } else {
                    Toast.show(data.msg, Toast.LONG);
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

        const response = await api.post('/login/redefine.php', { data, action })
            .then(data => {
                setIsLoading(false);
                console.log(data);
                if (data.data) {
                    setIsChecked(true)
                } else {

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

        if (valid) {
            finalize();
        }
    }

    async function finalize() {

        setIsSubmiting(true);
        var data = {
            email,
            password
        };

        var action = 'saveNewPassword';
        data = JSON.stringify(data);

        const response = await api.post('/login/redefine.php', { data, action })
            .then(data => {
                setIsSubmiting(false);
                if (data.data) {
                    navigation.navigate('Perfil');
                    setModalState(false);
                } else {
                    console.log("errrooo");
                }
                console.log(data);

            })
            .catch(error => {
                setIsSubmiting(false);
                console.log(error);
            })
    }

    return (
        <Modal visible={modalState}
            animationType="slide"
            onRequestClose={() => setModalState(false)}>
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
                    <TextTitle>Redefinir senha</TextTitle>
                </ContainerTitle>

                <ContainerCreateAccount>
                    {!isChecked ? (
                        isTypingEmail ? (
                            <>
                                <TextEmail>Digite seu email.</TextEmail>
                                <Input autoCapitalize="none" autoCorrect={false} placeholder="Digite seu email" value={email} onChangeText={setEmail} />
                                <Touch disabled={isLoading} onPress={() => checkEmail()}>
                                    <ButtonStyled>
                                        <ButtonText>Enviar Código</ButtonText>
                                    </ButtonStyled>
                                </Touch>
                                <ActivityIndicator style={styles.loading} size="large" color="white" animating={isLoading} />
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
                                <Touch disabled={value.length != CELL_COUNT} onPress={() => checkCode()}>
                                    <ButtonStyled style={{ marginTop: 30 }}>
                                        <ButtonText>Verificar</ButtonText>
                                    </ButtonStyled>
                                </Touch>

                                <ActivityIndicator style={styles.loading} size="large" color="#000" animating={isLoading} />

                                <ButtonContainer>
                                    <ButtomTextCode>Reenviar Código</ButtomTextCode>
                                </ButtonContainer>

                            </>
                        )
                    ) : (
                        <View>
                            <FormPassword setPassword={setPassword} setConfirmPassword={setConfirmPassword} validateForm={validateForm}
                                passwordError={passwordError} confirmPasswordError={confirmPasswordError} isSubmiting={isSubmiting} />
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
        backgroundColor: "#000000",
        justifyContent: "flex-end",
        paddingTop: Platform.OS === 'ios' ? 20 : 0
    },
    buttonBack: {
        flexDirection: "row",
        backgroundColor: "#000000",
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

import React from 'react';
import { Platform,ActivityIndicator, Button, TextInput, TouchableWithoutFeedback, View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Input } from 'react-native-elements';Icon.loadFont();
import Icon from 'react-native-vector-icons/MaterialIcons';

import { ButtonContainer, ButtomText, FormContainer } from './styles';


export default function FormResetPassword({ setPassword, setConfirmPassword, validateForm, passwordError,
    confirmPasswordError, isSubmiting }) {

    return (

        <SafeAreaView>
            <ScrollView>
                <FormContainer style={{
                  paddingTop: Platform.OS === 'ios' ? 20 : 0
                }}>

                    <Input
                        label="Senha"
                        placeholder='Insira uma senha'
                        secureTextEntry={true}
                        leftIcon={
                            <Icon name='lock' size={24} color='#212121' />
                        }
                        containerStyle={{ width: "100%", marginTop: 30 }}
                        labelStyle={{ color: "#212121" }}
                        onChangeText={setPassword}
                        errorMessage={passwordError}
                    />

                    <Input
                        label="Confirme a senha"
                        placeholder='Confirme a senha'
                        secureTextEntry={true}
                        leftIcon={
                            <Icon name='lock' size={24} color='#212121' />
                        }
                        containerStyle={{ width: "100%", marginTop: 30 }}
                        labelStyle={{ color: "#212121" }}
                        onChangeText={setConfirmPassword}
                        errorMessage={confirmPasswordError}
                    />

                    { isSubmiting ? (<ActivityIndicator style={styles.loading} size="large" color="#000" animating={true} /> ) : (<></>)}

                    <TouchableWithoutFeedback onPress={() => { validateForm() }}>
                        <ButtonContainer>
                            <ButtomText>Finalizar</ButtomText>
                        </ButtonContainer>
                    </TouchableWithoutFeedback>

                </FormContainer>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    loading: {
        height: 100,
        width: 100,
    }
})

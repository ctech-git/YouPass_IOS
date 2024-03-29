import React from 'react';
import { Platform, ActivityIndicator, Button, TextInput, TouchableWithoutFeedback, View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
Icon.loadFont();
import { ButtonContainer, ButtomText, FormContainer } from './styles';


export default function Form({ setPassword, setConfirmPassword, setName, setSurname, validateForm, passwordError,
    confirmPasswordError, nameError, surnameError, isSubmiting }) {

    return (

        <SafeAreaView>
            <ScrollView>
                <FormContainer style={{
                    paddingTop: Platform.OS === 'ios' ? 20 : 0
                }}>
                    <Input
                        label="Nome"
                        placeholderTextColor="#808080"
                        leftIcon={<Icon name='person' size={24} color='white' />}
                        containerStyle={{ width: "100%", marginTop: 30 }}
                        labelStyle={{ color: "#808080" }}
                        inputStyle={{ color: '#808080' }}
                        onChangeText={setName}
                        errorMessage={nameError}
                    />
                    <Input
                        label="Sobrenome"
                        placeholderTextColor="#808080"
                        leftIcon={
                            <Icon name='person-outline' size={24} color='white' />
                        }
                        containerStyle={{ width: "100%", marginTop: 30 }}
                        labelStyle={{ color: "#808080" }}
                        inputStyle={{ color: '#808080' }}
                        onChangeText={setSurname}
                        errorMessage={surnameError}
                    />

                    <Input
                        label="Senha"
                        secureTextEntry={true}
                        leftIcon={
                            <Icon name='lock' size={24} color='white' />
                        }
                        placeholderTextColor="#808080"
                        containerStyle={{ width: "100%", marginTop: 30 }}
                        labelStyle={{ color: "#808080" }}
                        inputStyle={{ color: '#808080' }}
                        onChangeText={setPassword}
                        errorMessage={passwordError}
                    />

                    <Input
                        label="Confirme a senha"
                        placeholderTextColor="#808080"
                        secureTextEntry={true}
                        leftIcon={
                            <Icon name='lock' size={24} color='white' />
                        }
                        containerStyle={{ width: "100%", marginTop: 30 }}
                        labelStyle={{ color: "#808080" }}
                        inputStyle={{ color: '#808080' }}
                        onChangeText={setConfirmPassword}
                        errorMessage={confirmPasswordError}
                    />

                    {isSubmiting ? (<ActivityIndicator style={styles.loading}
                        size="large" color="#fff" animating={true} />) : (<></>)}

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

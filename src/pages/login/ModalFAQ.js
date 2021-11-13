import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();
import { Platform,Modal, StatusBar,TextInput ,View, StyleSheet, TouchableHighlight } from 'react-native';
import {
    ContainerLogin, GoogleButtonText, ImageGoogleIcon, Logo, Logo2,TextTitle3,TextTitle5,
    Busca,Cabecalho,Select,Container2,View2,TextosContainer,TextTitle2,TextTitle4,ButtonPlano,
    Caixa,TextTitle1,TextTituleModal,TextTituleModal2,DescriptionFeedback
} from './styles';
import api from '../../services/api';
import {connect} from 'react-redux';
import Toast from 'react-native-simple-toast';



function ModalFAQ({navigation,modalState,setModalState,dispatch,token}) {
    const [textofeedback, SetTextofeedback] = useState("");
    const [telefoneAtual, SettelefoneAtual] = useState("");
    const [email, SetEmail] = useState("");

    async function enviaFeedback() {
        const response = await api.get('/busca/faq.php', {
            params: { token: token,dado:textofeedback,email:email,fone:telefoneAtual } })
        .then(data => {
            console.log(data.data);

            if(data.data=="true"){
                Toast.show('E-mail Enviado');
            }else {
                Toast.show('Error ao Enviar Mensagem ao SAQ');
                console.log(data.data);
            }
        }).catch(error => {
            console.log(error);
        })
    }

    function mascara2(text){
        var text2 = "";
        text = text.replace(/[^\d]+/g, '');

        for (let i = 0; i < text.length; i++) {
            if(i==0){
               text2 += "("+text[i];
            }else if(i==1){
               text2 += text[i]+") ";
            }else if(i==6){
               text2 += text[i]+"-";
            }else{
               text2 += text[i];
            }
        }
        text = text2;
    SettelefoneAtual(text);
    }
    return (
        <>
            <Modal visible={modalState} animationType="slide"   onRequestClose={() => setModalState(false)}>
                <TouchableHighlight style={styles.buttonClose}
                 onPress={() => { setModalState(false) }}>
                        <Icon name="close" style={styles.icon} size={25} />
                </TouchableHighlight>
                <Container2>
                    <TextosContainer  style={{marginBottom:20,marginTop:40}}>
                      <TextTituleModal2>Serviço de Atendimento ao Consumidor</TextTituleModal2>
                    </TextosContainer>
                    <TextInput
                        style={styles.TextInputStyleClass}
                        onChangeText={ (text) => {SetEmail(text)}}
                        value={email}
                        underlineColorAndroid="transparent"
                        placeholder={"Insira Seu E-mail."}
                        placeholderTextColor={"#9199a1"}
                        textColor={"#fff"}
                        fontSize={18}
                    />
                    <TextInput
                        style={styles.TextInputStyleClass}
                        underlineColorAndroid="transparent"
                        placeholder={"Insira Seu Telefone."}
                        value={telefoneAtual}
                        maxLength = {15}
                        onChangeText={ (text) => {mascara2(text)}}
                        placeholderTextColor={"#9199a1"}
                        textColor={"#fff"}
                        fontSize={18}
                    />
                    <TextInput
                        style={styles.TextInputStyleClass}
                        onChangeText={ (text) => {SetTextofeedback(text)}}
                        underlineColorAndroid="transparent"
                        placeholder={"Insira Seu Texto."}
                        placeholderTextColor={"#9199a1"}
                        textColor={"#fff"}
                        fontSize={18}
                        multiline={true}
                        numberOfLines={10}
                    />
                    <View style={{
                        marginTop:70,
                        alignItems:'center',
                    }}>
                        <TouchableHighlight onPress={() => { enviaFeedback() }}>
                            <DescriptionFeedback>
                                <Icon name="send"
                                style={{
                                    color: "white"
                                }}
                                    size={40} />
                            </DescriptionFeedback>
                        </TouchableHighlight>
                    </View>
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
        backgroundColor: "#000",
        justifyContent: "flex-end",
        paddingTop: Platform.OS === 'ios' ? 20 : 0

    },
    TextInputStyleClass:{
        textAlign: 'center',
        width: '96%',
        marginLeft: '2%',
        marginTop: 10,
        height: 50,
        borderWidth: 2,
        borderColor: '#403e3e',
        color: '#fff',
        borderRadius: 20 ,
        backgroundColor : "#403e3e",
        }
})

export default connect(state => ({ token: state.token}))(ModalFAQ)

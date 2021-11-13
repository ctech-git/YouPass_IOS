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



function ModalFeedback({navigation,modalState,setModalState,dispatch,token}) {
    const [textofeedback, SetTextofeedback] = useState("");

    async function enviaFeedback() {
        const response = await api.get('/busca/Feedback.php', {
            params: { token: token,dado:textofeedback } })
        .then(data => {
            if(data.data=="true"){
                SetTextofeedback("");
                Toast.show('Feedback Enviado', Toast.LONG);
                setModalState(false);
            }else {

                Toast.show('Error ao Salvar Nome', Toast.LONG);
                console.log(data.data);
            }
        }).catch(error => {
            console.log(error);
        })
    }
    return (
        <>
            <Modal visible={modalState} animationType="slide"   onRequestClose={() => setModalState(false)}>
                <TouchableHighlight style={styles.buttonClose}
                 onPress={() => { setModalState(false) }}>
                        <Icon name="close" style={styles.icon} size={25} />
                </TouchableHighlight>
                <Container2>
                    <TextosContainer>
                      <TextTituleModal2>Envie seu Feedback</TextTituleModal2>
                    </TextosContainer>
                    <TextInput
                        style={styles.TextInputStyleClass}
                        onChangeText={ (text) => {SetTextofeedback(text)}}
                        underlineColorAndroid="transparent"
                        placeholder={"Escreva Sua Sugestão ou Elogio."}
                        placeholderTextColor={"#9199a1"}
                        textColor={"#fff"}
                        numberOfLines={10}
                        fontSize={20}
                        multiline={true}
                    />
                    <View style={{
                        marginTop:40,
                        alignItems:'center',
                    }}>
                        <TouchableHighlight onPress={() => { enviaFeedback() }}
                         style={{marginBottom:20}}
                        >
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
        width: '90%',
        marginLeft: '5%',
        height: 250,
        marginTop: '20%',
        paddingTop: 15,
        borderWidth: 2,
        borderColor: '#403e3e',
        color: '#fff',
        borderRadius: 20 ,
        backgroundColor : "#403e3e",
        }
})

export default connect(state => ({ token: state.token}))(ModalFeedback)

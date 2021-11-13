import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();
import { Platform,Modal, StatusBar,View, StyleSheet, TouchableHighlight,Linking,Clipboard} from 'react-native';
import {
    Linha,ButtonStyled2,ButtonText2,ButtonText, Container, ContainerCreateAccount, ContainerButtonGoogle,
    ContainerLogin, GoogleButtonText, ImageGoogleIcon, Logo, Logo2,TextTitle3,TextTitle5,
    Busca,Cabecalho,Select,Container2,View2,TextosContainer,TextTitle2,TextTitle4,ButtonPlano,
    Caixa,TextTitle1,TextTituleModal,TextTituleModal2,TextDados5,TextosContainer5,
    TextDados6,COD,COD2,TextosContainer6,TextDados7,TextosContainerRedeSocial
} from './styles';
import api from '../../services/api';
import {connect} from 'react-redux';
import Share from 'react-native-share';
import Toast from 'react-native-simple-toast';



function ModalIndique({cod,navigation,modalState,setModalState,dispatch}) {

async function compartilhar(type){
  var text = "Use o YouPass para ter novas experiências gastronomicas.";
   text =text+"Baixe agora! https://www.youpassclub.com";
  if (type=="whatsapp") {
    Linking.canOpenURL("whatsapp://send?").then(supported => {
        if (supported) {
        return  Linking.openURL(`whatsapp://send?text=${text}`);
        } else {
        return  Linking.openURL(`whatsapp://send?text=${text}`);
        }
    })
  }else if (type=="twitter") {
    Linking.canOpenURL("twitter://post?").then(supported => {
        if (supported) {
        return  Linking.openURL(`twitter://post?message=${text}`);
        } else {
        return  Linking.openURL(`twitter://post?message=${text}`);
        }
      })
  }else if (type=="copy") {
    var text = "Use o YouPass para ter novas experiências gastronomicas.";
   text =text+"Baixe agora! https://www.youpassclub.com";
    await Clipboard.setString(text);
    Toast.show('Copy');
  }else if (type=="mensage") {

    const shareOptions = {
        title: 'Share via',
        message: 'some message',
        url: 'some share url',
        social: Share.Social.MESSENGER,
        whatsAppNumber: "9199999999",  // country code + phone number
        filename: 'test' , // only for base64 file in Android
    };
    Share.shareSingle(shareOptions);
  }
}
function share(){
  console.log(1);
  var text = "Use o YouPass para ter novas experiências gastronomicas.";
   text =text+"Baixe agora! https://www.youpassclub.com";
   const shareOptions = {
       title: "",
       message: text
   };
   Share.open(shareOptions);

}


    return (
        <>
            <Modal visible={modalState} animationType="slide"   onRequestClose={() => setModalState(false)}>
                <View style={styles.buttonClose}>
                    <TouchableHighlight onPress={() => { setModalState(false) }}>
                        <Icon name="arrow-left" style={styles.icon} size={25} />
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => { share() }}>
                        <Icon name="share-alt" style={styles.icon} size={25} />
                    </TouchableHighlight>
                </View>
                <Container2>
                    <TextosContainer>
                      <TextTituleModal2>Indique Seu Amigo</TextTituleModal2>
                    </TextosContainer>
                    <TextosContainer>
                      <TextDados5>Repasse essa novidade para mais pessoas, compartilhe a oportunidade
                        de economia com seus amigos e familiares ;)</TextDados5>
                    </TextosContainer>
                    <TextosContainer5>
                      <TextDados6>Seu Código: <COD>YOU{cod}PASS</COD></TextDados6>
                    </TextosContainer5>

                    <TextosContainer6>
                      <TextDados7>COMPARTILHE SEU CÓDIGO:</TextDados7>
                    </TextosContainer6>
                    <TextosContainerRedeSocial onPress={() => { compartilhar("whatsapp") }}>
                      <Icon name="whatsapp" size={25} color="white"
                      style={{ marginRight: 10,marginTop:5 }}/>
                      <TextDados7>
                        Whatsapp
                      </TextDados7>
                    </TextosContainerRedeSocial>
                    <TextosContainerRedeSocial onPress={() => { compartilhar("twitter") }}>
                      <Icon name="twitter" size={25} color="white"
                      style={{ marginRight: 10,marginTop:5 }}/>
                      <TextDados7>
                        Twitter
                      </TextDados7>
                    </TextosContainerRedeSocial>
                    {/* <TextosContainerRedeSocial onPress={() => { compartilhar("copy") }}>
                    <Icon name="copy" size={25} color="white"
                    style={{ marginRight: 10,marginTop:5 }}/>
                    <TextDados7>
                      Copiar link
                    </TextDados7>
                  </TextosContainerRedeSocial> */}
                    <TextosContainerRedeSocial onPress={() => { share() }}>
                      <Icon name="share-alt" size={25} color="white"
                      style={{ marginRight: 10,marginTop:5 }}/>
                      <TextDados7>
                        Outros
                      </TextDados7>
                    </TextosContainerRedeSocial>


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
        justifyContent: "space-between",
        paddingTop: Platform.OS === 'ios' ? 20 : 0

    }
})

export default connect()(ModalIndique)

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Modal,
    ActivityIndicator,
    Text,
    TouchableHighlight,
    TouchableNativeFeedback,
    TouchableOpacity,Linking
} from 'react-native';
import { FotoPushNotification } from './style';

const PushNotification = ({ check,text, type, titulo,SetCheck,url,imagem,nome }) => {

    const styles = StyleSheet.create({
        modalBackground: {
            flex: 1,
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: '#00000090'
        },
        containerAviso: {
            backgroundColor: '#FFFFFF',
            height: 60,
            width: '100%',
            maxWidth: '100%',
            padding: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10
        },
        containertexto: {
            backgroundColor: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around'
        },
        textIndicator: {
            textAlign: 'center',
            fontSize: 20,
            color:'#000',
            fontWeight:'bold'
        },
        containerButtonOk: {
            backgroundColor: '#fff',
            height: 50,
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10
        },
        containerButtonOk2: {
            backgroundColor: '#fff',
            height: 60,
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10
        },
        containerExterno:{
            width: '90%',
            maxWidth: '90%',
        },
        textButton: {
            color:'#000',
            fontWeight: 'bold',
            fontSize:16
        },
        buttonOK: {
            justifyContent: 'center',
            alignItems: 'center'
        },textbody:{
            textAlign: 'center',
            fontSize: 15,
            color:'#000',
            marginLeft: 15,
            marginRight: 15
        }
    });
    function AcessarLinkRemoto() {
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                return  Linking.openURL(url);
            } else {
                console.log("Don't know how to open URI: " + url);
            }

        }) 
    }
    return (
        <Modal
            transparent={true} animationType={'none'} visible={check}
            onRequestClose={() => { SetCheck(false) }}>
            <View style={styles.modalBackground}>
                <View style={styles.containerExterno}>
                    {type=="1" || type=="3"?(
                    <>
                        <View style={styles.containerAviso}>
                            <Text style={styles.textIndicator}>{titulo}</Text>
                            </View>
                            <View style={styles.containertexto}>
                                <Text style={styles.textbody}>{text}</Text>
                            </View>
                            <View style={styles.containerButtonOk}>
                                <TouchableOpacity onPress={() => SetCheck(false)} style={styles.buttonOK}>
                                    <Text style={styles.textButton}>Fechar</Text>
                                </TouchableOpacity>
                        </View>
                    </>
                    ):(
                        type=="2" || type=="4"?(
                            <>
                                <View style={styles.containerAviso}>
                                    <Text style={styles.textIndicator}>{titulo}</Text>
                                </View>
                                <View style={styles.containertexto}>
                                    <FotoPushNotification source={{uri:imagem}} resizeMode="contain" ></FotoPushNotification>
                                    <Text style={styles.textbody}>{text}</Text>
                                </View>
                                <View style={styles.containerButtonOk2}>
                                    <View style={{flexDirection:   'row', justifyContent:'space-between'}}>
                                        <View style={{marginTop:15,marginRight:20,marginBottom:15}}>
                                            <TouchableOpacity onPress={() => SetCheck(false)} style={styles.buttonOK}>
                                                <Text style={styles.textButton}>Fechar</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{marginTop:15,marginLeft:20,marginBottom:15}}>
                                            <TouchableOpacity onPress={() => AcessarLinkRemoto()} style={styles.buttonOK}>
                                                <Text style={styles.textButton}>Acessar</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </>
                            ):(
                                type=="5"?(
                                    <>
                                        <View style={styles.containerAviso}>
                                            <Text style={styles.textIndicator}>{titulo}</Text>
                                        </View>
                                        <View style={styles.containertexto}>
                                            <FotoPushNotification source={{uri:imagem}} resizeMode="contain" ></FotoPushNotification>
                                            <Text style={styles.textbody}>A Aprincipal Bebê e Mamãe deseja um feliz aniversário para você, {nome}</Text>
                                        </View>
                                        <View style={styles.containerButtonOk2}>
                                            <View style={{flexDirection:   'row', justifyContent:'space-between'}}>
                                                <View style={{marginTop:15,marginRight:20,marginBottom:15}}>
                                                    <TouchableOpacity onPress={() => SetCheck(false)} style={styles.buttonOK}>
                                                        <Text style={styles.textButton}>Fechar</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    </>
                                    ):(
                                        <></>
                                    )
                            )
                    )
                    }
                </View>
            </View>
        </Modal>
    )
}

export default PushNotification;
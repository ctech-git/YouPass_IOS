import React, { useState,useEffect } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback,
    PixelRatio,Text,FlatList,Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();
import {Container,Modal,View2,TextTitle,CardPush,Linha} from './styles';
import api from '../../services/api';
import CheckBox from 'react-native-modest-checkbox';
import {connect} from 'react-redux';
import PushNotification from '../util/pushNotification.js';


function Notificacao({ dispatch,modalState, navigation, setModalState,token,categoria,bairros }) {
    var [dataAux, setdataAux] = useState([]);
    const [check, SetCheck] = useState(false);
    const [text, SetText] = useState('');
    const [type, SetType] = useState('');
    const [titulo, SetTitulo] = useState('');
    const [url, SetUrl] = useState('');
    const [imagem, SetImagem] = useState('');
    function AbrirPush(item){
        SetText(item.texto);
        SetType(item.type);
        SetTitulo(item.titulo);
        SetUrl(item.link);
        SetImagem(item.url);
        SetCheck(true);
        MudaStatusPush(item.id);
    }
    useEffect(()=>{
       inicio()
    },[])

    function inicio(){
        const response = api.get('/busca/BuscaPushNotification.php', 
            {params:{token:token}}).then(obj => {
                var aux = obj.data;
                
            setdataAux(aux);
        }).catch(error => {
            console.log(error);
        })
    }
    function MudaStatusPush(params) {
        const response = api.get('/busca/MudaPushNotification.php', 
        {params:{token:token,id:params}}).then(obj => {
            inicio()
        }).catch(error => {
            console.log(error);
        })
    }
    function doTruncarStr(str, size){
        if (str==undefined || str=='undefined' || str =='' || size==undefined || size=='undefined' || size ==''){
            return str;
        }
         
        var shortText = str;
        if(str.length >= size+3){
            shortText = str.substring(0, size).concat('...');
        }
        return shortText;
    } 
    function FormaterData(string) {
        if(string!=undefined && string!='undefined' && string !='' && string!='undefined'){
            var aux = string.split(" ");
            string = aux[0].split("-");
            var horas = aux[1].split(":");
            var aux1 = string[0];
            var aux2 = string[1];
            var aux3 = string[2];
            string = aux3+"/"+aux2+"/"+aux1+" às "+horas[0]+":"+horas[1];
            return string;
        }else{
            return string
        }
    }
    return (
        <Modal visible={modalState} animationType="slide"
        onRequestClose={() => setModalState(false)}
         >
        <View2>
            <TouchableWithoutFeedback style={styles.buttonClose} onPress={() => { setModalState(false) }}>
                <Icon name="close"color="white" style={{ margin: 15,marginTop: 20 }} size={25} />
            </TouchableWithoutFeedback>
        </View2>
        <Container >
        <FlatList
            data={dataAux}
            renderItem={({ item }) =>{
            console.log(item.status)
                return(
                <View style={{width:"100%"}}>   
                    {item.status==0?(
                         <TouchableWithoutFeedback  onPress={() => AbrirPush(item)} >
                         <CardPush>
                             <Icon name="info-circle" size={16} color="#fff" style={{marginRight:14}} />
                             <View style={{width:'100%'}}>
                                 <Text style={{fontSize:14,color:"#fff"}}> {doTruncarStr(item.titulo,30)} </Text>
                                 <Text style={{fontSize:12,color:"#fff"}}>{doTruncarStr(item.texto,45)}</Text>
                                 <Text style={{fontSize:10,color:"#fff"}}>{FormaterData(item.dataCriada)}</Text>
                                 <Linha />
                             </View>
                         </CardPush>
                         </TouchableWithoutFeedback>
                    ):(
                        <TouchableWithoutFeedback  onPress={() => AbrirPush(item)} >
                            <CardPush>
                                <Icon name="info" size={20} color="#fefefe87" style={{marginRight:20}} />
                                <View style={{width:'100%'}}>
                                    <Text style={{fontSize:14,color:"#fefefe87"}}> {doTruncarStr(item.titulo,30)} </Text>
                                    <Text style={{fontSize:12,color:"#fefefe87"}}>{doTruncarStr(item.texto,45)}</Text>
                                    <Text style={{fontSize:10,color:"#fefefe87"}}>{FormaterData(item.dataCriada)}</Text>
                                    <Linha />
                                </View>
                            </CardPush>
                            </TouchableWithoutFeedback>
                    )}
                </View>)
            }}/>
            <PushNotification check={check} text={text} type={type} titulo={titulo} SetCheck={SetCheck} url={url} imagem={imagem}/>
        </Container>
        </Modal >
    );
}


const styles = StyleSheet.create({
    buttonClose: {
        flexDirection: "row",
        backgroundColor: "#000",
        justifyContent: "flex-end",
        paddingTop: Platform.OS === 'ios' ? 20 : 0

    },
    checkbox: {
      alignSelf: "center"
    },caixaP:{

    }
});

export default connect(state => ({token: state.token}))(Notificacao)

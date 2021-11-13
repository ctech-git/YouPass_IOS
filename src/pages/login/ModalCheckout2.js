import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();
import {Image ,AppRegistry,Text, View,TextInput,Platform,Modal,Dimensions,
   TabBar,StatusBar, StyleSheet,TouchableWithoutFeedback,
   TouchableHighlight } from 'react-native';
import {
  Linha,ButtonStyled,ButtonText2,ButtonText, Container, ContainerCreateAccount, ContainerButtonGoogle,
  ContainerLogin, GoogleButtonText, ImageGoogleIcon, Logo, Logo2,TextTitle3,TextTitle5,
  Busca,Cabecalho,Select,Container2,View2,TextosContainer,TextTitle2,TextTitle4,ButtonPlano,
  Caixa,TextTitle1,TextTituleModal,TextTituleModal2,TextDados5,TextosContainer5,ContainerButtonFacebook,
  TextDados6,TextDados4,TextDados42,COD,COD2,TextosContainer6,TextDados7,TextDados2,TextosContainerRedeSocial,TextDados8
} from './styles2';
import api from '../../services/api';
import {connect} from 'react-redux';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { RadioButton, TextRadio } from 'react-native-paper';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage'


const Tab = createMaterialTopTabNavigator();
function ModalCheckout({init,setdadosUser,dadosUser,setModalStatus,navigation,modalState,setModalState,dispatch}) {

  const [plano, setPlano] = useState(0);
  const [tcheck, settcheck] = useState(true);
  const [color_border, setColor] = useState('#fed531');
  const [color_border2, setColor2] = useState('#fff');
  const [Bcolor_border, BsetColor] = useState('#fed531');
  const [Bcolor_border2, BsetColor2] = useState('#fff');
  const [cupom, setCupom] = useState('');
  const [Anual1, SetAnual1] = useState(109.88);
  const [Anual2, SetAnual2] = useState(1.00);
  const [Sem1, SetSem1] = useState(70.94);
  const [Sem2, SetSem2] = useState(12.99);
  const [cvcALL, setcvc] = useState('');
  const [expiryALL, setexpiry] = useState('');
  const [numberALL, setnumber] = useState('');
  const [typeALL, settype] = useState('');
  const [nameALL, setname] = useState('');
  const [cpfCartao, setcpfCartao] = useState('');

  const [NomePlano, SetNomePlano] = useState('');
  const [CustoPlano, SetCustoPlano] = useState('');
  const [plano12, setPlano12] = useState('first');
  const [plano6, setPlano6] = useState('first');
  const [PlanoFinal, SetPlanoFinal] = useState(0);
  const [ValorFinal, SetValorFinal] = useState(0);
function onChangeText(text){
  setCupom(text);
  SetAnual1(109.88);
  SetAnual2(9.99);
  SetSem1(70.94);
  SetSem2(12.99);
}
async function CUPOM(){
  try {
    const response = await api.get('/busca/BuscaCupom.php', { params: { cupom: cupom} })
        .then(data => {
            if(data.data=="0"){
                alert("Cupom Invalido");
                SetAnual1(109.88);
                SetAnual2(9.99);
                SetSem1(70.94);
                SetSem2(12.99);
            }else  {
              var valor = data.data[0].valor;
              valor = 100-valor;
              valor = valor/100;
              var valor1 = 109.88*valor;
              valor1 = parseFloat(valor1).toFixed(2)
              var valor2 = 9.99*valor;
              valor2 = parseFloat(valor2).toFixed(2)
              var valor3 = 70.94*valor;
              valor3 = parseFloat(valor3).toFixed(2)
              var valor4 = 12.99*valor;
              valor4 = parseFloat(valor4).toFixed(2)
              SetAnual1(valor1);
              SetAnual2(valor2);
              SetSem1(valor3);
              SetSem2(valor4);
            }
        }).catch(error => {
            console.log(error);
        })
    } catch (error) {
      console.log(error);
    }
}
function onChangeRadio12(text){
    var check = text.value;

  if (check=="second") {
    setColor('#fff');
    setColor2('#fed531');
    setPlano12("second");
  }else {
    setColor2('#fff');
    setColor('#fed531');
    setPlano12("first");
  }
}
function onChangeRadio6(text){
    var check = text.value;
    if (check=="second") {
      BsetColor('#fff');
      BsetColor2('#fed531');
      setPlano6("second");
    }else {
      BsetColor2('#fff');
      BsetColor('#fed531');
      setPlano6("first");
    }
}

function EscolherPlanoAnual(){
  var type = '';
  if(plano12=='second'){
    type = 'Parcelado';
  }else{
    type = 'A Vista';
  }
  checkout(12,type);
}
function EscolherPlanoSemestral(){
  var type = '';
  if(plano6=='second'){
    type = 'Parcelado';
  }else{
    type = 'A Vista';
  }
  checkout(6,type);
}
function checkout(plano,type){
  var valor = 0;
  settcheck(false);
  if(plano==6){
    if (type=='Parcelado') {
      SetPlanoFinal(4);
      SetValorFinal(Sem2);
      SetNomePlano("Assinatura Semestral Recorrente");
      SetCustoPlano("R$ "+Sem2+"/mês");
    }else{
      SetPlanoFinal(3);
      SetValorFinal(Sem1);
      SetNomePlano("Assinatura Semestral À Vista");
      SetCustoPlano("R$ "+Sem1);
    }
  }else{
    if (type=='Parcelado') {
      SetPlanoFinal(2);
      SetValorFinal(Anual2);
      SetNomePlano("Assinatura Anual Recorrente");
      SetCustoPlano("R$ "+Anual2+"/mês");
    }else{
      SetNomePlano("Assinatura Anual À Vista");
      SetPlanoFinal(1);
      SetValorFinal(Anual1);
      SetCustoPlano("R$ "+Anual1);
    }
  }
}
async function finalizar() {


  var valor = ValorFinal;
  var plano = PlanoFinal;
  var recorrente = false;
  var nomePlano = '';
  if(plano==1){
    var recorrente = false;
    var nomePlano = 'Anual A vista';
  }else if(plano==2){
    var recorrente = true;
    var nomePlano = 'Anual Recorrente';
  }else if(plano==3){
    var recorrente = false;
    var nomePlano = 'Semestral A vista';
  }else if(plano==4){
    var recorrente = true;
    var nomePlano = 'Semestral Recorrente';
  }
  AsyncStorage.getItem('token').then( async value => {
    var array = JSON.parse(value);
    var token = array[0].token;

    const response = await api.get('/busca/ControllerPedido.php', { params: {
      token: token, valor_total: valor,recorrente:recorrente,
      cartao:numberALL,nome_cartao:nameALL,validade:expiryALL,
      cvc:cvcALL,cupom:cupom,type:typeALL,nomePlano:nomePlano,cpf:cpfCartao
     } })
    .then( async data => {
        var mensage =data.data;


        if (mensage=="Forma de Pagamento Inválida") {
          alert("A forma de pagamento inserida é inválida");
        }else if(mensage=="Ano deve ser maior ou igual a 2020"){
          alert("Validade do cartão inválida");
        }else if(mensage=="Aguardando Aprovação" || mensage=="Em Contestação" || mensage=="Em Processamento" || mensage=="Aguardando Pagamento"){
          const response = await api.get('/busca/buscaUserActive1.php',
           { params: { token: token,plano:plano} })
          .then(data => {

            setdadosUser(data.data);
            setModalState(false);
            setModalStatus(true);
            dispatch({
              type: 'isActive',
              isActive:1
              });
              AsyncStorage.setItem('isActive', 1);
              init();
          })
        }else if(mensage=="Reprovada" || mensage=="Cancelada"){
          alert("Sua Compra Foi Reprovada ou Cancelada");
          const response = await api.get('/busca/buscaUserActive0.php',
          { params: { token: token,plano:plano} })
          .then(data => {

            dispatch({
              type: 'isActive',
              isActive:0
              });
              AsyncStorage.setItem('isActive', 0);
              init();
          })
        }else if(mensage=="Aprovada"){
          const response = await api.get('/busca/buscaUserActive2.php',
          { params: { token: token,plano:plano} })
         .then(data => {

           setdadosUser(data.data);
           setModalState(false);
           setModalStatus(true);
           dispatch({
            type: 'isActive',
            isActive:2
            });
            AsyncStorage.setItem('isActive', 2);
            init();
         })
        }



      }).catch(error => {
        console.log(error);
      })
});




}



function TABPlano12() {
    return (
      <View style={{ flex: 1, justifyContent: 'center',
      alignItems: 'center',backgroundColor: '#000000', paddingTop:20 }}>
      <RadioButton.Group
        onValueChange={value => onChangeRadio12({value})}
        value={plano12}
      >
        <View style={{flexDirection:'row',width:'80%',justifyContent: 'flex-end'}}>
          <TextDados2>Grátis Por 7 Dias</TextDados2>
        </View>
      <ContainerCreateAccount style={{borderWidth: 2, borderColor:color_border}}>
        <View style={{flexDirection:'row'}}>
          <RadioButton label="" value="first" color='#fed531'/>
          <TextDados7>Assinatura Anual à Vista</TextDados7>
        </View>
        <View style={{flexDirection:'row'}}>
          <TextDados8>De R$ { parseFloat(Anual2*12).toFixed(2)} por apenas</TextDados8>
        </View>
        <View style={{flexDirection:'row'}}>
          <TextDados42>R$ {Anual1}</TextDados42>
        </View>
        <View style={{flexDirection:'row'}}>
          <TextDados8></TextDados8>
        </View>
      </ContainerCreateAccount>
      <ContainerCreateAccount style={{borderWidth: 2, borderColor:color_border2}}>
        <View style={{flexDirection:'row'}}>
          <RadioButton label="" value="second" color='#fed531'/>
          <TextDados7>Assinatura Anual</TextDados7>
        </View>
        <View style={{flexDirection:'row'}}>
          <TextDados4>R$ {Anual2}</TextDados4>
          <TextDados6>/Mês</TextDados6>
        </View>
        <View style={{flexDirection:'row'}}>
          <TextDados8>Total de R$ { parseFloat(Anual2*12).toFixed(2)}</TextDados8>
        </View>
      </ContainerCreateAccount>
      </RadioButton.Group>
      <ButtonStyled onPress={() => { EscolherPlanoAnual() }}>
        <TextTitle5>Assinar</TextTitle5>
      </ButtonStyled>

      </View>
      );
  }
  function TABPlano6() {
    return (
      <View style={{ flex: 1, justifyContent: 'center',
      alignItems: 'center',backgroundColor: '#000000', paddingTop:20 }}>
      <RadioButton.Group
        onValueChange={value => onChangeRadio6({value})}
        value={plano6}
      >
        <View style={{flexDirection:'row',width:'80%',justifyContent: 'flex-end'}}>
          <TextDados2>Grátis Por 7 Dias</TextDados2>
        </View>
      <ContainerCreateAccount style={{borderWidth: 2, borderColor:Bcolor_border}}>
        <View style={{flexDirection:'row'}}>
          <RadioButton label="" value="first" color='#fed531'/>
          <TextDados7>Assinatura Semestral à Vista</TextDados7>
        </View>
        <View style={{flexDirection:'row'}}>
          <TextDados8>De R$ { parseFloat(Sem2*6).toFixed(2)} por apenas</TextDados8>
        </View>
        <View style={{flexDirection:'row'}}>
          <TextDados42>R$ {Sem1}</TextDados42>
        </View>
        <View style={{flexDirection:'row'}}>
          <TextDados8></TextDados8>
        </View>
      </ContainerCreateAccount>
      <ContainerCreateAccount style={{borderWidth: 2, borderColor:Bcolor_border2}}>
        <View style={{flexDirection:'row'}}>
          <RadioButton label="" value="second" color='#fed531'/>
          <TextDados7>Assinatura Semestral</TextDados7>
        </View>
        <View style={{flexDirection:'row'}}>
          <TextDados4>R$ {Sem2}</TextDados4>
          <TextDados6>/Mês</TextDados6>
        </View>
        <View style={{flexDirection:'row'}}>
          <TextDados8>Total de R$ {parseFloat(Sem2*6).toFixed(2)}</TextDados8>
        </View>
      </ContainerCreateAccount>
      </RadioButton.Group>
      <ButtonStyled onPress={() => { EscolherPlanoSemestral() }}>
          <TextTitle5>Assinar</TextTitle5>
      </ButtonStyled>
      </View>
      );
    }
function dadosCartao(dados) {
  var status =dados.status;
  var value =dados.values;

  if(status.cvc!='incomplete' && status.expiry!='incomplete' && status.number!='incomplete'&& status.name!='incomplete'){
    if(status.cvc!='invalid' && status.expiry!='invalid' && status.number!='invalid'&& status.name!='invalid'){
      var cvc = value.cvc;
      var expiry = value.expiry;
      var number = value.number;
      var type = value.type;
      var name = value.name;
      setcvc(cvc);
      setexpiry(expiry);
      setnumber(number);
      settype(type);
      setname(name);


    }else{
      Toast.show('Dados de Pagamento Invalido');
    }
  }else{


  }

}


function mascara(text){
  var text2 = "";
  text = text.replace(/[^\d]+/g, '');

  for (let i = 0; i < text.length; i++) {
      if(i==2){
         text2 += text[i]+".";
      }else if(i==5){
         text2 += text[i]+".";
      }else if(i==8){
         text2 += text[i]+"-";
      }else{
         text2 += text[i];
      }
  }
  text = text2;
  setcpfCartao(text);
}
    return (
        <>
            <Modal visible={modalState} animationType="slide"   onRequestClose={() => setModalState(false)}>

              {tcheck?(
                <View style={styles.buttonClose}>
                  <TouchableWithoutFeedback >
                    <Icon />
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={() => { setModalState(false) }}>
                    <Icon name="close" style={styles.icon} size={25} />
                  </TouchableWithoutFeedback>
                </View>
              ):(
                <View style={styles.buttonClose}>
                  <TouchableWithoutFeedback  style={{backgroundColor:'#000000'}} onPress={() => { settcheck(true) }}>
                    <Icon name="arrow-left" style={styles.icon} size={25} />
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={() => { setModalState(false) }}>
                    <Icon name="close" style={styles.icon} size={25} />
                  </TouchableWithoutFeedback>
                </View>
              )}


            <Container2>
              {tcheck?(
                <View>
                <TextosContainer>
                  <TextTituleModal2>Selecione um plano</TextTituleModal2>
                </TextosContainer>
                <TextosContainer>
                  <TextDados5>Possui um cupom promocional?</TextDados5>
                </TextosContainer>
                <TextosContainer>
                  <TextInput
                    style={{ height: 40,width:'60%',
                     borderColor: 'gray', borderWidth: 1,
                     borderRadius:5,color:'white' }}
                    onChangeText={text => onChangeText(text)}
                    value={cupom}
                    />
                    <ButtonPlano onPress={() => { CUPOM() }}>
                      <ButtonText>Aplicar</ButtonText>
                    </ButtonPlano>
                </TextosContainer>
                <Tab.Navigator
                initialRouteName="Feed"
                tabBarOptions={{
                    activeTintColor: 'white',
                    labelStyle: { fontSize: 12 },
                    pressColor: 'white',
                    indicatorStyle: {color:'white',backgroundColor:'white'},
                    style: { backgroundColor: '#000000' },
                }}>
                    <Tab.Screen name="Plano Anual" component={TABPlano12} />
                    <Tab.Screen name="Plano Semestral" component={TABPlano6} />
                </Tab.Navigator>
                </View>
              ):(
                <View >
                    <Text style={{marginLeft:5,color:'#fed531'}}>Plano Selecionado:</Text>
                    <ContainerButtonFacebook>
                      <Text style={{marginLeft:10,color:'white',fontSize:16}}>{NomePlano}</Text>
                      <Text style={{marginLeft:10,color:'white',fontSize:28,fontWeight:'bold'}}>{CustoPlano}</Text>
                    </ContainerButtonFacebook>
                    <CreditCardInput
                    onChange={dados=>{dadosCartao(dados)}}
                    autoFocus
                    inputStyle={{
                      color:'white',
                      borderColor: 'white',
                      maxWidth: '100%',
                      width: '100%'
                    }}
                    labelStyle={{
                      color:'white'
                    }}
                    inputContainerStyle={{
                      borderBottomWidth: 1,
                      borderBottomColor: "white"
                    }}
                    requiresName= 'true'
                    invalidColor='#fed531'
                    placeholderColor='#808080'
                    placeholders={{
                      number: "0000 0000 0000 0000",
                      expiry: "MM/AA",
                      cvc: "***",
                      name: "Fulano Da Silva"
                    }}
                    labels={{ number: "Numero",
                     expiry: "Validade",
                      cvc: "CVC/CCV",
                      name: "Nome Impresso"
                    }}
                      cardImageFront={require("../../images/card.png")}
                      cardImageBack={require("../../images/card2.png")}

                    />
                    <TextTitle2>CPF do Titular</TextTitle2>
                     <TextInput
                    style={{ height: 40,
                      width:'86%',
                    borderBottomWidth: 1,
                    borderBottomColor: "white",
                    marginLeft: '5%',
                    color:'white' }}
                    onChangeText={ (text) => {mascara(text)}}
                    maxLength = {14}
                    value={cpfCartao}
                    placeholderTextColor = "#808080"
                    placeholder='000.000.000-00'
                    />

                    <View style={{marginTop:30,marginBottom:50}}>
                        <TextDados5 style={{marginLeft:'5%',marginRight:'5%'}}>
                          Você está autorizando a cobrança automática do YouPass até que você cancele sua assinatura.
                          Você concorda com as informações contidas nos termos de uso e privacidade desse aplicativo.
                        </TextDados5>
                         <Caixa onPress={() => { finalizar() }}>
                            <TextTitle5>Assinar YouPass</TextTitle5>
                        </Caixa>
                    </View>
                </View>
              )}


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
      backgroundColor: "#000000",
      justifyContent: "space-between",
      paddingTop: Platform.OS === 'ios' ? 20 : 0
  },card:{
    width:50
  }
})


export default connect()(ModalCheckout)

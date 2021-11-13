import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();
import {Image ,AppRegistry,Text, View,Platform,Modal,Dimensions, TabBar,StatusBar, StyleSheet,TouchableWithoutFeedback, TouchableHighlight } from 'react-native';
import {
    Logo, Logo2,TextTitle3,TextTitle5,ContainerXY,
    Busca,Cabecalho,Select,Container2,View2,TextosContainer,TextTitle2,TextTitle4,ButtonPlano,
    Caixa,TextTitle1,TextTituleModal,TextTitle14,TextTitle15,Rodape,Legends2,Circle,ImageTela
} from './styles';
import api from '../../services/api';
import {connect} from 'react-redux';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


const Tab = createMaterialTopTabNavigator();
function ModalFunciona({navigation,modalState,setModalState,dispatch}) {

    const [indicador, setIndicador] = useState(1);

    function Tela1() {
        return (
          <View style={{ height:'100%',flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor: '#000' }}>
              <View style={{justifyContent:'center',flexDirection:'row'}}>
              <Circle>
              </Circle>
              <ImageTela source={require('../../images/telas/home.jpg')}  >
              </ImageTela>
              </View>
              <View >
              <TextTitle15>
                  Entre para o maior clube de gastronomia do Norte
              </TextTitle15>
              <Legends2>Economize até 50% da conta em diversos restaurantes. É muito fácil usar</Legends2>
              </View>
          </View>
        );
      }
    
      function Tela2() {
        return (
            <View style={{ height:'100%',flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor: '#000' }}>
            <View style={{justifyContent:'center',flexDirection:'row'}}>
            <Circle>
            </Circle>
            <ImageTela source={require('../../images/telas/res.jpg')}  >
            </ImageTela>
            </View>
            <View >
            <TextTitle15>
                Confira os horários e os benefícios dos restaurantes
            </TextTitle15>
            <Legends2>
                Cada restaurante possui um acordo diferente, podendo haver restrições    
            </Legends2>
            </View>
        </View>
        );
      }

      function Tela3() {
        return (
            <View style={{ height:'100%',flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor: '#000' }}>
            <View style={{justifyContent:'center',flexDirection:'row'}}>
            <Circle>
            </Circle>
            <ImageTela source={require('../../images/telas/buscar.jpg')}  >
            </ImageTela>
            </View>
            <View >
            <TextTitle15>
                Mostre a confirmação no restaurante e bom apetite
            </TextTitle15>
            <Legends2>
                Viu como é fácil economizar? Cadastre-se e use hoje mesmo!
            </Legends2>
            </View>
        </View>
        );
      }

      function next(params) {
          if (params==2) {
            setIndicador(2);
            navigation.jumpTo('Tela2');
          }else if(params==3){
            setIndicador(3);
            navigation.jumpTo('Tela3');
        }else if(params==0){
            setIndicador(1);
            setModalState(false);
        }else if(params==1){
            setIndicador(1);
            navigation.jumpTo('Tela1');
        }
      }
    return (
        <>
            <Modal visible={modalState} animationType="slide"   onRequestClose={() => setModalState(false)}>
                <ContainerXY>
                <Tab.Navigator
                initialRouteName="Tela1"
                tabBarOptions={{
                    activeTintColor: '#000',
                    swipeEnabled: true,
                    animationEnabled: true,
                    showLabel:false,
                    indicatorStyle: {color:'#000',backgroundColor:'#000'},
                    style: { backgroundColor: '#000' }
                }}>
                    <Tab.Screen name="Tela1" component={Tela1} />
                    <Tab.Screen name="Tela2" component={Tela2} />
                    <Tab.Screen name="Tela3" component={Tela3} />
                </Tab.Navigator>
                </ContainerXY>
                <View style={styles.buttonClose}>
                        {indicador==1?(
                            <Rodape>
                                <TouchableWithoutFeedback>
                                    <TextTitle14></TextTitle14>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => { next(2) }}>
                                    <TextTitle14>Proximo</TextTitle14>
                                </TouchableWithoutFeedback>
                            </Rodape>
                        ):(
                        indicador==2?(
                            <Rodape>
                                <TouchableWithoutFeedback onPress={() => { next(1) }}>
                                    <TextTitle14>Voltar</TextTitle14>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => { next(3) }}>
                                    <TextTitle14>Proximo</TextTitle14>
                                </TouchableWithoutFeedback>
                            </Rodape>
                        ):(
                            <Rodape>
                                <TouchableWithoutFeedback onPress={() => { next(2) }}>
                                    <TextTitle14>Voltar</TextTitle14>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => { next(0) }}>
                                    <TextTitle14>Vamos Lá</TextTitle14>
                                </TouchableWithoutFeedback>
                            </Rodape>
                        )
                            
                        )}
                </View>
            </Modal >
        </>
    );
}

const styles = StyleSheet.create({
    icon: {
        margin: 15,
        color: "white"
    },buttonClose: {
        flexDirection: "row",
        backgroundColor: "#403e3e",
        justifyContent: "flex-end"
    }
})


export default connect()(ModalFunciona)
import React,{useEffect,useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();
import { View,Platform,Modal, StatusBar, StyleSheet, TouchableHighlight,FlatList } from 'react-native';
import {
    FeedCard,FeedFooter,FeedFooter2,ImgFeed,Linha,ButtonStyled2,ButtonText2,ButtonText, Container, ContainerCreateAccount, ContainerButtonGoogle,
    ContainerLogin, GoogleButtonText, ImageGoogleIcon, Logo, Logo2,TextTitle3,TextTitle5,
    Busca,Cabecalho,Select,Container2,View2,TextosContainer,TextTitle2,TextTitle4,ButtonPlano,
    Caixa,TextTitle1,TextTituleModal,DescriptionFeed2,DescriptionFeed3, Legends,
    DescriptionFeed4,Week,ContainerX,CaixaX
} from './styles';
import api from '../../services/api';
import {connect} from 'react-redux';
import Restaurante from '../restaurante';


function ModalFavoritos({favorito,navigation,modalState,setModalState,dispatch}) {
    var [ExisteRestaurante, SetExisteRestaurante] = useState(false);
    const [modalRestauranteState, setRestauranteState] = useState(false);
    var [RestauranteFiltrados, setdataAux2] = useState([]);
    var [itemValue, setdataItem] = useState([]);
    var [itemValueFoto, setdataItemFotos] = useState([]);
    var [itemValueDias, setdataItemDias] = useState([{}]);
    const [favoritos, setFavoritos] = useState(false);

    useEffect(()=>{
        verifica(favorito);
    },[favorito])
    async function perfilRes(item){
        var fotos =  JSON.parse(item.fotoSlider);
        var dias =  JSON.parse(item.dias);

        if ((favorito=="")||(favorito==null)) {
            setFavoritos(false);
            console.log("Não há favorito");
        }else{

            console.log(favorito);

            setFavoritos(false);
                var aux = favorito;
            for (let i = 0; i < aux.length; i++) {
            console.log(aux[i]+"="+item.id);
                if (aux[i]==item.id) {
                    setFavoritos(true);
                }
            }
        }
        setdataItem(item);
        setdataItemFotos(fotos);
        setdataItemDias(dias);
        setRestauranteState(true);
    }
    function verifica(favorito){
        console.log(favorito);
        const response = api.get('/busca/BuscaRestaurantesFavoritos.php',
        {params:{id:favorito}}).then(obj => {
            console.log(obj.data);

            if(obj.data=='0'){
                SetExisteRestaurante(false);
            }else{
                SetExisteRestaurante(true);
                setdataAux2(obj.data);
            }
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <>
        <Modal visible={modalState} animationType="slide"   onRequestClose={() => setModalState(false)}>
        <TouchableHighlight style={styles.buttonClose} onPress={() => { setModalState(false) }}>
                <Icon name="close" style={styles.icon} size={25} />
        </TouchableHighlight>
        <CaixaX>
            <TextTitle1>Lista de Favoritos</TextTitle1>
        </CaixaX>

        <ContainerX >
            {ExisteRestaurante ?(
                <FlatList
                data={RestauranteFiltrados}
                renderItem={({ item }) =>
                <FeedCard onPress={() => perfilRes(item)}>
                <ImgFeed source={{uri:item.foto}} resizeMode="contain" ></ImgFeed>
                <FeedFooter>
                    <FeedFooter2>
                        <DescriptionFeed2>{item.nome}  </DescriptionFeed2>

                    </FeedFooter2>
                    <FeedFooter2>
                        <DescriptionFeed3>{JSON.parse(item.categoriasNome)[0]}</DescriptionFeed3>
                        <Legends>Entre R$ 75,00 - R$ 200,00</Legends>
                    </FeedFooter2>
                    <FeedFooter2>
                        <DescriptionFeed4>{item.bairro}</DescriptionFeed4>
                        <View style={styles.week}>
                                {item.diasFunc.indexOf("segunda") != -1?(<Week>S</Week>):(
                                  <Week style={{  textDecorationLine:"line-through",color:"#80808085"}}>S</Week>
                                )}
                                {item.diasFunc.indexOf("terca") != -1?(<Week>T</Week>):(
                                  <Week style={{  textDecorationLine:"line-through",color:"#80808085"}}>T</Week>
                                )}
                                 {item.diasFunc.indexOf("quarta") != -1?(<Week>Q</Week>):(
                                  <Week style={{  textDecorationLine:"line-through",color:"#80808085"}}>Q</Week>
                                )}
                                 {item.diasFunc.indexOf("quinta") != -1?(<Week>Q</Week>):(
                                  <Week style={{  textDecorationLine:"line-through",color:"#80808085"}}>Q</Week>
                                )}
                                 {item.diasFunc.indexOf("sexta") != -1?(<Week>S</Week>):(
                                  <Week style={{  textDecorationLine:"line-through",color:"#80808085"}}>S</Week>
                                )}
                                 {item.diasFunc.indexOf("sabado") != -1?(<Week>S</Week>):(
                                  <Week style={{  textDecorationLine:"line-through",color:"#80808085"}}>S</Week>
                                )}
                                 {item.diasFunc.indexOf("domingo") != -1?(<Week>D</Week>):(
                                  <Week style={{  textDecorationLine:"line-through",color:"#80808085"}}>D</Week>
                                )}

                            </View>
                    </FeedFooter2>
                </FeedFooter>
            </FeedCard>
                }
                keyExtractor={item => item.id}
                />
            ):(
                <TextosContainer>
                    <TextTitle2>Não Há Restaurante Cadastrados Em Seus Favoritos</TextTitle2>
                </TextosContainer>
            )}

        </ContainerX>
        <Restaurante setFavoritos={setFavoritos} favoritos={favoritos}   itemValueFoto={itemValueFoto} itemValueDias={itemValueDias} itemState={itemValue} navigation={navigation} modalState={modalRestauranteState} setModalState={setRestauranteState}/>
        </Modal >
        </>
    );
}

const styles = StyleSheet.create({
    icones: {
        margin: 10,
    },icon: {
        margin: 15,
        color: "white"
    },
    buttonClose: {
        flexDirection: "row",
        backgroundColor: "#000",
        justifyContent: "flex-end",
        paddingTop: Platform.OS === 'ios' ? 20 : 0

    },week:{
        flexDirection: 'row'
    }
})

export default connect(state => ({chave:state.token,name:state.name,favorito:state.favoritos, check: state.check}))(ModalFavoritos)

import React, { useEffect, useState } from 'react';
import {
    Platform, View, StyleSheet, ScrollView, Image, Text, ImageBackground, FlatList, TouchableHighlight,
    TouchableWithoutFeedback, TouchableNativeFeedback, TouchableOpacity
} from 'react-native';
import { LoginManager } from 'react-native-fbsdk';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();
import Grid from 'react-native-infinite-scroll-grid';
import {
    ViewBlack, DivAux, ButtonAux, Categoria, InputBusca, TextosContainer, DestaquesContainer3, DescriptionFeedMini,
    TextTitle, TextTitle2, Select, Busca, HeaderInit, Container, Img2, Description3, FeedCard, DescriptionFeed2,
    ImgFeed, FeedFooter, DescriptionFeed, Legends, TextosContainer2, FeedFooter2, DescriptionFeed4, DescriptionFeed5,
    DescriptionFeed3, Week, DescriptionFeed22
} from './styles';
import api from '../../services/api';
import Restaurante from '../restaurante';
import { connect } from 'react-redux';




function Buscar({ city, randon, navigation, check, categoria2, dispatch, SelectDistancia, Selectvalor, SelectDias, SelectHorarios, SelectCategorias2 }) {

    var [categoria, setdataAux] = useState([]);
    var [RestauranteFiltrados, setdataAux2] = useState([]);
    var [itemValue, setdataItem] = useState([]);
    var [ExisteRestaurante, SetExisteRestaurante] = useState(true);
    var [itemValueFoto, setdataItemFotos] = useState([]);
    var [itemValueDias, setdataItemDias] = useState([{}]);
    var [textBusca, settextBusca] = useState('');
    const [modalRestauranteState, setRestauranteState] = useState(false);

    useEffect(() => {
        verifica(check, categoria2, randon);
    }, [check, categoria2, randon])


    function verifica(check, categoria2, randon) {
        console.log(check);
        if (check == "1") {
            init(randon);
        } else if (check == "2") {
            busca(categoria2);
        } else if (check == "3") {
            busca2(SelectDistancia, Selectvalor, SelectDias, SelectHorarios, SelectCategorias2, randon);
        }
    }

    async function perfilRes(item) {
        var fotos = JSON.parse(item.fotoSlider);
        var dias = JSON.parse(item.dias);
        setdataItem(item);
        setdataItemFotos(fotos);
        setdataItemDias(dias);
        setRestauranteState(true);
    }
    function setCategoriaDispatch2(item) {
        dispatch({
            type: 'setCat',
            value: item
        })

    }
    function setCategoriaDispatch3(item) {

        dispatch({
            type: 'setCat2',
            value: item
        })

    }


    function init(randon) {
        console.log(111111);
        const response = api.get('/busca/BuscaCategoria.php').then(obj => {
            setdataAux(obj.data);
            setCategoriaDispatch3('0');
        }).catch(error => {
            console.log(error);
        })
    }
    function busca(item) {

        const response = api.get('/busca/BuscaRestaurantesPorCategoriaForCity.php',
            { params: { id: item, city: city } }).then(obj => {


                if (obj.data == '0') {
                    SetExisteRestaurante(false);
                } else {
                    SetExisteRestaurante(true);
                    setdataAux2(obj.data);
                }
                setCategoriaDispatch2(item);
            }).catch(error => {
                console.log(error);
            })
    }
    function doTruncarStr(str, size) {
        if (str == undefined || str == 'undefined' || str == '' || size == undefined || size == 'undefined' || size == '') {
            return str;
        }
        var shortText = str;
        if (str.length >= size + 3) {
            shortText = str.substring(0, size).concat('...');
        }
        return shortText;
    }
    async function BuscaTextual() {

        const response = api.get('/busca/BuscaRestaurantestextoForCity.php',
            { params: { textBusca: textBusca, city: city } }).then(obj => {
                console.log(obj.data);

                if (obj.data == '0') {
                    SetExisteRestaurante(false);
                } else {
                    SetExisteRestaurante(true);
                    setdataAux2(obj.data);
                }
                dispatch({
                    type: 'buscaT'
                })
            }).catch(error => {
                console.log(error);
            })

    }
    function busca2(SelectDistancia, Selectvalor, SelectDias, SelectHorarios, SelectCategorias2, randon) {

        console.log(SelectCategorias2);
        const response = api.get('/busca/BuscaRestaurantesFilterForCity.php',
            {
                params: {
                    valor: Selectvalor, dias: SelectDias,
                    horarios: SelectHorarios, categorias2: SelectCategorias2,
                    city: city
                }
            }).then(obj => {
                console.log(obj);

                if (obj.data == '0') {
                    SetExisteRestaurante(false);
                } else {
                    if (SelectDistancia == true) {
                        //Ordenar por distancia, capturar localização do usuario e realizar calculo
                        SetExisteRestaurante(true);
                        setdataAux2(obj.data);
                    } else {
                        SetExisteRestaurante(true);
                        setdataAux2(obj.data);
                    }


                }
            }).catch(error => {
                console.log(error);
            })

    }



    function handleFacebookLogout() {
        LoginManager.logOut();
        navigation.navigate('Login');
    }


    return (
        <>
            {check == "1" ? (
                <HeaderInit style={{ paddingTop: Platform.OS === 'ios' ? 30 : 10 }}>
                    <Select>
                    </Select>
                    <Busca>
                    </Busca>
                </HeaderInit>
            ) : (
                <HeaderInit style={{ paddingTop: Platform.OS === 'ios' ? 30 : 10 }}>
                    <Select >

                    </Select>
                    <Busca style={styles.header}>
                        <TouchableWithoutFeedback onPress={() => init()} style={styles.buttonClose}>
                            <Icon name="close" size={25} color="white" style={{ marginRight: 15 }} />
                        </TouchableWithoutFeedback>
                    </Busca>
                </HeaderInit>
            )}

            {check == "1" ? (

                <Container>
                    <TextosContainer>
                        <TextTitle>Buscar</TextTitle>
                    </TextosContainer>
                    <TextosContainer2>
                        <InputBusca
                            placeholder='Busque Seu Restaurante Preferido'
                            onChangeText={(text) => { settextBusca(text) }}
                        />
                        <TouchableWithoutFeedback onPress={() => BuscaTextual()} style={styles.buttonClose}>
                            <Icon name="search" size={25} color="black" style={{ marginRight: 15 }} />
                        </TouchableWithoutFeedback>
                    </TextosContainer2>
                    <Grid
                        numColumns={2}
                        data={categoria}
                        renderItem={({ item }) =>
                            <ButtonAux onPress={() => busca(item.id)}>
                                <Categoria>
                                    <Img2
                                        source={{ uri: item.foto }}
                                        resizeMode="contain"
                                        imageStyle={{ borderRadius: 3 }}>
                                        <Description3>{item.nome}</Description3>
                                    </Img2>
                                </Categoria>
                            </ButtonAux>
                        }
                        marginExternal={1}
                        marginInternal={0}
                    />
                </Container>
            ) : (

                <Container >
                    {ExisteRestaurante ? (
                        <FlatList
                            style={styles.Feed}
                            data={RestauranteFiltrados}
                            renderItem={({ item }) =>
                                <>
                                    {item.ativo == '1' ? (
                                        <FeedCard onPress={() => perfilRes(item)}>
                                            <ImgFeed source={{ uri: item.foto }} resizeMode="contain" ></ImgFeed>
                                            <FeedFooter>
                                                <FeedFooter2>
                                                    <DescriptionFeed2>{doTruncarStr(item.nome, 22)}  </DescriptionFeed2>
                                                </FeedFooter2>
                                                <FeedFooter2>
                                                    <DescriptionFeed22>
                                                        <Icon style={styles.icones} name="star" color="#fed531" size={15} />
                                                        {item.estrelas}
                                                    </DescriptionFeed22>
                                                    <DescriptionFeed3>{JSON.parse(item.categoriasNome)[0]}</DescriptionFeed3>
                                                </FeedFooter2>
                                                <FeedFooter2>
                                                    <Icon style={styles.icones} name="map-marker" color="white" size={12} />
                                                    <DescriptionFeed4>{item.bairro}</DescriptionFeed4>
                                                </FeedFooter2>
                                                <FeedFooter2>
                                                    <View style={styles.week}>
                                                        {item.diasFunc.indexOf("segunda") != -1 ? (<Week>S</Week>) : (
                                                            <Week style={{ textDecorationLine: "line-through", color: "#80808085" }}>S</Week>
                                                        )}
                                                        {item.diasFunc.indexOf("terca") != -1 ? (<Week>T</Week>) : (
                                                            <Week style={{ textDecorationLine: "line-through", color: "#80808085" }}>T</Week>
                                                        )}
                                                        {item.diasFunc.indexOf("quarta") != -1 ? (<Week>Q</Week>) : (
                                                            <Week style={{ textDecorationLine: "line-through", color: "#80808085" }}>Q</Week>
                                                        )}
                                                        {item.diasFunc.indexOf("quinta") != -1 ? (<Week>Q</Week>) : (
                                                            <Week style={{ textDecorationLine: "line-through", color: "#80808085" }}>Q</Week>
                                                        )}
                                                        {item.diasFunc.indexOf("sexta") != -1 ? (<Week>S</Week>) : (
                                                            <Week style={{ textDecorationLine: "line-through", color: "#80808085" }}>S</Week>
                                                        )}
                                                        {item.diasFunc.indexOf("sabado") != -1 ? (<Week>S</Week>) : (
                                                            <Week style={{ textDecorationLine: "line-through", color: "#80808085" }}>S</Week>
                                                        )}
                                                        {item.diasFunc.indexOf("domingo") != -1 ? (<Week>D</Week>) : (
                                                            <Week style={{ textDecorationLine: "line-through", color: "#80808085" }}>D</Week>
                                                        )}

                                                    </View>
                                                </FeedFooter2>
                                            </FeedFooter>
                                        </FeedCard>
                                    ) : (
                                        <FeedCard style={{}}>
                                            <ImgFeed source={{ uri: item.foto }} resizeMode="contain" ></ImgFeed>
                                            <FeedFooter>
                                                <DescriptionFeed2 >Em Breve...</DescriptionFeed2>
                                                <FeedFooter2>
                                                    <DescriptionFeedMini style={{ color: '#404040' }}>{doTruncarStr(item.nome, 22)}  </DescriptionFeedMini>
                                                </FeedFooter2>
                                                <FeedFooter2>
                                                    <DescriptionFeed3 style={{ color: '#404040' }}>{JSON.parse(item.categoriasNome)[0]}</DescriptionFeed3>
                                                </FeedFooter2>
                                            </FeedFooter>
                                        </FeedCard>
                                    )}
                                </>

                            }
                            keyExtractor={item => item.id}
                        />
                    ) : (
                        <TextosContainer>
                            <TextTitle2>Não Há Restaurante Cadastrados Nessa Categoria</TextTitle2>
                        </TextosContainer>
                    )}

                </Container>
            )}
            <Restaurante itemValueFoto={itemValueFoto} itemValueDias={itemValueDias} itemState={itemValue} navigation={navigation} modalState={modalRestauranteState} setModalState={setRestauranteState} />
        </>
    );
}
const styles = StyleSheet.create({
    icones: {
        margin: 10,
    }, icones2: {
        marginTop: 4,
    }, icones3: {
        marginLeft: 10,
    }, header: {
        marginTop: 10,
    }, buttonClose: {
        height: '100%',
        width: 30
    }, top: {
        marginTop: 10
    }, week: {
        flexDirection: 'row'
    }
})


export default connect(state => ({
    categoria2: state.categoria2,
    check: state.check, SelectDistancia: state.distancia,
    Selectvalor: state.valor, SelectDias: state.dias, SelectHorarios: state.horarios,
    SelectCategorias2: state.categorias2, randon: state.randon,
    city: state.city
}))(Buscar)

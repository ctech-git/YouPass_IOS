import React, { useEffect, useState, Component } from 'react';
import {
    TouchableWithoutFeedback, ActivityIndicator, Plataform,
    ScrollView, StyleSheet, View, Linking, Text
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome'; Icon.loadFont();
import {
    ButtonAux, Legends, Space, DescriptionFeed2, DescriptionFeed3, FeedFooter, FeedFooter2,
    Description3, Categoria, TextLink, TextosContainer, Img2, Description, DescriptionFeed,
    Img3, Img, DestaquesCard, DescriptionFeed4, SelectYouPass, DescriptionFeed22,
    TextTitle, Select, Busca, Week, HeaderInit, Container, FeedCard, ImgFeed, CategoriaProximos,
} from './styles';
import api from '../../services/api';
import Restaurante from '../restaurante';
import Filter from '../filter';
import Notificacao from '../notificacao';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';
import Loader from '../../util/loader.js'
import CheckBox from 'react-native-modest-checkbox';
import SelectComponent from '../../componentes/Select';
import AsyncStorage from '@react-native-community/async-storage'


function Profile({ city, token, favorito, navigation, check, dispatch, name, New_notification }) {
    const [check_load, SetCheckLoad] = useState(false);
    const [scrollBegin, SetscrollBegin] = useState(true);
    ////////////////////////////////////////
    var [FilterTodos, setFilterTodos] = useState(true);
    var [FilterHoje, setFilterHoje] = useState(false);
    ////////////////////////////////////////
    var [dataAux, setdataAux] = useState([]);
    var [dataAux2, setdataAux2] = useState([]);
    var [dataAux3, setdataAux3] = useState([]);
    var [dataAux4, setdataAux4] = useState([]);
    var [itemValue, setdataItem] = useState([]);
    var [itemValueFoto, setdataItemFotos] = useState([]);
    var [itemValueDias, setdataItemDias] = useState([{}]);
    var [categoriasG, SetcategoriasG] = useState([{}]);
    const [countPushNotification, SetcountPushNotification] = useState(0);
    const [offset, setOffset] = useState(0);

    const [modalRestauranteState, setRestauranteState] = useState(false);
    const [favoritos, setFavoritos] = useState(false);
    const [modalFilterState, setFilterState] = useState(false);
    const [modalNotificacaoState, setNotificacaoState] = useState(false);

    const [onEndReachedCalledDuringMomentum, setonEndReachedCalledDuringMomentum] = useState(false);

    useEffect(() => {
        if (city != 0) {
            SetCheckLoad(true);
            init();
            init2();
            init3();
            atualizaPushNotification();
        }
    }, [New_notification, city])

    useEffect(() => {
        if (city != 0) {
            setOffset(0);
            setdataAux3([])
            SetscrollBegin(true);
            feed('reset');
        }
    }, [FilterHoje, city])

    function handlerCity(item) {
        SetCheckLoad(true);
        const response = api.get('/busca/alteraCity.php',
            {
                params: { token: token, city: item }
            }).then(obj => {
                console.log(obj)
                if (obj.status == 200) {
                    if (obj?.data == "1" || obj?.data == 1) {

                        var email = ""; var surname = ""; var codigo = ""; var favoritos = ""; var picture = ""; var cpf = "";
                        AsyncStorage.getItem('token').then(value => {
                            if (value != null) {
                                var array = JSON.parse(value);
                                email = array[0].email;
                                cpf = array[0].cpf;
                                surname = array[0].surname;
                                codigo = array[0].codigo;
                                favoritos = array[0].favoritos;
                                picture = array[0].picture;
                                var array2 = [];
                                array2.push({ "codigo": codigo, "token": token, "name": name, "cidadeDeUso": item, "surname": surname, "email": email, "cpf": cpf, "picture": picture });
                                AsyncStorage.setItem('token', JSON.stringify(array2));
                                dispatch({ type: 'city', city: item })
                                SetCheckLoad(false);
                            } else {
                                var array2 = [];
                                array2.push({ "codigo": false, "token": false, "name": false, "cidadeDeUso": item, "surname": false, "email": false, "cpf": false, "picture": false });
                                AsyncStorage.setItem('token', JSON.stringify(array2));
                                dispatch({ type: 'city', city: item })
                                SetCheckLoad(false);
                            }

                        });

                    } else {
                        Toast.show('Error ao selecionar Cidade [BACK]', Toast.LONG);
                        SetCheckLoad(false);
                    }
                } else {
                    Toast.show('Error ao selecionar Cidade [' + obj.status + "]", Toast.LONG);
                    SetCheckLoad(false);
                }
            }).catch(error => {
                Toast.show('Error ao selecionar Cidade [CATCH ERROR]', Toast.LONG);

                SetCheckLoad(false);
                console.log(error);
            })

    }

    async function feed(taxa = false) {
        if (offset == -1) {
            SetCheckLoad(false);
        } else if (check_load) {
            return;
        } else {
            SetCheckLoad(true);
            const response = api.get('/busca/BuscaRestaurantesForCity.php',
                {
                    params: {
                        offset: taxa == 'reset' ? (0) : (offset),
                        today: FilterHoje,
                        city: city
                    }
                }).then(obj => {

                    if (obj.data.length == 0) {
                        SetCheckLoad(false);
                        setOffset(-1);
                    } else {
                        var vetorRes = taxa == 'reset' ? (obj.data) : (dataAux3.concat(obj.data));
                        setdataAux3(vetorRes);
                        SetCheckLoad(false);
                        setOffset(taxa == 'reset' ? (1) : (Number(offset) + 1));
                        SetscrollBegin(true);
                    }

                }).catch(error => {
                    console.log(error);
                })
        }

    }

    function atualizaPushNotification() {
        const response = api.get('/busca/BuscaPushNotification.php',
            { params: { token: token, city: city } }).then(obj => {
                var mensagens = obj.data;
                var count = 0;

                for (let i = 0;i < mensagens.length;i++) {
                    if (mensagens[i].status == 0) {
                        count += 1;
                    }
                }
                SetcountPushNotification(count);

            }).catch(error => {
                console.log(error);
            })
    }
    function busca(item) {
        setCategoriaDispatch(item);
        navigation.navigate("Buscar");
    }

    function setCategoriaDispatch(item) {
        dispatch({
            type: 'setCat',
            value: item
        })
    }

    function init() {
        const response = api.get('/busca/BuscaCategoria.php').then(obj => {
            setdataAux(obj.data);
        }).catch(error => {
            console.log(error);
        })
    }
    function init2() {
        const response = api.get('/busca/BuscaDestaquesForCity.php', {
            params: { city: city }
        }).then(obj => {
            if (obj.status == 200) {
                if (obj?.data == "") {
                    setdataAux2([]);
                } else {
                    setdataAux2(obj?.data);
                }
            } else {
                setdataAux2([]);
            }
        }).catch(error => {
            console.log(error);
        })

    }
    function init3() {
        const response = api.get('/busca/BuscaRestaurantesDestaquesForCity.php', {
            params: { city: city }
        }).then(obj => {
            if (obj.status == 200) {
                if (obj?.data == "") {
                    setdataAux4([]);
                } else {
                    setdataAux4(obj?.data);
                }
            } else {
                setdataAux4([]);
            }
        }).catch(error => {
            console.log(error);
        })

    }

    function Destaque(item) {
        if (item.tipo == 1) {
            navigation.navigate("PerfilInterno");
        } else if (item.tipo == 2) {
            Linking.canOpenURL(item.url).then(supported => {
                if (supported) {
                    return Linking.openURL(item.url);
                } else {

                }

            })
        } else if (item.tipo == 3) {
            const response = api.get('/busca/BuscaRestaurantesPorID.php',
                { params: { id: item.id_restaurante } }).then(obj => {
                    if (obj.data == '0') {
                        Toast.show('Indisponivel', Toast.LONG);
                    } else {
                        perfilRes(obj.data[0]);
                    }
                }).catch(error => {
                    console.log(error);
                })
        }
    }

    async function perfilRes(item) {

        var fotos = JSON.parse(item.fotoSlider);
        var dias = JSON.parse(item.dias);

        if ((favorito == "") || (favorito == null)) {
            setFavoritos(false);
        } else {
            setFavoritos(false);
            var aux = favorito;
            for (let i = 0;i < aux.length;i++) {
                if (aux[i] == item.id) { setFavoritos(true); }
            }
        }
        setdataItem(item);
        var catAux = JSON.parse(item.categoriasNome);
        var catAux2 = "";
        for (let i = 0;i < catAux.length;i++) {
            if (i == 0) {
                catAux2 = catAux[i];
            } else {
                catAux2 = catAux2 + ", " + catAux[i];
            }
        }
        SetcategoriasG(catAux2);

        setdataItemFotos(fotos);
        setdataItemDias(dias);
        setRestauranteState(true);
    }

    async function AbriFiltros() {
        setFilterState(true);
    }
    async function AbriNotificacao() {
        setNotificacaoState(true);
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
    //////////////////////////////////////////////////////////////////////////////////////////////////////


    function checkFilter(value) {
        let type = value.label;
        let status = value.checked;

        if (type == "Todos" && status == true) {
            setFilterTodos(true);
            setFilterHoje(false);
        } else if (type == "Abertos Hoje" && status == true) {
            setFilterTodos(false);
            setFilterHoje(true);
        }
    }
    function checkFilter(value) {
        let type = value.label;
        let status = value.checked;

        if (type == "Todos" && status == true) {
            setFilterTodos(true);
            setFilterHoje(false);
        } else if (type == "Abertos Hoje" && status == true) {
            setFilterTodos(false);
            setFilterHoje(true);
        }
    }
    function checkFilter(value) {
        let type = value.label;
        let status = value.checked;

        if (type == "Todos" && status == true) {
            setFilterTodos(true);
            setFilterHoje(false);
        } else if (type == "Abertos Hoje" && status == true) {
            setFilterTodos(false);
            setFilterHoje(true);
        }
    }
    function checkFilter(value) {
        let type = value.label;
        let status = value.checked;

        if (type == "Todos" && status == true) {
            setFilterTodos(true);
            setFilterHoje(false);
        } else if (type == "Abertos Hoje" && status == true) {
            setFilterTodos(false);
            setFilterHoje(true);
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////
    const RenderData = ({ item }) => {
        return (
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
                                <DescriptionFeed2 style={{ color: '#404040' }}>{doTruncarStr(item.nome, 22)}  </DescriptionFeed2>
                            </FeedFooter2>
                            <FeedFooter2>
                                <DescriptionFeed3 style={{ color: '#404040' }}>{JSON.parse(item.categoriasNome)[0]}</DescriptionFeed3>
                                <DescriptionFeed22 style={{ color: '#404040' }}>
                                    <Icon style={styles.icones} name="star" color="#404040" size={15} />
                                    {item.estrelas}
                                </DescriptionFeed22>
                            </FeedFooter2>
                            <FeedFooter2>
                                <Icon style={styles.icones} name="map-marker" color="#404040" size={12} />
                                <DescriptionFeed4>{item.bairro}</DescriptionFeed4>
                            </FeedFooter2>
                            <FeedFooter2>
                                <View style={styles.week}>
                                    {item.diasFunc.indexOf("segunda") != -1 ? (<Week style={{ color: '#404040' }}>S</Week>) : (
                                        <Week style={{ textDecorationLine: "line-through", color: "#404040" }}>S</Week>
                                    )}
                                    {item.diasFunc.indexOf("terca") != -1 ? (<Week style={{ color: '#404040' }}>T</Week>) : (
                                        <Week style={{ textDecorationLine: "line-through", color: "#404040" }}>T</Week>
                                    )}
                                    {item.diasFunc.indexOf("quarta") != -1 ? (<Week style={{ color: '#404040' }}>Q</Week>) : (
                                        <Week style={{ textDecorationLine: "line-through", color: "#404040" }}>Q</Week>
                                    )}
                                    {item.diasFunc.indexOf("quinta") != -1 ? (<Week style={{ color: '#404040' }}>Q</Week>) : (
                                        <Week style={{ textDecorationLine: "line-through", color: "#404040" }}>Q</Week>
                                    )}
                                    {item.diasFunc.indexOf("sexta") != -1 ? (<Week style={{ color: '#404040' }}>S</Week>) : (
                                        <Week style={{ textDecorationLine: "line-through", color: "#404040" }}>S</Week>
                                    )}
                                    {item.diasFunc.indexOf("sabado") != -1 ? (<Week style={{ color: '#404040' }}>S</Week>) : (
                                        <Week style={{ textDecorationLine: "line-through", color: "#404040" }}>S</Week>
                                    )}
                                    {item.diasFunc.indexOf("domingo") != -1 ? (<Week style={{ color: '#404040' }}>D</Week>) : (
                                        <Week style={{ textDecorationLine: "line-through", color: "#404040" }}>D</Week>
                                    )}

                                </View>
                            </FeedFooter2>
                        </FeedFooter>
                    </FeedCard>
                )}
            </>
        )
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    const HeaderFlatList = ({ item }) => {
        return (
            <>
                <HeaderInit
                    style={styles.Teste}
                >
                    <Loader loading={check_load} />
                    <Select>
                        <SelectComponent
                            value={city}
                            type="simple"
                            onChange={handlerCity}
                            placeholderTextColor="#808080"
                            items={[
                                { label: 'Belém - PA', value: 1, enabled: true },
                                { label: 'Marabá - PA', value: 2, enabled: true },
                                { label: 'Canaã dos Carajás - PA', value: 3, enabled: false },
                                { label: 'Parauapebas - PA', value: 4, enabled: false },
                                { label: 'Imperatriz - MA', value: 5, enabled: false },
                            ]}
                        />
                    </Select>
                    <Busca>
                        <View>
                            <Icon style={styles.icones} name="bell"
                                onPress={() => AbriNotificacao()}
                                color="white" size={28} />
                            {countPushNotification == 0 ? (
                                <></>
                            ) : (
                                <Text style={{ position: 'absolute', fontSize: 12, fontWeight: 'bold', marginTop: -5, right: 0, alignItems: 'flex-end', color: "#fed531" }}>
                                    {countPushNotification}
                                </Text>
                            )}
                        </View>
                        <Icon style={styles.icones} name="sliders"
                            onPress={() => AbriFiltros()}
                            color="white" size={28} />
                    </Busca>
                </HeaderInit>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
                    style={styles.scroll2}>
                    {dataAux2.map(item => (
                        <ButtonAux key={item.id} onPress={() => Destaque(item)}>
                            <DestaquesCard >
                                <Img style={styles.imgslide} source={{ uri: item.foto }} resizeMode="contain" ></Img>
                                <Description>{item.nome}</Description>
                            </DestaquesCard>
                        </ButtonAux>
                    ))}
                </ScrollView>

                <TextosContainer>
                    <TextTitle>Busque por categoria</TextTitle>
                    <TextLink onPress={() => navigation.navigate("Buscar")}>Ver Todas</TextLink>
                </TextosContainer>

                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.scroll}>
                    {dataAux.map(item => (
                        <ButtonAux key={item.id} onPress={() => busca(item.id)}>
                            <Categoria>
                                <Img2 source={{ uri: item.foto }} resizeMode="contain" ></Img2>
                                <Description3>{item.nome}</Description3>
                            </Categoria>
                        </ButtonAux>
                    ))}
                </ScrollView>


                <TextosContainer>
                    <TextTitle>Sugestões</TextTitle>
                    <TextLink>Ver Todas</TextLink>
                </TextosContainer>
                <ScrollView horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={styles.scroll3}>
                    {dataAux4.map(item => (
                        <>
                            {item.ativo != '0' ? (
                                <View key={item.id + "sugestões"} >
                                    <CategoriaProximos onPress={() => perfilRes(item)}>
                                        <Img3 source={{ uri: item.foto }} resizeMode="contain" ></Img3>
                                        <Description3>{doTruncarStr(item.nome, 20)}</Description3>
                                    </CategoriaProximos>
                                </View>
                            ) : (
                                <>
                                </>
                            )}

                        </>
                    ))}
                </ScrollView>

                <TextosContainer>
                    <TextTitle>Restaurantes</TextTitle>
                </TextosContainer>
                <View style={styles.boxRadio}>
                    <CheckBox
                        checked={FilterTodos}
                        checkedComponent={<Icon name="check-circle" size={22} color="#fdeb13" />}
                        uncheckedComponent={<Icon name="circle-thin" size={22} color="#fff" />}
                        label={'Todos'}
                        color="white"
                        labelStyle={{ fontSize: 13, color: '#fff' }}
                        onChange={(checked) => checkFilter(checked)}
                    />
                    <CheckBox
                        checked={FilterHoje}
                        checkedComponent={<Icon name="check-circle" size={22} color="#fdeb13" />}
                        uncheckedComponent={<Icon name="circle-thin" size={22} color="#fff" />}
                        label={'Abertos Hoje'}
                        color="white"
                        labelStyle={{ fontSize: 13, color: '#fff' }}
                        onChange={(checked) => checkFilter(checked)}
                    />
                </View>
            </>
        )
    }
    return (
        <>

            <FlatList
                style={styles.Feed}
                data={dataAux3}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <RenderData item={item} />}
                nestedScrollEnabled={true}
                onEndReached={feed}
                onEndReachedThreshold={0.15}
                ListHeaderComponent={<HeaderFlatList />}

            />

            <Restaurante categoriasGeral={categoriasG} setFavoritos={setFavoritos} favoritos={favoritos}
                itemValueFoto={itemValueFoto} itemValueDias={itemValueDias} itemState={itemValue}
                navigation={navigation} modalState={modalRestauranteState} setModalState={setRestauranteState} />
            <Filter categoria={dataAux} navigation={navigation} modalState={modalFilterState} setModalState={setFilterState} />
            <Notificacao navigation={navigation} modalState={modalNotificacaoState} setModalState={setNotificacaoState} />
        </>
    );
}
const styles = StyleSheet.create({
    Teste: {
        paddingTop: Platform.OS === 'ios' ? 20 : 0
    },
    loading: {
        margin: 10
    },
    icones: {
        marginLeft: 20,
    },
    icones2: {
        marginTop: 4,
    },
    scroll: {
        marginBottom: 20,
        height: 100,
    },
    scroll2: {
        height: 190,
    },
    scroll3: {
        marginBottom: 20,
        height: 170,
    }, week: {
        flexDirection: 'row'
    }, imgslide: {
        width: 300,
        height: 170
    },
    loadMoreBtn: {
        padding: 10,
        backgroundColor: '#800000',
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    Feed: {
        paddingLeft: 5, paddingRight: 5,
        backgroundColor: 'black'
    },
    boxRadio: {
        flexDirection: "row",
        marginLeft: 5,
        marginBottom: 10,
    }
})

export default connect(state => ({
    token: state.token,
    New_notification: state.New_notification, name: state.name,
    favorito: state.favoritos, check: state.check, city: state.city
}))(Profile)

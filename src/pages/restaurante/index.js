import React, { useState, Component, useEffect } from 'react';
import { StatusBar, TouchableOpacity, Modal, StyleSheet, View, Text, Dimensions, Linking, PermissionsAndroid, Platform } from 'react-native';
import {
    LegendsDetalhes, TabsContainer2, Slider, Space, CaixaNome, Legends, Legends2, LegendsYellow,
    Legends3, Caixabairro, CaixaPreco, Img, CategoriaProximos, ButtonStyled2, ButtonText2
} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome'; Icon.loadFont();
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { styles } from './stylesComponentes';
import MapView, { Marker } from 'react-native-maps';
import androidCustomDark from './androidCustomDark'
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage'
import api from '../../services/api';
import ModalVoucher from './ModalVoucher';
import Toast from 'react-native-simple-toast';
import Loader from '../../util/loader';


function Restaurante({ categoriasGeral, dispatch, chave,
    setFavoritos, favoritos, token, isActive,
    favorito, itemValueFoto, itemValueDias,
    itemState, navigation, modalState, setModalState }) {

    const [check_load, SetCheckLoad] = useState(false);
    const [temporada, setSession] = useState(false);
    const [NVoucher, setNVoucher] = useState("");

    useEffect(() => {
        if (itemState.type == 1) {
            async function getVoucher() {
                if (itemState.id != undefined) {
                    const response = await api.get('/busca/User/buscaVoucherPorRes.php',
                        { params: { token: token, res: itemState.id } })
                        .then(data => {
                            if (data.status == 200 && data.data != 0 && data.data != "0") {
                                let value = data.data[0].total;
                                value = 2 - Number(value);
                                setNVoucher(value);
                            } else if (data.data == 0 || data.data == "0") {
                                setNVoucher(2);
                            } else {
                                console.log(data)
                            }
                        })
                }
            }

            if (token.length != 0) {
                getVoucher()
            }
        }

    }, [itemState.id, token])

    async function favoritar() {
        var t = [];
        if (favorito.length == 0) {
            t.push(itemState.id);
        } else {
            t = favorito.filter(f => true);
            t.push(itemState.id);
        }


        dispatch({ type: 'favorita', favoritos: t })

        if (AsyncStorage.getItem('token') != null || AsyncStorage.getItem('token') != undefined) {
            AsyncStorage.getItem('token').then(value => {
                var array = JSON.parse(value);
                token = array[0].token;
                email = array[0].email;
                surname = array[0].surname;
                name = array[0].name;
                var array2 = [];
                array2.push({
                    "token": token, "name": name,
                    "surname": surname, "email": email, "favoritos": t
                });
                AsyncStorage.setItem('token', JSON.stringify(array2));
            });


            const response = await api.get('/busca/editaFavoritos.php', {
                params: { token: chave, dado: JSON.stringify(t) }
            }).then(data => {
                if (data.data == "false") {
                    Toast.show('Error ao Salvar Favoritar', Toast.LONG);

                } else {

                }
            }).catch(error => {
                console.log(error);
            })

            setFavoritos(true);

        }
    }
    async function desfavoritar() {


        var t = [];
        var aux = favorito;

        for (let index = 0;index < aux.length;index++) {
            if (aux[index] == itemState.id) { } else { t.push(aux[index]); }
        }
        dispatch({ type: 'favorita', favoritos: t })

        if (AsyncStorage.getItem('token') != null || AsyncStorage.getItem('token') != undefined) {
            AsyncStorage.getItem('token').then(value => {
                var array = JSON.parse(value);
                token = array[0].token;
                email = array[0].email;
                surname = array[0].surname;
                name = array[0].name;
                var array2 = [];
                array2.push({
                    "token": token, "name": name,
                    "surname": surname, "email": email, "favoritos": t
                });
                AsyncStorage.setItem('token', JSON.stringify(array2));
            });


            const response = await api.get('/busca/editaFavoritos.php', {
                params: { token: chave, dado: JSON.stringify(t) }
            }).then(data => {
                if (data.data == "false") {
                    Toast.show('Error ao Salvar Desfavoritar', Toast.LONG);
                } else {

                }
            }).catch(error => {
                console.log(error);
            })

            setFavoritos(false);

        }
    }

    const [ModalVoucherState, setModalVoucher] = useState(false);

    async function usarVoucher() {
        if (token) {
            if (isActive == 2 || isActive == '2') {
                SetCheckLoad(true)
                const response = await api.get('/busca/buscaUser.php', { params: { token: chave } })
                    .then(async data => {
                        var dadosCompra = data.data;
                        var Session = dadosCompra.session;
                        var FimDoPlano = (dadosCompra?.tempoPacote)?.split(" ")[0];
                        var FimDoPlano = FimDoPlano == undefined ? (0) : (new Date(FimDoPlano));
                        var InicioDoPlano = (dadosCompra?.dataPacote)?.split(" ")[0];
                        var InicioDoPlano = InicioDoPlano == undefined ? (0) : (new Date(InicioDoPlano));

                        var DataDeHoje = new Date();
                        if (FimDoPlano > DataDeHoje) {
                            var timeDiff = Math.abs(InicioDoPlano.getTime() - DataDeHoje.getTime());
                            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                            diffDays = Math.floor(diffDays / 183);
                            if (diffDays != Session) {
                                Session = diffDays;
                                const response = await api.get('/busca/alteraSession.php',
                                    { params: { token: chave, session: Session } }).then(data2 => {

                                    })
                            }
                            setSession(Session);
                            usarVoucher2();
                            SetCheckLoad(false)
                        } else {
                            ////////BUSCAR PAGSEGURO PARA VER SE RENOVOU OU CANCELOU
                            const response = await api.get('/busca/verificarStatusPagSeguro.php',
                                { params: { token: chave } }).then(async data2 => {
                                    var status = data2.data.status;
                                    if (status != "ACTIVE") {
                                        const response = await api.get('/busca/alteraDataPlano.php',
                                            { params: { token: chave } }).then(data2 => {

                                                setSession(Session);
                                                usarVoucher2();
                                                SetCheckLoad(false);

                                            })
                                    } else {
                                        Toast.show('O seu plano não foi renovado');
                                        SetCheckLoad(false)
                                    }
                                })
                        }
                    })
            } else {
                Toast.show('Assine nossos palnos e aproveite');
                SetCheckLoad(false)
            }
        } else {
            setModalState(false)
            navigation.navigate("Perfil");
        }
    }
    function usarVoucher2() {
        setModalVoucher(true);
    }

    function goToLogin() {
        console.log("---------")
        setModalState(false);
        navigation.navigate("Perfil");
    }

    return (
        <Modal visible={modalState}
            animationType="slide"
            style={styles.ViewBlack}
            onRequestClose={() => setModalState(false)}
        >
            <Loader loading={check_load} />

            <StatusBar
                color="white"
                barStyle="light-content"
                translucent={true}
            ></StatusBar>
            <ParallaxScrollView
                BackgroundColor="red"
                stickyHeaderHeight={STICKY_HEADER_HEIGHT}
                parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
                backgroundSpeed={10}
                renderStickyHeader={() => (
                    <View key="sticky-header" style={styles.stickySection}>
                        <Text style={styles.stickySectionText}>{itemState.nome}</Text>
                    </View>
                )}

                renderFixedHeader={() => (
                    <View key="fixed-header" style={styles.fixedSection}>
                        <Icon name="arrow-left" size={25} color="white" style={{
                            marginRight: 15,
                            paddingTop: Platform.OS === 'ios' ? 20 : 0
                        }} onPress={() => { setModalState(false) }} />
                        {favoritos ? (
                            <Icon name="heart" size={25} color="white" style={{
                                marginRight: 15,
                                paddingTop: Platform.OS === 'ios' ? 20 : 0
                            }} onPress={() => { desfavoritar() }} />
                        ) : (
                            <Icon name="heart-o" size={25} color="white" style={{
                                marginRight: 15,
                                paddingTop: Platform.OS === 'ios' ? 20 : 0
                            }} onPress={() => { favoritar() }} />
                        )}
                    </View>
                )}
                renderForeground={() => (
                    <View key="parallax-header" style={styles.parallaxHeader}>
                        <Slider horizontal={true} >
                            {itemValueFoto.map(item => (
                                <CategoriaProximos key={item.id}>
                                    <Img source={{ uri: item.foto }} resizeMode="contain" ></Img>
                                </CategoriaProximos>
                            ))}
                        </Slider>
                    </View>
                )}
            >
                <View style={styles.ViewBlack}>
                    <Space></Space>
                    <CaixaNome >
                        <Legends>{itemState.nome}</Legends>
                        <Legends >
                            <Icon name="star" color="yellow" size={20} />
                            {itemState.estrelas}
                        </Legends>
                    </CaixaNome>
                    <Caixabairro >
                        <Legends2>{categoriasGeral}</Legends2>
                        <Legends2> | Bairro: {itemState.bairro}</Legends2>
                    </Caixabairro>
                    <Caixabairro >

                        {itemState.type == 1 ? (
                            <LegendsYellow>Tipo: Comida em Dobro</LegendsYellow>
                        ) : (
                            <LegendsYellow>Tipo: Cupons Ilimitados</LegendsYellow>
                        )}

                    </Caixabairro>
                    <View style={styles.redesSociais2}>
                        {token.length == 0 ? (
                            <TouchableOpacity style={styles.TouchCompra}
                                onPress={() => goToLogin()}>
                                <ButtonText2 >Fazer Login</ButtonText2>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity style={styles.TouchCompra}
                                onPress={() => usarVoucher()}>
                                <ButtonText2 >Usar Voucher</ButtonText2>
                                <Icon name="ticket" size={30} style={styles.iconInfo}></Icon>
                            </TouchableOpacity>
                        )}
                    </View>
                    {token.length != 0 && (
                        itemState.type == 1 && (
                            <>
                                <Text style={{ color: '#fff', textAlign: 'center' }}>Restam
                                    <Text style={{ color: 'yellow' }}> {(NVoucher == null || NVoucher == undefined) ? (0) : (NVoucher)} </Text>
                                    Vouchers</Text>
                            </>
                        )
                    )}
                    <View style={styles.checkin}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Icon name="ticket" size={20} style={styles.iconInfo}>
                                <Text style={styles.TextInfo}>Voucher de Desconto</Text></Icon>
                        </View>
                        <Text style={styles.TextInfo2}>{itemState.desconto}</Text>
                    </View>
                    <Text style={styles.TextInfo}>Dias e Horários</Text>
                    <View style={styles.Dias}>
                        <Text style={styles.TextInfoDias}>Segunda Feira</Text>
                        <Text style={styles.TextInfoDias}>{itemValueDias[0].segunda}</Text>
                    </View>
                    <View style={styles.Dias}>
                        <Text style={styles.TextInfoDias}>Terça Feira</Text>
                        <Text style={styles.TextInfoDias}>{itemValueDias[0].terca}</Text>
                    </View>
                    <View style={styles.Dias}>
                        <Text style={styles.TextInfoDias}>Quarta Feira</Text>
                        <Text style={styles.TextInfoDias}>{itemValueDias[0].quarta}</Text>
                    </View>
                    <View style={styles.Dias}>
                        <Text style={styles.TextInfoDias}>Quinta Feira</Text>
                        <Text style={styles.TextInfoDias}>{itemValueDias[0].quinta}</Text>
                    </View>
                    <View style={styles.Dias}>
                        <Text style={styles.TextInfoDias}>Sexta Feira</Text>
                        <Text style={styles.TextInfoDias}>{itemValueDias[0].sexta}</Text>
                    </View>
                    <View style={styles.Dias}>
                        <Text style={styles.TextInfoDias}>Sabado</Text>
                        <Text style={styles.TextInfoDias}>{itemValueDias[0].sabado}</Text>
                    </View>
                    <View style={styles.Dias}>
                        <Text style={styles.TextInfoDias}>Domingo</Text>
                        <Text style={styles.TextInfoDias}>{itemValueDias[0].domingo}</Text>
                    </View>

                    <View style={styles.linha} />
                    <Text style={styles.TextInfo}>Regras e Restrições</Text>
                    <Text style={styles.TextRegras}>{itemState.regras}</Text>
                    <View style={styles.linha} />
                    <Text style={styles.TextInfo}>Contatos</Text>
                    <View style={styles.redesSociais}>
                        {itemState.facebook == "" ? (
                            <></>
                        ) : (
                            <Icon name="facebook" size={30}
                                color="white"
                                style={{ marginRight: 15 }}
                                style={{ marginRight: 15 }}
                                onPress={() =>
                                    Linking.canOpenURL("fb://page/" + itemState.facebook).then(supported => {
                                        if (supported) {
                                            return Linking.openURL("fb://page/" + itemState.facebook);
                                        } else {
                                            return Linking.openURL("https://www.facebook.com/" + itemState.facebook);
                                        }
                                    })
                                }>  </Icon>
                        )}

                        <Icon name="instagram"
                            size={30} color="white"
                            style={{ marginRight: 15 }}
                            onPress={() =>

                                Linking.canOpenURL("instagram://user?username=" + itemState.instagram).then(supported => {
                                    console.log(supported);
                                    if (supported) {
                                        return Linking.openURL("instagram://user?username=" + itemState.instagram + "")
                                    } else {
                                        return Linking.openURL("https://api.instagram.com/" + itemState.instagram + "");
                                    }
                                })
                            }>
                        </Icon>
                        {itemState.fone == "" ? (
                            <></>
                        ) : (
                            <Icon
                                name="whatsapp"
                                size={30} color="white"
                                style={{ marginRight: 15 }}
                                onPress={() =>
                                    Linking.canOpenURL("whatsapp://send?").then(supported => {
                                        if (supported) {
                                            return Linking.openURL(
                                                "whatsapp://send?phone=" + itemState.fone + "");
                                        } else {
                                            return Linking.openURL(
                                                "https://api.whatsapp.com/send?phone=" + itemState.fone + "");
                                        }
                                    })
                                }>
                            </Icon>
                        )}

                    </View>
                    <View style={styles.linha} />
                    <Text style={styles.TextInfo}>Encontre o Caminho</Text>
                    <View style={styles.redesSociais2}>
                        <Icon name="map-marker" size={70} color="white" style={{ marginRight: 15 }}
                            onPress={() =>
                                Linking.canOpenURL("whatsapp://send?").then(supported => {
                                    if (supported) {
                                        return Linking.openURL(itemState.maps);
                                    } else {
                                        return Linking.openURL(itemState.maps);
                                    }
                                })
                            }>

                        </Icon>
                    </View>
                    <Text style={styles.TextRegras}>{itemState.endereco}</Text>
                    <View style={styles.map2}>
                        <MapView
                            style={styles.map}
                            loadingEnabled={true}
                            region={{
                                latitude: parseFloat(itemState.latitude),
                                longitude: parseFloat(itemState.longitude),
                                latitudeDelta: 0.015,
                                longitudeDelta: 0.0121
                            }}
                            //customMapStyle={Platform.OS === 'android' && theme.theme === 'dark' ? androidCustomDark : []}
                            customMapStyle={Platform.OS === 'android' ? androidCustomDark : []}
                        >
                            <Marker
                                coordinate={{ latitude: parseFloat(itemState.latitude), longitude: parseFloat(itemState.longitude) }}
                                title={itemState.nome}
                                description={itemState.nome}
                            />
                        </MapView>
                    </View>

                </View>
            </ParallaxScrollView>
            <ModalVoucher temporada={temporada} itemState={itemState} nomeRes={itemState.nome} logoRes={itemState.foto} id_restaurante={itemState.id} navigation={navigation} modalState={ModalVoucherState} setModalState={setModalVoucher} />
        </Modal >
    );
}

const PARALLAX_HEADER_HEIGHT = 220;
const STICKY_HEADER_HEIGHT = 60;

export default connect(state => ({
    chave: state.token, name: state.name,
    favorito: state.favoritos, isActive: state.isActive, check: state.check, token: state.token
}))(Restaurante)
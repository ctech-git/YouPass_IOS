import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'; Icon.loadFont();
import {
    Text, Platform, Modal, StatusBar, TextInput, View, StyleSheet, TouchableHighlight, TouchableWithoutFeedback, ScrollView, TouchableOpacity,
    Keyboard
} from 'react-native';
import {
    Art, LegendsDetalhes, TabsContainer2, Slider, Space, CaixaNome, Legends, Legends22, Legends2,
    Legends3, CardSlider, Caixabairro, CaixaPreco, Img, CategoriaProximos, ButtonStyled2, ButtonText2
} from './styles';
import api from '../../services/api';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import Loader from '../../util/loader.js'
import NumberFormat from 'react-number-format';
import { TextInputMask } from 'react-native-masked-text';


function ModalVoucher({ itemState, temporada, nomeRes, logoRes, id_restaurante, navigation, modalState, setModalState, dispatch, token, isActive }) {
    const [checkValue, setcheckValue] = useState(true);
    const [check_load, SetCheckLoad] = useState(false);
    const [checkValue2, setcheckValue2] = useState(true);

    const [dataAssinatura, setdataAssinatura] = useState('');
    const [ativoAte, setativoAte] = useState('');
    const [plano, setPlano] = useState('');
    const [LiberaBotao, SetLiberaBotao] = useState(false);

    const [ButtonVisable, SetButtonVisable] = useState(true);
    const [Pergunta, SetPergunta] = useState(1);
    /////////////////////////////////////////////
    const [Resposta1, SetResposta1] = useState(5);
    const [Resposta2, SetResposta2] = useState(5);
    const [Resposta3, SetResposta3] = useState(5);
    const [ValorEconomia, SetValorEconomia] = useState(0);
    const [ValorTotal, SetValorTotal] = useState(0);
    ////////////////////////////////////////////////
    const [star1, Setstar1] = useState(['star-o', 'star-o', 'star-o']);
    const [star2, Setstar2] = useState(['star-o', 'star-o', 'star-o']);
    const [star3, Setstar3] = useState(['star-o', 'star-o', 'star-o']);
    const [star4, Setstar4] = useState(['star-o', 'star-o', 'star-o']);
    const [star5, Setstar5] = useState(['star-o', 'star-o', 'star-o']);
    const [CodVoucher, setCodVoucher] = useState();
    const [hora, setHora] = useState();
    const [cpf, setcpf] = useState();

    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    function _keyboardDidShow() {
        SetButtonVisable(false);
    }
    function SetValorEconomia2(params) {
        params = params.replace("-", "");
        params = params.replace(",", ".");

        SetValorEconomia(params);
    }
    function _keyboardDidHide() {
        SetButtonVisable(true);
    }
    /////////////////////////////////////////////////////////
    async function avaliar() {
        SetCheckLoad(true);
        SetPergunta(1);
        SetButtonVisable(true);
        const response = await api.get('/busca/buscaUser.php',
            { params: { token: token } })
            .then(data => {
                var user = data.data;
                setdataAssinatura(user.dataPacote);
                setativoAte(user.tempoPacote);
                setPlano(user.plano);

                var aux = 2;
                buscaHistoricoVoucher(aux);

            })
    }


    /////////////////////////////////////////////////
    async function buscaHistoricoVoucher(aux) {

        if (itemState.type == 2) {
            setcheckValue(false);
            SetCheckLoad(false);
        } else {
            const response = await api.get('/busca/buscaVoucher.php',
                { params: { token: token, res: id_restaurante, temporada: temporada } })
                .then(data => {
                    SetCheckLoad(false);
                    if (data.data == "0") {
                        var usados = 0;
                    } else {
                        var usados = data.data.length;
                    }
                    if (aux <= usados) {
                        Toast.show('Você já atingiu o limite para esse estabelecimento');
                    } else {
                        setcheckValue(false);
                    }
                })
        }
    }


    ///////////////////////////////////////////////////////////////

    function close() {
        setcheckValue(true);
        setModalState(false)
    }

    function SelectStar(question, nota) {
        if (Pergunta == 1) {
            SetResposta1(5);
            SetResposta2(5);
            SetResposta3(5);
            SetValorEconomia(0);
            SetValorTotal(0);
        }
        SetLiberaBotao(true);

        if (nota == 1) {
            var aux = star1.filter(f => true); aux[question] = 'star'; Setstar1(aux);
            var aux = star2.filter(f => true); aux[question] = 'star-o'; Setstar2(aux);
            var aux = star3.filter(f => true); aux[question] = 'star-o'; Setstar3(aux);
            var aux = star4.filter(f => true); aux[question] = 'star-o'; Setstar4(aux);
            var aux = star5.filter(f => true); aux[question] = 'star-o'; Setstar5(aux);
            if (question == 1) { SetResposta1(1); } if (question == 2) { SetResposta2(1); } if (question == 3) { SetResposta3(1); }
        } else if (nota == 2) {
            var aux = star1.filter(f => true); aux[question] = 'star'; Setstar1(aux);
            var aux = star2.filter(f => true); aux[question] = 'star'; Setstar2(aux);
            var aux = star3.filter(f => true); aux[question] = 'star-o'; Setstar3(aux);
            var aux = star4.filter(f => true); aux[question] = 'star-o'; Setstar4(aux);
            var aux = star5.filter(f => true); aux[question] = 'star-o'; Setstar5(aux);
            if (question == 1) { SetResposta1(2); } if (question == 2) { SetResposta2(2); } if (question == 3) { SetResposta3(2); }
        } else if (nota == 3) {
            var aux = star1.filter(f => true); aux[question] = 'star'; Setstar1(aux);
            var aux = star2.filter(f => true); aux[question] = 'star'; Setstar2(aux);
            var aux = star3.filter(f => true); aux[question] = 'star'; Setstar3(aux);
            var aux = star4.filter(f => true); aux[question] = 'star-o'; Setstar4(aux);
            var aux = star5.filter(f => true); aux[question] = 'star-o'; Setstar5(aux);
            if (question == 1) { SetResposta1(3); } if (question == 2) { SetResposta2(3); } if (question == 3) { SetResposta3(3); }
        } else if (nota == 4) {
            var aux = star1.filter(f => true); aux[question] = 'star'; Setstar1(aux);
            var aux = star2.filter(f => true); aux[question] = 'star'; Setstar2(aux);
            var aux = star3.filter(f => true); aux[question] = 'star'; Setstar3(aux);
            var aux = star4.filter(f => true); aux[question] = 'star'; Setstar4(aux);
            var aux = star5.filter(f => true); aux[question] = 'star-o'; Setstar5(aux);
            if (question == 1) { SetResposta1(4); } if (question == 2) { SetResposta2(4); } if (question == 3) { SetResposta3(4); }
        } else {
            var aux = star1.filter(f => true); aux[question] = 'star'; Setstar1(aux);
            var aux = star2.filter(f => true); aux[question] = 'star'; Setstar2(aux);
            var aux = star3.filter(f => true); aux[question] = 'star'; Setstar3(aux);
            var aux = star4.filter(f => true); aux[question] = 'star'; Setstar4(aux);
            var aux = star5.filter(f => true); aux[question] = 'star'; Setstar5(aux);
            if (question == 1) { SetResposta1(5); } if (question == 2) { SetResposta2(5); } if (question == 3) { SetResposta3(5); }
        }



    }

    async function nextQuestion3() {
        var aux = Pergunta; aux += 1;

        if (aux == 6) {
            var res = Resposta;
            res.push(ValorEconomia);
            res.push(ValorTotal);
            console.log("---------------");
            console.log(res);
            const response = await api.get('/busca/EditaVoucher.php', {
                params: { token: token, resposta: res, id_res: id_restaurante, v: 1 }
            }).then(data => {

                setModalState(false);
                ////////////////////////
                setcheckValue(true);
                setcheckValue2(true);

                SetButtonVisable(true);
            }).catch(error => {
                console.log(error);
            })
        } else {

        }
        SetPergunta(aux);

    }
    /////////////////////////////////////////////////////////////////////
    async function nextQuestion() {
        if (Pergunta == 1) {
            SetResposta1(5);
            SetResposta2(5);
            SetResposta3(5);
            SetValorEconomia(0);
            SetValorTotal(0);
        }
        var verifica = true;
        var Stringerror = 'Valor Invalido';


        if (Pergunta == 4) {
            if (ValorEconomia.length != undefined) {
                var valor_economia = ValorEconomia.replace(/[^\d]+/g, '');
                valor_economia = valor_economia / 100;
                if (valor_economia < 1) {
                    verifica = false;
                    Stringerror = 'Valor de economia invalido'
                }
            } else {
                verifica = false;
            }
        }
        if (Pergunta == 5) {
            if (ValorTotal.length != undefined) {
                var valor_total = ValorTotal.replace(/[^\d]+/g, '');
                valor_total = valor_total / 100;
                var valor_economia = ValorEconomia.replace(/[^\d]+/g, '');
                valor_economia = valor_economia / 100;
                if ((valor_total < 1)) {
                    verifica = false;
                    Stringerror = 'Valor de consumo invalido'
                } else if ((valor_total < valor_economia)) {
                    verifica = false;
                    Stringerror = 'Consumo deve ser maior que economia'
                } else {
                    SetCheckLoad(true);
                }
            } else {
                verifica = false;
            }
        }
        if (verifica) {
            if (LiberaBotao == true || Pergunta == 4 || Pergunta == 5) {
                var aux = Pergunta;
                aux += 1;
                if (aux == 6) {
                    var res = [];
                    var valor_economia = ValorEconomia.replace(/[^\d]+/g, '');
                    valor_economia = valor_economia / 100;

                    var valor_total = ValorTotal.replace(/[^\d]+/g, '');
                    valor_total = valor_total / 100;
                    res.push(Resposta1);
                    res.push(Resposta2);
                    res.push(Resposta3);
                    res.push(valor_economia);
                    res.push(valor_total);
                    console.log(res);
                    const response = await api.get('/busca/SalvaVoucherForType.php', {
                        params: { token: token, resposta: res, id_res: id_restaurante, v: 1, temporada: temporada, type: itemState.type }
                    }).then(data => {
                        console.log(data.data);
                        SetButtonVisable(false);
                        setCodVoucher(data.data[0].max);
                        setcpf(data.data[0].cpf)
                        var now = new Date; var mes = now.getMonth() + 1; var dia = now.getDate();
                        if (mes < 10) { mes = "0" + mes; } if (dia < 10) { dia = "0" + dia; }
                        var time = dia + "/" + mes + "/" + now.getFullYear() + " às " + now.getHours() + ":" + now.getMinutes();
                        setcheckValue2(false);
                        setHora(time);
                        Setstar1(['star-o', 'star-o', 'star-o']);
                        Setstar2(['star-o', 'star-o', 'star-o']);
                        Setstar3(['star-o', 'star-o', 'star-o']);
                        Setstar4(['star-o', 'star-o', 'star-o']);
                        Setstar5(['star-o', 'star-o', 'star-o']);
                        SetCheckLoad(false);
                    }).catch(error => {
                        console.log(error);
                    })
                }
                SetPergunta(aux);
            } else {
                Toast.show('Necessario Avaliar');
            }
            SetLiberaBotao(false);
        } else {
            Toast.show(Stringerror);
        }
    }


    return (
        <>
            <Modal visible={modalState} animationType="slide" onRequestClose={() => setModalState(false)}>
                <Loader loading={check_load} />
                {checkValue ? (
                    <>
                        <TouchableHighlight style={styles.buttonClose}
                            onPress={() => { close() }}>
                            <Icon name="close" style={styles.icon} size={35} />
                        </TouchableHighlight>
                    </>
                ) : (
                    checkValue2 ? (
                        <>
                        </>
                    ) : (
                        <>
                            <TouchableHighlight style={styles.buttonClose}
                                onPress={() => { close() }}>
                                <Icon name="close" style={styles.icon} size={35} />
                            </TouchableHighlight>
                        </>
                    )
                )}

                <View style={{ backgroundColor: '#000', height: '100%', flex: 1 }}>
                    {isActive == 2 ? (
                        <View>
                            {checkValue ? (
                                <View>
                                    <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 50 }}>
                                        <Img source={require('../../images/check.png')} style={{ width: 300, height: 300 }} />
                                    </View>
                                    <LegendsDetalhes style={{ marginTop: 20 }}>
                                        Seja bem vindo a novas experiências
                                    </LegendsDetalhes>
                                    <TouchableHighlight style={{
                                        height: 50, backgroundColor: '#fff', width: '80%', marginLeft: '10%',
                                        marginTop: 20, borderRadius: 10
                                    }}
                                        onPress={() => { avaliar() }}>
                                        <Text style={{ color: '#000', fontSize: 25, textAlign: 'center', margin: 5, fontWeight: 'bold' }}>
                                            Avaliar Restaurante
                                        </Text>
                                    </TouchableHighlight>
                                </View>
                            ) : (
                                <View style={{ height: '100%' }} >
                                    <ScrollView>
                                        <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 30 }}>
                                            <Art source={{ uri: logoRes }} />
                                        </View>
                                        <Text style={{ color: '#fff', fontSize: 25, textAlign: 'center', margin: 5 }}>{nomeRes}</Text>
                                        {Pergunta == 1 ? (
                                            <>
                                                <CardSlider>
                                                    <TouchableWithoutFeedback onPress={() => { SelectStar(0, 1) }}><Icon name={star1[0]} style={styles.icon} size={25} /></TouchableWithoutFeedback>
                                                    <TouchableWithoutFeedback onPress={() => { SelectStar(0, 2) }}><Icon name={star2[0]} style={styles.icon} size={25} /></TouchableWithoutFeedback>
                                                    <TouchableWithoutFeedback onPress={() => { SelectStar(0, 3) }}><Icon name={star3[0]} style={styles.icon} size={25} /></TouchableWithoutFeedback>
                                                    <TouchableWithoutFeedback onPress={() => { SelectStar(0, 4) }}><Icon name={star4[0]} style={styles.icon} size={25} /></TouchableWithoutFeedback>
                                                    <TouchableWithoutFeedback onPress={() => { SelectStar(0, 5) }}><Icon name={star5[0]} style={styles.icon} size={25} /></TouchableWithoutFeedback>
                                                </CardSlider>
                                                <Text style={{ color: '#fff', fontSize: 20, textAlign: 'center', margin: 5 }}>
                                                    Qual nota você daria para a comida?
                                                </Text>
                                            </>
                                        ) : (
                                            Pergunta == 2 ? (
                                                <>
                                                    <CardSlider>
                                                        <TouchableWithoutFeedback onPress={() => { SelectStar(1, 1) }}><Icon name={star1[1]} style={styles.icon} size={25} /></TouchableWithoutFeedback>
                                                        <TouchableWithoutFeedback onPress={() => { SelectStar(1, 2) }}><Icon name={star2[1]} style={styles.icon} size={25} /></TouchableWithoutFeedback>
                                                        <TouchableWithoutFeedback onPress={() => { SelectStar(1, 3) }}><Icon name={star3[1]} style={styles.icon} size={25} /></TouchableWithoutFeedback>
                                                        <TouchableWithoutFeedback onPress={() => { SelectStar(1, 4) }}><Icon name={star4[1]} style={styles.icon} size={25} /></TouchableWithoutFeedback>
                                                        <TouchableWithoutFeedback onPress={() => { SelectStar(1, 5) }}><Icon name={star5[1]} style={styles.icon} size={25} /></TouchableWithoutFeedback>
                                                    </CardSlider>
                                                    <Text style={{ color: '#fff', fontSize: 20, textAlign: 'center', margin: 5 }}>
                                                        Qual nota você daria para nosso atendimento?
                                                    </Text>
                                                </>
                                            ) : (
                                                Pergunta == 3 ? (
                                                    <>
                                                        <CardSlider>
                                                            <TouchableWithoutFeedback onPress={() => { SelectStar(2, 1) }}><Icon name={star1[2]} style={styles.icon} size={25} /></TouchableWithoutFeedback>
                                                            <TouchableWithoutFeedback onPress={() => { SelectStar(2, 2) }}><Icon name={star2[2]} style={styles.icon} size={25} /></TouchableWithoutFeedback>
                                                            <TouchableWithoutFeedback onPress={() => { SelectStar(2, 3) }}><Icon name={star3[2]} style={styles.icon} size={25} /></TouchableWithoutFeedback>
                                                            <TouchableWithoutFeedback onPress={() => { SelectStar(2, 4) }}><Icon name={star4[2]} style={styles.icon} size={25} /></TouchableWithoutFeedback>
                                                            <TouchableWithoutFeedback onPress={() => { SelectStar(2, 5) }}><Icon name={star5[2]} style={styles.icon} size={25} /></TouchableWithoutFeedback>
                                                        </CardSlider>
                                                        <Text style={{ color: '#fff', fontSize: 20, textAlign: 'center', margin: 5 }}>
                                                            Qual nota você daria para nosso ambiente?
                                                        </Text>
                                                    </>
                                                ) : (
                                                    Pergunta == 4 ? (
                                                        <>
                                                            <CardSlider>
                                                                <TextInputMask
                                                                    type={'money'}
                                                                    options={{
                                                                        precision: 2, separator: ',',
                                                                        delimiter: '.', unit: 'R$', suffixUnit: ''
                                                                    }}
                                                                    value={ValorEconomia}
                                                                    fontSize={25}
                                                                    onChangeText={text => {
                                                                        SetValorEconomia(text);
                                                                    }}
                                                                    style={{ borderColor: 'white', borderWidth: 1, width: '100%', borderRadius: 20, textAlign: 'center', color: "#ffc700" }}
                                                                />
                                                            </CardSlider>
                                                            <Text style={{ color: '#fff', fontSize: 20, textAlign: 'center', margin: 5 }}>
                                                                Quanto você economizou hoje?
                                                            </Text>
                                                        </>
                                                    ) : (
                                                        Pergunta == 5 ? (
                                                            <>
                                                                <CardSlider>
                                                                    <TextInputMask
                                                                        type={'money'}
                                                                        options={{
                                                                            precision: 2, separator: ',',
                                                                            delimiter: '.', unit: 'R$', suffixUnit: ''
                                                                        }}
                                                                        value={ValorTotal}
                                                                        fontSize={25}
                                                                        onChangeText={text => {
                                                                            SetValorTotal(text);
                                                                        }}
                                                                        style={{ borderColor: 'white', borderWidth: 1, width: '100%', borderRadius: 20, textAlign: 'center', color: "#ffc700" }}
                                                                    />
                                                                </CardSlider>
                                                                <Text style={{ color: '#fff', fontSize: 20, textAlign: 'center', margin: 5 }}>
                                                                    Quanto foi seu consumo hoje?
                                                                </Text>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <View>
                                                                    <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 10 }}>
                                                                        <Icon name="check-circle-o" style={styles.icon3} />
                                                                    </View>
                                                                    <LegendsDetalhes >
                                                                        O seu voucher foi gerado com sucesso
                                                                    </LegendsDetalhes>

                                                                    <View style={{
                                                                        height: 50, backgroundColor: '#fff', width: '80%', marginLeft: '10%',
                                                                        marginTop: 30, borderRadius: 10
                                                                    }}>
                                                                        <Text style={{
                                                                            color: '#000', fontSize: 25, textAlign: 'center', margin: 5, fontWeight: 'bold'
                                                                        }}>
                                                                            #{CodVoucher}
                                                                        </Text>
                                                                    </View>
                                                                    <Text style={{ color: '#fff', fontSize: 15, textAlign: 'center', margin: 5 }}>
                                                                        Gerado em: {hora}
                                                                    </Text>
                                                                    <Text style={{ color: '#fff', fontSize: 15, textAlign: 'center', margin: 5 }}>
                                                                        CPF: {cpf}
                                                                    </Text>
                                                                </View>
                                                            </>
                                                        )
                                                    )
                                                )
                                            )
                                        )}

                                    </ScrollView>
                                    {ButtonVisable ? (
                                        <View style={{ flex: 1, position: 'absolute', bottom: 0, marginBottom: 30, width: '70%', marginLeft: '15%' }}>

                                            <TouchableOpacity onPress={() => nextQuestion()} style={{
                                                height: 50, backgroundColor: '#fff', width: '100%', borderRadius: 10, paddingTop: 10, flexDirection: 'row', justifyContent: 'center'
                                            }} >
                                                <>
                                                    <Text style={{ color: '#000', fontSize: 20, fontWeight: 'bold' }}>Próxima </Text>
                                                    <Icon name="arrow-right" color={'#ffc700'} size={25} style={{ marginLeft: 15 }} />
                                                </>
                                            </TouchableOpacity>

                                        </View >
                                    ) : (
                                        <>
                                        </>
                                    )}

                                </View>
                            )}
                        </View>
                    ) : (
                        <View>
                            <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 100 }}>
                                <Icon name="times-circle-o" style={styles.icon2} />
                            </View>
                            <LegendsDetalhes>
                                Você Precisa de uma conta ativa para utilizar os Voucher Youpass
                            </LegendsDetalhes>
                        </View>
                    )}
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    icon: {
        margin: 15,
        color: "#fed531"
    }, icon2: {
        color: "#fed531",
        fontSize: 300
    }, icon3: {
        color: "#fed531",
        fontSize: 100
    },
    buttonClose: {
        flexDirection: "row",
        backgroundColor: "#000",
        justifyContent: "flex-end",
        paddingTop: Platform.OS === 'ios' ? 30 : 10
    }
})

export default connect(state => ({ token: state.token, isActive: state.isActive }))(ModalVoucher)

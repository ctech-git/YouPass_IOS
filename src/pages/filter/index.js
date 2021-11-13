import React, { useState, useEffect } from 'react';
import {
    StyleSheet, TouchableHighlight, TouchableWithoutFeedback,
    PixelRatio, Dimensions, ScrollView, Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();
import {
    Categoria2, Modal, View2, View3, ViewCategoria, TextTitle, TextosContainer, TextTitle2,
    Container3, Container4, Categoria15, Categoria11, Categoria10,
    ButtonText, ButtonStyled,
    DescriptionFilter, Categoria, ButtonAux, Container, Container2, ButtonSemana
} from './styles';
import api from '../../services/api';
import CheckBox from 'react-native-modest-checkbox';
import Slider from '@react-native-community/slider';
import { connect } from 'react-redux';

function Filter({ dispatch, modalState, navigation, setModalState, categoria }) {

    const [faixa_valor, setRanger] = useState(450);
    const [toggleCheckBox, setToggleCheckBox] = useState([]);
    const [toggleCheckBox8, setToggleCheckBox8] = useState(true);
    const [toggleCheckBox9, setToggleCheckBox9] = useState(true);
    const [toggleCheckBox10, setToggleCheckBox10] = useState(true);
    const [toggleCheckBox11, setToggleCheckBox11] = useState(true);
    const [toggleCheckBox12, setToggleCheckBox12] = useState(true);
    const [toggleCheckBox13, setToggleCheckBox13] = useState(true);
    const [toggleCheckBox14, setToggleCheckBox14] = useState(true);
    const [toggleCheckBox15, setToggleCheckBox15] = useState(true);
    const [toggleCheckBox16, setToggleCheckBox16] = useState(true);
    const [toggleCheckBoxDistancia, setToggleCheckBoxDistancia] = useState(true);
    const windowWidth = Dimensions.get('window').width;

    useEffect(() => {
        var aux2 = [];
        for (let i = 0;i < categoria.length;i++) {
            aux2.push(true);
        }

        setToggleCheckBox(aux2);
    }, [categoria])

    function checkCategoria(index) {
        var aux = toggleCheckBox;
        var aux2 = [];
        for (let i = 0;i < categoria.length;i++) {
            if (i == index) {
                aux2.push(!aux[i]);
            } else {
                aux2.push(aux[i]);
            }
        }
        setToggleCheckBox(aux2);
    }

    ///////////////////////////////////////////
    var vetor = [];
    for (let i = 0;i < categoria.length;i++) {
        vetor.push(true);
    }

    ///////////////////////////////////////////
    function aplicar() {

        dispatch({
            type: 'randon'
        })


        var SelectCategorias2 = [];
        var Selectvalor = faixa_valor;
        var SelectDias = [];
        var SelectHorarios = [];
        SelectDias.push(toggleCheckBox8);
        SelectDias.push(toggleCheckBox9);
        SelectDias.push(toggleCheckBox10);
        SelectDias.push(toggleCheckBox11);
        SelectDias.push(toggleCheckBox12);
        SelectDias.push(toggleCheckBox13);
        SelectDias.push(toggleCheckBox14);
        SelectHorarios.push(toggleCheckBox15);
        SelectHorarios.push(toggleCheckBox16);

        for (let i = 0;i < toggleCheckBox.length;i++) {
            var aux = categoria[i].id;
            var valor = toggleCheckBox[i];
            if (valor == true) {
                SelectCategorias2.push(aux);
            }
        }

        dispatch({
            type: 'check2',
            SelectDistancia: 0,
            Selectvalor: Selectvalor,
            SelectDias: SelectDias,
            SelectHorarios: SelectHorarios,
            SelectCategorias: '',
            SelectCategorias2: SelectCategorias2
        })
        setModalState(false);
        navigation.navigate("Buscar");

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

    return (
        <Modal visible={modalState} animationType="slide"
            onRequestClose={() => setModalState(false)}
        >
            <View2>
                <TouchableWithoutFeedback style={styles.buttonClose} onPress={() => { setModalState(false) }}>
                    <Icon name="close" color="white" style={{ marginLeft: 15 }} size={25} />
                </TouchableWithoutFeedback>
                <TextTitle>Filtros</TextTitle>
            </View2>
            <Container style={styles.caixaP}>
                <TextosContainer>
                    <TextTitle2>Categoria</TextTitle2>
                    <DescriptionFilter>Filtre por categoria para encontrar o lugar ideal para comer fora.
                        Cada restaurante pode estar inserido em varias categorias.
                    </DescriptionFilter>
                </TextosContainer>
                <ViewCategoria>
                    {categoria.map((item, i) => (
                        <ButtonAux key={item.id} >
                            <Categoria onPress={() => checkCategoria(i)} windowWidth={windowWidth}>
                                <CheckBox
                                    checked={toggleCheckBox[i]}
                                    checkedComponent={
                                        <Icon name="check-square-o" size={22} color="#fdeb13" />
                                    }
                                    uncheckedComponent={
                                        <Icon name="square-o" size={22} color="#fff" />
                                    }
                                    label={doTruncarStr(item.nome, 15)}
                                    color="white"
                                    labelStyle={{ fontSize: 13, color: '#fff' }}
                                    onChange={(checked) => checkCategoria(i)}
                                />
                            </Categoria>
                        </ButtonAux>
                    ))}
                </ViewCategoria>
                <TextosContainer>
                    <TextTitle2>Dias da Semana</TextTitle2>
                </TextosContainer>

                <ViewCategoria>
                    <ButtonSemana >
                        <Categoria onPress={(checked) => toggleCheckBox8 ? setToggleCheckBox8(false) : setToggleCheckBox8(true)} windowWidth={windowWidth}>
                            <CheckBox
                                checked={toggleCheckBox8}
                                checkedComponent={<Icon name="check-square-o" size={22} color="#fdeb13" />}
                                uncheckedComponent={<Icon name="square-o" size={22} color="#fff" />}
                                label={'Segunda'}
                                color="white"
                                labelStyle={{ fontSize: 13, color: '#fff' }}
                                onChange={(checked) => toggleCheckBox8 ? setToggleCheckBox8(false) : setToggleCheckBox8(true)}
                            />
                        </Categoria>
                    </ButtonSemana>
                    <ButtonSemana >
                        <Categoria onPress={(checked) => toggleCheckBox9 ? setToggleCheckBox9(false) : setToggleCheckBox9(true)} windowWidth={windowWidth}>
                            <CheckBox
                                checked={toggleCheckBox9}
                                checkedComponent={<Icon name="check-square-o" size={22} color="#fdeb13" />}
                                uncheckedComponent={<Icon name="square-o" size={22} color="#fff" />}
                                label={'Terça'}
                                color="white"
                                labelStyle={{ fontSize: 13, color: '#fff' }}
                                onChange={(checked) => toggleCheckBox9 ? setToggleCheckBox9(false) : setToggleCheckBox9(true)}
                            />
                        </Categoria>
                    </ButtonSemana>

                    <ButtonSemana >
                        <Categoria onPress={(checked) => toggleCheckBox10 ? setToggleCheckBox10(false) : setToggleCheckBox10(true)} windowWidth={windowWidth}>
                            <CheckBox
                                checked={toggleCheckBox10}
                                checkedComponent={<Icon name="check-square-o" size={22} color="#fdeb13" />}
                                uncheckedComponent={<Icon name="square-o" size={22} color="#fff" />}
                                label={'Quarta'}
                                color="white"
                                labelStyle={{ fontSize: 13, color: '#fff' }}
                                onChange={(checked) => toggleCheckBox10 ? setToggleCheckBox10(false) : setToggleCheckBox10(true)}
                            />
                        </Categoria>
                    </ButtonSemana>

                    <ButtonSemana >
                        <Categoria onPress={(checked) => toggleCheckBox11 ? setToggleCheckBox11(false) : setToggleCheckBox11(true)} windowWidth={windowWidth}>
                            <CheckBox
                                checked={toggleCheckBox11}
                                checkedComponent={<Icon name="check-square-o" size={22} color="#fdeb13" />}
                                uncheckedComponent={<Icon name="square-o" size={22} color="#fff" />}
                                label={'Quinta'}
                                color="white"
                                labelStyle={{ fontSize: 13, color: '#fff' }}
                                onChange={(checked) => toggleCheckBox11 ? setToggleCheckBox11(false) : setToggleCheckBox11(true)}
                            />
                        </Categoria>
                    </ButtonSemana>

                    <ButtonSemana >
                        <Categoria onPress={(checked) => toggleCheckBox12 ? setToggleCheckBox12(false) : setToggleCheckBox12(true)} windowWidth={windowWidth}>
                            <CheckBox
                                checked={toggleCheckBox12}
                                checkedComponent={<Icon name="check-square-o" size={22} color="#fdeb13" />}
                                uncheckedComponent={<Icon name="square-o" size={22} color="#fff" />}
                                label={'Sexta'}
                                color="white"
                                labelStyle={{ fontSize: 13, color: '#fff' }}
                                onChange={(checked) => toggleCheckBox12 ? setToggleCheckBox12(false) : setToggleCheckBox12(true)}
                            />
                        </Categoria>
                    </ButtonSemana>

                    <ButtonSemana >
                        <Categoria onPress={(checked) => toggleCheckBox13 ? setToggleCheckBox13(false) : setToggleCheckBox13(true)} windowWidth={windowWidth}>
                            <CheckBox
                                checked={toggleCheckBox13}
                                checkedComponent={<Icon name="check-square-o" size={22} color="#fdeb13" />}
                                uncheckedComponent={<Icon name="square-o" size={22} color="#fff" />}
                                label={'Sabado'}
                                color="white"
                                labelStyle={{ fontSize: 13, color: '#fff' }}
                                onChange={(checked) => toggleCheckBox13 ? setToggleCheckBox13(false) : setToggleCheckBox13(true)}
                            />
                        </Categoria>
                    </ButtonSemana>

                    <ButtonSemana >
                        <Categoria onPress={(checked) => toggleCheckBox14 ? setToggleCheckBox14(false) : setToggleCheckBox14(true)} windowWidth={windowWidth}>
                            <CheckBox
                                checked={toggleCheckBox14}
                                checkedComponent={<Icon name="check-square-o" size={22} color="#fdeb13" />}
                                uncheckedComponent={<Icon name="square-o" size={22} color="#fff" />}
                                label={'Domingo'}
                                color="white"
                                labelStyle={{ fontSize: 13, color: '#fff' }}
                                onChange={(checked) => toggleCheckBox14 ? setToggleCheckBox14(false) : setToggleCheckBox14(true)}
                            />
                        </Categoria>
                    </ButtonSemana>
                </ViewCategoria>
                {/* <TextosContainer>
                    <TextTitle2>Horarios</TextTitle2>
                </TextosContainer>
                <ViewCategoria>

                    <ButtonSemana >
                        <Categoria onPress={(checked) => toggleCheckBox15 ? setToggleCheckBox15(false) : setToggleCheckBox15(true)} windowWidth={windowWidth}>
                            <CheckBox
                                checked={toggleCheckBox15}
                                checkedComponent={<Icon name="check-square-o" size={22} color="#fdeb13" />}
                                uncheckedComponent={<Icon name="square-o" size={22} color="#fff" />}
                                label={'Almoço'}
                                color="white"
                                labelStyle={{ fontSize: 13, color: '#fff' }}
                                onChange={(checked) => toggleCheckBox15 ? setToggleCheckBox15(false) : setToggleCheckBox15(true)}
                            />
                        </Categoria>
                    </ButtonSemana>
                    <ButtonSemana >
                        <Categoria onPress={(checked) => toggleCheckBox16 ? setToggleCheckBox16(false) : setToggleCheckBox16(true)} windowWidth={windowWidth}>
                            <CheckBox
                                checked={toggleCheckBox16}
                                checkedComponent={<Icon name="check-square-o" size={22} color="#fdeb13" />}
                                uncheckedComponent={<Icon name="square-o" size={22} color="#fff" />}
                                label={'Jantar'}
                                color="white"
                                labelStyle={{ fontSize: 13, color: '#fff' }}
                                onChange={(checked) => toggleCheckBox16 ? setToggleCheckBox16(false) : setToggleCheckBox16(true)}
                            />
                        </Categoria>
                    </ButtonSemana>
                </ViewCategoria> */}
            </Container>
            <View3>
                <ButtonStyled onPress={() => { aplicar() }}>
                    <ButtonText>APLICAR</ButtonText>
                </ButtonStyled>
            </View3>
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
    }, caixaP: {

    }
});

export default connect()(Filter)

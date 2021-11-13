import React, { useState, useEffect, useRef } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();
import { View, Text, StyleSheet } from 'react-native';
import { TextTituleModal, TextDados, CaixaDados, CaixaPrincipal, TextDados4, InputBusca } from '../styles';
import { cpfCnpjMask } from '../../../util/strings';
import Input from '../../../componentes/Input';
import Select from '../../../componentes/Select';
import Button from '../../../componentes/buttonSave';
import api from '../../../services/api';
import Loader from '../../../util/loader';
import Toast from 'react-native-simple-toast';


function ComponentEndereco({ dados, setDados, token }) {
  const [check_load, SetCheckLoad] = useState(false);

  const handlerCep = (e) => { setDados(prev => ({ ...prev, cepAtual: e })) }
  const handlerRua = (e) => { setDados(prev => ({ ...prev, ruaAtual: e })) }
  const handlerComplemento = (e) => { setDados(prev => ({ ...prev, complementoAtual: e })) }
  const handlerBairro = (e) => { setDados(prev => ({ ...prev, bairroAtual: e })) }
  const [VetorBairro, setVetorBairro] = useState([]);

  useEffect(() => {

    getBairros();

  }, [dados.cidadeAtual])

  async function getBairros() {
    console.log(dados.cidadeAtual)
    SetCheckLoad(true);
    const response = await api.get('/busca/BuscaBairro.php',
      { params: { cidade: dados.cidadeAtual ? (dados.cidadeAtual) : (0) } })
      .then(data => {

        if (data.status == 200) {
          if (data.data == 0) {
            setVetorBairro([]);
            SetCheckLoad(false);
          } else {
            let dados = data.data;
            var aux = [];
            dados?.map((item) => {
              aux.push({ label: item.nome, value: item.id });
            })
            setVetorBairro(aux);
            SetCheckLoad(false);
          }
        } else {
          SetCheckLoad(false);
        }

      });
  }


  async function handlerCidade(e) {
    SetCheckLoad(true)
    setDados(prev => ({ ...prev, cidadeAtual: e }))
    getBairros();
    SetCheckLoad(false)
  }

  async function onSave() {
    console.log(dados);
    SetCheckLoad(true)
    try {
      const response = await api.get('/busca/salvaDados_new.php', {
        params: {
          token: token,
          type: "endereco",
          cepAtual: dados?.cepAtual,
          ruaAtual: dados?.ruaAtual,
          complementoAtual: dados?.complementoAtual,
          bairroAtual: dados?.bairroAtual,
          cidadeAtual: dados?.cidadeAtual
        }
      })
        .then(data => {
          console.log(data);
          if (data.status == 200) {
            if (data.data == "true") {
              Toast.show('Sucesso', Toast.LONG);
              SetCheckLoad(false)
            } else {
              Toast.show('ERROR', Toast.LONG);

              SetCheckLoad(false)
            }

          } else {
            SetCheckLoad(false)
          }
        }).catch(error => {
          SetCheckLoad(false)
          console.log(error);
        })
    } catch (error) {
      console.log(error);
    }

  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}
      key={"dados-endereco-interno"}
    >
      <Loader loading={check_load} />

      <CaixaPrincipal>
        <Input
          text="CEP"
          placeholder='68500-000'
          value={dados.cepAtual}
          onChange={handlerCep}
          placeholderTextColor="#808080"
        />
        <Input
          text="Logradouro"
          placeholder='Rua ...'
          value={dados.ruaAtual}
          onChange={handlerRua}
          placeholderTextColor="#808080"
        />
        <Input
          text="Complemento"
          placeholder='Proximo a ...'
          value={dados.complementoAtual}
          onChange={handlerComplemento}
          placeholderTextColor="#808080"
        />
        <CaixaDados>
          <Text style={styles.placeholder}>Cidade</Text>
          <Select
            text="Cidade"
            placeholder={{
              label: 'Selecione a Cidade...',
              value: null,
            }}
            onChange={handlerCidade}
            value={dados.cidadeAtual}
            items={[
              { label: 'Belém', value: 1 },
              { label: 'Marabá', value: 2 },
            ]}
          />
        </CaixaDados>
        <CaixaDados>
          <Text style={styles.placeholder}>Bairro</Text>
          <Select
            text="Bairro"
            placeholder={{
              label: 'Selecione o Bairro...',
              value: null,
            }}
            onChange={handlerBairro}
            value={dados.bairroAtual}
            items={VetorBairro ? (VetorBairro) : ([])}
          />
        </CaixaDados>

        <Button
          onClick={onSave}
          text="Salvar Dados"
        />
      </CaixaPrincipal>
    </View>
  )
}

const styles = StyleSheet.create({
  icon: {
    margin: 15,
    color: "white"
  },
  buttonClose: {
    flexDirection: "row",
    backgroundColor: "#000",
    justifyContent: "flex-end"
  }, header: {
    flexDirection: "row",
    backgroundColor: "#000",
    justifyContent: "flex-start",
    paddingTop: Platform.OS === 'ios' ? 20 : 10,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10

  }, scene: {
    flex: 1,
  }, menu: {
    backgroundColor: "#000",
    color: "#000",
  }, input_dados: {
    backgroundColor: "#000",
    color: "#fff"
  }, input_dados2: {
    backgroundColor: "#000",
    color: "#808080"
  }, select: {
    color: "#fff",
    backgroundColor: "#fff",
  }, placeholder: {
    color: 'white',
    marginLeft: '10%',
    backgroundColor: 'black',
    maxWidth: 80,
    textAlign: 'center',
    zIndex: 2,
    fontSize: 12
  }
})



export default ComponentEndereco;
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


function ComponentEndereco({ endereco, setEndereco, token }) {
  const [check_load, SetCheckLoad] = useState(false);

  const handlerCep = (e) => { setEndereco(prev => ({ ...prev, cepAtual: e })) }
  const handlerRua = (e) => { setEndereco(prev => ({ ...prev, ruaAtual: e })) }
  const handlerComplemento = (e) => { setEndereco(prev => ({ ...prev, complementoAtual: e })) }
  const handlerBairro = (e) => { setEndereco(prev => ({ ...prev, bairroAtual: e })) }
  const [VetorBairro, setVetorBairro] = useState([]);

  useEffect(() => {
    console.log("===========")
    console.log(endereco)
    console.log("===========")
    getBairros();

  }, [endereco.cidadeAtual])

  async function getBairros() {
    console.log(endereco.cidadeAtual)
    SetCheckLoad(true);
    const response = await api.get('/busca/BuscaBairro.php',
      { params: { cidade: endereco.cidadeAtual ? (endereco.cidadeAtual) : (0) } })
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
            console.log(aux)
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
    setEndereco(prev => ({ ...prev, cidadeAtual: e }))
    getBairros();
    SetCheckLoad(false)
  }

  async function onSave() {
    console.log(endereco);
    SetCheckLoad(true)
    try {
      const response = await api.get('/busca/salvaDados_new.php', {
        params: {
          token: token,
          type: "endereco",
          cepAtual: endereco?.cepAtual,
          ruaAtual: endereco?.ruaAtual,
          complementoAtual: endereco?.complementoAtual,
          bairroAtual: endereco?.bairroAtual,
          cidadeAtual: endereco?.cidadeAtual
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
          value={endereco?.cepAtual}
          onChange={handlerCep}
          placeholderTextColor="#808080"
        />
        <Input
          text="Logradouro"
          placeholder='Rua ...'
          value={endereco?.ruaAtual}
          onChange={handlerRua}
          placeholderTextColor="#808080"
        />
        <Input
          text="Complemento"
          placeholder='Proximo a ...'
          value={endereco?.complementoAtual}
          onChange={handlerComplemento}
          placeholderTextColor="#808080"
        />
        <CaixaDados>
          <Text style={styles.placeholder}>Cidade</Text>
          <Select
            text="Cidade"
            onChange={handlerCidade}
            value={endereco?.cidadeAtual}
            items={[
              { label: 'Belém', value: '1' },
              { label: 'Marabá', value: '2' },
            ]}
          />
        </CaixaDados>
        <CaixaDados>
          <Text style={styles.placeholder}>Bairro</Text>
          <Select
            text="Bairro"
            onChange={handlerBairro}
            value={endereco?.bairroAtual}
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
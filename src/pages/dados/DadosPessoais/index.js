import React, { useState, useEffect, useRef } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();
import { View, Text, StyleSheet } from 'react-native';
import { CaixaDados, CaixaPrincipal, InputBusca } from '../styles';
import { cpfCnpjMask, FormatDate, FormatPhone } from '../../../util/strings';
import Input from '../../../componentes/Input';
import Select from '../../../componentes/Select';
import Button from '../../../componentes/buttonSave';
import RNPickerSelect from 'react-native-picker-select';
import api from '../../../services/api';
import Loader from '../../../util/loader';
import Toast from 'react-native-simple-toast';


function ComponentDadosPessoais({ checkCPF, dados, setDados, token }) {
  const [check_load, SetCheckLoad] = useState(false);

  const handlerName = (e) => { setDados(prev => ({ ...prev, nomeAtual: e })) }
  const handlerCPF = (e) => {
    let cpf = cpfCnpjMask(e);
    setDados(prev => ({ ...prev, cpfAtual: cpf }))
  }
  const handlerEmail = (e) => { setDados(prev => ({ ...prev, emailAtual: e })) }
  const handlerGenero = (e) => { setDados(prev => ({ ...prev, generoAtual: e })) }
  const handlerNascimento = (e) => {
    let aniversario = FormatDate(e);
    setDados(prev => ({ ...prev, nascimentoAtual: aniversario }))
  }
  const handlerTelefone = (e) => {
    let telefone = FormatPhone(e)
    console.log(telefone)
    setDados(prev => ({ ...prev, telefoneAtual: telefone }))
  }

  async function onSave() {
    console.log(dados);
    SetCheckLoad(true)
    try {
      const response = await api.get('/busca/salvaDados_new.php', {
        params: {
          token: token,
          type: "pessoal",
          nomeAtual: dados?.nomeAtual,
          cpfAtual: dados?.cpfAtual,
          emailAtual: dados?.emailAtual,
          generoAtual: dados?.generoAtual,
          nascimentoAtual: dados?.nascimentoAtual,
          telefoneAtual: dados?.telefoneAtual,
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
    <View style={{
      flex: 1, justifyContent: 'center',
      alignItems: 'center', backgroundColor: '#000',
    }}
      key={"dados-pessoais-interno"}
    >
      <Loader loading={check_load} />

      <CaixaPrincipal>
        {checkCPF ? (
          //Não tem CPF cadastrado
          <Input
            text="CPF"
            maxLength={14}
            placeholder='000.000.000-00'
            value={dados?.cpfAtual}
            onChange={handlerCPF}
            placeholderTextColor="#808080"
          />
        ) : (
          //Tem CPF cadastrado
          <Input
            text="CPF"
            maxLength={14}
            disabled={true}
            placeholder='000.000.000-00'
            value={dados?.cpfAtual}
            onChange={handlerCPF}
            placeholderTextColor="#808080"
          />
        )}

        <Input
          text="Nome"
          placeholder='Nome'
          value={dados?.nomeAtual}
          onChange={handlerName}
          placeholderTextColor="#808080"
        />

        <Input
          text="E-mail"
          placeholder='Example@gmail.com'
          value={dados?.emailAtual}
          onChange={handlerEmail}
          disabled={true}
          placeholderTextColor="#808080"
        />

        <CaixaDados>
          <Text style={styles.placeholder}>Gênero</Text>
          <Select
            text="Gênero"
            placeholder={{
              label: 'Selecione o Gênero...',
              value: null,
            }}
            onChange={handlerGenero}
            value={dados?.generoAtual}
            items={[
              { label: 'Masculino', value: 'M' },
              { label: 'Feminino', value: 'F' },
            ]}
          />
        </CaixaDados>

        <Input
          text="Nascimento"
          placeholder='Nascimento'
          value={dados?.nascimentoAtual}
          onChange={handlerNascimento}
          placeholderTextColor="#808080"
        />

        <Input
          text="Telefone"
          placeholder='Telefone'
          value={dados?.telefoneAtual}
          onChange={handlerTelefone}
          placeholderTextColor="#808080"
        />

        <Input
          text="Tipo de Login"
          disabled={true}
          value={"Login efetuado via " + dados?.login}
        />

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



export default ComponentDadosPessoais;
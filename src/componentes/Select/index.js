import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();
import { CaixaDados, CaixaDadosSimple } from './styles';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import ModalSelect from './Modal';

function SelectComponent({
  type = 'normal',
  value = '',
  placeholder = "",
  maxLength = 5000,
  placeholderTextColor = "#808080",
  text = "",
  onChange = {},
  items = [],
}) {

  var [openModal, setOpenModal] = useState(false);
  function isVerify(dados, index, arr) {
    return dados.value === Number(value);
  }

  return (
    <>
      {type == "simple" ? (
        <>
          <ModalSelect onChange={onChange} openModal={openModal} setOpenModal={setOpenModal} items={items} />
          <TouchableHighlight onPress={() => setOpenModal(true)}>
            <CaixaDadosSimple>
              <Icon style={styles.icones} name="chevron-down" color="#fed531" size={15} />
              <Text style={styles.textLabel} >{items.find(isVerify)?.label}</Text>
            </CaixaDadosSimple>
          </TouchableHighlight >
        </>
      ) : (
        <CaixaDados>
          <Text style={styles.placeholder}>{text}</Text>
          <RNPickerSelect
            onValueChange={(value) => onChange(value)}
            value={value}
            style={pickerSelectStyles}
            items={items}
          />
        </CaixaDados>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#f8f9fa63',
  },
  icones: {
    marginLeft: 0,
  },
  textLabel: {
    color: 'white',
    marginLeft: 10
  }
});
const pickerSelectStylesSimple = StyleSheet.create({
  inputIOS: {
    color: 'white',
    marginLeft: 20, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    color: 'white',
    fontSize: 14,
    minWidth: 250
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    color: 'white',
    marginLeft: 20, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    color: 'white',
    fontSize: 14,
    width: 200,
    marginTop: -28,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#f8f9fa63',
  }
});

export default SelectComponent;

import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();
import { CaixaDados, InputBuscaDisabled, InputBusca } from './styles';
import { View, Text, StyleSheet } from 'react-native';


function Input({
  type = 'text',
  value = '',
  placeholder = "",
  maxLength = 5000,
  placeholderTextColor = "#808080",
  text = "",
  disabled = false,
  onChange = {}
}) {

  return (
    <>
      <CaixaDados>
        <Text style={styles.placeholder}>{text}</Text>
        {!disabled ? (
          <InputBusca
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            value={value}
            maxLength={maxLength}
            onChangeText={(text) => { onChange(text) }}
          />
        ) : (
          <InputBuscaDisabled>
            {value}
          </InputBuscaDisabled>
        )}

      </CaixaDados>
    </>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    color: 'white',
    marginLeft: '10%',
    backgroundColor: 'black',
    maxWidth: 80,
    textAlign: 'center',
    zIndex: 2,
    fontSize: 12
  }
})


export default Input;

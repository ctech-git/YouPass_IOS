import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();
import { Card } from '../styles';
import { Modal, View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Toast from 'react-native-simple-toast';

function ModalSelect({
  openModal, setOpenModal, items, onChange
}) {

  function alertInfo() {
    Toast.show('Em Breve...', Toast.LONG);

  }
  function selectCity(params) {
    if (params.enabled) {
      onChange(params.value);
      setOpenModal(false);
    }
  }
  return (
    <Modal
      animationType={'slide'}
      transparent={true}
      visible={openModal}
      onRequestClose={() => {
        setOpenModal(false);
      }}
    >
      <Card>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableHighlight onPress={() => setOpenModal(false)}>
              <Icon style={styles.icones} name="close"
                color="black" size={35} />
            </TouchableHighlight >
          </View>
          <View style={styles.base}>
            {items.map((item) => {
              if (item.enabled) {
                return (
                  <TouchableHighlight onPress={() => selectCity(item)}>
                    <Text style={
                      item.enabled ? (styles.active) : (styles.desactive)
                    }>{item.label}</Text>
                  </TouchableHighlight >
                )
              } else {
                return (
                  <TouchableHighlight onPress={() => alertInfo(item)}>
                    <Text style={
                      item.enabled ? (styles.active) : (styles.desactive)
                    }>{item.label}</Text>
                  </TouchableHighlight >
                )
              }
            })
            }
          </View>
        </View>
      </Card>
    </Modal>
  );
}

const styles = StyleSheet.create({
  active: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    padding: 5
  },
  desactive: {
    fontSize: 18,
    color: '#3f3f3fcc',
    padding: 5
  },
  base: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '90%',
    marginTop: 20
  },
  header: {
    height: '30%',
    marginLeft: '5%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  icones: {

  },
  container: {
    width: '75%',
    marginLeft: '12.5%',
    marginTop: '40%',
    height: '40%',
    backgroundColor: 'white',
    borderRadius: 30,
  }
});

export default ModalSelect;

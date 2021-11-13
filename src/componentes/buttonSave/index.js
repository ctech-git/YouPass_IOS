import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

function Button({
  type = 'text',
  text = "",
  disabled = false,
  onClick = {}
}) {

  return (
    <>
      <TouchableHighlight onPress={() => onClick()}>
        <View style={styles.containerButton}>
          <Text style={styles.text}>{text}</Text>
        </View>
      </TouchableHighlight >
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'black'
  },
  containerButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fed531',
    borderRadius: 5,
    width: '90%',
    marginLeft: '5%',
    height: 50,
    marginBottom: 20,
    marginTop: 20
  }
})


export default Button;

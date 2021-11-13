import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();
import { Platform, Modal, StatusBar, StyleSheet, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { WebView } from 'react-native-webview';


function ModalTermo({ navigation, modalState, setModalState, dispatch }) {
    return (
        <>
            <Modal visible={modalState} animationType="slide" onRequestClose={() => setModalState(false)}>
                <TouchableHighlight style={styles.buttonClose} onPress={() => { setModalState(false) }}>
                    <Icon name="close" style={styles.icon} size={25} />
                </TouchableHighlight>
                <WebView
                    source={{ uri: 'http://youpassclub.com/termo.php' }}
                />
            </Modal >
        </>
    );
}

const styles = StyleSheet.create({
    icon: {
        margin: 15,
        color: "white"
    },
    buttonClose: {
        flexDirection: "row",
        backgroundColor: "#000",
        justifyContent: "flex-end",
        paddingTop: Platform.OS === 'ios' ? 20 : 0

    }
})

export default connect()(ModalTermo)

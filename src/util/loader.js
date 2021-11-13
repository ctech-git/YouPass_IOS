import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Modal,
    ActivityIndicator,
    Text
} from 'react-native';

const Loader = ({ loading, text }) => {

    const styles = StyleSheet.create({
        modalBackground: {
            flex: 1,
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'space-around',
            backgroundColor: '#00000040'
        },
        activityIndicatorWrapper: {
            backgroundColor: '#00000040',
            height: 100,
            width: text && text != '' ? 'auto' : 100,
            maxWidth: '80%',
            borderRadius: 10,
            padding: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around'
        },
        textIndicator: {
            textAlign: 'center'
        }
    });

    return (
        <Modal
            transparent={true}
            animationType={'none'}
            visible={loading}
            onRequestClose={() => { console.log('close modal') }}>
            <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator size='large' color='#fed531' />
                    {text && text != '' ? <Text style={styles.textIndicator}>{text}</Text> : false}
                </View>
            </View>
        </Modal>
    )
}

export default Loader;
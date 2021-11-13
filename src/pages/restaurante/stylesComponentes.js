import { StyleSheet, Dimensions, PixelRatio } from 'react-native';


const window = Dimensions.get('window');

const heightPercentageToDP = heightPercent => {
    const screenHeight = Dimensions.get('window').height;
    return PixelRatio.roundToNearestPixel(screenHeight * parseFloat(heightPercent) / 100);
};


const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 250;
const STICKY_HEADER_HEIGHT = 60;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000'
    },
    background: {
        position: 'absolute',
        backgroundColor: '#000000',
        top: 0,
        left: 0,
        width: window.width,
        height: PARALLAX_HEADER_HEIGHT
    },
    stickySection: {
        height: STICKY_HEADER_HEIGHT,
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000'
    },
    stickySectionText: {
        color: 'white',
        fontSize: 20,
        paddingTop: Platform.OS === 'ios' ? 20 : 0
    },
    fixedSection: {
        position: 'absolute',
        padding: 10,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        width: '100%'
    },
    fixedSectionText: {
        color: '#999',
        fontSize: 20,

    },
    parallaxHeader: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',

    },
    sectionSpeakerText: {
        color: 'white',
        fontSize: 24,
        paddingVertical: 5
    },
    sectionTitleText: {
        color: 'white',
        fontSize: 18,
        paddingVertical: 5
    },
    row: {
        overflow: 'hidden',
        paddingHorizontal: 10,
        height: ROW_HEIGHT,
        backgroundColor: 'white',
        borderColor: '#000000',
        borderBottomWidth: 1,
        justifyContent: 'center'
    },
    rowText: {
        fontSize: 20
    },
    ViewBlack: {
        backgroundColor: "#000000",
        height: heightPercentageToDP("180%")
    },
    checkin: {
        backgroundColor: "#666",
        minHeight: 80,
        marginTop: 20,
        marginBottom: 10,
        paddingBottom: 10,
        textAlign: 'center',
        marginLeft: "5%",
        marginRight: "5%",
        borderRadius: 5
    }, iconInfo: {
        color: "#fff",
        margin: 10,
    }, TextInfo: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 10
    }, TextInfo2: {
        color: 'white',
        fontSize: 14,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: "center",
        textAlign: 'center'
    }, linha: {
        borderTopWidth: 1,
        borderTopColor: '#666',
        width: '90%',
        margin: '5%',
    }, Dias: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginLeft: '5%',
        marginRight: '5%'
    }, TextInfoDias: {
        color: 'white',
        fontSize: 12
    }, TextRegras: {
        color: 'white',
        fontSize: 14,
        textAlign: 'center',
        marginLeft: '5%',
        marginRight: '5%'
    }, redesSociais: {
        justifyContent: "space-between",
        flexDirection: 'row',
        textAlign: "center",
        alignItems: "center",
        marginLeft: "15%",
        marginRight: "15%"
    }, redesSociais2: {
        justifyContent: "center",
        flexDirection: 'row',
        textAlign: "center",
        alignItems: "center",
    }, TouchCompra: {
        flexDirection: 'row',
        width: '60%',
        borderColor: '#fff',
        borderWidth: 1,
        height: 50,
        borderRadius: 5,
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
        marginTop: 15,
        marginBottom: 5
    }, map: {
        height: 300,
        marginTop: 20,
        width: '100%',
        borderRadius: 30,
    },
});

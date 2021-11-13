import React, {useEffect,useState,Component } from 'react';
import { Platform,Image, Text, View,StyleSheet,FlatList,SafeAreaView ,StatusBar} from 'react-native';
import { LoginManager } from 'react-native-fbsdk';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
Icon.loadFont();
Icon2.loadFont();
import { FiltrosContainer,
    FiltrosCard,Description,Description2,Img3,Img,DestaquesCard,DestaquesContainer2,DestaquesContainer3,
    DestaquesContainer,TextTitle,Select,Busca,HeaderInit,Container, ContainerUserInfo,
     ProfilePicture, userEmail, Feed,userName, CardIndicadores,CardHistorico,ContainerButtonFacebook, FacebookButtonText
     } from './styles';
import {connect} from 'react-redux';
import api from '../../services/api';

function Historico({ navigation,dispatch,token,name,surname,email }) {

    const [verifica, setVerifica] = useState(false);
    const [Total, setTotal] = useState('');
    const [Economia, setEconomia] = useState('');
    const [Lista, setLista] = useState('');



    useEffect(()=>{
        init();
    },[token])

    async function init(){
        console.log(1);
        if(token!=""){
            setVerifica(true);
            const response = await api.get('/busca/buscaHistoricoVoucher.php',
            { params: { token: token } })
            .then(data => {
                var Dadosuser = data.data;
                console.log(Dadosuser);
                setTotal(Dadosuser.length);
                var eco = 0;
                for (let i = 0; i < Dadosuser.length; i++) {
                    eco += Number(Dadosuser[i].valor_economizado);
                }
                eco = eco.toFixed(2)
                eco = eco.replace(".",",");
                eco = "R$ "+eco;
                setEconomia(eco);
                setLista(Dadosuser);
            })
        }else{
            setVerifica(false);
        }
    }
    function MudaConverter(item){
        item = Number(item);
        item = item.toFixed(2);
        item = item.replace(".",",");
        item = " R$ "+item;

        return item;
    }
    
    function ConverteData(data){
        var item = data.split(" ");
        var dia = item[0].split("-");
        var hora = item[1].split(":");
        dia = dia[2]+"/"+dia[1]+"/"+dia[0];
        hora = hora[0]+"h"+hora[1]+"min";
        item = " "+dia+" "+hora;
        return item;
    }

    return (
        <>
        <HeaderInit
        style={{ paddingTop: Platform.OS === 'ios' ? 40 : 20}}>
            <Select>
            </Select>
            <Busca>
                <Icon></Icon>
            </Busca>
        </HeaderInit>
        {verifica ? (
            <>
            <CardIndicadores>
                <Text style={{color:'white',fontSize:20}}>
                    {Total} Voucher Utilizados
                </Text>
                <Text style={{color:'white',fontSize:20}}>
                    Economia Total de: {Economia}
                </Text>
            </CardIndicadores>
            <Container>
            <FlatList
                data={Lista}
                style={{marginBottom:30,marginTop:5}}
                renderItem={({ item }) =>
                <View style={{height:85,backgroundColor:'#242424',margin:5,padding:8, borderRadius:10 }}>
                    <Text style={{color:'white',fontSize:16}}>Local:
                        <Text style={{color:'white',fontSize:14}}>
                            {"  "+item.nome}</Text>
                    </Text>
                    <Text style={{color:'white',fontSize:16}}>Data:
                        <Text style={{color:'white',fontSize:14}}>
                            {ConverteData(item.dia)}</Text>
                    </Text>
                    <View style={{flexDirection:'row'}}>
                    <Text style={{color:'white',fontSize:16}}>Economia:
                        <Text style={{color:'#fed531',fontSize:18}}>
                            { MudaConverter(item.valor_economizado)}</Text>
                    </Text>
                    <Text style={{color:'white',fontSize:16}}>{"   "}Total:
                        <Text style={{color:'#fed531',fontSize:18}}>
                            { MudaConverter(item.valor_total)}</Text>
                    </Text>
                    </View>
                </View>
            }
            keyExtractor={item => item.id}/>
            </Container>
            </>
        ) : (
            <>
            <Container>
                <TextTitle>Faça Login</TextTitle>
            </Container>
            </>
        )}

        </>
    );
}
const styles = StyleSheet.create({
    icones: {
        margin: 10,
    },icones2: {
        marginTop: 4,
    }
})

export default connect(state => ({name:state.name, surname: state.surname, token: state.token, email: state.email}))(Historico)

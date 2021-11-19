import styled from 'styled-components/native';
import { Dimensions, PixelRatio } from 'react-native';

const widthPercentageToDP = widthPercent => {
  const screenWidth = Dimensions.get('window').width;
  return PixelRatio.roundToNearestPixel(screenWidth * parseFloat(widthPercent) / 100);
};

export const ContainerLogin = styled.View`
  flex: 1;
`;
export const ContainerXY = styled.ScrollView.attrs({
  vertical: true,
  contentContainerStyle: { paddingLeft: 5, paddingRight: 5 },
  showsHorizontalScrollIndicator: false,
})`
backgroundColor: #000000;
`;
export const Container2 = styled.ScrollView.attrs({
  vertical: true,
  contentContainerStyle: { paddingLeft: 5, paddingRight: 5 },
  showsHorizontalScrollIndicator: false,
})`
backgroundColor: #000000;
`;
export const TextosContainer = styled.View`
flexDirection: row;
justifyContent: center;
text-align:center;
`;
export const TextTitle2 = styled.Text`
    color: white;
    font-size: 20px;
    
    font-weight:bold;
`;
export const TextTitle4 = styled.Text`
    text-align:center;
    color: #fff;
    font-size: 20px;
`;
export const TextTitle14 = styled.Text`
    text-align:center;
    color: #fff;
    font-size: 20px;
    margin: 15px;
`;
export const TextTitle15 = styled.Text`
    text-align:center;
    color: #fff;
    font-size: 22px;
    font-weight:bold;
    margin-top:15%;
    margin-left: 4%;
    margin-right: 4%;
`;
export const TextTitle3 = styled.Text`
    
    color: white;
    font-size: 16px;
`;
export const DescriptionFeed4 = styled.Text`
    color: white;
    font-size: 14px;
    marginRight: 20px;
`;
export const Week = styled.Text`
  marginLeft: 5px;
  borderColor: white;
  color: white;
`;
export const Cabecalho = styled.Text`
    text-align:left;
    color: #fff;
    marginTop: 15px;
    marginLeft: 10px;
    marginBottom: 20px;
    font-size: 15px;
`;
export const Legends = styled.Text`
    color: white;
    font-size: 13px;
`;
export const Legends2 = styled.Text`
    color: #fff;
    font-size: 13px;
    text-align:center;
`;
export const FeedFooter2 = styled.View`
  flexDirection: row;
  width: 100%;
  padding-left:2%;
`;

export const FeedFooter = styled.View`
width: 100%;
justifyContent: space-between;
padding-left:5%;
padding-right:5%;
`;
export const DescriptionFeed3 = styled.Text`
    color: white;
    font-size: 13px;
    marginRight: 15px;
`;
export const DescriptionFeed2 = styled.Text`
    color: white;
    font-size: 20px;
    fontWeight: bold;
`;
export const DescriptionFeedback = styled.Text`
    color: white;
    font-size: 20px;
    fontWeight: bold;
    border: 2px solid #fff;
    borderColor: white;
    borderRadius: 35px;
    paddingTop: 15px;
    paddingLeft: 10px;
    width:70px;
    height:70px;
`;

export const ImgFeed = styled.Image`
borderBottomLeftRadius: 10px;
borderBottomRightRadius: 10px;
borderTopLeftRadius: 10px;
borderTopRightRadius: 10px;
height: 100px;
width: 100px;
marginLeft: 5px;
`;

export const FeedCard = styled.TouchableOpacity`
flexDirection: row;
width: ${widthPercentageToDP('100%')};
height: 110px;
borderBottomLeftRadius: 8px;
borderBottomRightRadius: 8px;
borderTopLeftRadius: 8px;
borderTopRightRadius: 8px;
alignItems: center;
`;

export const Container = styled.View`
  flex: 1;
  alignItems: center;
  backgroundColor: #000000;
  position: absolute;
  height: 100%;
  left: 0;
  right: 0;
  top: 0;
`;

export const Rodape = styled.View`
  flex: 1;
  backgroundColor: #000;
  flexDirection: row;
  justifyContent: space-between;
  width:100%
`;
export const Circle = styled.View`
width: 90%;
height: 350px;
backgroundColor: #403e3e;
margin-top:25%;
padding-left:5%;
padding-right:5%;
borderRadius: 250px;
`;
export const ContainerX = styled.ScrollView.attrs({
  vertical: true,
  contentContainerStyle: { paddingLeft: 5, paddingRight: 5 },
  showsHorizontalScrollIndicator: false,
})`
backgroundColor: #000000;
`;
export const ImageTela = styled.Image`
  height: 400px;
  width: 250px;
  position:absolute;
  borderRadius: 15px;
  margin-top:15%;
`;
export const Busca = styled.View`
  margin: 5px;
  flexDirection: row;
`;
export const View2 = styled.View`
height: 60px;
width: 100%;
backgroundColor: #000000;
flexDirection: row;
`;
export const Select = styled.Text`
    color: white;
    font-size: 20px;
    padding-left: 15px;
    padding-top: 15px;
`;
export const HeaderInit = styled.View`
  flexDirection: row;
  alignItems: center;
  justifyContent: space-between;
  backgroundColor: #000000;
  width:100%;
  padding-left:10px;
  padding-right:10px;
  padding-top:5px;
`;
export const ContainerCreateAccount = styled.View`
  flex: 1;
  alignItems: center;
  justifyContent: center;
  backgroundColor: #F5F5F5;
`;

export const Logo = styled.Image`
  height: 50%;
  marginTop:0px;
  paddingTop:0px;
  marginTop:15%;

`;
export const Logo2 = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 100px;
`;

export const Input = styled.TextInput`
  paddingHorizontal: 20px;
  paddingVertical: 15px;
  borderRadius: 5px;
  backgroundColor: #FFF;
  alignSelf: stretch;
  marginBottom: 15px;
  marginHorizontal: 20px;
  fontSize: 16px;
`;

export const InputError = styled.Text`
    color: red;
    font-size: 15px;
    margin-bottom: 20px;
`;

export const ButtonStyled = styled.View`
    flex: 1;
    alignItems: center;
    justifyContent: center;
    background: #650B99;
    borderRadius: 5px;
    min-width: 80%;
    max-height: 60px;
`;

export const ContainerButtonFacebook = styled.View`
  flex: 1;
  alignItems: center;
  justifyContent: center;
  backgroundColor: #1975F3;
  borderRadius: 5px;
  min-width: 80%;
  max-height: 60px;
`;

export const ButtonPlano = styled.TouchableOpacity`
    flex: 1;
    alignItems: center;
    justifyContent: center;
    background: white;
    borderRadius: 5px;
    max-width: 60%;
    margin-left:20%;
    margin-top: 20px;
    margin-bottom: 20px;
    max-height: 40px;
    height: 40px;
`;

export const TextTitle5 = styled.Text`
    text-align:center;
    color: #000000;
    font-size: 20px;
`;




export const ButtonText = styled.Text`
    color: white;
    font-size: 15px;
`;

export const SignUpLink = styled.View`
    flex: 1;
    alignItems: center;
    justifyContent: center;
`;
export const CaixaX = styled.View`
    alignItems: center;
    justifyContent: center;
    background-color:#000000;
    padding-bottom:30px;
`;
export const SignUpLinkText = styled.Text`
    color: white;
    font-size: 15px;
    margin: 5px;
`;


export const FacebookButtonText = styled.Text`
    color: white;
    font-size: 15px;
    padding-left: 10px;
    font-weight: bold;
`;
export const ContainerButtonApple = styled.View`
  flex: 1;
  flex-direction: row;
  alignItems: center;
  justifyContent: center;
  borderRadius: 5px;
  background-color: white;
  min-width: 80%;
  max-height: 60px;
  marginTop: 10px;
`;
export const ContainerButtonGoogle = styled.View`
  flex: 1;
  flex-direction: row;
  alignItems: center;
  justifyContent: flex-start;
  borderRadius: 5px;
  background-color: white;
  min-width: 80%;
  max-height: 60px;
`;
export const ButtonText2 = styled.Text`
    color: #000000;
    font-size: 25px;
`;

export const ButtonStyled2 = styled.View`
    flex: 1;
    alignItems: center;
    margin: 10px;
    justifyContent: center;
    background: white;
    borderRadius: 5px;
    min-width: 80%;
    max-height: 60px;
`;
export const GoogleButtonText = styled.Text`
    flex: 1;
    color: #000000;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
`;

export const ImageGoogleIcon = styled.Image`
  max-height: 45px;
  min-height: 45px;
  max-width: 45px;
  min-width: 45px;
`;
export const Linha = styled.View`
  height: 1px;
  backgroundColor: #fff;
  width: 100%;
  margin-top:10px;
`;
export const Caixa = styled.TouchableOpacity`
  height: 50px;
  width: 100%;
  flexDirection: row;
`;


export const TextTitle1 = styled.Text`
    text-align:center;
    color: white;
    font-size: 18px;
    margin-left:20px;
`;

export const TextTituleModal = styled.Text`
    color: white;
    font-size: 25px;
    font-weight: bold;
    margin-top: 10px;
    margin-left: 50px;
    text-align:center;
`;

export const TextTituleModal2 = styled.Text`
    color: white;
    font-size: 25px;
    font-weight: bold;
    margin-top: 10px;
    text-align:center;
`;

export const TextDados = styled.Text`
    color: white;
    font-size: 15px;
    marginLeft: 15px;
`;
export const TextDados3 = styled.Text`
    color: #808080;
    font-size: 15px;
    marginLeft: 15px;
`;

export const TextDados4 = styled.Text`
    color: #808080;
    font-size: 15px;
    marginLeft: 25px;
`;
export const TextDados5 = styled.Text`
    color: #808080;
    font-size: 14px;
    margin: 10px;
    text-align:justify;
`;
export const TextDados6 = styled.Text`
    color: white;
    font-size: 14px;
    margin: 10px;
    text-align:justify;
`;
export const TextDados7 = styled.Text`
    color: white;
    font-size: 16px;
    margin: 8px;
    text-align:justify;
`;
export const COD = styled.Text`
    color: #fed531;
    font-size: 12px;
    margin: 10px;
    text-align:justify;
`;
export const COD2 = styled.Text`
    color: #fdeb13;
    font-size: 10px;
    margin: 10px;
    text-align:justify;
    text-decoration:underline;
`;
export const TextosContainerRedeSocial = styled.TouchableOpacity`
flexDirection: row;
justifyContent: center;
text-align: center;
borderRadius: 10px;
border: 2px solid #808080;
margin-left:15%;
margin-right:15%;
marginTop: 20px;
`;
export const TextosContainer5 = styled.View`
flexDirection: row;
justifyContent: center;
text-align:center;
borderRadius: 10px;
border: 2px solid #808080;
borderStyle: dashed;
margin-left:15%;
margin-right:15%;
marginTop: 20px;
`;
export const TextosContainer6 = styled.View`
flexDirection: row;
justifyContent: center;
text-align:center;
backgroundColor: #2f3337;
width: 100%;
height: 40px;
marginTop: 20px;
`;

export const TextDados2 = styled.Text`
    color: #808080;
    font-size: 14px;
    marginLeft: 35px;
    marginTop: 10px;
`;


export const CaixaDados = styled.View`
    justifyContent: flex-start;
    min-width: ${widthPercentageToDP('100%')};
    max-height: 60px;
    marginTop: 20px;
`;



export const CaixaPrincipal = styled.ScrollView.attrs({
  vertical: true,
  contentContainerStyle: { paddingLeft: 5, paddingRight: 5 },
  showsHorizontalScrollIndicator: false,
})`
flex: 1;
margin-bottom:20px;
`;
export const ViewBusca = styled.Text`
 fontSize: 14px;
 border: solid 1px #f8f9fa63;
 width: 90%;
 height: 50px;
 margin-top: -8px;
 color:white;
 margin-left: 4%;
 border-radius: 6px;
 flex:1;
 
`;

export const InputBusca = styled.TextInput`
  fontSize: 14px;
  width: 90%;
  margin-left: 4%;
  margin-top: -8px;
  alignItems: center;
  justifyContent: flex-start;
  padding-left: 10px;
  border-radius: 6px;
  border: solid 1px #f8f9fa63;
  color:white;
`;

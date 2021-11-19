import styled from 'styled-components/native';
import { Dimensions, PixelRatio } from 'react-native';

const widthPercentageToDP = widthPercent => {
  const screenWidth = Dimensions.get('window').width;
  return PixelRatio.roundToNearestPixel(screenWidth * parseFloat(widthPercent) / 100);
};

export const ViewBlack = styled.View`
  flex: 1;
  backgroundColor: #000000;
`;
export const Container = styled.ScrollView.attrs({
  vertical: true,
  contentContainerStyle: { paddingLeft: 5, paddingRight: 5 },
  showsHorizontalScrollIndicator: false,
})`
backgroundColor: #000000;
`;
export const DescriptionFeedMini = styled.Text`
    color: white;
    font-size: 18px;
    fontWeight: bold;
    marginTop: 0px;
  
`;
export const DescriptionFeed22 = styled.Text`
    color: white;
    font-size: 13px;
    fontWeight: bold;
    marginTop: 4px;
  
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

export const DestaquesContainer = styled.ScrollView.attrs({
  horizontal: true,
  contentContainerStyle: { paddingLeft: 5, paddingRight: 5 },
  showsHorizontalScrollIndicator: false,
})`
height: 190px;
max-height: 190px;
margin-bottom:20px;
`;

export const DestaquesCard = styled.View`
  width: 300px;
  height: 180px;
  border-radius: 3px;
  margin-left: 10px;
`;
export const FiltrosCard = styled.View`
  width: 23%;
  height: 60px;
  border-radius: 3px;
  alignItems: center;
  justifyContent: center;
  margin-left: 1%;
  margin-right: 1%;
  background: rgba(255, 255, 255, 0.2);
`;

export const FiltrosContainer = styled.View`
flexDirection: row;
padding:2%;
margin-bottom:20px;
`;
export const Description2 = styled.Text`
    color: white;
    font-size: 14px;
    margin: 2px;
    padding-left:5px;
    font-weight:bold;
`;

export const Description = styled.Text`
    color: white;
    font-size: 12px;
    margin: 2px;
    padding-left:5px;
`;

export const Img = styled.Image`
  border-radius: 3px;
  height: 160px;
  width: 100%;
`;


export const Busca = styled.View`
  margin: 5px;
  flexDirection: row;
`;

export const ProfilePicture = styled.Image`
  height: 25%;
  marginBottom: 18%;
  marginTop: 18%;
`;

export const ContainerUserInfo = styled.View`
    flex: 1;
    alignItems: center;
    justifyContent: center;
    borderRadius: 5px;
    min-width: 80%;
    max-height: 60px;
`;

export const userName = styled.Text`
    color: black;
    font-size: 15px;
`;

export const userEmail = styled.Text`
    color: black;
    font-size: 15px;
`;


export const InputBusca = styled.TextInput`
  fontSize: 14px;
  max-width: 90%;
  min-width: 90%;
  alignItems: center;
  justifyContent: center;
  textAlign: center;
  color: #808080;
`;
export const TextosContainer2 = styled.View`
flexDirection: row;
max-width: 90%;
min-width: 90%;
margin-left:5%;
height: 50px;
margin-bottom:10px;
borderRadius: 5px;
alignItems: center;
justifyContent: center;
backgroundColor: #FFF;
`;
export const TextosContainer = styled.View`
flexDirection: row;
alignItems: center;
justifyContent: center;
`;

export const TextTitle = styled.Text`
    color: white;
    font-size: 50px;
    margin: 15px;
    font-weight:bold;
`;
export const TextTitle2 = styled.Text`
    color: white;
    font-size: 30px;
    margin: 10px;
    margin-top: 40%;
    text-align:center;
    font-weight:bold;
`;




export const ContainerButtonFacebook = styled.View`
  flex: 1;
  flex-direction: row;
  alignItems: center;
  justifyContent: center;
  backgroundColor: #1975F3;
  borderRadius: 5px;
  min-width: 48%;
  max-width: 48%;
  max-height: 50px;
  min-height: 50px;
`;
export const Week = styled.Text`
  marginLeft: 5px;
  borderColor: white;
  color: white;
`;
export const DescriptionFeed = styled.Text`
    color: white;
    font-size: 15px;
`;
export const DescriptionFeed3 = styled.Text`
    color: white;
    font-size: 13px;
    marginRight: 15px;
`;
export const DescriptionFeed4 = styled.Text`
    color: white;
    font-size: 14px;
    marginRight: 20px;
`;
export const DescriptionFeed5 = styled.Text`
    color: white;
    font-size: 12px;
`;
export const Legends = styled.Text`
    color: white;
    font-size: 13px;
`;
export const DescriptionFeed2 = styled.Text`
    color: white;
    font-size: 20px;
    fontWeight: bold;
`;
export const ImgFeed = styled.Image`
borderBottomLeftRadius: 10px;
borderBottomRightRadius: 10px;
borderTopLeftRadius: 10px;
borderTopRightRadius: 10px;
height: 100px;
width: 100px;
marginLeft: 5px;
maxHeight: 100px;
maxWidth: 100px;
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
export const FacebookButtonText = styled.Text`
    color: white;
    font-size: 15px;
    padding-left: 10px;
    font-weight: bold;
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


export const Select = styled.Text`
    color: white;
    font-size: 15px;
    padding-left: 10px;
    font-weight: bold;
`;


export const TextLink = styled.Text`
    color: white;
    font-size: 15px;
    margin: 15px;
    color: #808080;
    font-weight:bold;
`;


export const DestaquesContainer2 = styled.ScrollView.attrs({
  horizontal: true,
  contentContainerStyle: { paddingLeft: 5, paddingRight: 5 },
  showsHorizontalScrollIndicator: false,
})`
height: 100px;
max-height: 100px;
margin-bottom:20px;
`;


export const ScrollView2 = styled.ScrollView.attrs({
  contentContainerStyle: { paddingLeft: 5, paddingRight: 5 },
  showsVerticalScrollIndicator: false,
})`
height: 100%;
max-height: 100%;
margin-bottom:40px;
`;


export const Linha = styled.View`
    border:solid 0.2px #808080;
    margin:20px;
`;



export const CategoriaProximos = styled.View`
  width: 250px;
  height: 190px;
  border-radius: 3px;
  margin-left: 10px;
  alignItems: center;
  justifyContent: center;
`;


export const Img3 = styled.Image`
  border-radius: 3px;
  height: 190px;
  width: 250px;
`;



export const DestaquesContainer3 = styled.ScrollView.attrs({
  contentContainerStyle: { paddingLeft: 5, paddingRight: 5 },
  showsVerticalScrollIndicator: false,
})`
flexGrow: 1;
`;

export const ButtonAux = styled.TouchableOpacity`
marginLeft:1%;
marginRight:1%;
paddingRight:1%;
paddingLeft:1%;
border-radius: 10px;
`;
export const DivAux = styled.View`


`;

export const Categoria = styled.View`
  width: 100%;
  height: 130px;
  border-radius: 10px;
  alignItems: center;
  justifyContent: center;
`;
export const Img2 = styled.ImageBackground`
  height: 100%;
  width: 100%;
  borderRadius: 10px;
`;

export const Description3 = styled.Text`
    marginTop: 5%;
    marginLeft: 3%;
    fontWeight: bold;
    color: white;
    font-size: 15px;
`;
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
export const HeaderInit = styled.View`
  flexDirection: row;
  alignItems: center;
  justifyContent: space-between;
  backgroundColor: #000000;
  width:100%;
  height: 80px;
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
  borderBottomLeftRadius: 8px;
  borderBottomRightRadius: 8px;
  borderTopLeftRadius: 8px;
  borderTopRightRadius: 8px;
  margin: 5px;
  alignItems: center;
  justifyContent: center;
`;
export const Img = styled.Image`
  border-radius: 3px;
  height: 150px;
  width: 250px;
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


export const ButtonAux = styled.TouchableOpacity`

`;

export const Space = styled.View`
    margin-bottom:20px;
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

export const DescriptionFeed = styled.Text`
    color: white;
    font-size: 15px;
`;
export const DescriptionFeed3 = styled.Text`
    color: white;
    font-size: 13px;
    marginRight: 10px;
    marginLeft: 5px;
    marginTop:2px;
`;
export const DescriptionFeed4 = styled.Text`
    color: white;
    font-size: 12px;
    marginRight: 20px;
    marginLeft: 2px;
`;
export const DescriptionFeed5 = styled.Text`
    color: white;
    font-size: 12px;
`;
export const Legends = styled.Text`
    color: white;
    font-size: 11px;
`;
export const DescriptionFeed2 = styled.Text`
    color: white;
    font-size: 18px;
    fontWeight: bold;
`;
export const DescriptionFeed22 = styled.Text`
    color: white;
    font-size: 13px;
    fontWeight: bold;
    marginTop: 4px;
  
`;
export const SelectYouPass = styled.View`
  flexDirection: row;
  width: 100%;
  padding-left:2%;
  alignItems: center;
`;
export const FeedFooter2 = styled.View`
  flexDirection: row;
  width: 100%;
  padding-left:2%;
  alignItems: center;
`;
export const Week = styled.Text`
  marginLeft: 5px;
  borderColor: white;
  color: white;
`;
export const FeedFooter = styled.View`
  width: 100%;
  justifyContent: space-between;
  padding-left:3%;
  padding-right:5%;
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
    alignItems: center;
    justifyContent: center;
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
export const TextTitle = styled.Text`
    color: white;
    font-size: 20px;
    margin: 15px;
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

export const FacebookButtonText = styled.Text`
    color: white;
    font-size: 15px;
    padding-left: 10px;
    font-weight: bold;
`;


export const Select = styled.View`
    margin-top:10px
`;

export const TextosContainer = styled.View`
flexDirection: row;
alignItems: center;
justifyContent: space-between;
`;

export const TextLink = styled.Text`
    color: white;
    font-size: 15px;
    margin: 15px;
    color: #808080;
    font-weight:bold;
`;

export const Categoria = styled.View`
  width: 120px;
  height: 100px;
  border-radius: 3px;
  margin-left: 10px;
  alignItems: center;
  justifyContent: center;
`;

export const Description3 = styled.Text`
    color: white;
    font-size: 11px;
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

export const Img2 = styled.Image`
  border-radius: 3px;
  height: 80px;
  width: 100%;
`;
export const Linha = styled.View`
    border:solid 0.2px #808080;
    margin:20px;
`;

export const DestaquesContainer3 = styled.ScrollView.attrs({
  horizontal: true,
  contentContainerStyle: { paddingLeft: 5, paddingRight: 5 },
  showsHorizontalScrollIndicator: false,
})`
height: 200px;
max-height: 200px;
margin-bottom:20px;
`;

export const CategoriaProximos = styled.TouchableOpacity`
  width: 130px;
  height: 165px;
  border-radius: 3px;
  margin-left: 10px;
  alignItems: center;
  justifyContent: center;
`;


export const Img3 = styled.Image`
  marginTop: 5px;
  marginBottom: 2px;
  borderBottomLeftRadius: 10px;
  borderBottomRightRadius: 10px;
  borderTopLeftRadius: 10px;
  borderTopRightRadius: 10px;
  height: 130px;
  width: 150px;
`;

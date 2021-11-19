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

export const ButtonText2 = styled.Text`
    color: #fff;
    font-size: 25px;
    font-weight: bold;
    text-align:center;
    margin: 5px;
`;

export const ButtonStyled2 = styled.View`
    flex: 1;
    alignItems: center;
    margin: 10px;
    justifyContent: center;
    background: #ffffff;
    borderRadius: 5px;
    min-width: 80%;
    max-height: 60px;
`;
export const CaixaNome = styled.View`
  flexDirection: row;
  padding-left:20px;
  padding-right:20px;
  justifyContent: space-between;
`;
export const Caixabairro = styled.View`
  flexDirection: row;
  justifyContent: flex-start;
`;
export const CaixaPreco = styled.View`
  flexDirection: row;
  padding-left:20px;
`;

export const TextDescription = styled.Text`
  font-size: 25px;
  font-weight:bold;
  color: white;
`;
export const Legends = styled.Text`
  font-size: 20px;
  font-weight:bold;
  color: white;
`;
export const Legends2 = styled.Text`
  font-size: 12px;
  color: white;
  padding-left:20px;

`;

export const LegendsYellow = styled.Text`
  font-size: 16px;
  color: yellow;
  padding-left:20px;
  font-weight:bold;

`;
export const Legends22 = styled.Text`
  font-size: 16px;
  color: white;
  padding-left:20px;
  font-weight:bold;

`;
export const Legends3 = styled.Text`
  font-size: 13px;
  color: white;
`;
export const Touch = styled.TouchableOpacity`
  flex: 1;
  alignItems: center;
  justifyContent: center;
  borderRadius: 5px;
  min-width: 100%;
  max-height: 60px;
  width:100%;
`;

export const Img = styled.Image`
  border-radius: 3px;
  height: 220px;
  width: 100%;
  max-width: 100%;
`;

export const CardSlider = styled.View`
  flex: 1;
  flexDirection: row;
  backgroundColor: #212121;
  justifyContent:center;
  min-height: 60px;
  width:80%;
  borderRadius:20px;
  marginLeft:10%;
  marginTop:70px;
`;
export const Art = styled.Image`
  width: 200px;
  height: 200px;
  alignItems:center;
  borderRadius:20px;
  
`;
export const CategoriaProximos = styled.View`
  width: ${widthPercentageToDP('100%')};
  height: 220px;
  justifyContent: center;
`;

export const Slider = styled.ScrollView`
  
`;

export const ButtonStyled = styled.View`
flex: 1;
alignItems: center;
justifyContent: center;
background: white;
borderRadius: 5px;
min-width: 80%;
max-height: 60px;
`;

export const ButtonText = styled.Text`
color: #000000;
font-size: 20px;
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
export const Select = styled.Text`
    color: white;
    font-size: 15px;
    padding-left: 10px;
    font-weight: bold;
`;

export const ContainerTitle = styled.View`
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
  font-size: 20px;
`;
export const Space = styled.View`
  margin: 8px;
`;

export const TextTitle = styled.Text`
  text-align: center;
  font-size: 25px;
  max-width: 80%;
  font-weight:bold;
  color: white;
`;

export const TabItem = styled.View`
  width: 33.33333%;
  height: 40px;
  background: #383050;
  margin-top: 2%;
  margin-bottom: 2%;
  padding: 10px;
  justify-content: space-between;
`;

export const TabText = styled.Text`
  font-size: 13px;
  color: #FFF;
`;
export const TabsContainer = styled.View`
  flexDirection: row;
  width:100%;
  margin-top:10px;
`;
export const TabsContainer2 = styled.View`
  flexDirection: row;
  width:100%;
  margin-top:15px;
  text-align:center;
  justify-content:center;
`;
export const LegendsDetalhes = styled.Text`
  font-size: 18px;
  color: white;
  text-align:center;
`;
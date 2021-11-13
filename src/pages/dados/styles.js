import styled from 'styled-components/native';
import { Dimensions, PixelRatio } from 'react-native';

const widthPercentageToDP = widthPercent => {
  const screenWidth = Dimensions.get('window').width;
  return PixelRatio.roundToNearestPixel(screenWidth * parseFloat(widthPercent) / 100);
};


export const TextTituleModal = styled.Text`
    color: white;
    font-size: 25px;
    font-weight: bold;
    margin-top: 10px;
    margin-left: 50px;
    text-align:center;
`;


export const TextDados4 = styled.Text`
    color: #808080;
    font-size: 15px;
    marginLeft: 25px;
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
padding-bottom:100px;
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

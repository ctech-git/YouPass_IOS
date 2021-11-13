import styled from 'styled-components/native';


export const Container = styled.ScrollView.attrs({
  vertical: true,
  contentContainerStyle: { paddingLeft: 5, paddingRight: 5},
  showsHorizontalScrollIndicator: false,
})`
backgroundColor: #000;
`;

export const Feed = styled.ScrollView.attrs({
  vertical: true,
  contentContainerStyle: { paddingLeft: 5, paddingRight: 5},
  showsHorizontalScrollIndicator: false,
})`
margin-bottom:20px;
margin-top:20px;
`;
export const HeaderInit = styled.View`
  flexDirection: row;
  alignItems: center;
  justifyContent: space-between;
  backgroundColor: #000;
  width:100%;
  height:20px;
  padding-left:10px;
  padding-right:10px;
  padding-top:5px;
`;

export const DestaquesContainer = styled.ScrollView.attrs({
  horizontal: true,
  contentContainerStyle: { paddingLeft: 5, paddingRight: 5},
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


export const Select = styled.Text`
    color: white;
    font-size: 15px;
    padding-left: 10px;
    font-weight: bold;
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
  width: 90px;
  height: 80px;
  border-radius: 3px;
  margin-left: 10px;
  alignItems: center;
  justifyContent: center;
`;
export const Description3 = styled.Text`
    color: white;
    font-size: 12px;
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
  contentContainerStyle: { paddingLeft: 5, paddingRight: 5},
  showsHorizontalScrollIndicator: false,
})`
height: 200px;
max-height: 200px;
margin-bottom:20px;
`;

export const CardIndicadores = styled.View`
  width: 100%;
  height: 100px;
  background-color: #000;
  padding:20px;
  alignItems: flex-start;
  justifyContent: flex-start;
`;
export const CardHistorico = styled.View`
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
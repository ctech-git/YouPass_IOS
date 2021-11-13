import styled from 'styled-components/native';

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

export const TextTitle = styled.Text`
  font-size: 22px;
  color: white;
  text-align:center;
  justify-content:center;
  margin-left:20px;
`;

export const Container = styled.ScrollView.attrs({
  vertical: true,
  contentContainerStyle: { paddingLeft: 5, paddingRight: 5},
  showsHorizontalScrollIndicator: false,
})`
backgroundColor: #000000;
`;

export const Modal = styled.Modal`
  
`;
export const View2 = styled.View`
height: 60px;
width: 100%;
backgroundColor: #000;
flexDirection: row;
`;
export const CardPush = styled.View`
  width: 96%;
  height: 60px;
  marginLeft: 2%;
  marginRight: 2%;
  marginBottom: 15px;
  alignItems: flex-start;
  padding-left:10px;
  padding-top:10px;
  flexDirection: row;
`;
export const Linha = styled.View`
  width: 80%;
  marginTop:5px;
  marginLeft:5%;
  alignItems: flex-start;
  flexDirection: row;
  border-top-color: transparent;
  border-left-color: transparent;
  border-right-color: transparent;
  border-bottom-color: #fefefe61;
  border-width: 1px;
`;
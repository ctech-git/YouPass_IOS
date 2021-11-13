import { createAppContainer } from 'react-navigation';
import Login from './pages/login';
import Profile from './pages/profile';
import Buscar from './pages/buscar';
import Historico from './pages/historico';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
export default createAppContainer(
    createMaterialBottomTabNavigator({
        Profile:{screen:Profile,navigationOptions:{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (<Icon name="home" color='white' size={28} />),
            tabBarColor: '#833C8E' }},
        Buscar:{screen:Buscar,navigationOptions:{
            tabBarLabel: "Buscar",
            tabBarIcon: ({ color, size }) => (<Icon name="person" color='white' size={28} />),
            tabBarColor: '#833C8E' }}, 
        Historico:{screen:Historico,navigationOptions:{
            tabBarLabel: "Historico",
            tabBarIcon: ({ color, size }) => (<Icon name="person" color='white' size={28} />),
            tabBarColor: '#833C8E' }},
        Login:{screen:Login,navigationOptions:{
            tabBarLabel: "Perfil",
            tabBarIcon: ({ color, size }) => (<Icon name="person" color='white' size={28} />),
            tabBarColor: '#833C8E' }}
    },{
        initialRouteName: 'Profile',
        activeColor: '#f0edf6',
        inactiveColor: '#3e2465',
        barStyle: {backgroundColor: '#833C8E'},
        shifting: true
    }
    )
)
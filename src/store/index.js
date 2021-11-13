import { createStore } from 'redux';

function reducer(state, action) {
    var aux = true;
    var aux2 = action.value;
    var name2 = action.name;
    var token2 = action.token;
    var surname2 = action.surname;
    var email2 = action.email;
    var favoritos2 = action.favoritos;
    var picture2 = action.picture;
    var distancia = action.SelectDistancia;
    var valor = action.Selectvalor;
    var dias = action.SelectDias;
    var horarios = action.SelectHorarios;
    var categorias = action.SelectCategorias;
    var codigo = action.cod;
    var categorias2 = action.SelectCategorias2;
    var isActive2 = action.isActive;
    var city = action.city;


    if (action.type === 'city') {
        return { ...state, city: city }
    } else if (action.type === 'buscaT') {
        aux = 5;
        return { ...state, check: aux }
    } else if (action.type === 'setCat2') {
        aux = 1;
        return { ...state, categoria2: aux2, check: aux }
    } else if (action.type === 'setCat') {
        aux = 2;
        return { ...state, categoria2: aux2, check: aux }
    } else if (action.type === 'login') {
        return {
            ...state, token: token2, name: name2,
            surname: surname2, email: email2, picture: picture2, favoritos: favoritos2, cod: codigo
        }
    } else if (action.type === 'logout') {
        return {
            ...state, token: "", name: "",
            surname: "", email: ""
        }
    } else if (action.type === 'check2') {
        return {
            ...state, check: "3", distancia: distancia,
            valor: valor, dias: dias, horarios: horarios,
            categorias: categorias, categorias2: categorias2
        }
    } else if (action.type === 'randon') {
        var m = Math.random() * (99999999 - 1) + 1;
        return { ...state, randon: m }
    } else if (action.type === 'favorita') {
        return { ...state, favoritos: favoritos2 }
    } else if (action.type === 'isActive') {
        return { ...state, isActive: isActive2 }
    } else if (action.type === 'New_notification') {
        var a = Math.random();
        return { ...state, New_notification: a }
    }
    return {
        check: aux,
        categoria2: '0',
        token: "",
        city: 0,
        isActive: 0,
        name: "",
        surname: "",
        email: "",
        favoritos: [],
        picture: "",
        distancia: "",
        valor: "",
        dias: "",
        codigo: "",
        New_notification: 0,
        horarios: "",
        categorias: "",
        categorias2: "",
        randon: 0
    }
}

const store = createStore(reducer);

export default store;

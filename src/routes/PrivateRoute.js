import React from 'react';
import { Redirect } from 'react-router';

export default function PrivateRoute( props ) {
    let isAutenticado = localStorage.getItem('TOKEN') ? true : false;
    
    // extraia componente e todo o resto joga numa variável chamada propriedades
    const { component: ComponentePrivado, ...propriedades } = props; 

    if (isAutenticado) {
        return <ComponentePrivado {...propriedades} />
    }
    else {
        return <Redirect to="/login" />
    }
}

/* toda página que eu quiser proteger o acesso, 
eu uso este componente aqui "privateroute"
em vez de route, já que não consigo editar ele
vai server como rota, vou usar dentro do switch
estou retornando os mesmos componentes que o route
então o switch vai aceitar pra renderizar,
estou emulando um route */


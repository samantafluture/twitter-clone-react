import React from 'react'
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function NotFoundPage( props ) {
    return (
        <>
            <Helmet>
                <title>Twitelum | 404 Página não encontrada</title>
            </Helmet>
            <div className="container">
                A URL <strong>{ props.location.pathname }</strong> não existe no Twitelum. Se quiser voltar para a página inicial, basta <Link to="/">clicar aqui</Link>.
            </div>
        </>
    )
}

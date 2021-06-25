import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory } from 'react-router-dom';
import Cabecalho from '../../components/Cabecalho'
import Widget from '../../components/Widget'
import './loginPage.css';
import LoginService from '../../services/LoginService';

function LoginPage() {
    const inputLogin = useRef();
    const inputSenha = useRef();
    const history = useHistory();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        let login = inputLogin.current.value.trim(); // o input está dentro da propriedade current; trim remove espaços
        let senha = inputSenha.current.value.trim();

        try {
            await LoginService.autenticar(login, senha);
            // registra a mudança no navegador e redireciona para pág escolhida
            history.push('/');
        } catch (erro) {
            alert(erro.message);
        }

    }

    return (
        <>
            <Helmet>
                    <title>Twitelum | Login</title>
            </Helmet>
            <Cabecalho />
            <div className="loginPage">
                <div className="container">
                    <Widget>
                        <h2 className="loginPage__title">Seja bem vindo!</h2>
                        <form onSubmit={ handleLoginSubmit } className="loginPage__form" action="/">
                            <div className="loginPage__inputWrap">
                                <label className="loginPage__label" htmlFor="login">Login</label>
                                <input ref={inputLogin} className="loginPage__input" type="text" id="login" name="login" />
                            </div>
                            <div className="loginPage__inputWrap">
                                <label className="loginPage__label" htmlFor="senha">Senha</label>
                                <input ref={inputSenha} className="loginPage__input" type="password" id="senha" name="senha" />
                            </div>
                            <div className="loginPage__inputWrap">
                                <button className="loginPage__btnLogin" type="submit">
                                    Logar
                                </button>
                            </div>
                        </form>
                    </Widget>
                </div>
            </div>
        </>
    )
}


export default LoginPage
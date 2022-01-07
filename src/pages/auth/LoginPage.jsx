import React, { useEffect } from 'react';
import '../../styles/loginpage.scss';
import Logo from '../../components/pure/Logo';
import Footer from '../../components/pure/Footer';
import { useNavigate } from 'react-router-dom';

function LoginPage() {

    useEffect(() => {
        document.body.className='background-image-on';
        return () => {
            document.body.className='';
        }
    }, [])

    const history = useNavigate();

    const dashboard = (e) => {
        e.preventDefault();
        history('/dashboard');
    }

  return (
    <div className="login-page">
        <div className="login-panel">
            <Logo></Logo>
            <div className="form-frame">
                <div className="allfields-frame">
                    <div className="field-frame">
                        <label>Email</label>
                        <input type="text" placeholder="Introduce tu correo" name="email"></input>
                    </div>
                    <div className="field-frame">
                        <label>Contraseña</label>
                        <input type="password" placeholder="Introduce tu contraseña" name="password"></input>
                    </div>
                </div>
                <div className="remember-frame">
                    <input type="checkbox" id="checkboxid" className="checkbox"/>
                    <span id="remember">Recuérdame</span>
                    <span id="forgotten"><a href="../../forgotten.html" id="forgotten">He olvidado la contraseña</a></span>
                </div>
                <input type="button" value="Iniciar Sesión" onClick={dashboard}></input>
            </div>
        </div>
        <Footer></Footer>
    </div>
  );
}

export default LoginPage;
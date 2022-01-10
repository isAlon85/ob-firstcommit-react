import React, { useEffect } from 'react';
import '../../styles/loginpage.scss';
import Logo from '../../components/pure/Logo';
import Footer from '../../components/pure/Footer';
import { useNavigate } from 'react-router-dom';
import Axios from '../../components/pure/Axios'

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
            <Axios></Axios>
        </div>
        <Footer></Footer>
    </div>
  );
}

export default LoginPage;
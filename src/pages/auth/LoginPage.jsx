import React, { useEffect } from 'react';
import '../../styles/loginpage.scss';
import Logo from '../../components/pure/Logo';
import Footer from '../../components/pure/Footer';
import Login from '../../components/pure/Login'

function LoginPage() {

    useEffect(() => {
        document.title = "OB Alumnos Login";
        document.body.className='background-image-on';
        return () => {
            document.body.className='';
        }
    }, [])

  return (
    <div className="login-page">
        <div className="login-panel">
            <Logo></Logo>
            <Login></Login>
        </div>
        <Footer></Footer>
    </div>
  );
}

export default LoginPage;
import React from 'react';

function Footer() {
    return (
        <div className="footer">
            <p className="p_footer">Copyright © { new Date().getFullYear() } Open Bootcamp SL, 
            <a className="p_footer" href='https://github.com/isAlon85'> Israel Alonso</a>
            </p>
            <p className="p_footer">Todos los derechos reservados.</p>
            <a href="../../privacypolicy.html" className="p_footerlink">Política de Privacidad</a>
        </div>
    );
}

export default Footer;
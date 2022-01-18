import React from 'react';
import UserHeader from './UserHeader';
import { useNavigate } from 'react-router-dom';

function StudentHeader() {

    const history = useNavigate();

    const dashboardRoute = (e) => {
        e.preventDefault();
        history('/dashboard');
    }

    return (
        <div className="header-frame-student">
            <div className="back-frame-outer">
                <div className="back-frame-inner" onClick={dashboardRoute}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                    </svg>
                    <span>Volver</span>
                </div>
            </div>
            <UserHeader></UserHeader>
        </div>
    );
}

export default StudentHeader;
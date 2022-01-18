import React, { useEffect} from 'react';
import { AuthContext } from "../../App.js";
import { useNavigate} from 'react-router-dom';
import { getUserByUsername } from '../../services/axiosService'

function UserHeader() {

    const { dispatch } = React.useContext(AuthContext);
    const { state: authState } = React.useContext(AuthContext);

    const history = useNavigate();

    const logout = () => {
        dispatch({
            type: "LOGOUT",
        })
        history('/login');
    }

    useEffect(() => {
        getUser();
    }, [])

    const getUser = () => {
        getUserByUsername(authState.username, authState.token)
            .then((response) => {
            })
            .catch((error) => {
                console.log(error)
                logout();
            })
            .finally(() => console.log('Expired Token checked'))
    }

    return (
    <div className="user-frame">
        <div className="user-frame-2" onClick={ () => logout() }>
            <div className="user-name">
                { authState.username !==null ? authState.username.charAt(0) + authState.username.charAt(1) : 'NA'}
            </div>
            <div className="user-picture"> 
                { authState.username !==null ? authState.username : 'Username' }
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
            </svg>
        </div>
    </div>
  );
}

export default UserHeader;
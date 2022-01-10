import axios from 'axios';

export const login = (email, password) => {

    let body = {
        email: email,
        password: password
    }

    return axios.post('https://ob-firstcommit.herokuapp.com/api/auth/login', body)
}
import axios from 'axios';

export const login = (email, password) => {

    let body = {
        email: email,
        password: password
    }

    return axios.post('https://ob-firstcommit.herokuapp.com/api/auth/login', body)
}

export const forgot = (email) => {

    let body = {
        email: email
    }

    return axios.post('https://ob-firstcommit.herokuapp.com/api/auth/forgot', body)
}

export const recover = (password, token) => {

    let body = {
        password: password
    }

    return axios.post('https://ob-firstcommit.herokuapp.com/api/auth/recover?token=' + token, body)
}
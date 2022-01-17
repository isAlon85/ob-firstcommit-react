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

export const getUserByUsername = (username, token) => {

    const headers = {
        'Authorization': `Bearer ${token}`
    }

    return axios.get('https://ob-firstcommit.herokuapp.com/api/user?username=' + username, { headers: headers })
}

export const getStudents = (token) => {

    const headers = {
        'Authorization': `Bearer ${token}`
    }

    return axios.get('https://ob-firstcommit.herokuapp.com/api/students', { headers: headers })
}

export const createStudent = (student, token) => {

    const headers = {
        'Authorization': `Bearer ${token}`
    }

    let body = {
        name: student.name,
        email: student.email,
        phone: student.phone,
        country: student.country,
        location: student.location,
        mobility: student.mobility,
        remote: student.remote
    }

    return axios.post('https://ob-firstcommit.herokuapp.com/api/student', body, { headers: headers })
}
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

export const getStudents = (remote, mobility, token) => {

    const headers = {
        'Authorization': `Bearer ${token}`
    }

    /*if(remote === null && mobility !== null) {
        return axios.get('https://ob-firstcommit.herokuapp.com/api/students?mobility=' + mobility, { headers: headers })
    } else if (mobility === null && remote !== null) {
        return axios.get('https://ob-firstcommit.herokuapp.com/api/students?remote=' + remote, { headers: headers })
    } else if (mobility !== null && remote !== null) {
        return axios.get('https://ob-firstcommit.herokuapp.com/api/students?remote=' + remote + '&mobility=' + mobility, { headers: headers })
    } else {
        return axios.get('https://ob-firstcommit.herokuapp.com/api/students', { headers: headers })
    }*/

    if(remote === null && mobility === null) {
        return axios.get('https://ob-firstcommit.herokuapp.com/api/students', { headers: headers })
    }
    const remoteURL = remote!==null ? ('remote=' + remote) : '';
    const mobilityURL = mobility!==null ? ('mobility=' + mobility) : '';
    var urlArray = [remoteURL, mobilityURL];
    var urlArrClean = urlArray.filter(Boolean);
    var result = '';
    for(let i = 0; i < urlArrClean.length; i++){
        if(urlArrClean[i] !== ''){
            if(i !== 0){
                result = result + '&';
            }
            result = result + urlArrClean[i];
        }
    }
    console.log(urlArray)
    console.log(result)
    return axios.get('https://ob-firstcommit.herokuapp.com/api/students?' 
        + result, 
        { headers: headers })
        
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

export const deletePicture = (id, token) => {

    const headers = {
        'Authorization': `Bearer ${token}`
    }

    return axios.delete('https://ob-firstcommit.herokuapp.com/api/picture/' + id, { headers: headers })
}

export const createPicture = (file, token) => {

    const headers = {
        'Authorization': `Bearer ${token}`
    }

    const formData = new FormData()
    formData.append('multipartFile', file, file.name)

    return axios.post('https://ob-firstcommit.herokuapp.com/api/picture', formData, { headers: headers })
}

export const updatePicture = (id, picture, token) => {

    const headers = {
        'Authorization': `Bearer ${token}`
    }

    let body = {
        picture: picture
    }

    return axios.patch('https://ob-firstcommit.herokuapp.com/api/student/' + id, body, { headers: headers })
}

export const deleteResume = (id, token) => {

    const headers = {
        'Authorization': `Bearer ${token}`
    }

    return axios.delete('https://ob-firstcommit.herokuapp.com/api/resume/' + id, { headers: headers })
}

export const createResume = (file, token) => {

    const headers = {
        'Authorization': `Bearer ${token}`
    }

    const formData = new FormData()
    formData.append('multipartFile', file, file.name)

    return axios.post('https://ob-firstcommit.herokuapp.com/api/resume', formData, { headers: headers })
}

export const updateResume = (id, resume, token) => {

    const headers = {
        'Authorization': `Bearer ${token}`
    }

    let body = {
        resume: resume
    }

    return axios.patch('https://ob-firstcommit.herokuapp.com/api/student/' + id, body, { headers: headers })
}

export const getStudent = (id, token) => {

    const headers = {
        'Authorization': `Bearer ${token}`
    }

    return axios.get('https://ob-firstcommit.herokuapp.com/api/student/' + id, { headers: headers })
}

export const updateStudent = (id, params, token) => {

    console.log(params)

    const headers = {
        'Authorization': `Bearer ${token}`
    }

    return axios.patch('https://ob-firstcommit.herokuapp.com/api/student/' + id, params, { headers: headers })
}
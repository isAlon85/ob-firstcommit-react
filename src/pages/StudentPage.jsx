import React, { useState, useEffect, useCallback } from 'react';
import '../styles/studentpage.scss';
import StudentHeader from '../components/pure/StudentHeader';
import { useLocation } from 'react-router-dom';
import { deletePicture, createPicture, updatePicture, deleteResume, updateResume, createResume, getStudent, updateStudent } from '../services/axiosService'
import { AuthContext } from "../App.js";
import { Student } from '../models/student.class';

function StudentPage({ props }) {

    const { state: authState } = React.useContext(AuthContext);

    const { state } = useLocation();
    
    const [student, setStudent] = useState(state)
    const [picture, setPicture] = useState(null)
    const [resume, setResume] = useState(null)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
    const [location, setLocation] = useState('');

    const getStudentFunc = useCallback(() =>{
        getStudent(student.id, authState.token)
            .then((response) => {
                const tagsFetched = [];
                if(response.data.tags) {
                    for(let i = 0; i < response.data.tags.length; i++) {
                        tagsFetched.push(response.data.tags[i]);
                    }
                };
                const fetchedStudent = new Student(
                    response.data.id, 
                    response.data.name, 
                    response.data.email, 
                    response.data.phone, 
                    response.data.country, 
                    response.data.location, 
                    response.data.mobility, 
                    response.data.remote, 
                    1, 
                    response.data.picture ? response.data.picture : null, 
                    response.data.resume ? response.data.resume : null, 
                    tagsFetched
                );
            setStudent(fetchedStudent);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => console.log('Student retrieved'))
    },[authState.token, student.id])

    //lifeCycle control
    useEffect(() => {
        document.title = "OB Alumnos Student";
        console.log('Student has been modified');
        getStudentFunc();
        return () => {
            console.log('Student component is going to unmount');
        }
    }, [getStudentFunc])

    /*function deleteTag(tag) {
        const myTag = document.getElementById(tag);
        const parent = myTag.parentNode;
        parent.removeChild(myTag);
    }*/

    const changePicture = async () => {
        const file = await readFile();
        var responsePicture = null;
        if(state.picture) {
            deletePicture(state.picture.cloudinaryId, authState.token)
            .then((responseDel) => {
              console.log(responseDel);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => console.log('Picture deleted')) 
        }
        if(student.picture) {
            deletePicture(student.picture.cloudinaryId, authState.token)
            .then((responseDel) => {
              console.log(responseDel);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => console.log('Picture deleted')) 
        }
        await createPicture(file, authState.token)
        .then((responseCr) => {
            setPicture(responseCr.data);
            responsePicture = responseCr.data;
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => console.log('Picture created'))
        updatePicture(student.id, responsePicture, authState.token)
        .then((responseCr) => {
          console.log(responseCr);
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => console.log('Picture updated'))
        window.location.reload(false);
    }

    const deleteThisResume = async () => {
        if(state.resume) {
            deleteResume(state.resume.cloudinaryId, authState.token)
            .then((responseDel) => {
              console.log(responseDel);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => console.log('Resume deleted'))
            window.location.reload(false);
        }
        if(student.resume) {
            deleteResume(student.resume.cloudinaryId, authState.token)
            .then((responseDel) => {
              console.log(responseDel);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => console.log('Resume deleted'))
            window.location.reload(false);
        }
    }

    const uploadThisResume = async () => {
        const file = await readResume();
        var responseResume = null;
        await createResume(file, authState.token)
        .then((responseCr) => {
            setResume(responseCr.data);
            responseResume = responseCr.data;
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => console.log('Resume created'))
        updateResume(student.id, responseResume, authState.token)
        .then((responseCr) => {
          console.log(responseCr);
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => console.log('Resume updated'))
        window.location.reload(false);
    }

    const update = (event) => {
        const id = event.target.id;
        id === 'name' ? setName(event.target.value) : setName(null);
        id === 'email' ? setEmail(event.target.value) : setEmail(null);
        id === 'phone' ? setPhone(event.target.value) : setPhone(null);
        id === 'country' ? setCountry(event.target.value) : setCountry(null);
        id === 'location' ? setLocation(event.target.value) : setLocation(null);
        const params = {}
        if (name) { params.name = name }
        if (email) { params.email = email }
        if (phone) { params.phone = phone }
        if (country) { params.country = country }
        if (location) { params.location = location }
        console.log(params)
        if (event.keyCode === 13) {
            updateStudent(student.id, params, authState.token)
            .then((responseUpd) => {
                console.log(responseUpd);
              })
              .catch((error) => {
                  console.log(error);
              })
              .finally(() => console.log('Student updated'))
              window.location.reload(false);
        }
    }

    function readFile() {
        return new Promise(resolve => {
            var fileInput = document.querySelector("#file-selector");
            var files = fileInput.files;
            // cache files.length
            var fl = files.length;
            var i = 0;
        
            while ( i < fl) {
                // localize file var in the loop
                var file = files[i];
                i++;
            }
            resolve(file);
          });
    }

    function readResume() {
        return new Promise(resolve => {
            var fileInput = document.querySelector("#resume-selector");
            var files = fileInput.files;
            // cache files.length
            var fl = files.length;
            var i = 0;
        
            while ( i < fl) {
                // localize file var in the loop
                var file = files[i];
                i++;
            }
            resolve(file);
          });
    }

    return (
        <div>
        <StudentHeader></StudentHeader>
        <div className="student-body-outer">
            <div className="student-body-inner">
                    <div className="student-form">
                        <div className="student-header">
                            <div className="picture-frame">
                                <label className="cover" 
                                    style={ student.picture ? 
                                    { backgroundImage: `url(${student.picture.url})`} 
                                    : 
                                    { backgroundImage: 'url(https://res.cloudinary.com/ialons85/image/upload/w_82,h_82/v1642443448/anonymous_alhvdv.jpg)'}}
                                >
                                <input type="file" id="file-selector" className="file-selector" accept=".jpg" onChange={ () => changePicture() }></input>
                                </label>
                            </div>
                            <div className="student-info-frame">
                                <p>{ student.name }</p>
                                <div className="student-info-text">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                                        <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
                                        <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                    </svg>
                                    <div className="student-info-text">
                                        { student.location }
                                    </div>
                                    <div className="student-info-text">
                                        |
                                    </div>
                                    <div className="student-info-text">
                                        { student.country }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="student-info-frame-inner">
                            <div className="user-form-big">
                                <p>Nombre y Apellidos</p>
                                <input type="text" placeholder={ student.name } id="name" onKeyUp={ update }/>
                            </div>
                            <div className="user-form-split">
                                <div className="user-form-splitted">
                                    <p>Teléfono</p>
                                    <input type="text" placeholder={ student.phone } id="phone" onKeyUp={ update }/>
                                </div>
                                <div className="user-form-splitted">
                                    <p>Email</p>
                                    <input type="text" placeholder={ student.email } id="email" onKeyUp={ update }/>
                                </div>
                            </div>
                            <div className="user-form-split">
                                <div className="user-form-splitted">
                                    <p>País</p>
                                    <input type="text" placeholder={ student.country } id="country" onKeyUp={ update }/>
                                </div>
                                <div className="user-form-splitted">
                                    <p>Ciudad</p>
                                    <form name="formulario" method="post" action="">
                                    <input type="text" placeholder={ student.location } id="location" onKeyUp={ update }/>
                                    </form>
                                </div>
                            </div>
                            <div className="user-form-split">
                                <div className="user-form-splitted">
                                    <p>Translado</p>
                                    <form name="formulario" method="post" action="">
                                        <select className="select-user-form-splitted" name="combo" defaultValue={ student.mobility ? "2" : "1" }>
                                            <option value="1">No</option>
                                            <option value="2">Sí</option>
                                        </select>
                                    </form>
                                </div>
                                <div className="user-form-splitted">
                                    <p>Presencialidad</p>
                                    <form name="formulario" method="post" action="">
                                        <select className="select-user-form-splitted" name="combo" defaultValue={ student.remote ? "1" : "2" }>
                                            <option value="1">En remoto</option>
                                            <option value="2">Presencial</option>
                                        </select>
                                    </form>
                                </div>
                            </div>
                            <div className="user-form-big">
                                <p>Documento CV</p>
                                <div className="resume-button-container">
                                    <label className="button_upload">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" className="bi bi-cloud-arrow-up" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"/>
                                            <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
                                        </svg>
                                        Subir de nuevo
                                        <input type="file" id="resume-selector" className="file-selector" accept=".pdf" onChange={ () => uploadThisResume() }/>
                                    </label>
                                    <button className="button_delete" type="button" onClick={ () => deleteThisResume() }>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" className="bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                        </svg>
                                        Borrar
                                    </button>
                                </div>
                            </div>
                            <div className="user-form-bigger">
                                <p>Etiquetas</p>
                                <form name="formulario" method="post" action="">
                                    <input type="text" id="tag" placeholder="Escribe para buscar...." list="items" />
                                    <datalist id="items">
                                    <option >HTML&CSS</option>
                                    <option >React</option>
                                    <option >Angular</option>
                                    <option >Vue</option>
                                    <option >Spring</option>
                                    <option >Java</option>
                                    <option >JavaScript</option>
                                    <option >Hibernate</option>
                                    </datalist>
                                </form>
                                <div className="tagitem-container" id="list">
                                    <span className="tagitem" id="1">HTML&CSS<svg  xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                    </span>
                                    <span className="tagitem" id="2">REACT<svg  xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                <div className="pdf-frame">
                    <iframe title="Resume" id="pdf-viewer" className="pdf-viewer" src={ student.resume ? student.resume.url : '' } type="application/pdf" width="100%" height="100%"/>
                </div>
            </div>
        </div>        
        </div>
    );
}

export default StudentPage;
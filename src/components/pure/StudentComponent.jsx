import React, { useState, useEffect, useCallback } from 'react';
import { deletePicture, createPicture, updatePicture, deleteResume, updateResume, createResume, getStudent, updateStudent } from '../../services/axiosService'
import { Student } from '../../models/student.class';
import PropTypes from 'prop-types';
import countryList from "../../json/countryList";

function StudentComponent({ state, token }) {

    const [student, setStudent] = useState(null);
    const [picture, setPicture] = useState(null);
    const [pictureLoading, setPictureLoading] = useState(false);
    const [resume, setResume] = useState(null);
    const [resumeLoading, setResumeLoading] = useState(false);
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [country, setCountry] = useState(null);
    const [location, setLocation] = useState(null);
    const [mobility, setMobility] = useState(null);
    const [remote, setRemote] = useState(null);
    const [tags, setTags] = useState(null);
    
    const countries = countryList;

    const getStudentFunc = useCallback(() =>{
        getStudent(state, token)
            .then((response) => {
                const tagsFetched = [];
                if(response.data.tags){
                    for(let i = 0; i < response.data.tags.length; i++) {
                        tagsFetched.push(response.data.tags[i]);
                    }
                };
                var pictureModified = null;
                if (response.data.picture){
                    pictureModified = response.data.picture;
                    pictureModified.url = pictureModified.url.replace("/upload/", "/upload/w_82,h_82/");      
                }
                const fetchedStudent = new Student(
                    response.data.id, 
                    response.data.name, 
                    response.data.email, 
                    response.data.phone, 
                    response.data.country, 
                    response.data.location, 
                    response.data.mobility, 
                    response.data.remote, 
                    response.data.user.id, 
                    pictureModified,
                    response.data.resume ? response.data.resume : null, 
                    tagsFetched
                );
            setMobility(response.data.mobility);
            setRemote(response.data.remote);
            response.data.picture ? setPicture(response.data.picture) : null;
            response.data.picture ? setResume(response.data.picture) : null;
            setTags(tagsFetched);
            setStudent(fetchedStudent);
            console.log(fetchedStudent);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => console.log('Student retrieved'))
    },[token, state])

    useEffect(() => {
        document.title = "OB Alumnos Student";
        console.log('Student has been modified');
        getStudentFunc();
        return () => {
            console.log('Student component is going to unmount');
        }
    }, [getStudentFunc])

    const changePicture = async () => {
        setPictureLoading(true);
        const file = await readFile();
        var responsePicture = null;
        if(state.picture) {
            deletePicture(state.picture.cloudinaryId, token)
            .then((responseDel) => {
                console.log(responseDel);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => console.log('Picture deleted')) 
        }
        if(student.picture) {
            deletePicture(student.picture.cloudinaryId, token)
            .then((responseDel) => {
            console.log(responseDel);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => console.log('Picture deleted')) 
        }
        await createPicture(file, token)
        .then((responseCr) => {
            setPicture(responseCr.data);
            responsePicture = responseCr.data;
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => console.log('Picture created'))
        updatePicture(student.id, responsePicture, token)
        .then((responseCr) => {
        console.log(responseCr);
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => getStudentFunc())
        setPictureLoading(false);
    }

    const deleteThisResume = async () => {
        if(state.resume) {
            deleteResume(state.resume.cloudinaryId, token)
            .then((responseDel) => {
            console.log(responseDel);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => getStudentFunc())
        }
        if(student.resume) {
            deleteResume(student.resume.cloudinaryId, token)
            .then((responseDel) => {
            console.log(responseDel);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => getStudentFunc())
        }
    }

    const uploadThisResume = async () => {
        setResumeLoading(true);
        const file = await readResume();
        var responseResume = null;
        await createResume(file, token)
        .then((responseCr) => {
            setResume(responseCr.data);
            responseResume = responseCr.data;
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => console.log('Resume created'))
        updateResume(student.id, responseResume, token)
        .then((responseCr) => {
        console.log(responseCr);
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => getStudentFunc())
        setResumeLoading(false);
    }

    const update = (event) => {
        const id = event.target.id;
        id === 'name' ? setName(event.target.value) : setName(name);
        id === 'email' ? setEmail(event.target.value) : setEmail(email);
        id === 'phone' ? setPhone(event.target.value) : setPhone(phone);
        id === 'location' ? setLocation(event.target.value) : setLocation(location);
        const params = {}
        if (name) { params.name = name }
        if (email) { params.email = email }
        if (phone) { params.phone = phone }
        if (location) { params.location = location }
        if (event.keyCode === 13) {
            updateStudent(student.id, params, token)
            .then((responseUpd) => {
                console.log(responseUpd);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                getStudentFunc();
            })
        }
    }

        const updateBinary = (event) => {
        const id = event.target.id;
        const params = {};
        if(id === 'mobility'){
            let mob = null;
            event.target.value === 'true' ? mob = true : mob = false ;   
            setMobility(mob);
            params.mobility = mob;
        }
        if(id === 'remote'){
            let rem = null;
            event.target.value === '1' ? rem = 1 : rem = 0 ;  
            setRemote(rem);
            params.remote = rem;
        }
        if(id === 'country'){
            let coun = null;
            coun = event.target.value;  
            setCountry(coun);
            params.country = coun;
        }
        updateStudent(student.id, params, token)
        .then((responseUpd) => {
            console.log(responseUpd);
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            getStudentFunc();
        })
    }

    function readFile() {
        return new Promise(resolve => {
            var fileInput = document.querySelector("#file-selector");
            var files = fileInput.files;
            var fl = files.length;
            var i = 0;
            while ( i < fl) {
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
            var fl = files.length;
            var i = 0;
            while ( i < fl) {
                var file = files[i];
                i++;
            }
            resolve(file);
        });
    }

    const removeTags = indexToRemove => {
        var studentTags = tags;
        const params = {};
        var actualTags = [...studentTags.filter((_, index) => index !== indexToRemove)]
		setTags([...tags.filter((_, index) => index !== indexToRemove)]);
        params.tags = actualTags;
        updateStudent(student.id, params, token)
        .then((responseUpd) => {
            console.log(responseUpd);
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            getStudentFunc();
        })
	};

    const addTag = (event) => {
        var studentTags = tags;
        const params = {};
        var checkDuplicated = new Boolean(false);
        var tagNames =[];
        for (let i = 0; i < tags.length; i++) {
            tagNames[i] = tags[i].name;
        }
        var compare = event.target.value.toUpperCase();
		switch(compare) {
			case "HTML&CSS":
                if (tagNames.includes( "HTML&CSS" )) checkDuplicated = true;
				studentTags.push({id: 1, name: 'HTML&CSS', description: 'HTML & CSS'});
			break;
			case "REACT":
                if (tagNames.includes( "REACT" )) checkDuplicated = true;
				studentTags.push({id: 2, name: 'REACT', description: 'React'});
                event.target.value = '';
			break;
			case "ANGULAR":
                if (tagNames.includes( "ANGULAR" )) checkDuplicated = true;
				studentTags.push({id: 3, name: 'ANGULAR', description: 'Angular'});
                event.target.value = '';
			break;
			case "VUE":
                if (tagNames.includes( "VUE" )) checkDuplicated = true;
				studentTags.push({id: 4, name: 'VUE', description: 'Vue'});
                event.target.value = '';
			break;
			case "SPRING":
                if (tagNames.includes( "SPRING" )) checkDuplicated = true;
				studentTags.push({id: 5, name: 'SPRING', description: 'Spring'});
                event.target.value = '';
			break;
			case "JAVA":
                if (tagNames.includes( "JAVA" )) checkDuplicated = true;
				studentTags.push({id: 6, name: 'Java', description: 'JAVA'});
                event.target.value = '';
			break;
			case "JAVASCRIPT":
                if (tagNames.includes( "JAVASCRIPT" )) checkDuplicated = true;
				studentTags.push({id: 7, name: 'JAVASCRIPT', description: 'JavaScript'});
                event.target.value = '';
			break;
			case "HIBERNATE":
                if (tagNames.includes( "HIBERNATE" )) checkDuplicated = true;
				studentTags.push({id: 8, name: 'HIBERNATE', description: 'Hibernate'});
                event.target.value = '';
			break;
			default:
                checkDuplicated = true;
		}
        if(checkDuplicated == false) {
            params.tags = studentTags;
            updateStudent(student.id, params, token)
            .then((responseUpd) => {
                console.log(responseUpd);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                getStudentFunc();
            })
        }
    }

    return (
        <div className="student-body-outer">
            <div className="student-body-inner">
                <div className="student-form">
                    <div className="student-header">
                        <div className="picture-frame">
                            <label className="cover" 
                            style={ student 
                            ? student.picture 
                            ? { backgroundImage: `url(${student.picture.url})`} 
                            : { backgroundImage: 'url(https://res.cloudinary.com/ialons85/image/upload/w_82,h_82/v1642443448/anonymous_alhvdv.jpg)'} 
                            : null}
                            >
                                <input type="file" id="file-selector" className="file-selector" accept="image/*" onChange={ () => changePicture() }></input>
                            </label>
                        </div>
                        <div className="student-info-frame">
                            <p>{ student ? student.name : null }</p>
                            <div className="student-info-text">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                                    <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
                                    <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                </svg>
                                <div className="student-info-text">
                                { student ? student.location : null }
                                </div>
                                <div className="student-info-text">
                                |
                                </div>
                                <div className="student-info-text">
                                { student ? student.country : null }
                                </div>
                            </div>
                            <div className="student-picture-uploading" style={{ display: pictureLoading ? "flex" : "none" }}>Subiendo fotografía</div>
                        </div>
                    </div>
                    <div className="student-info-frame-inner">
                        <div className="user-form-big">
                            <p>Nombre y Apellidos</p>
                            <input type="text" placeholder={ student ? student.name : null } id="name" onKeyUp={ update }/>
                        </div>
                        <div className="user-form-split">
                            <div className="user-form-splitted">
                                <p>Teléfono</p>
                                <input type="text" placeholder={ student ? student.phone : null } id="phone" onKeyUp={ update }/>
                            </div>
                            <div className="user-form-splitted">
                                <p>Email</p>
                                <input type="text" placeholder={ student ? student.email : null } id="email" onKeyUp={ update }/>
                            </div>
                        </div>
                        <div className="user-form-split">
                            <div className="user-form-splitted">
                                <p>País</p>
                                <form name="formulario">
                                    <select className="select-user-form-splitted" id="country" value={ student ? student.country ? student.country : "España" : "España" } onChange={ updateBinary }>
                                        { countries ? countries.map((country, index) => {
                                        return (
                                            <option key={ index } value={ country }>{ country }</option>
                                        )}) : null }
                                    </select>
                                </form>
                            </div>
                            <div className="user-form-splitted">
                                <p>Ciudad</p>
                                <input type="text" placeholder={ student ? student.location : null } id="location" onKeyUp={ update }/>
                            </div>
                        </div>
                        <div className="user-form-split">
                            <div className="user-form-splitted">
                                <p>Translado</p>
                                <form name="formulario">
                                    <select className="select-user-form-splitted" id="mobility" value={ student ? student.mobility ? "true" : "false" : "false" } onChange={ updateBinary }>
                                        <option value="false">No</option>
                                        <option value="true">Sí</option>
                                    </select>
                                </form>
                            </div>
                            <div className="user-form-splitted">
                                <p>Presencialidad</p>
                                <form name="formulario">
                                    <select className="select-user-form-splitted" id="remote" value={ student ? student.remote ? "1" : "0" : "0" } onChange={ updateBinary }>
                                        <option value="1">En remoto</option>
                                        <option value="0">Presencial</option>
                                    </select>
                                </form>
                            </div>
                        </div>
                        <div className="user-form-big">
                            <p>Documento CV<span style={{ display: resumeLoading ? "flex" : "none" }}>Subiendo</span></p>
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
                                <input type="text" placeholder="Escribe para buscar...." list="items" onInput={ addTag }/>
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
                            <div className="tagitem-container" id="list">
                            { student ? student.tags ? student.tags.map((tag, index) => {
                                return (
                                    <span className="tagitem" key={ index } id={ index }>{ tag.name }<svg onClick={ () => removeTags(index) } xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                    </span>
                                )
                            }) : null : null}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pdf-frame">
                    <iframe title="Resume" id="pdf-viewer" className="pdf-viewer" src={ student ? student.resume ? student.resume.url : null : null} type="application/pdf" width="100%" height="100%"/>
                </div>
            </div>
        </div>        
    );
}

StudentComponent.propTypes = {
    state: PropTypes.number.isRequired,
    token: PropTypes.string.isRequired
};

export default StudentComponent;
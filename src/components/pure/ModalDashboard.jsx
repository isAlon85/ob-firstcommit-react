import React, { useState } from 'react';
import { createStudent } from '../../services/axiosService'
import { AuthContext } from "../../App.js";
import { Student } from '../../models/student.class'
import countryList from "../../json/countryList";
import { deletePicture, createPicture, deleteResume, createResume} from '../../services/axiosService'

function ModalDashboard() {

    const isVisible = "is-visible";
    const countries = countryList;

    function closeModal() {
        document.getElementById('modal').classList.remove(isVisible);
    }

    const { state: authState } = React.useContext(AuthContext);

    const initialStudent = new Student();

    const [student, setStudent] = useState(initialStudent);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [location, setLocation] = useState('');
    const [defaultCountry, setDefaultCountry] = useState('España');
    const [picture, setPicture] = useState(null);
    const [pictureId, setPictureId] = useState(null);
    const [resume, setResume] = useState(null);
    const [resumeId, setResumeId] = useState(null);
    const [tags, setTags] = useState(null);

    const createNewStudent = () => {
        const mobility = document.getElementById('mobility').value === 'Sí' ? true : false;
        const remote = document.getElementById('remote').value === 'En remoto' ? 1 : 0;
        const country = document.getElementById('country').value;
        setDefaultCountry(country);
        const valueStudent = new Student(1, name, email, phone, country, location, mobility, remote, 1, pictureId, resumeId, null);
        setStudent(valueStudent);
        createStudent(valueStudent, authState.token)
            .then((response) => {
            console.log(response);
            window.location.reload(false);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => console.log('User created'))
    }

    function updateName(event) {
        setName(event.target.value);
    }

    function updateEmail(event) {
        setEmail(event.target.value);
    }

    function updatePhone(event) {
        setPhone(event.target.value);
    }

    function updateLocation(event) {
        setLocation(event.target.value);
    }

    const changePicture = async () => {
        const file = await readFile();
        setPicture(file);
        await createPicture(file, authState.token)
        .then((responseCr) => {
            console.log(responseCr);
            setPictureId(responseCr.data);
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => console.log('Picture created'))
    }

    const deletePictureStored = () => {
        deletePicture(pictureId.cloudinaryId, authState.token)
        .then((responseDel) => {
            console.log(responseDel);
            setPicture(null);
            setPictureId(null);
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => console.log('Picture deleted'))
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
    const changeResume = async () => {
        const file = await readResume();
        setResume(file);
        await createResume(file, authState.token)
        .then((responseCr) => {
            console.log(responseCr);
            setResumeId(responseCr.data);
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => console.log('Resume created'))
    }

    const deleteResumeStored = () => {
        deleteResume(resumeId.cloudinaryId, authState.token)
        .then((responseDel) => {
            console.log(responseDel);
            setResume(null);
            setResumeId(null);
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => console.log('Resume deleted'))
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

    const deleteAll = () => {
        setName('');
        setPhone('');
        setEmail('');
        setDefaultCountry('España');
        setLocation('');
        if(pictureId){
            deletePicture(pictureId.cloudinaryId, authState.token)
            .then((responseDel) => {
                console.log(responseDel);
                setPicture(null);
                setPictureId(null);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => console.log('Picture deleted'))
        }
        if(resumeId){
            deleteResume(resumeId.cloudinaryId, authState.token)
            .then((responseDel) => {
                console.log(responseDel);
                setResume(null);
                setResumeId(null);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => console.log('Resume deleted'))
        }
        console.log("All values deleted");
    }

    return (
        <div className="modal" id="modal">
            <div id="modal-dialog">
                <section className="modal-content">
                    <div className="modal-header">
                        <label>Nuevo Alumno</label>
                        <button className="close-modal" onClick={ closeModal }>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                            </svg>  
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="modal-form-outer">
                            <div className="modal-user-form-big">
                                <p>Nombre y Apellidos</p>
                                <input type="text" placeholder="Introduce nombre" id="name" value={ name } onChange={ updateName }/>
                            </div>
                            <div className="modal-user-form-split">
                                <div className="modal-user-form-splitted">
                                    <p>Teléfono</p>
                                    <input type="text" placeholder="Introduce número" id="phone" value={ phone } onChange={ updatePhone }/>
                                </div>
                                <div className="modal-user-form-splitted">
                                    <p>Email</p>
                                    <input type="text" placeholder="Introduce email" id="email" value={ email } onChange={ updateEmail }/>
                                </div>
                            </div>
                            <div className="modal-user-form-split">
                                <div className="modal-user-form-splitted">
                                    <p>País</p>
                                    <form name="formulario">
                                    <select className="select-user-form-splitted" id="country" defaultValue={ defaultCountry }>
                                        { countries ? countries.map((country, index) => {
                                        return (
                                            <option key={ index } value={ country }>{ country }</option>
                                        )}) : null }
                                    </select>
                                </form>
                                </div>
                                <div className="modal-user-form-splitted">
                                    <p>Ciudad</p>
                                    <input type="text" placeholder="Introduce ciudad" id="location" value={ location } onChange={ updateLocation }/>
                                </div>
                            </div>
                            <div className="modal-user-form-split">
                                <div className="modal-user-form-splitted">
                                    <p>Translado</p>
                                    <form name="formulario">
                                        <select className="modal-select-user-form-splitted" id="mobility">
                                            <option defaultValue>No</option>
                                            <option>Sí</option>
                                        </select>
                                    </form>
                                </div>
                                <div className="modal-user-form-splitted">
                                    <p>Presencialidad</p>
                                    <form name="formulario">
                                        <select className="modal-select-user-form-splitted" id="remote">
                                            <option defaultValue>En remoto</option>
                                            <option>Presencial</option>
                                        </select>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="modal-files-outer">
                            <div className="modal-files-intra">
                                <p>Foto de perfil</p>
                                <div className="modal-button-upload-frame">
                                    <label className="modal-button-upload" style={{ display: picture ? "none" : "flex" }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" className="bi bi-cloud-arrow-up" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"/>
                                            <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
                                        </svg>
                                        Subir imagen
                                        <input type="file" id="file-selector" className="file-selector" accept="image/*" onChange={ () => changePicture() }/>
                                    </label>
                                    <label className="modal-button-delete" style={{ display: picture ? "flex" : "none" }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" className="bi bi-card-image" viewBox="0 0 16 16">
                                            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                                            <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z"/>
                                        </svg>
                                        { picture ? picture.name : null }
                                        <span>{ picture? picture.size/1000 : null } KB</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" onClick={ deletePictureStored } width="21" height="21" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                            </svg>  
                                    </label>
                                    <div className="model-upload-labels" style={{ display: picture ? "none" : "inline" }}>
                                        <label>Archivos soportados: <span>.png, .jpg, y .jpeg</span></label>
                                        <label>Tamaño de archivo máximo: <span>1 MB</span></label>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-files-intra">
                                <p>Documento CV</p>
                                <div className="modal-button-upload-frame">
                                    <label className="modal-button-upload" style={{ display: resume ? "none" : "flex" }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" className="bi bi-cloud-arrow-up" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"/>
                                            <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
                                        </svg>
                                        Subir documento PDF
                                        <input type="file" id="resume-selector" className="file-selector" accept=".pdf" onChange={ () => changeResume() }/>
                                    </label>
                                    <label className="modal-button-delete" style={{ display: resume ? "flex" : "none" }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" className="bi bi-file-earmark-pdf" viewBox="0 0 16 16">
                                            <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
                                            <path d="M4.603 14.087a.81.81 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.68 7.68 0 0 1 1.482-.645 19.697 19.697 0 0 0 1.062-2.227 7.269 7.269 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.188-.012.396-.047.614-.084.51-.27 1.134-.52 1.794a10.954 10.954 0 0 0 .98 1.686 5.753 5.753 0 0 1 1.334.05c.364.066.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.856.856 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.712 5.712 0 0 1-.911-.95 11.651 11.651 0 0 0-1.997.406 11.307 11.307 0 0 1-1.02 1.51c-.292.35-.609.656-.927.787a.793.793 0 0 1-.58.029zm1.379-1.901c-.166.076-.32.156-.459.238-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361.01.022.02.036.026.044a.266.266 0 0 0 .035-.012c.137-.056.355-.235.635-.572a8.18 8.18 0 0 0 .45-.606zm1.64-1.33a12.71 12.71 0 0 1 1.01-.193 11.744 11.744 0 0 1-.51-.858 20.801 20.801 0 0 1-.5 1.05zm2.446.45c.15.163.296.3.435.41.24.19.407.253.498.256a.107.107 0 0 0 .07-.015.307.307 0 0 0 .094-.125.436.436 0 0 0 .059-.2.095.095 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a3.876 3.876 0 0 0-.612-.053zM8.078 7.8a6.7 6.7 0 0 0 .2-.828c.031-.188.043-.343.038-.465a.613.613 0 0 0-.032-.198.517.517 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822.024.111.054.227.09.346z"/>
                                        </svg>
                                        { resume ? resume.name : null }
                                        <span>{ resume ? resume.size/1000 : null } KB</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" onClick={ deleteResumeStored } width="21" height="21" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                            </svg>  
                                    </label>
                                    <div className="model-upload-labels" style={{ display: resume ? "none" : "inline" }}>
                                        <label>Archivos soportados: <span>.pdf</span></label>
                                        <label>Tamaño de archivo máximo: <span>1 MB</span></label>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-files-intra-labels">
                                <p>Etiquetas</p>
                                <form name="formulario">
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
                            </div>
                        </div>
                    </div>
                </section>
                <footer className="modal-footer">
                    <button type="submit"
                    className={ name && email && phone && location
                    ? "modal-save-button-active"
                    : "modal-save-button"
                    }
                    {...(name && email && phone && location 
                    ? { onClick
                    : () => { createNewStudent() }} : {})
                    }
                    >Guardar</button>
                    <button type="button" className="modal-cancel-button" onClick={ deleteAll }>Cancelar</button>
                </footer>
            </div>
        </div>
    );
}

export default ModalDashboard;
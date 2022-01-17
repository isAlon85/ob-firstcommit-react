import React from 'react';
import '../styles/studentpage.scss';
import StudentHeader from '../components/pure/StudentHeader';
import { useLocation } from 'react-router-dom';

function StudentPage( props ) {

    const { state } = useLocation();

    function deleteTag(tag) {
        const myTag = document.getElementById(tag);
        const parent = myTag.parentNode;
        parent.removeChild(myTag);
    }

  return (
    <div>
      <StudentHeader></StudentHeader>
      <div className="student-body-outer">
        <div className="student-body-inner">
                <div className="student-form">
                    <div className="student-header">
                        <div className="picture-frame">
                            <div className="cover" style={{ backgroundImage: `url(${state.picture.url})`}}>
                            </div>
                        </div>
                        <div className="student-info-frame">
                            <p>{ state.name }</p>
                            <div className="student-info-text">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                                    <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
                                    <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                </svg>
                                <div className="student-info-text">
                                    { state.location }
                                </div>
                                <div className="student-info-text">
                                    |
                                </div>
                                <div className="student-info-text">
                                    { state.country }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="student-info-frame-inner">
                        <div className="user-form-big">
                            <p>Nombre y Apellidos</p>
                            <input type="text" placeholder={ state.name }/>
                        </div>
                        <div className="user-form-split">
                            <div className="user-form-splitted">
                                <p>Teléfono</p>
                                <input type="text" placeholder={ state.phone }/>
                            </div>
                            <div className="user-form-splitted">
                                <p>Email</p>
                                <input type="text" placeholder={ state.email }/>
                            </div>
                        </div>
                        <div className="user-form-split">
                            <div className="user-form-splitted">
                                <p>País</p>
                                <input type="text" placeholder={ state.country }/>
                            </div>
                            <div className="user-form-splitted">
                                <p>Ciudad</p>
                                <form name="formulario" method="post" action="">
                                <input type="text" placeholder={ state.location }/>
                                </form>
                            </div>
                        </div>
                        <div className="user-form-split">
                            <div className="user-form-splitted">
                                <p>Translado</p>
                                <form name="formulario" method="post" action="">
                                    <select className="select-user-form-splitted" name="combo">
                                        <option value="1"defaultValue>No</option>
                                        <option value="2">Sí</option>
                                    </select>
                                </form>
                            </div>
                            <div className="user-form-splitted">
                                <p>Presencialidad</p>
                                <form name="formulario" method="post" action="">
                                    <select className="select-user-form-splitted" name="combo">
                                        <option value="1"defaultValue>En remoto</option>
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
                                    <input type="file" id="file-selector" className="file-selector" accept=".pdf"/>
                                </label>
                                <button className="button_delete" type="button">
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
                                <span className="tagitem" id="1">HTML&CSS<svg onClick={() => deleteTag(1)} xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                  </svg>
                                </span>
                                <span className="tagitem" id="2">REACT<svg onClick={() => deleteTag(2)} xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                  </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            <div className="pdf-frame">
                <iframe title="Resume" id="pdf-viewer" className="pdf-viewer" src={ state.resume.url } type="application/pdf" width="100%" height="100%"/>
            </div>
        </div>
      </div>        
    </div>
  );
}

export default StudentPage;
import React from 'react';

function ModalDashboard() {

  const isVisible = "is-visible";

  function closeModal() {
    document.getElementById('modal').classList.remove(isVisible);
  }

  return (
    <div className="modal" id="modal">
          <div id="modal-dialog">
          <section className="modal-content">
            <div className="modal-header">
              <label>Nuevo Alumno</label>
              <button className="close-modal" onClick={closeModal}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>  
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-form-outer">
                <div className="modal-user-form-big">
                  <p>Nombre y Apellidos</p>
                  <input type="text" placeholder="Introduce nombre"/>
                </div>
                <div className="modal-user-form-split">
                  <div className="modal-user-form-splitted">
                    <p>Teléfono</p>
                    <input type="text" placeholder="Introduce número"/>
                  </div>
                  <div className="modal-user-form-splitted">
                    <p>Email</p>
                    <input type="text" placeholder="Introduce email"/>
                  </div>
                </div>
                <div className="modal-user-form-split">
                  <div className="modal-user-form-splitted">
                    <p>País</p>
                    <input type="text" placeholder="Introduce país"/>
                  </div>
                  <div className="modal-user-form-splitted">
                    <p>Ciudad</p>
                    <input type="text" placeholder="Introduce ciudad"/>
                  </div>
                </div>
                <div className="modal-user-form-split">
                    <div className="modal-user-form-splitted">
                      <p>Translado</p>
                      <form name="formulario" method="post" action="">
                          <select className="modal-select-user-form-splitted" name="combo">
                              <option defaultValue>No</option>
                              <option>Sí</option>
                          </select>
                      </form>
                    </div>
                    <div className="modal-user-form-splitted">
                      <p>Presencialidad</p>
                      <form name="formulario" method="post" action="">
                          <select className="modal-select-user-form-splitted" name="combo">
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
                    <label className="modal-button-upload">
                      <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" className="bi bi-cloud-arrow-up" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"/>
                          <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
                      </svg>
                      Subir imagen
                      <input type="file" id="file-selector" className="file-selector" accept="image/*"/>
                    </label>
                    <div className="model-upload-labels">
                      <label>Archivos soportados: <span>.png, .jpg, y .jpeg</span></label>
                      <label>Tamaño de archivo máximo: <span>2 MB</span></label>
                    </div>
                  </div>
                </div>
                <div className="modal-files-intra">
                  <p>Documento CV</p>
                  <div className="modal-button-upload-frame">
                    <label className="modal-button-upload">
                      <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" className="bi bi-cloud-arrow-up" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"/>
                          <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
                      </svg>
                      Subir documento PDF
                      <input type="file" id="file-selector" className="file-selector" accept=".pdf"/>
                    </label>
                    <div className="model-upload-labels">
                      <label>Archivos soportados: <span>.pdf</span></label>
                      <label>Tamaño de archivo máximo: <span>20 MB</span></label>
                    </div>
                  </div>
                </div>
                <div className="modal-files-intra-labels">
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
                </div>
              </div>
            </div>
          </section>
          <footer className="modal-footer">
            <button type="submit" className="modal-save-button">Guardar</button>
            <button type="button" className="modal-cancel-button">Cancelar</button>
          </footer>
          </div>
        </div>
  );
}

export default ModalDashboard;
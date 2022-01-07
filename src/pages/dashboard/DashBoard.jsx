import React from 'react';
import '../../styles/dashboard.scss';
import TableHeader from '../../components/pure/TableHeader';
import { useNavigate } from 'react-router-dom';

function DashBoard() {

  const history = useNavigate();

  const student = (e) => {
      e.preventDefault();
      history('/student');
  }

  function doSearch() {
    var tableReg = document.getElementById('myTable');
    var searchText = document.getElementById('searchTerm').value.toLowerCase();
    for (var i = 1; i < tableReg.rows.length; i++) {
        var cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
        var found = false;
        for (var j = 0; j < cellsOfRow.length && !found; j++) {
            var compareWith = cellsOfRow[j].innerHTML.toLowerCase();
            if (searchText.length == 0 || (compareWith.indexOf(searchText) > -1)) {
                found = true;
            }
        }
        if (found) {
            tableReg.rows[i].style.display = '';
        } else {
            tableReg.rows[i].style.display = 'none';
        }
    }
  }

  function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("myTable");
    switching = true;
    //Set the sorting direction to ascending:
    dir = "asc"; 
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
      //start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /*Loop through all table rows (except the
      first, which contains table headers):*/
      for (i = 1; i < (rows.length - 1); i++) {
        //start by saying there should be no switching:
        shouldSwitch = false;
        /*Get the two elements you want to compare,
        one from current row and one from the next:*/
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /*check if the two rows should switch place,
        based on the direction, asc or desc:*/
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            //if so, mark as a switch and break the loop:
            shouldSwitch= true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /*If a switch has been marked, make the switch
        and mark that a switch has been done:*/
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        //Each time a switch is done, increase this count by 1:
        switchcount ++;      
      } else {
        /*If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again.*/
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }

  
  const isVisible = "is-visible";

  function openModal() {
    document.getElementById('modal').classList.add(isVisible);
  }

  function closeModal() {
    document.getElementById('modal').classList.remove(isVisible);
  }

  document.addEventListener("click", e => {
    if (e.target == document.querySelector(".modal.is-visible")) {
      document.querySelector(".modal.is-visible").classList.remove(isVisible);
    }
  });

  document.addEventListener("keyup", e => {
    // if we press the ESC
    if (e.key == "Escape" && document.querySelector(".modal.is-visible")) {
      document.querySelector(".modal.is-visible").classList.remove(isVisible);
    }
  });

  return (
    <div>
      <div className="modal" id="modal">
        <div id="modal-dialog">
          <section className="modal-content">
          <button className="close-modal" onClick={closeModal}>
            ✕  
          </button>
          <p><strong>Press ✕, ESC, or click outside of the modal to close it</strong></p>
          <p>Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure</p>
          </section>
          <footer className="modal-footer">
            The footer of the first modal
          </footer>
        </div>
      </div>
      <TableHeader></TableHeader>
      <div className="table-body-outer">
          <div className="table-body-inner">
              <div className="table-outer">
                  <div className="table-header">
                      <div className="table-search">
                          <p>Alumnos</p>
                          <div className="search-bar">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
                              </svg>
                              <input type="text" id="searchTerm" onKeyUp={doSearch} className="form-control" placeholder="Buscar por Nombre, Email o Palabra clave..." aria-label="Buscar por Nombre, Email o Palabra clave..." aria-describedby="basic-addon1"/>
                          </div>
                      </div>
                      <input type="button" value="+ Añadir Alumnos" onClick={openModal}/>
                  </div>
                  <div className="table-outer-2">
                      <div className="table-inner">
                          <table id="myTable" className="table">
                              <thead>
                                <tr>
                                  <th scope="col" className="table-th" style={{width: '20%'}}>NOMBRE<svg onClick={() => sortTable(0)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-up" viewBox="0 0 16 16">
                                      <path fillRule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"/>
                                    </svg></th>
                                  <th scope="col" className="table-th" style={{width: '14%'}}>CIUDAD<svg onClick={() => sortTable(1)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-up" viewBox="0 0 16 16">
                                      <path fillRule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"/>
                                    </svg></th>
                                  <th scope="col" className="table-th" style={{width: '14%'}}>PAÍS<svg onClick={() => sortTable(2)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-up" viewBox="0 0 16 16">
                                      <path fillRule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"/>
                                    </svg></th>
                                  <th scope="col" className="table-th" style={{width: '14%'}}>TELÉFONO</th>
                                  <th scope="col" className="table-th" style={{width: '14%'}}>CORREO ELECTRÓNICO<svg onClick={() => sortTable(4)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-up" viewBox="0 0 16 16">
                                      <path fillRule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"/>
                                    </svg></th>
                                  <th scope="col" className="table-th" style={{width: '24%'}}>ETIQUETAS<svg onClick={() => sortTable(5)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-up" viewBox="0 0 16 16">
                                      <path fillRule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"/>
                                    </svg></th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="tabla1" onClick={student}>Miguel Indurain</td>
                                  <td className="tabla2">Pamplona</td>
                                  <td className="tabla2">España</td>
                                  <td className="tabla2">666777888</td>
                                  <td className="tabla2">mindurain@ob.com</td>
                                  <td className="tabla2"><span className="tagitem2">HTML&CSS</span></td>
                                </tr>
                                <tr>
                                  <td className="tabla1" onClick={student}>Perico Delgado</td>
                                  <td className="tabla2">Segovia</td>
                                  <td className="tabla2">España</td>
                                  <td className="tabla2">666777889</td>
                                  <td className="tabla2">pdelgado@ob.com</td>
                                  <td className="tabla2"><span className="tagitem2">Angular</span></td>
                                </tr>
                                <tr>
                                  <td className="tabla1" onClick={student}>Carlos Sastre</td>
                                  <td className="tabla2">Ávila</td>
                                  <td className="tabla2">España</td>
                                  <td className="tabla2">666777887</td>
                                  <td className="tabla2">csastre@ob.com</td>
                                  <td className="tabla2"><span className="tagitem2">React</span></td>
                                </tr>
                                <tr>
                                  <td className="tabla1" onClick={student}>Alberto Contador</td>
                                  <td className="tabla2">Madrid</td>
                                  <td className="tabla2">España</td>
                                  <td className="tabla2">666777886</td>
                                  <td className="tabla2">acontador@ob.com</td>
                                  <td className="tabla2"><span className="tagitem2">HTML&CSS</span></td>
                                </tr>
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>
              <div className="filter-outer">
                  <div className="filter-header">
                      Filtros de búsqueda
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi-trash trash-dashboard" viewBox="0 0 16 16">
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                          <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                  </div>
                  <div className="filter-body">
                      <div className="labels-outer">
                          <div className="labels-inner">
                              <p className="label-bold">Etiquetas</p>
                              <form name="formulario" method="post" action="">
                                  <input type="text" placeholder="Escribe para buscar...." list="items" />
                                  <datalist id="items">
                                    <option>HTML&CSS</option>
                                    <option>React</option>
                                    <option>Angular</option>
                                  </datalist>
                                </form>
                          </div>
                          <div className="label-icons-frame">
                              <div className="label-icons-frame-first">
                                  <span className="tagitem">HTML&CSS<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                  </span>
                                  <span className="tagitem">REACT<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                  </span>
                              </div>                        
                              <div className="label-icons-frame-second">
                                  <span className="tagitem">ANGULAR<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                  </span>
                              </div>
                          </div>
                      </div>
                      <div className="country-outer">
                          <div className="labels-inner">
                              <p className="label-bold">País</p>
                              <form name="formulario" method="post" action="">
                                  <select className="select-frame" name="combo">
                                      <option defaultValue>España</option>
                                      <option>Estados Unidos</option>
                                      <option>Francia</option>
                                    </select>
                                </form>
                          </div>
                      </div>
                      <div className="location-outer">
                          <div className="labels-inner">
                              <p className="label-bold">Ciudad</p>
                              <form name="formulario" method="post" action="">
                                  <select className="select-frame" name="combo">
                                      <option defaultValue>Valencia</option>
                                      <option>Madrid</option>
                                      <option>Barcelona</option>
                                    </select>
                                </form>
                          </div>            
                      </div>
                      <div className="remote-outer">
                          <p className="label-bold">Presencial / a distancia</p>
                          <div className="checkbox-option">
                              <input type="checkbox" id="checkboxid" className="checkbox"/>
                              <span id="remember">Presencial</span>
                          </div>
                          <div className="checkbox-option">
                              <input type="checkbox" id="checkboxid" className="checkbox"/>
                              <span id="remember">En remoto</span>
                          </div>           
                      </div>
                      <div className="transfer-outer">
                          <p className="label-bold">Posibilidad de translado</p>
                          <div className="checkbox-option">
                              <input type="checkbox" id="checkboxid" className="checkbox"/>
                              <span id="remember">Sí</span>
                          </div>
                          <div className="checkbox-option">
                              <input type="checkbox" id="checkboxid" className="checkbox"/>
                              <span id="remember">No</span>
                          </div>  
                      </div>
                  </div>
              </div>
          </div>
      </div>       
    </div>
  );
}

export default DashBoard;
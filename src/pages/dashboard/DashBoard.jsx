import React, { useState, useEffect, useCallback }  from 'react';
import '../../styles/dashboard.scss';
import TableHeader from '../../components/pure/TableHeader';
import ModalDashboard from '../../components/pure/ModalDashboard';
import StudentListComponent from '../../components/StudentsList';
import { Student } from '../../models/student.class';
import { AuthContext } from "../../App.js";
import { getStudents } from '../../services/axiosService'

function DashBoard() {

    const { state: authState } = React.useContext(AuthContext);

    const [students, setStudents] = useState([]);

    const getStudentsFunc = useCallback(() =>{
        getStudents(authState.token)
            .then((response) => {
                const studentsFetched = [];
                for(let i = 0; i < response.data.length; i++){
                    const tagsFetched = [];
                    if(response.data[i].tags) {
                        for(let j = 0; j < response.data[i].tags.length; j++) {
                            tagsFetched.push(response.data[i].tags[j]);
                        }
                    }
                    const fetchedStudent = new Student(
                        response.data[i].id, 
                        response.data[i].name, 
                        response.data[i].email, 
                        response.data[i].phone, 
                        response.data[i].country, 
                        response.data[i].location, 
                        response.data[i].mobility, 
                        response.data[i].remote, 
                        1, 
                        response.data[i].picture ? response.data[i].picture : null, 
                        response.data[i].resume ? response.data[i].resume : null, 
                        tagsFetched
                    );
                    studentsFetched.push(fetchedStudent);
                }
                setStudents(studentsFetched);
                console.log(studentsFetched);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => console.log('Students retrieved'))
    },[authState.token])

    //lifeCycle control
    useEffect(() => {
        document.title = "OB Alumnos Dashboard";
        console.log('Student list has been modified');
        getStudentsFunc();
        return () => {
            console.log('Student list component is going to unmount');
        }
    }, [getStudentsFunc])

    function doSearch() {
        var tableReg = document.getElementById('myTable');
        var searchText = document.getElementById('searchTerm').value.toLowerCase();
        for (let i = 1; i < tableReg.rows.length; i++) {
            var cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
            var found = false;
            for (let j = 0; j < cellsOfRow.length && !found; j++) {
                var compareWith = cellsOfRow[j].innerHTML.toLowerCase();
                if (searchText.length === 0 || (compareWith.indexOf(searchText) > -1)) {
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

    function doSearchLocation() {
        var tableReg = document.getElementById('myTable');
        var searchText = document.getElementById('select-location').value.toLowerCase();
        for (let i = 1; i < tableReg.rows.length; i++) {
            var cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
            var found = false;
            var compareWith = cellsOfRow[1].innerHTML.toLowerCase();
            if (searchText.length === 0 || (compareWith.indexOf(searchText) > -1)) {
                found = true;
            }
            if (found) {
                tableReg.rows[i].style.display = '';
            } else {
                tableReg.rows[i].style.display = 'none';
            }
        }
    }

    function doSearchCountry() {
        var tableReg = document.getElementById('myTable');
        var searchText = document.getElementById('select-country').value.toLowerCase();
        for (let i = 1; i < tableReg.rows.length; i++) {
            var cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
            var found = false;
            var compareWith = cellsOfRow[2].innerHTML.toLowerCase();
            if (searchText.length === 0 || (compareWith.indexOf(searchText) > -1)) {
                found = true;
            }
            if (found) {
                tableReg.rows[i].style.display = '';
            } else {
                tableReg.rows[i].style.display = 'none';
            }
        }
    }

    function filterRemote() {
        var tableReg = document.getElementById('myTable');
        var checkBoxY = document.getElementById("remote-checkboxid");
        var checkBoxN = document.getElementById("nonremote-checkboxid");
        if (checkBoxY.checked === true && checkBoxN.checked === false){
            for (let i = 0; i < students.length; i++) {
                let remote = false;
                if (students[i].remote === 1) remote = true;
                if (remote) {
                    tableReg.rows[i+1].style.display = '';
                } else {
                    tableReg.rows[i+1].style.display = 'none';
                }
            }
        } else if (checkBoxN.checked === true && checkBoxY.checked === false){
            for (let i = 0; i < students.length; i++) {
                let remote = false;
                if (students[i].remote === 0) remote = true;
                if (remote) {
                    tableReg.rows[i+1].style.display = '';
                } else {
                    tableReg.rows[i+1].style.display = 'none';
                }
            }
        } else if (checkBoxN.checked === true && checkBoxY.checked === true){
            for (let i = 0; i < students.length; i++) {
                tableReg.rows[i+1].style.display = '';
            }
        } else {
            for (let i = 0; i < students.length; i++) {
                tableReg.rows[i+1].style.display = '';
            }
        }      
    }

    function filterMobility() {
        var tableReg = document.getElementById('myTable');
        var checkBoxY = document.getElementById("mobility-checkboxid");
        var checkBoxN = document.getElementById("nonmobility-checkboxid");
        if (checkBoxY.checked === true && checkBoxN.checked === false){
            for (let i = 0; i < students.length; i++) {
                let mobility = false;
                if (students[i].mobility === true) mobility = true;
                if (mobility) {
                    tableReg.rows[i+1].style.display = '';
                } else {
                    tableReg.rows[i+1].style.display = 'none';
                }
            }
        } else if (checkBoxN.checked === true && checkBoxY.checked === false){
            for (let i = 0; i < students.length; i++) {
                let mobility = false;
                if (students[i].mobility === false) mobility = true;
                if (mobility) {
                    tableReg.rows[i+1].style.display = '';
                } else {
                    tableReg.rows[i+1].style.display = 'none';
                }
            }
        } else if (checkBoxN.checked === true && checkBoxY.checked === true){
            for (let i = 0; i < students.length; i++) {
                tableReg.rows[i+1].style.display = '';
            }
        } else {
            for (let i = 0; i < students.length; i++) {
                tableReg.rows[i+1].style.display = '';
            }
        }      
    }

    const countries = [''];
    for (let i = 0; i < students.length; i++) {
        countries.push(students[i].country);
    }
    const countriesFiltered = countries.filter((valor, index) => {
        return countries.indexOf(valor) === index;
      }
    );

    const locations = [''];
    for (let i = 0; i < students.length; i++) {
        locations.push(students[i].location);
    }
    const locationsFiltered = locations.filter((valor, index) => {
        return locations.indexOf(valor) === index;
      }
    );

    const isVisible = "is-visible";

    function openModal() {
        document.getElementById('modal').classList.add(isVisible);
    }

    document.addEventListener("click", e => {
        if (e.target === document.querySelector(".modal.is-visible")) {
        document.querySelector(".modal.is-visible").classList.remove(isVisible);
        }
    });

    document.addEventListener("keyup", e => {
        // if we press the ESC
        if (e.key === "Escape" && document.querySelector(".modal.is-visible")) {
        document.querySelector(".modal.is-visible").classList.remove(isVisible);
        }
    });

    return (
        <div>
            <ModalDashboard getStudentsFunc={ () => getStudentsFunc }></ModalDashboard>
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
                                <StudentListComponent students={students}></StudentListComponent>
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
                                        <select id="select-country" className="select-frame" name="combo" onChange={doSearchCountry}>
                                            { countriesFiltered.map((country, index) => {
                                                return (
                                                    <option 
                                                        key={index}
                                                    >{country}
                                                    </option>
                                                )
                                            })}
                                        </select>
                                    </form>
                                </div>
                            </div>
                            <div className="location-outer">
                                <div className="labels-inner">
                                    <p className="label-bold">Ciudad</p>
                                    <form name="formulario" method="post" action="">
                                        <select id="select-location" className="select-frame" name="combo" onChange={doSearchLocation}>
                                        { locationsFiltered.map((location, index) => {
                                                return (
                                                    <option 
                                                        key={index}
                                                    >{location}
                                                    </option>
                                                )
                                            })}
                                        </select>
                                    </form>
                                </div>            
                            </div>
                            <div className="remote-outer">
                                <p className="label-bold">Presencial / a distancia</p>
                                <div className="checkbox-option">
                                    <input type="checkbox" id="nonremote-checkboxid" className="checkbox" onClick={filterRemote}/>
                                    <span id="remember">Presencial</span>
                                </div>
                                <div className="checkbox-option">
                                    <input type="checkbox" id="remote-checkboxid" className="checkbox" onClick={filterRemote}/>
                                    <span id="remember">En remoto</span>
                                </div>           
                            </div>
                            <div className="transfer-outer">
                                <p className="label-bold">Posibilidad de translado</p>
                                <div className="checkbox-option">
                                    <input type="checkbox" id="mobility-checkboxid" className="checkbox" onClick={filterMobility}/>
                                    <span id="remember">Sí</span>
                                </div>
                                <div className="checkbox-option">
                                    <input type="checkbox" id="nonmobility-checkboxid" className="checkbox" onClick={filterMobility}/>
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

export default DashBoard
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
    const [hiddenStudents, setHiddenStudents] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [country, setCountry] = useState(null);
    const [location, setLocation] = useState(null);
    const [remoteCheck, setRemoteCheck] = useState(false);
    const [noRemoteCheck, setNoRemoteCheck] = useState(false);    
    const [mobilityCheck, setMobilityCheck] = useState(false);
    const [noMobilityCheck, setNoMobilityCheck] = useState(false);
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');

    const getStudentsFunc = useCallback(() =>{
        getStudents(null, null, null, null, authState.token)
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
                        response.data[i].user.id, 
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
            .finally(() => {
                console.log('Students retrieved');
                setLoading(false);
            })
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
    function filterStudents(event) {
        event.preventDefault()
        setLoading(true);
        const id = event.target.id;
        var countryFilter = country;
        var locationFilter = location;
        var remoteFilter = null;
        var mobilityFilter = null;
        id === 'select-country' ? countryFilter = event.target.value : countryFilter = countryFilter;
        if(countryFilter === '') {countryFilter = null;}
        setCountry(countryFilter);
        id === 'select-location' ? locationFilter = event.target.value : locationFilter = locationFilter;
        if(locationFilter === '') {locationFilter = null;}
        setLocation(locationFilter);
        var remoteBoxY = document.getElementById("remote-checkboxid");
        var remoteBoxN = document.getElementById("nonremote-checkboxid");
        var mobilityBoxY = document.getElementById("mobility-checkboxid");
        var mobilityBoxN = document.getElementById("nonmobility-checkboxid");
        if(remoteBoxY.checked === true && remoteBoxN.checked === false){
            remoteFilter = 1;
        }
        if(remoteBoxN.checked === true && remoteBoxY.checked === false){
            remoteFilter = 0;
        }
        if(mobilityBoxY.checked === true && mobilityBoxN.checked === false){
            mobilityFilter = true;
        }
        if(mobilityBoxN.checked === true && mobilityBoxY.checked === false){
            mobilityFilter = false;
        }
        getStudents(countryFilter, locationFilter, remoteFilter, mobilityFilter, authState.token)
        .then((response) => {
            console.log(response)
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
                response.data[i].user.id, 
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
            setStudents([]);
        })
        .finally(() => {
            setLoading(false);
        })
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

    const removeTags = indexToRemove => {
		setTags([...tags.filter((_, index) => index !== indexToRemove)]);
        filterTags(null, indexToRemove);
	};

    const addTag = (event) => {
        event.preventDefault()
        if(tags.length < 5) {
            var newElement = null;
            var checkDuplicated;
            var tagNames =[];
            for (let i = 0; i < tags.length; i++) {
                tagNames[i] = tags[i].name;
            }
            var compare = event.target.value.toUpperCase();
            switch(compare) {
                case "HTML&CSS":
                    tagNames.includes( "HTML&CSS" ) ? checkDuplicated = true : checkDuplicated = false;
                    newElement = {id: 1, name: 'HTML&CSS', description: 'HTML & CSS'};
                    checkDuplicated ? null : setTags([...tags, newElement]);
                    filterTags(newElement, null);
                    event.target.value = '';
                break;
                case "REACT":
                    tagNames.includes( "REACT" ) ? checkDuplicated = true : checkDuplicated = false;
                    newElement = {id: 2, name: 'REACT', description: 'React'};
                    checkDuplicated ? null : setTags([...tags, newElement]);
                    filterTags(newElement, null);
                    event.target.value = '';
                break;
                case "ANGULAR":
                    tagNames.includes( "ANGULAR" ) ? checkDuplicated = true : checkDuplicated = false;
                    newElement = {id: 3, name: 'ANGULAR', description: 'Angular'};
                    checkDuplicated ? null : setTags([...tags, newElement]);
                    filterTags(newElement, null);
                    event.target.value = '';
                break;
                case "VUE":
                    tagNames.includes( "VUE" ) ? checkDuplicated = true : checkDuplicated = false;
                    newElement = {id: 4, name: 'VUE', description: 'Vue'};
                    checkDuplicated ? null : setTags([...tags, newElement]);
                    filterTags(newElement, null);
                    event.target.value = '';
                break;
                case "SPRING":
                    tagNames.includes( "SPRING" ) ? checkDuplicated = true : checkDuplicated = false;
                    newElement = {id: 5, name: 'SPRING', description: 'Spring'};
                    checkDuplicated ? null : setTags([...tags, newElement]);
                    filterTags(newElement, null);
                    event.target.value = '';
                break;
                case "JAVA":
                    tagNames.includes( "JAVA" ) ? checkDuplicated = true : checkDuplicated = false;
                    newElement = {id: 6, name: 'Java', description: 'JAVA'};
                    checkDuplicated ? null : setTags([...tags, newElement]);
                    filterTags(newElement, null);
                    event.target.value = '';
                break;
                case "JAVASCRIPT":
                    tagNames.includes( "JAVASCRIPT" ) ? checkDuplicated = true : checkDuplicated = false;
                    newElement = {id: 7, name: 'JAVASCRIPT', description: 'JavaScript'};
                    checkDuplicated ? null : setTags([...tags, newElement]);
                    filterTags(newElement, null);
                    event.target.value = '';
                break;
                case "HIBERNATE":
                    tagNames.includes( "HIBERNATE" ) ? checkDuplicated = true : checkDuplicated = false;
                    newElement = {id: 8, name: 'HIBERNATE', description: 'Hibernate'};
                    checkDuplicated ? null : setTags([...tags, newElement]);
                    filterTags(newElement, null);
                    event.target.value = '';
                break;
                default:
            }
        }
    }

    const filterTags = (newElement, indexToRemove) => {
        var studentsArray = students;
        var tagsToFilter = tags;
        tagsToFilter.push(newElement);
        tagsToFilter = [...tagsToFilter.filter((_, index) => index !== indexToRemove)]
        tagsToFilter = tagsToFilter.filter(Boolean);
        if(tagsToFilter.length === 0) {
            studentsArray = [];
        } else {
            for(let i = students.length - 1; i >= 0; i--){
                var counter = 0;
                for(let j = 0; j < students[i].tags.length; j++){
                    for(let k = 0; k < tagsToFilter.length; k++)
                    if(students[i].tags[j].id === tagsToFilter[k].id){
                        counter++;
                        if(counter === tagsToFilter.length) {
                            studentsArray = [...studentsArray.filter((_, index) => index !== i)];
                        }
                    }
                }
            }
        }
        const studentsFiltered = studentsArray.filter((valor, index) => {
            return studentsArray.indexOf(valor) === index;
        });
        setHiddenStudents(studentsFiltered);
	};

    const deleteAll = () => {
		setTags([]);
        setCountry('');
        setLocation('');
        getStudentsFunc();
        setRemoteCheck(false);
        setNoRemoteCheck(false);
        setMobilityCheck(false);
        setNoMobilityCheck(false);
	};

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
                                    <input type="text" id="searchTerm" onKeyUp={ doSearch } className="form-control" placeholder="Buscar por Nombre, Email o Palabra clave..." aria-label="Buscar por Nombre, Email o Palabra clave..." aria-describedby="basic-addon1"/>
                                </div>
                            </div>
                            <input type="button" value="+ Añadir Alumnos" onClick={ openModal }/>
                        </div>
                        <div className="table-outer-2">
                            <div className="table-inner">
                                <div className="loading-students" style={{ display: isLoading ? "flex" : "none" }}>Cargando Alumnos</div>
                                {isLoading ? null : <StudentListComponent students={ students } hiddenStudents= { hiddenStudents }></StudentListComponent>}
                            </div>
                        </div>
                    </div>
                    <div className="filter-outer">
                        <div className="filter-header">
                            Filtros de búsqueda
                            <svg xmlns="http://www.w3.org/2000/svg" onClick={ deleteAll } width="20" height="20" fill="currentColor" className="bi-trash trash-dashboard" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                </svg>
                        </div>
                        <div className="filter-body">
                            <div className="labels-outer">
                                <div className="labels-inner">
                                    <p className="label-bold">Etiquetas</p>
                                    <form name="formulario" method="post" action="">
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
                                    </form>
                                </div>
                                <div className="label-icons-frame" id="list">
                                    { tags ? tags.map((tag, index) => {
                                        return (
                                            <span className="tagitem" key={ index } id={ index }>{ tag.name }<svg onClick={ () => removeTags(index) } xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                            </svg>
                                            </span>
                                        )
                                    }) : null}
                                </div>
                            </div>
                            <div className="country-outer">
                                <div className="labels-inner">
                                    <p className="label-bold">País</p>
                                    <form name="formulario" method="post" action="">
                                        <select id="select-country" className="select-frame" value={ country ? country : '' } onChange={ filterStudents }>
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
                                        <select id="select-location" className="select-frame" value={ location ? location : '' } onChange={ filterStudents }>
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
                                    <input type="checkbox" id="nonremote-checkboxid" className="checkbox" onClick={ filterStudents } checked={ noRemoteCheck } onChange={ () => setNoRemoteCheck(!noRemoteCheck) }/>
                                    <span id="remember">Presencial</span>
                                </div>
                                <div className="checkbox-option">
                                    <input type="checkbox" id="remote-checkboxid" className="checkbox" onClick={ filterStudents } checked={ remoteCheck } onChange={ () => setRemoteCheck(!remoteCheck) }/>
                                    <span id="remember">En remoto</span>
                                </div>           
                            </div>
                            <div className="transfer-outer">
                                <p className="label-bold">Posibilidad de translado</p>
                                <div className="checkbox-option">
                                    <input type="checkbox" id="mobility-checkboxid" className="checkbox" onClick={ filterStudents } checked={ noMobilityCheck } onChange={ () => setNoMobilityCheck(!noMobilityCheck) }/>
                                    <span id="remember">Sí</span>
                                </div>
                                <div className="checkbox-option">
                                    <input type="checkbox" id="nonmobility-checkboxid" className="checkbox" onClick={ filterStudents } checked={ mobilityCheck } onChange={ () => setMobilityCheck(!mobilityCheck) }/>
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
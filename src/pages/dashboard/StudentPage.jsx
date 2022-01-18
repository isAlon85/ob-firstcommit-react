import React, { useState, useEffect, useCallback } from 'react';
import '../../styles/studentpage.scss';
import StudentHeader from '../../components/pure/StudentHeader';
import { useLocation } from 'react-router-dom';
import { AuthContext } from "../../App.js";
import StudentComponent from '../../components/pure/StudentComponent';

function StudentPage({ props }) {

    const { state: authState } = React.useContext(AuthContext);

    const { state } = useLocation();
    
    //lifeCycle control
    useEffect(() => {
        document.title = "OB Alumnos Student";
        console.log('Student has been modified');
        /*if(localStorage.getItem('student')) {
            setStudent(JSON.parse(localStorage.getItem('student')));
            window.localStorage.removeItem('student');
        } */
        return () => {
            console.log('Student component is going to unmount');
        }
    }, [])

    /*function deleteTag(tag) {
        const myTag = document.getElementById(tag);
        const parent = myTag.parentNode;
        parent.removeChild(myTag);
    }*/

    return (
        <div>
            <StudentHeader></StudentHeader>
            <StudentComponent state={state.id} token={authState.token}></StudentComponent>
        </div>
    );
}

export default StudentPage;
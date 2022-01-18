import React, { useEffect} from 'react'
import PropTypes from 'prop-types'
import { Student } from '../../models/student.class'
import { useNavigate } from 'react-router-dom';

function StudentLine({ student }) {

    const history = useNavigate();

    const studentRoute = (e) => {
        e.preventDefault();
        history('/student', { state: student });
    }

    useEffect(() => {
        console.log('Student Created');
        return () => {
            console.log(`Student ${ student.name } is going to unmount`);
        }
    }, [student])

    return (
        <tr className="student-table-row" onClick={ studentRoute }>
            <td className="tabla1">{ student.name }</td>
            <td className="tabla2">{ student.location }</td>
            <td className="tabla2">{ student.country }</td>
            <td className="tabla2">{ student.phone }</td>
            <td className="tabla2">{ student.email }</td>
            <td className="tabla2">
                {(student.tags[0]!==undefined) ?  
                    (<span key={0} className='tagitem2'>{ student.tags[0].name }</span>) 
                    : 
                    null 
                }
                {(student.tags[1]!==undefined) ?  
                    (<span key={1} className='tagitem2'>{ student.tags[1].name }</span>) 
                    : 
                    null 
                }
                {(student.tags.length > 2) ?  
                    (<span key={2} className='tagitem2'>+{ student.tags.length - 2 }</span>) 
                    : 
                    null 
                }
            </td>
        </tr>
    )
}

StudentLine.propTypes = {
    student: PropTypes.instanceOf(Student).isRequired,
};

export default StudentLine
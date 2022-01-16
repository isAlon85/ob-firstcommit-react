import React, { useEffect, useState } from 'react';
import { recover } from '../../services/axiosService'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom';

const Reset = (props) => {

    let params = useParams();
    console.log(params)

    useEffect(() => {
        document.title = "OB Alumnos Reset";
        return () => {
            
        }
    },[])

    const history = useNavigate();

    const redirectLogin = () => {
        history('/login');
    }
    
    const [matched, setMatched] = useState(true)

    var initialCredentials = {
        password: '',
        confPassword: ''
    }

    const loginSchema = Yup.object().shape(
        {
            password: Yup.string()
                    .required('Password is required'),
            confPassword: Yup.string()
                    .required('Password is required')
        }
    );

    const recoverPwd = (values) => {
        if (values.password === values.confPassword) {
            recover(values.password, params.id)
            .then((response) => {
                console.log(response);
                alert('Contraseña actualizada correctamente');
                setTimeout(redirectLogin(),5000);
            })
            .catch((error) => {
                alert(`Something went wrong: ${error}`);
            })
            .finally(() => console.log('Recover sent'));
        } else {
            setMatched(false);
        }
    }

    return (
        <div>
            <Formik
                // *** Initial values that the form will take
                enableReinitialize = {true}
                initialValues = { initialCredentials } 
                // *** Yup Validation Schema ***
                validationSchema = {loginSchema}
                // ** onSubmit Event
                onSubmit={async (values) => {
                    recoverPwd(values)
                }}
            >
                {/* We obtain props from Formik */}
                
                {({ values,
                    touched,
                    errors,
                    isSubmitting,
                    handleChange,
                    handleBlur }) => (
                        <Form>
                            <div className="form-frame">
                                <div className="allfields-frame">
                                    <div className="field-frame">
                                        <label htmlFor="email">Nueva Contraseña</label>
                                        <Field id="password" name="password" type='password' placeholder="Introduce la nueva contraseña"/>
                                        {/* Password Errors */}
                                        {errors.password && touched.password && 
                                            (
                                                <ErrorMessage name="password" component='div'></ErrorMessage>
                                            )
                                        }
                                    </div>
                                    <div className="field-frame">
                                        <label htmlFor="password">Confirma Nueva Contraseña</label>
                                        <Field id="confPassword" name="confPassword" placeholder="Confirma la nueva contraseña" type='password'/>
                                        {/* Password Errors */}
                                        {errors.password && touched.password && 
                                            (
                                                <ErrorMessage name="password" component='div'></ErrorMessage>
                                            )
                                        }
                                        { matched ? null : <div>Las contraseñas no coindicen</div> }
                                    </div>
                                </div>
                                <input type="submit" value="Confirmar" style={{marginTop: 30}}></input>
                                {isSubmitting ? (<p>Enviando</p>): null}
                            </div>
                        </Form>
                )}
            </Formik>
        </div>
    );
}

export default Reset;

import React, { useEffect, useState } from 'react';
import { forgot } from '../../services/axiosService'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';


const Forgot = () => {

    useEffect(() => {
        document.title = "OB Alumnos Forgot";
        return () => {
            
        }
    },[])

    const history = useNavigate();

    const redirectLogin = () => {
        history('/login');
    }

    var initialCredentials = {
        email: '',
    }

    const loginSchema = Yup.object().shape(
        {
            email: Yup.string()
                    .email('Invalid email format')
                    .required('Email is required'),
        }
    );

    const forgotPwd = (values) => {
        forgot(values.email)
            .then((response) => {
                console.log(response)
                alert('Email enviado, revise su correo');
                setTimeout(redirectLogin(),5000);
            })
            .catch((error) => {
                alert(`Something went wrong: ${error}`);
            })
            .finally(() => console.log('Login done'))
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
                    forgotPwd(values)
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
                                <div className="field-frame">
                                    <label htmlFor="email">Email</label>
                                    <Field id="email" type="email" name="email" placeholder="Introduce tu email"/>
                                    {/* Email Errors */}
                                    {errors.email && touched.email && 
                                        (
                                            <ErrorMessage name="email" component='div'></ErrorMessage>
                                        )
                                    }
                                </div>
                                <input type="submit" value="Recuperar contraseña"></input>
                                {isSubmitting ? (<p>Enviando</p>): null}
                            </div>
                        </Form>
                )}
            </Formik>
        </div>
    );
}

export default Forgot;

import React, { useEffect, useState } from 'react';
import { login } from '../../services/axiosService'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const Axios = () => {

    useEffect(() => {
        document.title = "OB Alumnos Login";
        getCookieData();
        document.getElementById('email').value = initialMail;
        document.getElementById('password').value = initialPassword;
        if (initialMail !== '' && initialPassword !== '') setCheckboxCheked(true);
        return () => {
            
        }
    },[])

    const [initialMail, setInitialMail] = useState('');
    const [initialPassword, setInitialPassword] = useState('');
    const [checkboxChecked, setCheckboxCheked] = useState(false);

    var initialCredentials = {
        email: initialMail,
        password: initialPassword
    }

    const loginSchema = Yup.object().shape(
        {
            email: Yup.string()
                    .email('Invalid email format')
                    .required('Email is required'),
            password: Yup.string()
                    .required('Password is required')
        }
    );

    const authUser = (values) => {
        login(values.email, values.password)
            .then((response) => {
                if(response.data.token){
                    alert(JSON.stringify(response.data.token));
                    sessionStorage.setItem('token', response.data.token)
                }else{
                    sessionStorage.removeItem('token');
                    throw new Error('Login failure');
                }
            })
            .catch((error) => {
                alert(`Something went wrong: ${error}`);
                sessionStorage.removeItem('token');
            })
            .finally(() => console.log('Login done'))
    }

    const setCookie = () => {
        var mail = document.getElementById('email').value;
        var passwd = document.getElementById('password').value;
        var checkBox = document.getElementById("checkboxid");

        if (checkBox.checked === true) {
            document.cookie = "email=" + mail + "";
            document.cookie = "pwd=" + passwd + "";
        } else {
            document.cookie = "email=; max-age=0";
            document.cookie = "pwd=; max-age=0";
        }

    }

    const getCookieData = () => {
        console.log(document.cookie);
        var mail = getCookie('email');
        var pwd = getCookie('pwd');
        setInitialMail(mail);
        setInitialPassword(pwd);

        //console.log(initialCredentials)
    }

    const getCookie = (cname) => {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    return (
        <div>
        {console.log(initialCredentials)}
            <Formik
                // *** Initial values that the form will take
                enableReinitialize = {true}
                initialValues = { initialCredentials } 
                // *** Yup Validation Schema ***
                validationSchema = {loginSchema}
                // ** onSubmit Event
                onSubmit={async (values) => {
                    authUser(values)
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
                                        <label htmlFor="email">Email</label>
                                        <Field id="email" type="email" name="email" placeholder="Introduce tu email"/>
                                        {/* Email Errors */}
                                        {errors.email && touched.email && 
                                            (
                                                <ErrorMessage name="email" component='div'></ErrorMessage>
                                            )
                                        }
                                    </div>
                                    <div className="field-frame">
                                        <label htmlFor="password">Contraseña</label>
                                        <Field id="password" name="password" placeholder="Introduce tu contraseña" type='password'/>
                                        {/* Password Errors */}
                                        {errors.password && touched.password && 
                                            (
                                                <ErrorMessage name="password" component='div'></ErrorMessage>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="remember-frame">
                                    <input type="checkbox" id="checkboxid" className="checkbox" />
                                    <span id="remember">Recuérdame</span>
                                    <span id="forgotten"><a href="../../forgotten.html" id="forgotten">He olvidado la contraseña</a></span>
                                </div>
                                <input type="submit" value="Iniciar Sesión" onClick={setCookie}></input>
                                {isSubmitting ? (<p>Login your credentials...</p>): null}
                            </div>
                        </Form>
                )}
            </Formik>
        </div>
    );
}

export default Axios;

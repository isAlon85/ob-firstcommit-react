import React, { useEffect, useState } from 'react';
import { AuthContext } from "../../App.js";
import { login } from '../../services/axiosService'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate} from 'react-router-dom';

const Login = () => {

    const history = useNavigate();

    useEffect(() => {
        getCookieData();
        document.getElementById('email').value = initialMail;
        document.getElementById('password').value = initialPassword;
        document.getElementById("checkboxid").defaultChecked = initialChecked;
        if (authState.isAuthenticated) {
            history('/dashboard');
        }
    },)

    const { dispatch } = React.useContext(AuthContext);
    const { state: authState } = React.useContext(AuthContext);

    const [initialMail, setInitialMail] = useState('');
    const [initialPassword, setInitialPassword] = useState('');
    const [initialChecked, setInitialChecked] = useState(false);

    var initialCredentials = {
        email: initialMail,
        password: initialPassword,
        isSubmitting: false,
        errorMessage: null
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

    const [data, setData] = useState(initialCredentials);

    const authUser = (values) => {
        setData({
            ...data,
            isSubmitting: true,
            errorMessage: null
        });
        login(values.email, values.password)
            .then((response) => {
                dispatch({
                    type: "LOGIN",
                    payload: response
                })
            })
            .catch((error) => {
                setData({
                    ...data,
                    isSubmitting: false,
                    errorMessage: 'Credenciales no válidas'
                  });
            })
            .finally(() => console.log('Login done'))
    }

    const setCookie = () => {
        var mail = document.getElementById('email').value;
        var passwd = document.getElementById('password').value;
        var checkBox = document.getElementById("checkboxid");
        if (checkBox.checked === true) {
            document.cookie = "email=" + mail + "; max-age=" + 7 * 24 * 60 * 60;
            document.cookie = "pwd=" + passwd + "; max-age=" + 7 * 24 * 60 * 60;
            document.cookie = "checked=true; max-age=" + 7 * 24 * 60 * 60;
        } else {
            document.cookie = "email=; max-age=0";
            document.cookie = "pwd=; max-age=0";
            document.cookie = "checked=; max-age=0";
        }
    }

    const getCookieData = () => {
        var mail = getCookie('email');
        var pwd = getCookie('pwd');
        var checked = getCookie('checked');
        setInitialMail(mail);
        setInitialPassword(pwd);
        if (checked === 'true') setInitialChecked(true);
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
                                        <label htmlFor="email">Email </label>
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
                                    <input type="checkbox" id="checkboxid" className="checkbox"/>
                                    <span id="remember-login">Recuérdame</span>
                                    <span id="forgotten"><Link to={'/forgot'} id="forgotten">He olvidado la contraseña</Link></span>
                                </div>
                                <input type="submit" value="Iniciar Sesión" onClick={setCookie}></input>
                                {isSubmitting ? (<p>Login your credentials...</p>) : null}
                            </div>
                            {data.errorMessage && (<span className="form-error">{data.errorMessage}</span>)}
                        </Form>   
                )}
            </Formik>
        </div>
    );
}

export default Login;

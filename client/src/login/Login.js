import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {validate} from './validate';
import {notify} from './Toast';
import styles from '../login/Signup.module.css';
import Axios from 'axios';

const Login = () => {
    const [data, setData] = useState({
        name: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    useEffect(() => {
        setErrors(validate(data, 'login'));
    }, [data, touched]);

    const changeHandler = (event) => {
        setData({...data, [event.target.name]: event.target.value});
    };

    const focusHanlder = (event) => {
        setTouched({...touched, [event.target.name]: true});
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        if (!Object.keys(errors).length) {
            const response = await Axios.post('http://localhost:3001/login', {
                name: data.name,
                password: data.password,
            });

            if (response.data.success) {
                localStorage.setItem('token', response.data.token);
                window.location.href = '/';
            } else {
                notify('اطلاعات درست نیست !', 'error');
            }
        } else {
            notify('اطلاعات درست نیست !', 'error');
            setTouched({
                name: true,
                password: true,
            });
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={submitHandler} className={styles.formcontainer}>
                <h2 className={styles.header}>ورود</h2>
                <div className={styles.formfield}>
                    <label>اسم</label>
                    <input
                        className={errors.name && touched.name ? styles.uncompleted : styles.forminput}
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={changeHandler}
                        onFocus={focusHanlder}
                    />
                    {errors.name && touched.name && <span>{errors.name}</span>}
                </div>
                <div className={styles.formfield}>
                    <label>رمز</label>
                    <input
                        className={errors.password && touched.password ? styles.uncompleted : styles.forminput}
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={changeHandler}
                        onFocus={focusHanlder}
                    />
                    {errors.password && touched.password && <span>{errors.password}</span>}
                </div>
                <div className={styles.formbuttons}>
                    <Link to="/signup" className={styles.formbuttonslink}>
                        ثبت نام
                    </Link>
                    <button type="submit" className={styles.formbuttonslink}>
                        ورود
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Login;

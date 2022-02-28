import React, {useEffect, useState} from 'react';
import styles from '../components/Menu.module.css';
import {Link} from 'react-router-dom';

import Axios from 'axios';

const type = ['همه', 'ایرانی', 'فست فود', 'کیک و دسر'];
const Menu = () => {
    
    const [active, setActive] = useState(type[0]);

    const [foodBlog, setFoodBlog] = useState([]);
    useEffect(async () => {
        const response = await Axios.get('http://localhost:3001/foods/all', {});
        setFoodBlog(response.data);
    }, []);

    async function showFoods(_type) {
        if (_type === 'همه') {
            const response = await Axios.get('http://localhost:3001/foods/all', {});
            setFoodBlog(response.data);
        } else if (_type === 'ایرانی') {
            const response = await Axios.get('http://localhost:3001/foods/iranian', {});
            setFoodBlog(response.data);
        } else if (_type === 'فست فود') {
            const response = await Axios.get('http://localhost:3001/foods/fastfood', {});
            setFoodBlog(response.data);
        } else if (_type === 'کیک و دسر') {
            const response = await Axios.get('http://localhost:3001/foods/cake', {});
            setFoodBlog(response.data);
        }
    }

    return (
        <div>
            <div className={styles.main}>
                <p className={styles.menu}>دستور پخت</p>

                <div
                    className={`${styles.bigbutmenu}   col-10 col-sm-6 col-xs-10 col-lg-10 col-md-10 d-flex flex-wrap `}
                >
                    {type.map((type) => (
                        <button
                            key={type}
                            className={active === type ? styles.butmenu2 : styles.butmenu}
                            onClick={() => {
                                showFoods(type);
                                setActive(type);
                            }}
                        >
                            {type}
                        </button>
                    ))}
                </div>

                <div className={`${styles.menuborder} col-12 mx-auto  col-md-6  `}></div>
                {foodBlog.map((food) => (
                    <div key={food.food_id} className={styles.mainphoto}>
                        <img src={'http://localhost:3001/' + food.img} alt="dessert" className={styles.imgtag} />
                        <p>
                            <strong className={styles.tag}>{food.food_name}</strong>
                            <br />
                            <br />
                            <Link to={'/' + food.food_name} className={styles.tag2} title="desert">
                                دستور پخت {food.food_name}
                            </Link>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Menu;

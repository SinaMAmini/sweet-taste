import React, {useEffect, useState} from 'react';
import styles from '../components/Header.module.css';
import Preloader from './Preloader';
import {Link} from 'react-router-dom';
import Axios from 'axios';

const Header = () => {
    const [food, setfood] = useState([]);
    let data = [];

    useEffect(async () => {
        const response = await Axios.get('http://sina-amini.ir/app/sweet-taste/food_name', {});
        for (let i = 0; i < response.data.length; i++) {
            data[i] = response.data[i].food_name;
        }
        setfood(data);
    }, []);

    const [search, setsearch] = useState('');
    const searchhandler = (event) => {
        setsearch(event.target.value);
    };
    const [load, setloader] = useState(true);

    useEffect(() => {
        setloader(true);
        setTimeout(() => {
            setloader(false);
        }, 2000);
    }, []);

    const searchedfoods = food.filter((food) => food.toLowerCase().includes(search.toLowerCase()));
    return (
        <div>
            {load ? (
                <Preloader />
            ) : (
                <div className={styles.mainheader}>
                    <div className={styles.mainheader2}>
                        <span className={`${styles.title} title-heading `}>آشپزی و دستور پخت </span>

                        <form action="#" className={styles.mainform} method="get">
                            <input
                                type="search"
                                placeholder="غذایی که میخوامو پیدا کن "
                                className={`${styles.mainsearch} col-sm-10 `}
                                value={search}
                                onChange={searchhandler}
                            />
                        </form>
                        <div>
                            {search.length ? (
                                <div className={`${styles.bigsearch} col-10 col-md-6 mx-auto`}>
                                    {searchedfoods.map((food) => (
                                        <div key={food} className={`${styles.search} col-10 col-md-6 mx-auto`}>
                                            {' '}
                                            <Link to={food} className={styles.searchlink}>
                                                {food}
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p></p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;

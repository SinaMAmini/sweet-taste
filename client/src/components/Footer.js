import React from 'react';
import styles from '../components/Footer.module.css';
import {Link} from 'react-router-dom';
import telegram from '../telegram.svg';
import instagram from '../instagram.svg';
import google from '../google.svg';

const Footer = () => {
    return (
        <div>
            <div className={styles.backnav}>
                <p className={styles.backnavp}>مارا در شبکه های اجتماعی دنبال کنید</p>
                <div className={styles.footericon}>
                    <Link to="#">
                        <img alt='telegram' src={telegram} className={styles.logoicon} />
                    </Link>
                    <Link to="#">
                        <img  alt='instagram' src={instagram} className={styles.logoicon} />
                    </Link>
                    <Link to="#">
                        <img alt='google' src={google} className={styles.logoicon} />
                    </Link>
                </div>
            </div>
            <div className={styles.copyright}>
                <p className={styles.pcopyright}>© The Copyright Of This Site Belongs To It's Owners :D</p>
            </div>
        </div>
    );
};

export default Footer;

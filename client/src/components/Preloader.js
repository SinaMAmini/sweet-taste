import React from 'react';
import preloader from '../69906f3d40e3d73a80c9974639b2350f.gif';
import styles from '../components/Preloader.module.css';

const Preloader = () => {
    return (
        <div className={styles.preloader}>
            <img src={preloader} alt="preloader" />
        </div>
    );
};

export default Preloader;

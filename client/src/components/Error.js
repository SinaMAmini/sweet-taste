import React from 'react';
import error from "../image/noon.gif";
import styles from "../components/Preloader.module.css";
 

const Error = () => {
    return (
        <div className={styles.bigeror}>
            <img alt='/404' src={error} className={`${styles.error} col-10 `}/>
        </div>
    );
};

export default Error;
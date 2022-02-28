import React from 'react';
import styles from '../components/Newrecipe.module.css';
import apple_pie from '../image/apple-pie.jpg';
import sushi from '../image/Sushi.jpg';
import macaroni from '../image/macaroni.jpg';
import ghorme from '../image/ghorme-sabzi.jpg';
import Slider from 'react-slick';

const NewRecipe = () => {
    const settings_3 = {
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        rtl: true,

        responsive: [
            {
                breakpoint: 600,

                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 2,
                },
            },
        ],
    };
    return (
        <div className={styles.all}>
            <div className={styles.bignew3}>
                <div className={styles.bignew}>
                    <div className={`${styles.bignew2} row `}>
                        <nav className={`${styles.lastnav} container `}>
                            <h3 className={styles.h3nav}> پیشنهادات شما که در آینده داخل سایت قرار میگیرد</h3>
                        </nav>
                        <div className={`${styles.bordernew} col-12 mx-auto co-md-6`}></div>
                        <div className={`${styles.nav1} row `}>
                            <Slider {...settings_3}>
                                <div>
                                    <div className={`${styles.nav}   `}>
                                        <div className={styles.bigimgnav}>
                                            <img src={apple_pie} className={styles.imgnav} alt="panjah" />
                                        </div>
                                        <br />

                                        <a href="#" className={styles.anav}>
                                            پای سیب
                                        </a>
                                    </div>
                                </div>
                                <div>
                                    <div className={`${styles.nav}  `}>
                                        <div className={styles.bigimgnav}>
                                            <img src={macaroni} className={styles.imgnav} alt="panjah" />
                                        </div>
                                        <br />

                                        <a href="#" className={styles.anav}>
                                            ماکارونی
                                        </a>
                                    </div>
                                </div>
                                <div>
                                    <div className={`${styles.nav}   `}>
                                        <div className={styles.bigimgnav}>
                                            <img src={sushi} className={styles.imgnav} alt="panjah" />
                                        </div>
                                        <br />

                                        <a href="#" className={styles.anav}>
                                            سوشی
                                        </a>
                                    </div>
                                </div>
                                <div>
                                    <div className={`${styles.nav}  `}>
                                        <div className={styles.bigimgnav}>
                                            <img src={ghorme} className={styles.imgnav} alt="panjah" />
                                        </div>
                                        <br />

                                        <a href="#" className={styles.anav}>
                                            قرمه سبزی
                                        </a>
                                    </div>
                                </div>
                            </Slider>
                            <div className={`${styles.bordernew1} col-12 mx-auto co-md-6`}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewRecipe;

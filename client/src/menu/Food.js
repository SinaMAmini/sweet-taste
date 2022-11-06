import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from '../menu/Food.module.css';
import heart from "../heart-fill.svg";

const Food = ({ food }) => {

    const [steps, setSteps] = useState([]);
    const [ingredients, setIngredients] = useState([]);

    useEffect(async () => {
        const response = await Axios.get(`http://sina-amini.ir/app/sweet-taste/food/${food.food_id}/ingredients`, {});
        setIngredients(response.data);
        const response2 = await Axios.get(`http://sina-amini.ir/app/sweet-taste/food/${food.food_id}/steps`, {});
        setSteps(response2.data);
    }, []);

    return (
        <div>
            <div className="container">
                <div className={`${styles.desert} row `}>
                
                    <div>
                        <h1 className={styles.deserth5}>{food.food_name}</h1>
                        <div className={`${styles.deserth3} col-10 col-md-6  `}>
                            <h4>زمان پخت : {food.cook_time}</h4>
                            <h4>زمان تهیه : {food.preparation_time}</h4>
                        </div>
                        <div className={`${styles.border} col-12 mx-auto co-md-6`}></div>
                        <div className={`${styles.border} col-12 mx-auto co-md-6`}>
                            <h1>: مواد اولیه</h1>
                            <div className={`${styles.mavad} col-10 `}>
                                {ingredients.map((ingredient) => (
                                    <p key={ingredient.name}>{ingredient.name} : {ingredient.amount}</p>
                                ))}
                            </div>
                        </div>
                        <div className={`${styles.deserth3dastor} col-10 `}>
                            <h3>طرز تهیه  : </h3>

                            {steps.map((step) => (
                                <h5 key={step.step}>
                                    {step.step}<br />
                                </h5>
                            ))}

                            <h5>غذای شما آمادست ! <img src={heart}></img></h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Food;

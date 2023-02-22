import React from 'react';
import styles from "./index.module.scss";

const Index = ({campagne}) => {
    return (
        <div className={styles.card__wrapper}>
            <div className={styles.card__content}>
                <h3 className={styles.card__content__title}>{campagne.name}</h3>
                <div className={styles.ressources}>
                    <p>Images utilisées lors de cette campagne :</p>
                    <ul>
                        {campagne.ressources && campagne.ressources.map((ressource) => (
                            <li>
                                <img src={ressource.path}></img>
                                {ressource.file}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Index;

import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Country.module.css';

const Country = ({ name, img, continent, id }) => {

    return (
        <div className={styles.container}>
            <Link to={`/country/${id}`}  className={styles.link}>
                <h2 className={styles.name}>{name.replace(/[^a-zA-Z]/g,' ').length <=11? name.replace(/[^a-zA-Z]/g,' ') : name.replace(/[^a-zA-Z]/g,' ').slice(0,10) +'.'}</h2>
                <img src={img} alt="not found" className={styles.flag} />
                <h4 className={styles.continent}>{continent}</h4>
            </Link>
        </div>
    )

};


export default Country;
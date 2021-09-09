import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Country.module.css';

const Country = ({ name, img, continent, id }) => {

    return (
        <div className={styles.container}>
            <Link to={`/country/${id}`}  className={styles.link}>
                <h2 className={styles.name}>{name.replace('(','').replace(')','').split(' ').length>1 ?name.split(' ')[0]+'. '+name.split(' ')[1].slice(0,1)+'.': name}</h2>
                <img src={img} alt="image not found" className={styles.flag} />
                <h4 className={styles.continent}>{continent}</h4>
            </Link>
        </div>
    )

};


export default Country;
import React from 'react';
import styles from './Pagination.module.css';


const Pagination = ({ countriesInPage, countriesTotal, pagination }) => {


    const pagesNumber = [];
    let pages = 1;
    while (pages <= Math.ceil(countriesTotal/countriesInPage) + 1) {
        pagesNumber.push(pages);
        pages ++;
    };

    
    return (
        <nav>
            <ul className={styles.pagination}>
                {
                    pagesNumber && pagesNumber.map(n => {
                        return (
                            <li key={n} className={styles.number}>
                                <button onClick={() => pagination(n)} className={styles.boton} >{n}</button>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}


export default Pagination;
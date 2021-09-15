import React from 'react';
import styles from './Pagination.module.css';
/* import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi"; */


const Pagination = ({ countriesInPage, countriesTotal, pagination }) => {


    const pagesNumber = [];
    let pages = 1;
    while (pages <= Math.floor(countriesTotal/countriesInPage) + 1) {
        pagesNumber.push(pages);
        pages ++;
    };

    
    return (
        <nav>
            <ul className={styles.pagination}>
                {/* <li><button onClick={() => pagination(-1)} className={styles.boton} ><BiArrowToLeft /></button></li> */}
                {
                    pagesNumber.length > 1 && pagesNumber.map(n => {
                        return (
                            
                            <li key={n} className={styles.number}>
                                <button onClick={() => pagination(n)} className={styles.boton} >{n}</button>
                            </li>
                            
                        )
                    })
                }
                {/* <li><button onClick={() => pagination()} className={styles.boton} ><BiArrowToRight /></button></li> */}
                
            </ul>
        </nav>
    )
}


export default Pagination;
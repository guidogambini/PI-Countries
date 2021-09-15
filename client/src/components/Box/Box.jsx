import React from 'react';
import styles from './Box.module.css';
import { IoBriefcaseOutline, IoAirplaneOutline } from "react-icons/io5";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";


const Box = ({ handleOnDone, handleOnDeny, message }) => {

    return (
        <div className={styles.container}>
            <span className={styles.message}>{message}</span>
            <div className={styles.botones}>
                {   handleOnDone?
                <button onClick = {handleOnDone} className={handleOnDone && handleOnDeny ? styles.boton1bis : styles.boton1} ><AiOutlineCheck /></button>
                    : null
                }
                {   handleOnDeny?
                <button onClick = {handleOnDeny} className={handleOnDone && handleOnDeny ? styles.boton2bis : styles.boton2} ><AiOutlineClose /></button>
                    : null
                }
            </div>
            <span className={styles.maleta}><IoBriefcaseOutline /></span>
            <span className={styles.avion}><IoAirplaneOutline /></span>
        </div>
    )

};


export default Box;
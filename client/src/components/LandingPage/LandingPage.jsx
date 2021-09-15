import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';
import { useDispatch } from 'react-redux';
import { getCountries } from '../../actions';
import World from './World.mp4';


const LandingPage = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCountries())
    }, [dispatch]
    );

    return (

        <div className={styles.contenedor}>
            <video autoPlay loop muted className={styles.video} >
                <source src={World} type="video/mp4" />
            </video>
            <h1 className={styles.globalapp} >GlobalApp</h1>
            <Link to='/home'><button className={styles.boton}>HOME</button></Link>
        </div>

    )
};




export default LandingPage;
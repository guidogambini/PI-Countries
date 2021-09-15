import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { changeDetail, getCountryDetail } from '../../actions';
import numeral from 'numeral';
import styles from './Detail.module.css';
import { IoAirplaneOutline, IoHomeSharp } from "react-icons/io5";


const Detail = () => {


    const { id } = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCountryDetail(id));
        return function cleanup() {
            dispatch(changeDetail())
        }
    }, [dispatch, id]);

    const countryDetail = useSelector(state => state.countryDetail);

    return (
        <>
        <div className={styles.contenedor}>
            {countryDetail.length > 0 ?
                <div className={styles.contenedor2}>
                    <img src={countryDetail[0].flagImg} alt={"img"} className={styles.flag} />
                    <ul className={styles.lista}>
                        <li className={styles.pais}>{countryDetail[0].name}</li>
                        {countryDetail[0].capital ? <li>Capital: {countryDetail[0].capital}</li> : null}
                        {countryDetail[0].continent ? <li>Continent: {countryDetail[0].continent}</li> : null}
                        {countryDetail[0].subRegion ? <li>Subregion: {countryDetail[0].subRegion}</li> : null}
                        {countryDetail[0].poblation ? <li>Population: {numeral(countryDetail[0].poblation).format('0,0')}</li> : null}
                        {countryDetail[0].area ? <li>Area: {numeral(countryDetail[0].area).format('0,0')} km²</li> : null}
                    </ul>
                    
                    <div className={styles.caja}>
                        {countryDetail[0].activities.length && countryDetail[0].activities.map((ac, i) => {
                            return (
                                <ul className={styles.activity}>
                                    <li className={styles.title}>Tourist activity #{countryDetail[0].activities.indexOf(countryDetail[0].activities[i])+1}</li>
                                    <li className={styles.nombre}>{ac.name}</li>
                                    <li>Difficulty: {ac.difficulty}/5</li>
                                    <li>Estimated duration: {ac.duration} hs</li>
                                    <li>Season: {ac.season}</li>
                                </ul>
                            )
                        })


                        }
                    </div>
                </div> : <p>Loading countries...</p>
            }
            <h3 className={styles.id}>{id}</h3>
            <h3 className={styles.icon}><IoAirplaneOutline /></h3>
            <img src="https://images.unsplash.com/photo-1556388158-158ea5ccacbd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" alt="not found" className={styles.avion} />
            <Link to='/home' className={styles.boton}><IoHomeSharp /></Link>
        </div>
        <p className={styles.copy}>Copyright © 2021 Global App</p>
        </>

    )
};



export default Detail;
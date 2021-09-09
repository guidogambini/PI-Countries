import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getCountryDetail } from '../../actions';
import numeral from 'numeral';
import styles from './Detail.module.css';
import { IoCheckmarkDoneSharp, IoHomeSharp } from "react-icons/io5";


const Detail = () => {


    const { id } = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCountryDetail(id));
    }, [dispatch])

    const countryDetail = useSelector(state => state.countryDetail);
    if (countryDetail[0] && countryDetail[0].activities) { console.log(countryDetail[0].activities) }

    return (

        <div className={styles.contenedor}>
            {countryDetail.length ?
                <div className={styles.contenedor2}>
                    <img src={countryDetail[0].flagImg} alt={"img"} className={styles.flag} />
                    <ul className={styles.lista}>
                        <li className={styles.pais}>{countryDetail[0].name}</li>
                        <li>Capital: {countryDetail[0].capital}</li>
                        <li>Continent: {countryDetail[0].continent}</li>
                        <li>Subregion: {countryDetail[0].subRegion}</li>
                        <li>Population: {numeral(countryDetail[0].poblation).format('0,0')}</li>
                        <li>Area: {numeral(countryDetail[0].area).format('0,0')} km²</li>
                    </ul>
                    
                    <div className={styles.caja}>
                        {countryDetail[0].activities.length && countryDetail[0].activities.map((ac, i) => {
                            return (
                                <ul className={styles.activity}>
                                    <li className={styles.title}>Activity #{countryDetail[0].activities.indexOf(countryDetail[0].activities[i])+1}</li>
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
            <Link to='/home' className={styles.boton}><IoHomeSharp /></Link>
        </div>

    )
};



export default Detail;
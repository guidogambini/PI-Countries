import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCountries, orderBy } from '../../actions';
import NavBar from '../NavBar/NavBar';
import Country from '../Country/Country';
import Pagination from '../Pagination/Pagination';
import SearchBar from '../SearchBar/SearchBar';
import styles from './Home.module.css';



const Home = () => {

    
    const dispatch = useDispatch();

    
    useEffect(() => {
        dispatch(getCountries())
    }, [dispatch]
    )

    const countries = useSelector(state => state.countriesLoaded);


    // Countries pagination:

    const [render, setRender] = useState('');
    const [page, setPage] = useState(1);
    const [countriesInPage, setCountriesInPage] = useState(10);
    const countriesInPageOne = 9;
    const lastCountryIndex = page === 1? page * countriesInPageOne: page * countriesInPage;
    const firstCountryIndex = page === 1? lastCountryIndex - countriesInPageOne: lastCountryIndex - countriesInPage;
    const visibleCountries = page === 1? countries.slice(firstCountryIndex, lastCountryIndex): countries.slice(firstCountryIndex-1, lastCountryIndex-1);

    const pagination = (numberOfPage /* = page + 1 */) => {
        
        /* numberOfPage === -1 ? setPage(page - 1) : */
        setPage(numberOfPage);

    };
    
    

    function handleOnClick(e) {

        e.preventDefault();
        dispatch(getCountries('all'));
        setPage(1);

    };

    function handleOnSelector(e) {

        e.preventDefault();
        dispatch(orderBy(e.target.name, e.target.value));
        setPage(1);
        setRender(`ordered by ${e.target.value}`);

    };

    


    return (
        <>

            <div className={styles.buttons}>
                <div className={styles.buttons2}>
                    <Link to='/activity'><button className={styles.boton2}>Let's start your trip!</button></Link>
                </div>
                <div className={styles.buttons1}>
                    <button onClick={handleOnClick} className={styles.boton1} >GlobalApp</button>
                </div>
                <div className={styles.countrysearch}>
                    <SearchBar />
                </div>
            </div>
            <nav className={styles.navegador}>
                <select name='alph' onChange={handleOnSelector} className={styles.alph} >
                <optgroup className={styles.options}>
                    <option hidden disabled selected value>A-Z / Z-A</option>
                    <option value='alphAsc'>A-Z</option>
                    <option value='alphDesc'>Z-A</option>
                </optgroup>    
                </select>

                <select name='area' onChange={handleOnSelector} className={styles.pop} >
                <optgroup className={styles.options}>
                    <option hidden disabled selected value>Area</option>
                    <option value='areaAsc'>Asc</option>
                    <option value='areaDesc'>Desc</option>
                </optgroup>
                </select>
                <NavBar />
                
            </nav>
            
            <div className={styles.countries}>
                {visibleCountries && visibleCountries.map(country => {

                    return (
                        
                        
                        <Country name={country.name} img={country.flagImg} continent={country.continent} id={country.id} key={country.id} />
                        

                    )
                })}
            </div>
            <Pagination countriesInPage={countriesInPage} countriesTotal={countries.length} pagination={pagination} />
            <p className={styles.copy}>Copyright ?? 2021 Global App</p>
        </>
    )
}




export default Home;
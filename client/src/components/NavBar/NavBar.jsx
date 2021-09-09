import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterBy, getCountries, getActivities } from '../../actions';
import styles from './NavBar.module.css';


const NavBar = () => {
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCountries())
    }, [dispatch]
    ); 

    const countries = useSelector(state => state.allCountries);
    
    const [activity, setActivity] = useState('');

    function handleOnChange(e) {

      setActivity(e.target.value)

    };

  function handleOnSubmit(e) {

    e.preventDefault();
    dispatch(filterBy('activity', activity));
    setActivity('');
    
  };  

  function handleContinentSelector(e) {
    
    switch (e.target.value) {
        case 'Americas':
            dispatch(filterBy('continent', 'Americas'));
            break;

        case 'Africa':
            dispatch(filterBy('continent', 'Africa'));
            break;

        case 'Asia':
            dispatch(filterBy('continent', 'Asia'));
            break;

        case 'Europe':
            dispatch(filterBy('continent', 'Europe'));
            break;

        case 'Oceania':
            dispatch(filterBy('continent', 'Oceania'));
            break;

        default: dispatch(getCountries());
            
    }
  };
    
  
    
    return (

        <nav className={styles.navegador}>
            <select onChange={handleContinentSelector} className={styles.continent} >
            <optgroup className={styles.options}>
                <option value='Africa'>Africa</option>
                <option value='Americas'>Americas</option>
                <option value='Asia'>Asia</option>
                <option value='Europe'>Europe</option>
                <option value='Oceania'>Oceania</option>
                <option hidden disabled selected value>Continent</option>
            </optgroup>
            </select>
            { countries.find(c => {if (c.activities.length) return c}) ?
            
            <form onSubmit={handleOnSubmit} className={styles.act} >
                <input type='text' placeholder='Type an activity...' autoComplete='off' value={activity} onChange={handleOnChange} className={styles.input} />
                <button type='submit' className={styles.boton} >Search</button>
            </form>
            
            : 
            null
            }   
        </nav>

    )
}


export default NavBar;
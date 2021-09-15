import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterBy, getCountries } from '../../actions';
import Box from '../Box/Box';
import styles from './NavBar.module.css';


const NavBar = () => {
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCountries())
    }, [dispatch]
    ); 

    const countries = useSelector(state => state.allCountries);

    const [activity, setActivity] = useState('');

    const [visibility, setVisibility] = useState(false);

    function handleOnChange(e) {

      setActivity(e.target.value)

    };

  function handleOnSubmit(e) {

    e.preventDefault();

        let array = [];
        for (let i = 0; i < countries.length; i++) {
            countries[i].activities.map(a => {
                if (a.name.toLowerCase().includes(activity.toLowerCase())) {
                    return array.push(a)
                }
                return null;
            })
        }
        if (!array.length) setVisibility(true);

        else {

            dispatch(filterBy('activity', activity));

        }

        setActivity('');
    
  };  

  function handleContinentSelector(e) {
    
    dispatch(filterBy('continent', e.target.value));
    
  };

    function handleOnDone(e) {

        e.preventDefault();
        setVisibility(false);

    };
    
  
    
    return (
        <>
        <nav className={styles.navegador}>
            <select onChange={handleContinentSelector} className={styles.continent} >
            <optgroup className={styles.options}>
                <option value='Africa'>Africa</option>
                <option value='Americas'>Americas</option>
                <option value='Asia'>Asia</option>
                <option value='Europe'>Europe</option>
                <option value='Oceania'>Oceania</option>
                <option hidden disabled selected value>Select a continent...</option>
            </optgroup>
            </select>
            { countries.find(c => {
                if (c.activities.length) return c;
                else return null;
            }) ?
            
            <form onSubmit={handleOnSubmit} className={styles.act} >
                <input type='text' placeholder='Type an activity...' autoComplete='off' value={activity} onChange={handleOnChange} className={styles.input} />
                <button type='submit' className={styles.boton} >Search</button>
            </form>
            
            : 
            null
            }   
        </nav>
        <div className={visibility ? styles.shown : styles.hidden}>
            <Box message={'That activity does not exist'} handleOnDone={handleOnDone} />
        </div>
        </>
    )
}


export default NavBar;
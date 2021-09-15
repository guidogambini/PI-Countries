import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountryName } from '../../actions'
import Box from '../Box/Box';
import styles from './SearchBar.module.css';
import { IoSearch } from "react-icons/io5";


const SearchBar = () => {


    const dispatch = useDispatch();

    const countries = useSelector(state => state.allCountries);


    const [input, setInput] = useState('');

    const [visibility, setVisibility] = useState(false);

    function handleOnChange(e) {

        e.preventDefault();
        setInput(e.target.value);

    };


    function handleOnSubmit(e) {

        e.preventDefault();

        if (!countries.find(c => c.name.toLowerCase().includes(input.toLowerCase()))) setVisibility(true);

        else {

            dispatch(getCountryName(input));

        }

        setInput('');

    };

    const handleOnKeyDown = (e) => {

        if (e.key === 'Enter') {

            e.preventDefault();

            if (!countries.find(c => c.name.toLowerCase().includes(input.toLowerCase()))) setVisibility(true);

            else {

                dispatch(getCountryName(input));

            }

            setInput('');

        }

    };

    function handleOnDone(e) {

        e.preventDefault();
        setVisibility(false);

    };


    return (

        <>
            <div>
                <input
                    type="text"
                    placeholder='Select a country...'
                    autoComplete='off'
                    value={input}
                    onChange={handleOnChange}
                    onKeyDown={handleOnKeyDown}
                    className={styles.input}
                />
                <button type='submit' onClick={handleOnSubmit} className={styles.boton} ><IoSearch /></button>
            </div>
            <div className={visibility ? styles.shown : styles.hidden}>
                <Box message={'Look for a valid country'} handleOnDone={handleOnDone} />
            </div>
        </>
    )

};


export default SearchBar;
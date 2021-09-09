import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCountryName } from '../../actions'
import styles from './SearchBar.module.css';
import { IoSearch } from "react-icons/io5";


const SearchBar = () => {


    const dispatch = useDispatch();

    
    const [input, setInput] = useState('');


    function handleOnChange(e) {

        e.preventDefault();
        setInput(e.target.value);
    };


    function handleOnSubmit(e) {

        e.preventDefault();

        dispatch(getCountryName(input));
        
        setInput('');

    };


    return (
        
        
        <div>
            <input
                type="text"
                placeholder='Select a country...'
                autoComplete="off"
                value={input}
                onChange={handleOnChange}
                className={styles.input}
            />
            <button type='submit' onClick={handleOnSubmit} className={styles.boton} ><IoSearch /></button>
        </div>
        
    )

};


export default SearchBar;
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createActivity, getCountries } from '../../actions';
import { Link, useHistory } from 'react-router-dom';
import styles from './Form.module.css';
import { IoCheckmarkDoneSharp, IoHomeSharp, IoCloseCircleSharp } from "react-icons/io5";



const Form = () => {


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountries())
    }, [dispatch]
  );

  const countries = useSelector(state => state.allCountries);

  const history = useHistory();

  function validate(input) {
    let errors = {};

    if (!input.name) {
      errors.name = 'Activity name required';
    }
    else if (!/^[a-zA-Z\s]*$/.test(input.name)) {
      errors.name = 'Only letters please';
    }
    if (!input.difficulty) {
      errors.difficulty = 'Difficulty level required';
    }
    else if (!/^[0-9]*$/.test(input.difficulty) || input.difficulty > 5 || input.difficulty < 1) {
      errors.difficulty = 'A number between 1-5';
    }
    return errors;
  };


  const [input, setInput] = useState({
    name: '',
    difficulty: '',
    duration: '',
    season: '',
    country: [],
  });


  const [errors, setErrors] = useState({});


  function handleOnChange(e) {

    /* if (e.target.name === 'name') {
      if (!/^[a-zA-Z\s]*$/.test(e.target.value)) return null;
    } */
    setInput({ ...input, [e.target.name]: e.target.value});
    
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    })
    )
  };
  
  
  function handleOnSubmit(e) {

    e.preventDefault();
    if (input.name && /^[a-zA-Z\s]*$/.test(input.name) 
        && input.difficulty > 0 
        && input.difficulty < 6
        && input.duration && input.season 
        && input.country.length) {
      dispatch(createActivity(input));
      setInput({ name: '', difficulty: '', duration: '', season: '', country: '' });
      alert('Activity created successfully');
      history.push('/home');
    }
    else {
      alert('Check all the required fields');
    }
  }


  function handleOnCheck(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        season: e.target.value
      })
    }
  };
  

  function handleOnSelect(e) {
    if (e.target.name === 'country') {
      input.country.length >= 3? alert('Limit: 3 countries') :
      setInput({...input, country: [...input.country, e.target.value]});
    }
    else {
      setInput({
        ...input,
        [e.target.name]: e.target.value
    })
    }
  };


  function handleOnClose(country) {
    setInput({
      ...input,
      country: input.country.filter(e => e !== country)
    })
  };
  
  
  return (
    <>
    <Link to='/home' className={styles.boton}><IoHomeSharp /></Link>
    <div className={styles.contenedor}>
      <form onSubmit={handleOnSubmit} className={styles.formulario}>
        <input name='name' placeholder='Name your activity...' autoComplete="off" value={input.name} onChange={handleOnChange} className={styles.input} />
        {errors.name && (
          <p className={styles.danger}>{errors.name}</p>
        )}

        
        <input name='difficulty' placeholder='Difficulty level (1-5)' autoComplete="off" value={input.difficulty} onChange={handleOnChange} className={styles.input} />
        {errors.difficulty && (
          <p className={styles.danger}>{errors.difficulty}</p>
        )}
        
        <select name='duration' value={input.duration} onChange={handleOnSelect} className={styles.dur} >
        <optgroup className={styles.options}>
          <option selected value='1'>1 h</option>
          <option value='2'>2 h</option>
          <option value='3'>3 h</option>
          <option value='4'>4 h</option>
          <option value='5'>5 h</option>
          <option value='6'>6 h</option>
          <option value='7'>7 h</option>
          <option value='8'>8 h</option>
          <option value='9'>9 h</option>
          <option value='10'> 10 h</option>
          <option value='11'>11 h</option>
          <option value='12'>12 h</option>
        </optgroup>
        </select>
        <label>Estimated duration in hours</label>

        <div className={styles.check}>
          <label><input type='checkbox' name='summer' value= 'summer' onChange={handleOnCheck} />Summer</label>
          <label><input type='checkbox' name='autumn' value= 'autumn' onChange={handleOnCheck} />Autumn</label>
          <label><input type='checkbox' name='winter' value= 'winter' onChange={handleOnCheck} />Winter</label>
          <label><input type='checkbox' name='spring' value= 'spring' onChange={handleOnCheck} />Spring</label>
        </div>
        {errors.season && (
          <p className={styles.danger}>{errors.season}</p>
        )}
        
        <select name='country' value={input.country} onChange={handleOnSelect} className={styles.coun} >
        <optgroup className={styles.options}>
          {
            countries && countries.map(c => (
              <option value={c.name}>{c.name}</option>
            ))
          }
        </optgroup>
        </select>
        
        <button type='submit' className={styles.submit}><IoCheckmarkDoneSharp /></button>
      </form>
      <div className={styles.listagen}>
      {
          input.country.length && input.country.map((selected, i) => {
            return  (
                      <>
                      {i === 0 && <h3 className={styles.paisname}>Countries to visit:</h3>}
                      <div className={styles.lista}>
                      <p className={styles.nombre}>{selected}</p>
                      <button onClick={() => handleOnClose(selected)} className={styles.cierre}><IoCloseCircleSharp /></button>
                      </div> 
                      </>
                    )
          })
      }
      </div>
    </div>
    </>
  )

};


export default Form;
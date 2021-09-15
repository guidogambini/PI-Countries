import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createActivity, getCountries } from '../../actions';
import { Link, useHistory } from 'react-router-dom';
import styles from './Form.module.css';
import { IoCheckmarkDoneSharp, IoHomeSharp, IoAirplaneOutline } from "react-icons/io5";
import Box from '../Box/Box';



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
  

  const [visibility, setVisibility] = useState(false);

  const [boxStyle, setBoxStyle] = useState(2);

  const [input, setInput] = useState({
    name: '',
    difficulty: '',
    duration: '',
    season: '',
    country: [],
  });


  const [errors, setErrors] = useState({});


  function handleOnChange(e) {


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
      /* dispatch(createActivity(input));
      setInput({ name: '', difficulty: '', duration: '', season: '', country: '' });
      alert('Enjoy your trip!');
      history.push('/home'); */
      setVisibility(true)
    }
    else {
      setBoxStyle(3);
      setVisibility(true);
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
      if (input.country.includes(e.target.value)) {
        setBoxStyle(1);
        setVisibility(true);
      }
      else if (input.country.length >= 3) {
        setBoxStyle(1);
        setVisibility(true);
      }
      else {
        setInput({...input, country: [...input.country, e.target.value]});
      }
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

  function handleOnDone(e) {
      
      e.preventDefault();
      dispatch(createActivity(input));
      setInput({ name: '', difficulty: '', duration: '', season: '', country: '' });
      setVisibility(false);
      history.push('/home');

  };

  function handleOnDeny(e) {
      

    if (boxStyle === 2) setInput({ name: '', difficulty: '', duration: '', season: '', country: '' });
    setVisibility(false);
    setBoxStyle(2);

  };
  
  
  return (
    <>
  
    <Link to='/home' className={styles.boton}><IoHomeSharp /></Link>
    <div className={styles.contenedor}>
      <form onSubmit={handleOnSubmit} className={styles.formulario}>
        <input name='name' placeholder='Name your tourist activity...' autoComplete="off" value={input.name} onChange={handleOnChange} className={!errors.name? styles.input : styles.errors} />
        {errors.name && (
          <p className={styles.danger}>{errors.name}</p>
        )}

        
        <input name='difficulty' placeholder='Difficulty level (1-5)' autoComplete="off" value={input.difficulty} onChange={handleOnChange} className={!errors.difficulty? styles.input : styles.errors} />
        {errors.difficulty && (
          <p className={styles.danger}>{errors.difficulty}</p>
        )}
        
        <select name='duration' value={input.duration} onChange={handleOnSelect} className={styles.dur} >
        <optgroup className={styles.options}>
          <option hidden >Estimated duration...</option>
          <option value='1'>1 h</option>
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

        <div className={styles.check}>
          <label><input type='radio' name='season' value= 'summer' onChange={handleOnCheck} />Summer</label>
          <label><input type='radio' name='season' value= 'autumn' onChange={handleOnCheck} />Autumn</label>
          <label><input type='radio' name='season' value= 'winter' onChange={handleOnCheck} />Winter</label>
          <label><input type='radio' name='season' value= 'spring' onChange={handleOnCheck} />Spring</label>
        </div>
        {errors.season && (
          <p className={styles.danger}>{errors.season}</p>
        )}
        
        <select name='country' value={input.country} onChange={handleOnSelect} className={styles.coun} >
        <optgroup className={styles.options}>
          <option hidden >Select a country...</option>
          {
            countries && countries.map(c => (
              <option value={c.name} key={c.id}>{c.name}</option>
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
                      {i === 0 && <h3 className={styles.paisname}><IoAirplaneOutline /></h3>}
                      <div className={styles.lista} key={i}>
                      <p className={styles.nombre}>{selected}</p>
                      <button onClick={() => handleOnClose(selected)} className={styles.cierre}>X</button>
                      </div> 
                      </>
                    )
          })
      }
      </div>
    </div>
    <div className={visibility? styles.shown: styles.hidden}>
      <Box message={boxStyle === 2 ? 'Confirm the trip?' : boxStyle === 1 ? 'Three different contries limit' : 'All the fields are required'} handleOnDone={boxStyle === 2 ? handleOnDone : null} handleOnDeny={handleOnDeny}  />
    </div>
    <p className={styles.copy}>Copyright © 2021 Global App</p>
    </>
  )

};


export default Form;
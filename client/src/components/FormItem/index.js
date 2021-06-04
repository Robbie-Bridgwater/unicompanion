import { React, useState } from 'react';
import './style.css';

export const FormItem = (props) => {
    const [isChecked, setChecked] = useState(false);
    const handleChange = () => {
        setChecked(!isChecked);
    };

    return (
        <div className='formItem'>
            <input type='checkbox' id={ props.id } name={ props.type } value={ props.type } checked={isChecked} onChange={handleChange}></input>
            <label htmlFor={ props.id }> { props.type } </label>
            <p>Description: <br></br> { props.description }</p>
            <p>Contact: <a href={ `mailto: ${ props.email }` }> { props.email }</a> </p>  
        </div>
    )
}

export default FormItem;
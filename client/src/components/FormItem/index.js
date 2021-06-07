import { React } from 'react';
import './style.css';

export const FormItem = (props) => {

    return (
        <div className='formItem'>
            <input type='checkbox' id={ props.id } name={ props.type } value={ props.name } checked={ props.checked } onChange={ props.handleChange }></input>
            <label htmlFor={ props.id }> { props.name } </label>
            <p>Description: <br></br> { props.description }</p>
            <p>Contact: <a href={ `mailto: ${ props.email }` }> { props.email }</a> </p>  
        </div>
    )
}

export default FormItem;
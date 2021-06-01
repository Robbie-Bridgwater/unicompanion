import React from 'react';

const FormItem = (props) => {
    return (
        <div>
            <input type='checkbox' id={ props.id } name={ props.type } value={ props.type }></input>
            <label for={ props.id }> { props.type } </label>
            <p>Description: <br></br> { props.description }</p>
        </div>
    )
}

export default FormItem;
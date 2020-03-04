import React from 'react'; 
import './Button.css'

export default props => {

    let className = `
        button 
        ${props.double ? 'double ' : ''}
        ${props.triple ? 'triple ' : ''}
        ${props.operation ? 'operation' : ''}
    `
    return (
        <button 
            onClick={e => props.click && props.click(e.target.innerHTML)}
            className={className}>
            {props.value}
        </button>
    )
}
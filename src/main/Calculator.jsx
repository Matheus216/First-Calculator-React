import React, { useState } from 'react';
import Button from '../Components/Buttons/Button'
import Display from '../Components/Display/Display'
import './Calculator.css';

const initialState = {
    current:0,
    currentIndex:0,
    values: [0, 0],
    defaultValue: 0,
    clearDisplay: false,
    operation: ''
}

export default () => {

    const [valueDisplay , setValueDisplay] = useState({...initialState});

    const setOperation = op => {
        
        const obj = {...valueDisplay};

        if (obj.currentIndex === 0){
            console.log(op);
            obj.operation = op;
            obj.currentIndex = 1; 
            obj.clearDisplay = true;

            setValueDisplay(obj);
        }
        else{
            let equals = op === '=';

            switch (obj.operation) {
                case '-': 
                    obj.values[0] = obj.values[0] - obj.values[1]; 
                    break;
                case '/': 
                    obj.values[0] = obj.values[0] / obj.values[1]; 
                    break;
                case '*': 
                    obj.values[0] = obj.values[0] * obj.values[1];     
                    break;
                case '+': 
                    obj.values[0] = obj.values[0] + obj.values[1];     
                    break;
                default: break;
            }
            
            obj.values[1] = 0; 
            obj.current = obj.values[0];
            obj.clearDisplay = true; 
            obj.operation = equals ? null : op; 
            obj.currentIndex = equals ? 0 : 1;

            setValueDisplay(obj); 
        }
    }

    const clear = () => {
        setValueDisplay(initialState);
    }

    const setValue = (value) => {

        if (value === '.' && valueDisplay.current.includes('.')) return

        const obj = {...valueDisplay}; 
        const currentValue = obj.clearDisplay || obj.current === 0 ? '' : obj.current;
        
        obj.current = currentValue + value;
        obj.clearDisplay = false;

        setValueDisplay( obj ) 
             
        if (value !== '.'){
            const i = obj.currentIndex;
            const newValue = parseFloat(obj.current);
            obj.values[i] = newValue; 

            setValueDisplay(obj);
        }
        
    }

    return (
        <div className='calculator'>
            <Display value={valueDisplay.current} />
            <Button value='AC' click={clear} triple />
            <Button value='/' click={setOperation} operation/>
            <Button value='7' click={setValue}/>
            <Button value='8' click={setValue}/>
            <Button value='9' click={setValue}/>
            <Button value='*' click={setOperation} operation/>
            <Button value='4' click={setValue}/>
            <Button value='5' click={setValue}/>
            <Button value='6' click={setValue}/>
            <Button value='-' click={setOperation} operation/>
            <Button value='1' click={setValue}/>
            <Button value='2' click={setValue}/>
            <Button value='3' click={setValue}/>
            <Button value='+' click={setOperation} operation/>
            <Button value='0' click={setValue} double/>
            <Button value='.' click={setValue}/>
            <Button value='=' click={setOperation} operation/>
        </div>
    )
}
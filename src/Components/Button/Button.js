import React, { useContext } from 'react';

import { useLongPress } from '../../useLongPress';
import DarkMode from '../../DarkMode';
import classes from './Button.module.css';

const Button = (props) => {
    const btnClasses = [classes.Button];
    const darkMode = useContext(DarkMode);
    btnClasses.push(darkMode ? classes.Dark : classes.Light);
    if(props.upOrDown === 'up'){
        btnClasses.push(classes.Add);
    }else if(props.upOrDown === 'down'){
        btnClasses.push(classes.Subtract);
    }
    if(props.round){
        btnClasses.push(classes.Round);
    }

    const longPressProps = useLongPress({
        onClick: props.clicked,
        onLongPress: props.longPress,
        ms : 1000,
    });

    let icon = props.children;
    if(props.upOrDown){
        icon = props.upOrDown === 'up' ? '+' : '-';
    }
    return (
        <button 
            className={btnClasses.join(' ')}
            // onClick={props.clicked}
            {...longPressProps}
        >{icon}</button>
    )
}

export default Button;
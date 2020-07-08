import React, { useContext } from 'react';
import DarkMode from '../../DarkMode';

import classes from './Display.module.css';

const Display = (props) => {
    const displayClasses = [classes.Display];
    const darkMode = useContext(DarkMode);
    displayClasses.push(darkMode ? classes.Dark : classes.Light);

    return (
        <div className={displayClasses.join(' ')} >
            <span>
                {props.counter}
            </span>
        </div>
    )
}

export default Display;
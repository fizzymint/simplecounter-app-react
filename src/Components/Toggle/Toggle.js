import React, { useContext } from 'react';
import DarkMode from '../../DarkMode';

import classes from './Toggle.module.css';

const Toogle = (props) => {
    const toggleClasses = [classes.Toggle];
    const darkMode = useContext(DarkMode);
    toggleClasses.push(darkMode ? classes.Dark : classes.Light);

    return (
        <div 
            className={toggleClasses.join(' ')}
            onClick={props.clicked}
        >
            <span className={classes.Bullet}></span>
        </div>
    )
}

export default Toogle;
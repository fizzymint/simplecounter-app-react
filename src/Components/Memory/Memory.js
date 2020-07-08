import React, { useContext } from 'react';

import Button from '../Button/Button';
import DarkMode from '../../DarkMode';
import classes from './Memory.module.css';

const Memory = (props) => {
    const memoryClasses = [classes.MemoryList];
    const darkMode = useContext(DarkMode);
    memoryClasses.push(darkMode ? classes.Dark : classes.Light);

    const listItems = [...props.values];
    const list = listItems.map((item) => {
        return (
            <li 
                key={item.id}
                onClick={() => {props.itemClicked(item.id)}}
            >
                {item.value}
            </li>
        )
    });
    
    return (
        <div className={classes.Memory}>
            <ul className={memoryClasses.join(' ')}>
                {list}
            </ul>
            <div className={classes.Buttons}>
                <Button
                    clicked={props.memoryClicked}
                >M</Button>
                <Button
                    longPress={props.longPress}
                    clicked={props.clearClicked}
                >C</Button>
            </div>
        </div>
    )
}

export default Memory;
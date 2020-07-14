import React, { Component, useContext } from 'react';

import * as utility from '../../utility';

import classes from './Layout.module.css';
import Button from '../Button/Button';
import Display from '../Display/Display';
import Memory from '../Memory/Memory';
import Toggle from '../Toggle/Toggle';
import DarkMode from '../../DarkMode';

class Layout extends Component{

    constructor(props) {
        super(props);

        const counter = JSON.parse(localStorage.getItem('counter')) || 0;
        const memory = [];
        const memoryLS = JSON.parse(localStorage.getItem('memory'));
        if(memoryLS){
            memoryLS.map((el) => {
                memory.push(el);
            })
        }
        const darkmode = localStorage.getItem('darkmode') == "true" || false;
        this.state ={
            counter : counter,
            memory : memory,
            darkMode : darkmode
        }
    }

    updateLS = (memory = this.state.memory, counter = this.state.counter) => {
        localStorage.setItem('counter', counter);
        localStorage.setItem('memory', JSON.stringify(memory));
    }

    onAddHandler = () => {
        const updateCounter = this.state.counter + 1;
        this.setState({
            ...this.state,
            counter : updateCounter,
        })
        this.updateLS(undefined , updateCounter);
    }

    onSubstractHandler = () => {
        const updateCounter = this.state.counter - 1;
        this.setState({
            ...this.state,
            counter : updateCounter,
        })
        this.updateLS(undefined , updateCounter);
    }
    onToggleClickedHandler = () => {
        const updateDarkmode = !this.state.darkMode;
        this.setState({
            ...this.state,
            darkMode : updateDarkmode,
        })
        localStorage.setItem('darkmode', updateDarkmode);
    }
    onMemoryItemClickedHandler = (itemId) => {
        const index = this.state.memory.findIndex((el) => {
            return el.id === itemId;
        });
        const updatedMemory = [...this.state.memory];
        const newValue = updatedMemory.splice(index, 1);
        this.setState({
            ...this.state,
            counter : newValue[0].value,
            memory : updatedMemory,
        });
        this.updateLS(updatedMemory, newValue[0].value);
    }
    onMemoryButtonClickedHandler = () => {
        const newCounterObj = {
            id: utility.generateRandomId(),
            value: this.state.counter,
        };

        const updatedMemory = [...this.state.memory];
        updatedMemory.push(newCounterObj);

        if(updatedMemory.length >= 6){
            updatedMemory.shift();
        }

        this.setState({
            ...this.state,
            memory : updatedMemory,
        });
        console.log('memory')
        this.updateLS(updatedMemory, undefined);
    }

    onLongPressHandler = () => {
        this.setState({
            ...this.state,
            memory : [],
            counter : 0,
        });
        localStorage.removeItem('memory');
        localStorage.removeItem('counter');
    }

    onClearClickedHandler = () => {
        this.setState({
            ...this.state,
            counter : 0,
        });
        localStorage.removeItem('counter');
    }
    
    render() {
        const layoutClasses = [classes.Layout];
        layoutClasses.push(this.state.darkMode ? classes.Dark : classes.Light);

        return (
            <DarkMode.Provider value={this.state.darkMode}>
                <div className={layoutClasses.join(' ')}>
                    <Toggle 
                        // darkmode={this.state.darkMode} 
                        clicked={this.onToggleClickedHandler}
                    />
                    <Memory
                        values={this.state.memory}
                        itemClicked={this.onMemoryItemClickedHandler}
                        memoryClicked={this.onMemoryButtonClickedHandler}
                        clearClicked={this.onClearClickedHandler}
                        longPress={this.onLongPressHandler}
                    />
                    <Display 
                        counter={this.state.counter}
                    />
                    <div className={classes.Buttons}>
                        <Button
                            upOrDown="down"
                            clicked={this.onSubstractHandler}
                            round
                        />
                        <Button 
                            upOrDown="up"
                            clicked={this.onAddHandler}
                            round
                        />
                    </div>
                </div>
            </DarkMode.Provider>
        )
    };
};

export default Layout;
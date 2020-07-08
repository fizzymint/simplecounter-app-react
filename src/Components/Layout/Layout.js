import React, { Component } from 'react';

import * as utility from '../../utility';

import classes from './Layout.module.css';
import Button from '../Button/Button';
import Display from '../Display/Display';
import Memory from '../Memory/Memory';
import Toggle from '../Toggle/Toggle';
import DarkMode from '../../DarkMode';

class Layout extends Component{
    state = {
        counter : 0,
        memory : [],
        darkMode: false,
    }

    onAddHandler = () => {
        const updateCounter = this.state.counter + 1;
        this.setState({
            ...this.state,
            counter : updateCounter,
        })
    }

    onSubstractHandler = () => {
        const updateCounter = this.state.counter - 1;
        this.setState({
            ...this.state,
            counter : updateCounter,
        })
    }
    onToggleClickedHandler = () => {
        const updateDarkmode = !this.state.darkMode;
        this.setState({
            ...this.state,
            darkMode : updateDarkmode,
        })
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

    }
    onMemoryButtonClickedHandler = () => {
        const newCounterObj = {
            id: utility.generateRandomId(),
            value: this.state.counter,
        };

        const updatedMemory = [...this.state.memory];
        updatedMemory.push(newCounterObj);

        this.setState({
            ...this.state,
            memory : updatedMemory,
        });
    }

    onLongPressHandler = () => {
        this.setState({
            ...this.state,
            memory : [],
            counter : 0,
        });
    }

    onClearClickedHandler = () => {
        this.setState({
            ...this.state,
            counter : 0,
        });
    }
    
    render() {
        const layoutClasses = [classes.Layout];
        layoutClasses.push(this.state.darkMode ? classes.Dark : classes.Light);

        return (
            <DarkMode.Provider value={this.state.darkMode}>
                <div className={layoutClasses.join(' ')}>
                    <Toggle 
                        darkmode={this.state.darkMode} 
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
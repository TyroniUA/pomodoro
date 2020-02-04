import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { faStop } from '@fortawesome/free-solid-svg-icons'
import { faRedo } from '@fortawesome/free-solid-svg-icons'
import './fonts/DS-DIGI.TTF'


class TableofSettings extends React.Component {


    render() {
        return (
            <section id={this.props.sectionID}>
                <h3>{this.props.title}</h3>
                <div id={this.props.ID}>
                    <button id={this.props.minusID} onClick={this.props.method1} ><FontAwesomeIcon icon ={faArrowDown}/>
                    </button>
                    <div id={this.props.breakID}>{this.props.breakLength}</div>
                    <button id={this.props.plusID} onClick={this.props.method2} ><FontAwesomeIcon icon ={faArrowUp}/>
                    </button>

                </div>
            </section>
        )
    }
}

class Pomodoro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            breakTime: 5,
            sessionTime: 25,
            isSession: true,
            timerMinute: 25,
            timerSecond: 0,
            intervalID: '',
            running: false,
        }
        this.increaseTime = this.increaseTime.bind(this);
        this.decreaseTime = this.decreaseTime.bind(this);
        this.increaseSessionTime = this.increaseSessionTime.bind(this);
        this.decreaseSessionTime = this.decreaseSessionTime.bind(this);
        this.Reset = this.Reset.bind(this);
        this.Play = this.Play.bind(this);
        this.decreaseSeconds = this.decreaseSeconds.bind(this);
        this.updateTime = this.updateTime.bind(this);
        this.onToggleInterval = this.onToggleInterval.bind(this);
    }


    // INCREASING OR DECREASING TIME
    increaseTime = () => {
        if (!this.state.running){

        
        if (this.state.breakTime === 60) {
            return;
        }
        else {
            this.setState({
                breakTime: this.state.breakTime + 1
            })
        }
    }
    }
    decreaseTime() {
        if (!this.state.running){
        if (this.state.breakTime === 1) {
            return;
        }
        else {
            this.setState({
                breakTime: this.state.breakTime - 1
            })
        }
    }
    }
    increaseSessionTime() {
        if (!this.state.running){
        if (this.state.sessionTime === 60) {
            return;
        }
        else {
            this.setState({
                sessionTime: this.state.sessionTime + 1,
                timerMinute: this.state.timerMinute + 1
            })
        }
    }
    }
    decreaseSessionTime() {
        if (!this.state.running){
        if (this.state.sessionTime === 1) {
            return;
        }
        else {
            this.setState({
                sessionTime: this.state.sessionTime - 1,
                timerMinute: this.state.timerMinute - 1
            })
        }
    }
    }

    // Simple function to reduce minutes
    updateTime() {
        this.setState({
            timerMinute: this.state.timerMinute - 1
        })
    }

    //This switch timer displayed in render method as SESSION or BREAK 
    onToggleInterval(isSession) {
        if (isSession) {
            console.log(this.state.timerMinute + 'sessions time is: ' + this.state.sessionTime)
            this.setState({
                timerMinute: this.state.sessionTime
            })
        } else {
            console.log(this.state.timerMinute + 'breaktime is: ' + this.state.breakTime)
            this.setState({
                timerMinute: this.state.breakTime
            })
        }
    }

    //Main function of reducing seconds. It checks if seconds equals 0.If yes => 
    //another check for minutes are 0 and if yes => and is it session or break? Switch timers and status. 
    // if seconds are not 0 - update seconds. If seconds are 0 but minutes are not zero - reducing minutes.
    decreaseSeconds() {
        if (this.state.timerMinute ===0 && this.state.timerSecond ===0){
            if (this.state.isSession){
                this.audioBeep.play()
                this.setState({
                    isSession: false
                })
                this.onToggleInterval(this.state.isSession)
            }
            else {
                this.audioBeep.play()
                this.setState({
                    isSession: true
                });
                this.onToggleInterval(this.state.isSession)
            }

        }

        else if (this.state.timerSecond === 0) {
            
            this.setState({ timerSecond: 59 })
            this.updateTime()
        }
        else {
            this.setState({
                timerSecond: this.state.timerSecond - 1
            })
        }


    }

    // START button. It checks if timer is running. Yes => another click will stop it. No - timer will run. 
    Play = () => {
        if (this.state.running === false){let intervalID = setInterval(this.decreaseSeconds, 1000);
        this.setState({
            intervalID: intervalID,
            running: true,
        })
    }
        else{
            clearInterval(this.state.intervalID)
            this.setState({
                running: false
            })
        }
    }

   

    // Reset all stats to initial state.
    Reset() {
        clearInterval(this.state.intervalID)
        this.setState({
            breakTime: 5,
            timerMinute: 25,
            timerSecond: 0,
            sessionTime: 25,
            isSession: true,
            running: false
        })
        this.audioBeep.pause();
        this.audioBeep.currentTime = 0;
    }




    render() {
        return (
            <div id='pomodoro'>
                <h1>POMODORO CLOCK</h1>
                <div id='tables'>
                    <TableofSettings ID='break-label'
                        sectionID='break-name'
                        title='Break Length'
                        minusID='break-decrement'
                        method1={this.decreaseTime}
                        minName='-'
                        breakID='break-length'
                        breakLength={this.state.breakTime}
                        plusID='break-increment'
                        method2={this.increaseTime}
                        plusName='+' />
                    <TableofSettings ID='session-label'
                        sectionID='session-name'
                        title='Session Length'
                        minusID='session-decrement'
                        method1={this.decreaseSessionTime}
                        minName='-'
                        breakID='session-length'
                        breakLength={this.state.sessionTime
                        }
                        plusID='session-increment'
                        method2={this.increaseSessionTime}
                        plusName='+' />
                </div>
                <div id='timer-label'>
                    {this.state.isSession === true ? 'Session' : 'Break'}
                    <div id='time-left'>
                        <span id='timer'>{this.state.timerMinute < 10 ? '0' + this.state.timerMinute 
                        :  this.state.timerMinute}</span>
                        <span>:</span>
                        <span id='timer'>{this.state.timerSecond === 0 ? '00'
                            : this.state.timerSecond < 10 ? '0' + this.state.timerSecond
                                : this.state.timerSecond}
                        </span>
                    </div>
    <button id='start_stop' onClick={this.Play}>{this.state.running === false? <FontAwesomeIcon icon={faPlay}/> :<FontAwesomeIcon icon={faStop}/>}</button>
                    <button id='reset' onClick={this.Reset} ><FontAwesomeIcon icon={faRedo}/></button>
                </div>
                <audio id="beep" preload="auto" 
          src="https://goo.gl/65cBl1"
          ref={(audio) => { this.audioBeep = audio; }} />
            </div>
        )
    }
}
export default Pomodoro
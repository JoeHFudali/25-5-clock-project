import React from "https://esm.sh/react"
import ReactDOM from "https://esm.sh/react-dom"
import {createRoot} from "https://esm.sh/react-dom/client"
import $ from "https://esm.sh/jquery"

let paused = true;
let started = false;
let fullTimeMins = 25;
let fullTimeSecs = 0;

class ClockPlus extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      break: 5,
      session: 25,
      label: "Session"
    }
    
    this.resetButtons = this.resetButtons.bind(this);
    this.decrement = this.decrement.bind(this);
    this.increment = this.increment.bind(this);
    this.playButton = this.playButton.bind(this);
    this.timerRecurssion = this.timerRecurssion.bind(this);
  }
  
  decrement(event) {
    if(event.target.id === "break-decrement") {
      if(this.state.break > 1 && paused) {
        this.setState((state) => ({
          break: state.break - 1
        }));
        
        if(this.state.label === "Break") {
          fullTimeMins = this.state.break - 1;
          fullTimeSecs = 0;
        }
      }
    }
    
    else if(event.target.id === "session-decrement") {
      if(this.state.session > 1 && paused) {
        this.setState((state) => ({
          session: state.session - 1
        }));
        
        if(this.state.label === "Session") {
          fullTimeMins = this.state.session - 1;
          fullTimeSecs = 0;
        }
      }
    }
  }
  
  increment(event) {
    if(event.target.id === "break-increment") {
      if(this.state.break < 60 && paused) {
        this.setState((state) => ({
          break: state.break + 1
        }));
        
        if(this.state.label === "Break") {
          fullTimeMins = this.state.break + 1;
          fullTimeSecs = 0;
        }
      } 
    }
    
    else if(event.target.id === "session-increment") {
      if(this.state.session < 60 && paused) {
        this.setState((state) => ({
          session: state.session + 1
        }));
        
        if(this.state.label === "Session") {
          fullTimeMins = this.state.session + 1;
          fullTimeSecs = 0;
        }
      }
    }
  }
  
  resetButtons() {
    this.setState((state) => ({
      break: 5,
      session: 25,
      label: "Session"
    }));
    document.getElementById("time-left").innerText = "25:00";
    fullTimeMins = 25;
    fullTimeSecs = 0;
    
    const audio = document.getElementById("beep");
    
    audio.pause();
    audio.currentTime = 0;
    
    paused = true;
  }
  
  playButton() {
    paused = !paused;
    
    console.log(fullTimeSecs);
    
    if(!paused) {
      this.timerRecurssion();
    }
  }
  
    timerRecurssion() {
      
      
      
      const timeLeft = document.getElementById("time-left");
      if(paused) {
        return;
      }
      else if((fullTimeMins === 0 && fullTimeSecs === 0) && this.state.label === "Session") {
        document.getElementById("beep").play();
       setTimeout(() => {
         this.setState((state) => ({
            label: "Break"
          }));
          fullTimeMins = this.state.break;
          fullTimeSecs = 0;
       }, 2000);
        }
      else if((fullTimeMins === 0 && fullTimeSecs === 0) && this.state.label === "Break") {
        document.getElementById("beep").play();
       setTimeout(() => {
         this.setState((state) => ({
            label: "Session"
          }));
          fullTimeMins = this.state.session;
          fullTimeSecs = 0;
       }, 2000);   
        }
      
      
      else if(fullTimeSecs === 0 || fullTimeSecs === -1) {
          setTimeout(() => {
            fullTimeMins -= 1;
            fullTimeSecs = 59;
          }, 1000);
        }
        else {
          setTimeout(() => {
            fullTimeSecs -= 1;
        }, 1000);
      }
      
      fullTimeSecs > 9 ? timeLeft.innerText = fullTimeMins + ":" + fullTimeSecs : timeLeft.innerText = fullTimeMins + ":0" + fullTimeSecs;
      
      fullTimeMins > 9 ? timeLeft.innerText = timeLeft.innerText : timeLeft.innerText = "0" + timeLeft.innerText;
      
      setTimeout(this.timerRecurssion, 1000);
      
    }
  
 
  
  render() {
    
    let time = fullTimeSecs < 10 ?fullTimeMins + ":0" + fullTimeSecs : fullTimeMins + ":" + fullTimeSecs;
    
    time = fullTimeMins < 10 ? "0" + time : time;
    
    return ( 
      
      <div id="clock-container">
        <h1 class="text-center">25 + 5 Clock</h1>
        
        <div id="break-session-container">
          <div id="text-row">
            <h3 id="break-label">Break Length</h3>
            <h3 id="session-label">Session Length</h3>
          </div>
          
          <div id="buttons-row">
            <div id="break-buttons">
              <button id="break-decrement" class="fas fa-arrow-down" onClick={this.decrement}></button>
              <h3 id="break-length">{this.state.break}</h3>
              <button id="break-increment" class="fas fa-arrow-up" onClick={this.increment}></button>
            </div>
            
            <div id="session-buttons">
              <button id="session-decrement" class="fas fa-arrow-down" onClick={this.decrement}></button>
              <h3 id="session-length">{this.state.session}</h3>
              <button id="session-increment" class="fas fa-arrow-up" onClick={this.increment}></button>
            </div>
            
          </div>
        </div>
        
        <div id="timer-label">
          <audio id="beep" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"></audio>
          <h2 id="session-break-label" class="text-center">{this.state.label}</h2>
          <h1 id="time-left" class="text-center">{time}</h1>
        </div>
        
        <div id="timer-buttons">
          <button id="start_stop" class="fas fa-play" onClick={this.playButton}></button>
          <button id="reset" class="fas fa-retweet" onClick={this.resetButtons}></button>
        </div>
          
        
        <h6 class="text-center">Designed and Coded by Joe Fudali</h6>
      </div>
    );
  }
}


const root = createRoot(document.getElementById("clock-root"));

root.render(<ClockPlus />);

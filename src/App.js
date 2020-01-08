import React from 'react';
import './App.css';
import soundfile from './sting.mp3';
import 'typeface-roboto';
import { Typography, Paper, IconButton } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faMinusSquare, faPlayCircle, faRedo } from '@fortawesome/free-solid-svg-icons';

class App extends React.Component{
  constructor(props){
    super(props);
  this.state={
    sessionLength: 25,
    breakLength: 5,
    pause: true,
    timer: 1500,
    currentPhase:'Session',
    intervalId:'',
  };
    this.handleDecrement = this.handleDecrement.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handlePlayToggle = this.handlePlayToggle.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.clockDisplay = this.clockDisplay.bind(this);
    this.countDownControl = this.countDownControl.bind(this);
  }
  handleIncrement(event){
    if (event.currentTarget.id ==='break-increment' && this.state.pause){
      if (this.state.breakLength !== 60){
        this.setState({breakLength:this.state.breakLength+1});
        if(this.state.currentPhase==='Break'){
          this.setState({timer:this.state.breakLength * 60 + 60})
        }
      } 
    }
    else if(event.currentTarget.id ==='session-increment' && this.state.pause){
      if (this.state.sessionLength !== 60){
        this.setState({sessionLength:this.state.sessionLength+1});
        if (this.state.currentPhase==="Session"){
          this.setState({timer:this.state.sessionLength * 60 + 60})
        }
      } 
    }
  }
  handleDecrement(event){
    if (event.currentTarget.id ==='break-decrement' && this.state.pause){
      if (this.state.breakLength !== 1){
        this.setState({breakLength:this.state.breakLength-1});
        if(this.state.currentPhase==='Break'){
          this.setState({timer:this.state.breakLength * 60 - 60})
        }
      } 
    }
    else if(event.currentTarget.id ==='session-decrement' && this.state.pause){
      if (this.state.sessionLength !== 1){
        this.setState({sessionLength:this.state.sessionLength-1});
        if (this.state.currentPhase==="Session"){
          this.setState({timer:this.state.sessionLength * 60 - 60})
        }
      } 
    }
  }

  countDownControl(){
    if (this.state.timer > 0){
      this.setState({timer:this.state.timer-1});
    }
    else if (this.state.timer === 0){
      this.state.currentPhase==='Session'?this.setState({timer:this.state.breakLength*60, currentPhase:'Break'}):this.setState({timer:this.state.sessionLength*60, currentPhase:'Session'});
      this.audioBeep.play();
    }
  }
  handlePlayToggle(){
    if (this.state.pause){
     let intervalId = setInterval(this.countDownControl,1000);
     this.setState({intervalId:intervalId, pause:false});
    }
    else if (!this.state.pause){
      clearInterval(this.state.intervalId);
      this.setState({pause:true});
    }
  }
  handleReset(){
    clearInterval(this.state.intervalId);
    this.setState({
      sessionLength: 25,
      breakLength: 5,
      pause: true,
      timer: 1500,
      currentPhase:'Session'
    });
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
  }

  clockDisplay(){
    let mins = Math.floor(this.state.timer/60);
    let secs = this.state.timer-mins*60;
    secs = secs < 10 ? '0' + secs : secs;
    mins = mins < 10 ? '0' + mins : mins;
    return mins + ':' + secs;
  }

  render(){ 
    return (
      <div>
        <Typography variant='h4' align='center' id='header'>POMODORO CLOCK</Typography>
    <Paper className="App" id='app'>

      <div id='setting'>

      <div id='breakcard'><Typography variant='subtitle2' id='break-label'>Break Length</Typography>
        <div id='control1'>
        <IconButton size='small' id='break-decrement' onClick={this.handleDecrement}><FontAwesomeIcon icon={faMinusSquare} size="md"/></IconButton> <Typography variant='body1' id='break-length' >{this.state.breakLength}</Typography> <IconButton size='small' id='break-increment' onClick={this.handleIncrement}><FontAwesomeIcon icon={faPlusSquare} size="md"/></IconButton>
        </div>
        </div>

      <div id='sessioncard'><Typography variant='subtitle2' id='session-label'>Session Length</Typography>
        <div id='control2'>
        <IconButton size='small' id='session-decrement' onClick={this.handleDecrement}><FontAwesomeIcon icon={faMinusSquare} size="md"/></IconButton> <Typography variant='body1' id='session-length' >{this.state.sessionLength}</Typography> <IconButton size='small' id='session-increment' onClick={this.handleIncrement}><FontAwesomeIcon icon={faPlusSquare} size="md"/></IconButton>
        </div>
        </div>

      </div>

      <Typography variant='h6' align='center' id='timer-label'>{this.state.currentPhase}</Typography>
      <Typography variant='h2' align='center' id='time-left'>{this.clockDisplay()}</Typography>
      <div id='playcontrol'>
        <IconButton size='small' color='primary' id='start_stop' onClick={this.handlePlayToggle}><FontAwesomeIcon icon={faPlayCircle} size="lg"/></IconButton>
        <IconButton size='small' id='reset' onClick={this.handleReset}><FontAwesomeIcon icon={faRedo} size="md"/></IconButton>
      </div>
        <audio src={soundfile} id="beep" preload="auto" ref={(audio) => { this.audioBeep = audio;}}/>
    </Paper>
    </div>
    );
  }
}

export default App;

import React, { Component } from 'react'
import {Button} from 'semantic-ui-react'

 class CountDown extends Component {
    state = {
        minutes: 1,
        seconds: 0,

    }

    componentDidMount() {
   
        this.countDown()
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    countDown = () =>{

        this.myInterval = setInterval(() => {
            const { seconds, minutes } = this.state

            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(this.myInterval)
                } else {
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                }
            } 
        }, 1000)

    }

    handleReset = () =>{
        this.setState({
            minutes:1,
            seconds:0
        },()=>this.countDown())
    }

    render() {
        const { minutes, seconds } = this.state
        return (
            <div style={{marginLeft:'30px'}}>
                { minutes === 0 && seconds === 0
                    ? <Button 
                       color='teal'
                       style={{margin:'20px'}}
                       onClick={()=>this.handleReset()}>Reset Timer</Button>
                    : <h1>Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
                }
            </div>
        )
    }
}

export default CountDown
import React, { Component } from 'react'
import Login from './login'
import { Loader, Dimmer} from "semantic-ui-react";

class login extends Component {

  state={
    isLoading:true,
  }

  componentDidMount = () =>{

    this.init()

  }

  init = () =>{

    let token = localStorage.getItem('token')
    if(!!token && token)
    {

      setTimeout(()=>{
        this.setState({
          isLoading:false
        },()=>{this.goToHome()})
      },3000)
    
    }
    else
    {
      setTimeout(()=>{
        this.setState({
          isLoading:false
        })
      },3000) 
    }

  }

  goToHome = () =>{
    // console.log("Hello Braj")
    this.props.history.push('/view-detail')
  }
  
    render() {
      // console.log("History",this.props.history)
        return (
            <div style= {{ backgroundColor: "#EBEBD3",height:"100vh"}} >
             <Dimmer active={this.state.isLoading}>
          <Loader content={<div>Auto Logging...<br /> Please Wait</div>} />
        </Dimmer>
              <div>
                <div style={{ height: "8em", backgroundColor: "#291F1E", paddingTop:"4em", textAlign:"center" }}>
                  <span style= {{color:"white",fontSize:"1.8em", fontWeight:"bold"}}>
                    Login/ Sign-Up
                  </span>
                </div>
               <Login 
                goToHome={this.goToHome}
               />
      
              </div>
            </div >
          );
    }
}

export default login

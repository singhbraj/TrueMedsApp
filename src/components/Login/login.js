import React, { Component } from 'react'
import { connect } from "react-redux";

import {Form,Grid,Segment,Button} from 'semantic-ui-react'
import { getOtp, verifyOtp }
 from '../../redux/action/otp_action'


 class Login extends Component {

    state={
        mobileNumber:"",
        mobilevalidate: "",
        otpView:false,
        isLoading:false,
        verifyOtpLoading:false,
        otp:"",
        validateOTP:'',
        errorMsg:''

    }

    validateData = () => {

        let ch = this.state.mobileNumber[0]
        console.log(ch)
        if (this.state.mobileNumber.length < 10) {

            this.setState({
                mobilevalidate: "Mobile Number must be equal to 10 Digits"
            })
        }
       
        else if(ch!==6 && ch!=7 && ch!=8 && ch!=9)
        {
            this.setState({
                mobilevalidate: "Mobile Number must be start with 6,7,8,9"
            })
        }
        else {
            this.setState({
                mobilevalidate: ""
            })
        }
    }

    validateOtp = () =>{

        if (this.state.otp.length < 4) {

            this.setState({
                validateOTP: "OTP must be equal to 4 Digits"
            })
        }
        else {
            this.setState({
                validateOTP: ""
            })
        }
    }

    userMobile = (event,data) => {
  
        if (data.value.length > 0 && /^[0-9]+$/.test(data.value)) {
            this.setState({ mobileNumber: data.value });
          } else if (data.value.length === 0) {
            this.setState({ mobileNumber: "" });
          }
    }

    setOTP = (event,data) => {
        if (data.value.length > 0 && /^[0-9]+$/.test(data.value)) {
            this.setState({ otp: data.value });
          } else if (data.value.length === 0) {
            this.setState({ otp: "" });
          }
    }

    getOtp = () =>{
       this.setState({
           isLoading:true
       })
       let data = {
           mobileNo:this.state.mobileNumber
       }
       let  response = null
       this.props.dispatch(getOtp(data)).then(()=>{

        response = this.props.OtpReducer.response;
        console.log(response)
        if(response)
        {
            this.setState({
                isLoading:false,
                otpView:true
            })
        }
        else
        {
            this.setState({
                isLoading:false,
                errorMsg:'Something went wrong while generating otp'
            })
            setTimeout(() => {
                this.setState({
                    errorMsg: ""
                })
            }, 5000);
        }

       })
    }

    verifyOtp = () =>{
        this.setState({
            verifyOtpLoading:true
        })
        let data={
            mobileNo:this.state.mobileNumber,
            otp:this.state.otp,
            deviceKey:'abcd',
            isIos:false,
            source:'react_interview'
        }

        let response = null;
        this.props.dispatch(verifyOtp(data)).then(()=>{
            response = this.props.OtpReducer.response
            console.log(response)
             if(response)
             {
                let token = response.Response.access_token;
                console.log(token)
                localStorage.setItem("token",token)
                this.setState({
                    verifyOtpLoading:false,
                })
                this.props.goToHome()
                
            }
            else
            {
                this.setState({
                    verifyOtpLoading:false
                })
            }

        })

    }
     
    render() {
        // console.log(this.props)
        return (
            <Grid container textAlign='center' spacing={24} >

            <Grid.Row textAlign='center' >
                <Segment basic padded="very">
                    <Form>
                        <Form.Field>
                            <Form.Input label="Mobile Number" placeholder='Enter Mobile Number'
                                autoComplete="off"
                                // type="number"
                                onBlur={() => this.validateData()}
                                value={this.state.mobileNumber}
                                onChange={(event,data) => this.userMobile(event,data)}
                            />
                            {this.state.mobilevalidate !== "" ?
                                <div style={{ color: "red" }}>
                                    {this.state.mobilevalidate}
                                </div>
                                :
                                null
                            }
                            {
                                this.state.errorMsg !=="" ?
                                <div style={{ color: "red" }}>
                                {this.state.errorMsg}
                            </div>
                            :
                            null

                            }
                        </Form.Field>
                        {this.state.otpView ?
                        
                            <div>
                                <Form.Field >
                                    <Form.Input label="OTP" placeholder='Enter OTP'
                                        autoComplete="off"
                                        onBlur={() => this.validateOtp()}     
                                        value={this.state.otp}
                                        onChange={(event,data) => this.setOTP(event,data)}
                                    />
                                </Form.Field>
                                
                                        {this.state.validateOTP !== "" ?
                                        <div style={{ color: "red" }}>
                                            {this.state.validateOTP}
                                        </div>
                                        :
                                        null
                                    }
                                
                           
                             </div>
                             : null}
                    </Form>
                    <div style={{ marginTop: "10%" }}>
                    {this.state.otpView === false ?
                       <Button
                       fluid
                       color="violet"
                       size="small"
                       loading={this.state.isLoading}
                       disabled={this.state.mobileNumber.length < 10 || this.state.mobileNumber.length>10 || this.state.mobilevalidate!=''}   
                       onClick={this.getOtp}>Login Using OTP</Button>
                   : null}
                    {this.state.otpView ?
                                <Button
                                    fluid
                                    color="violet"
                                    size="small"
                                    loading={this.state.verifyOtpLoading}
                                    onClick={this.verifyOtp}>Verify OTP</Button>
                                :
                                null
                            }
                    
                    </div>

                    </Segment>
                    </Grid.Row>
                    </Grid>
                    
        )
    }
}

const mapStateToProps = state => {
    return {
        OtpReducer: state.OtpReducer,

    };
};

export default connect(mapStateToProps)(Login);
import {TYPE} from './type'
import axios from 'axios'

export const getOtp = (data) =>{

    let url = "https://stage-services.truemeds.in/CustomerService/sendOtp"+"?mobileNo="+data.mobileNo
    console.log(url);

    const request  = axios.post(url,[],{headers:{"transactionId":'react_interview'}})
     .then(response => response.data);
    return {
      type: TYPE.GETOTP,
      payload: request
    };

    
}  

export const verifyOtp = (data) =>{

    let url = "https://stage-services.truemeds.in/CustomerService/verifyOtp"+"?mobileNo="+data.mobileNo+"&otp="+data.otp+"&deviceKey="+data.deviceKey+"&isIos="+data.isIos+"&source="+data.source

    console.log(url);

    const request  = axios.post(url,[], {headers:{"transactionId":'react_interview'}})
     .then(response => response.data);
    return {
      type: TYPE.VERIFY_OTP,
      payload: request
    };

}



import  { combineReducers } from 'redux'
import OtpReducer from './otp_reducer'
import FetchDataResponse from './fetchData_reducer'

const rootReducer = combineReducers({

    OtpReducer,
    FetchDataResponse

})

export default rootReducer
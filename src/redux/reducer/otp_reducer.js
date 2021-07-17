import { TYPE } from "../action/type";

export default function (state = {}, action) {
  switch (action.type) {
    case TYPE.GETOTP:
      return { ...state, response: action.payload }
    case TYPE.VERIFY_OTP:
        return { ...state, response: action.payload }
   

    default:
      return state;
  }
}

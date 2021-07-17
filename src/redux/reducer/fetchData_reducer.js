import { TYPE } from "../action/type";

export default function (state = {}, action) {
  switch (action.type) {
    case TYPE.FETCH_DATA:
        console.log(action.payload)
      return { ...state, response: action.payload }
    default:
      return state;
  }
}

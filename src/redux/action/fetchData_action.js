import {TYPE} from './type'
import axios from 'axios'


export const fetchData = (data) =>{

    let url = "https://stage-services.truemeds.in/ArticleService/getArticleListing"
  
    let token = localStorage.getItem('token')
  
    const request  = axios.post(url,[],{headers:{ "Authorization" : `Bearer ${token}`}})
          .then(response => response.data);
         return {
          type: TYPE.FETCH_DATA,
          payload: request
          };
  
  
  
  }
  
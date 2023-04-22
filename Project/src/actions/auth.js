import { Alert } from "react-native";
import {REACT_APP_API_URL} from '@env'

async function fetchData(url, method, body) 
{
  let response = await fetch(
    url, {
        method: method,
        body: JSON.stringify(body),
        headers: {
            // "Accept": "application/json",
            "Content-Type":"application/json",
        }
    }
  );
  console.log("here");

  if (!response.ok) {
    const data = await response.json()
    return [false, data];
  } else {
    let data = await response.json();
    data = JSON.stringify(data);
    data = JSON.parse(data);
    return [true, data];
  }
}

export const login = (username, password) => {
    return async dispatch => {
        const body = {
            "username": username,
            "password": password
        }
        
        const fetchResult = await fetchData(`${REACT_APP_API_URL}/dj-rest-auth/login/`, 'POST', body);    
    
        if (fetchResult[0]) {
            // success...
        } else {
            // error...
            if ("password" in fetchResult[1]) alert(fetchResult[1]["password"]);
        }

        return {
            type: "LOGIN_SUCCESS",
            data: {
                // access token
                // refresh token
            }
        }
    }
}
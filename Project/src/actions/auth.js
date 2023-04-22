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
  ).catch( (error) => {
    alert("Login failed. Please try again later.");
});

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
    return async () => {

        const body = {
            "username": username,
            "password": password
        }
        
        const fetchResult = await fetchData(`${REACT_APP_API_URL}/dj-rest-auth/login/`, 'POST', body);    
    
        if (!fetchResult[0]) {
            // error...
            if ("password" in fetchResult[1]) {alert(fetchResult[1]["password"]); return;}
            if ("username" in fetchResult[1]) {alert(fetchResult[1]["username"]); return;}
            if ("non_field_errors" in fetchResult[1]) {alert(fetchResult[1]["non_field_errors"]); return;}
            alert(JSON.stringify(fetchResult[1]));
            return;
        }

        return {
            type: "LOGIN_SUCCESS",
            data: {
                "access": fetchResult[1]["access_token"],
                "refresh": fetchResult[1]["refresh_token"],
                "user": fetchResult[1]["user"]
            }
        }

    }
}


export const register = (username, email, password, re_password) => {
    return async dispatch => {
        const body = {
            "username": username,
            "email": email,
            "password1": password,
            "password2": re_password,
        }
        
        const fetchResult = await fetchData(`${REACT_APP_API_URL}/dj-rest-auth/registration/`, 'POST', body);    
    
        if (!fetchResult[0]) {
            // error...
            if ("password" in fetchResult[1]) {alert(fetchResult[1]["password"]); return;}
            if ("username" in fetchResult[1]) {alert(fetchResult[1]["username"]); return;}
            if ("non_field_errors" in fetchResult[1]) {alert(fetchResult[1]["non_field_errors"]); return;}
            return;
        }


        return {
            type: "LOGIN_SUCCESS",
            data: {
                "access": fetchResult[1]["access"],
                "refresh": fetchResult[1]["refresh"],
                "username": body["username"],
                "isAuthenticated": true,
            }
        }
    }
}

export const logout = () => {
    return {
        type: "LOGOUT"
    }
}